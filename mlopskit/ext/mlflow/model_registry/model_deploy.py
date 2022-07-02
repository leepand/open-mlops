from typing import Any, Dict, Optional
import os
import requests
import posixpath

import mlflow
from mlflow.tracking import MlflowClient
from mlflow.exceptions import MlflowException

from mlopskit.io import DataSetError
from mlopskit.ext.mlflow.model_registry.mlflow_abstract_model_dataset import (
    MlflowAbstractModelDataSet,
)
from mlopskit.ext.store import PickleDataSet
from mlopskit.utils.string_utils import strip_suffix
from mlopskit.utils.file_utils import relative_path_to_artifact_path
from mlopskit.utils.rest_utils import augmented_raise_for_status


MLMODEL_FILE_NAME = "MLmodel"

class ModelDeploy(MlflowAbstractModelDataSet):
    """Wrapper for saving, logging and loading for all MLflow model/data flavor."""

    def __init__(
        self,
        flavor: str,
        run_id: Optional[str] = None,
        user_id: Optional[str] = None,
        art_name: str = None,
        artifact_path: Optional[str] = "model",
        pyfunc_workflow: Optional[str] = None,
        experiment_name: str = None,
        artifact_location: str = None,
        mlflow_server_url :str = None,
        remote_art_server: str = None,
        backend:str ='pickle',
        sub_path :str = "model",
        load_args: Optional[Dict[str, Any]] = None,
        save_args: Optional[Dict[str, Any]] = None,
    ) -> None:
        """Initialize the Kedro MlflowModelDataSet.
        Parameters are passed from the Data Catalog.
        During save, the model is first logged to MLflow.
        During load, the model is pulled from MLflow run with `run_id`.
        Args:
            flavor (str): Built-in or custom MLflow model flavor module.
                Must be Python-importable.
            run_id (Optional[str], optional): MLflow run ID to use to load
                the model from or save the model to. Defaults to None.
            artifact_path (str, optional): the run relative path to
                the model.
            pyfunc_workflow (str, optional): Either `python_model` or `loader_module`.
                See https://www.mlflow.org/docs/latest/python_api/mlflow.pyfunc.html#workflows.
            load_args (Dict[str, Any], optional): Arguments to `load_model`
                function from specified `flavor`. Defaults to None.
            save_args (Dict[str, Any], optional): Arguments to `log_model`
                function from specified `flavor`. Defaults to None.
        Raises:
            DataSetError: When passed `flavor` does not exist.
        """
        super().__init__(
            filepath="",
            flavor=flavor,
            pyfunc_workflow=pyfunc_workflow,
            load_args=load_args,
            save_args=save_args,
            version=None,
        )

        self._run_id = run_id
        self._artifact_path = artifact_path
        self.sub_path = sub_path
        self.backend = backend
        self.art_name= art_name
        # drop the key which MUST be common to save and load and
        #  thus is instantiated outside save_args
        self._save_args.pop("artifact_path", None)
        self.mlflow_server_url = mlflow_server_url
        if remote_art_server is not None:
            self._remote_art_server = strip_suffix(remote_art_server, "/")
        else:
            self._remote_art_server = remote_art_server

        self.mlflow_client = MlflowClient(tracking_uri = self.mlflow_server_url)

        if experiment_name:
            try:
                self.experiment_name = experiment_name
                self.experiment_id = self.mlflow_client.create_experiment(
                    experiment_name,
                    user_id = user_id,
                    artifact_location=artifact_location,
                )
            except MlflowException:
                self.experiment_id = self.mlflow_client.get_experiment_by_name(experiment_name).experiment_id

        if self._run_id is None:
            #self.run_id = mlflow.start_run().info.run_id
            self._run_id = self.mlflow_client.create_run(experiment_id = self.experiment_id).info.run_id

    @property
    def model_uri(self):

        if self._run_id is None:
            raise DataSetError(
                (
                    "To access the model_uri, you must either: "
                    "\n -  specifiy 'run_id' "
                    "\n - have an active run to retrieve data from"
                )
            )

        model_uri = f"runs:/{self._run_id}/{self._artifact_path}"

        return model_uri

    def _load(self) -> Any:
        """Loads an MLflow model from local path or from MLflow run.
        Returns:
            Any: Deserialized model.
        """

        # If `run_id` is specified, pull the model from MLflow.
        # TODO: enable loading from another mlflow conf (with a client with another tracking uri)
        # Alternatively, use local path to load the model.
        try:
            return self._mlflow_model_module.load_model(
                model_uri=self.model_uri, **self._load_args
            )
        except:
            _art_path_pkl = self._get_art_path_name()
            return PickleDataSet(filepath= _art_path_pkl,backend=self.backend).load()

    def _save(self, model: Any) -> None:
        """Save a model to local path and then logs it to MLflow.
        Args:
            model (Any): A model object supported by the given MLflow flavor.
        """
        if self._run_id:
            if mlflow.active_run():
                # it is not possible to log in a run which is not the current opened one
                raise DataSetError(
                    (
                        "'run_id' cannot be specified"
                        " if there is an mlflow active run."
                        "Run_id mismatch: "
                        f"\n - 'run_id'={self._run_id}"
                        f"\n - active_run id={mlflow.active_run().info.run_id}"
                    )
                )
            else:
                # if the run id is specified and there is no opened run,
                # open the right run before logging
                #with mlflow.start_run(run_id=self._run_id):
                self._save_model_in_run(model)
        else:
            # if there is no run_id, log in active run
            # OR open automatically a new run to log
            self._save_model_in_run(model)

    def _save_model_in_run(self, model):

        if self._flavor == "mlflow.pyfunc":
            # PyFunc models utilise either `python_model` or `loader_module`
            # workflow. We we assign the passed `model` object to one of those keys
            # depending on the chosen `pyfunc_workflow`.
            self._save_args[self._pyfunc_workflow] = model
            if self._logging_activated:
                self._mlflow_model_module.log_model(
                    self._artifact_path, **self._save_args
                )
        else:
            # Otherwise we save using the common workflow where first argument is the
            # model object and second is the path.
            if self._logging_activated:
                _art_path_pkl = self._get_art_path_name()
                PickleDataSet(filepath= _art_path_pkl,backend=self.backend).save(model)
                
    def _get_art_path_name(self):
        _artifact_path = self.mlflow_client.get_run(self._run_id).info.artifact_uri
        if self.art_name is not None:
            if len(self.art_name.split("."))<2:
                saved_art_name = ".".join([self.art_name, 'pkl'])
            else:
                saved_art_name = self.art_name
        else:
            saved_art_name="model.pkl"
        art_path_pkl = os.path.join(_artifact_path, self.sub_path, saved_art_name)
        #print(_artifact_path,"self._artifact_path")
        return art_path_pkl
    def push_file(self,
                  local_file= None,
                  remote_art_server=None,
                  file_params=None,
                  artifact_path=None
                 ):
        if local_file is None:
            to_upload_file = self._get_art_path_name()
        else:
            to_upload_file = local_file
        if artifact_path is None:
            file_rel_path = to_upload_file
        else:
            file_rel_path = artifact_path
        if file_params is None:
            file_params = {"run_id":self._run_id,
                           "experiment_name":self.experiment_name,
                           "art_file":file_rel_path
                          }

        paths = ("file",)
        endpoint = posixpath.join("/", *paths)
        if remote_art_server is None:
            cleaned_hostname = self._remote_art_server
        else:
            cleaned_hostname = strip_suffix(remote_art_server,"/")

        url = "%s%s" % (cleaned_hostname, endpoint)
        with open(to_upload_file, "rb") as f:
            _f = {"file": f}
            resp = requests.post(url, 
                                 data =file_params,
                                 files =_f,
                                 timeout=600)
        
        return resp.json()
    
    def push_files(self, local_dir, 
                   remote_art_server=None,
                   file_params=None,
                   artifact_path=None
                  ):
        local_dir = os.path.abspath(local_dir)
        for root, _, filenames in os.walk(local_dir):
            
            if root == local_dir:
                artifact_dir = artifact_path
            else:
                rel_path = os.path.relpath(root, local_dir)
                rel_path = relative_path_to_artifact_path(rel_path)
                artifact_dir = (
                    posixpath.join(artifact_path, rel_path) if artifact_path else rel_path
                )
            print(artifact_dir,"ffff")
            for f in filenames:
                print(f,"f")
                self.push_file(os.path.join(root, f), remote_art_server,file_params,artifact_dir)

    def list_artifacts(self, path=None):
        endpoint = "/mlflow-artifacts/artifacts"
        url, tail = self.artifact_uri.split(endpoint, maxsplit=1)
        root = tail.lstrip("/")
        params = {"path": posixpath.join(root, path) if path else root}
        host_creds = _get_default_host_creds(url)
        resp = http_request(host_creds, endpoint, "GET", params=params, timeout=10)
        augmented_raise_for_status(resp)
        file_infos = []
        for f in resp.json().get("files", []):
            file_info = FileInfo(
                posixpath.join(path, f["path"]) if path else f["path"],
                f["is_dir"],
                int(f["file_size"]) if ("file_size" in f) else None,
            )
            file_infos.append(file_info)

        return sorted(file_infos, key=lambda f: f.path)

    def _download_file(self, remote_file_path, local_path, remote_art_server=None):
        endpoint = posixpath.join("/", "files", remote_file_path)

        if remote_art_server is None:
            cleaned_hostname = self._remote_art_server
        else:
            cleaned_hostname = strip_suffix(remote_art_server,"/")

        url = "%s%s" % (cleaned_hostname, endpoint)

        resp = requests.get(url, stream=True, timeout=10)

        augmented_raise_for_status(resp)
        with open(local_path, "wb") as f:
            chunk_size = 1024 * 1024  # 1 MB
            for chunk in resp.iter_content(chunk_size=chunk_size):
                f.write(chunk)

    def _describe(self) -> Dict[str, Any]:
        return dict(
            flavor=self._flavor,
            run_id=self._run_id,
            artifact_path=self._artifact_path,
            pyfunc_workflow=self._pyfunc_workflow,
            load_args=self._load_args,
            save_args=self._save_args,
        )