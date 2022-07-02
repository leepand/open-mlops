from copy import deepcopy
from typing import Any, Dict, Optional

from mlflow.tracking import MlflowClient
from mlflow.exceptions import MlflowException
from mlopskit.ext.mlflow.model_tracking.mlflow_abstract_metric_dataset import (
    MlflowAbstractMetricDataSet
) 


class ModelTracking(MlflowAbstractMetricDataSet):
    SUPPORTED_SAVE_MODES = {"overwrite", "append"}
    DEFAULT_SAVE_MODE = "overwrite"

    def __init__(
        self,
        key: str = None,
        run_id: str = None,
        user_id : str = None,
        experiment_name: str = None,
        artifact_location: str = None,
        mlflow_server_url :str = None,
        load_args: Dict[str, Any] = None,
        save_args: Dict[str, Any] = None,
    ):
        """Initialise MlflowMetricDataSet.
        Args:
            run_id (str): The ID of the mlflow run where the metric should be logged
        """

        super().__init__(key, run_id, load_args, save_args)

        # We add an extra argument mode="overwrite" / "append" to enable logging update an existing metric
        # this is not an offical mlflow argument for log_metric, so we separate it from the others
        # "overwrite" corresponds to the default mlflow behaviour
        self.mode = self._save_args.pop("mode", self.DEFAULT_SAVE_MODE)
        self.mlflow_server_url = mlflow_server_url
        self.mlflow_client = MlflowClient(tracking_uri = self.mlflow_server_url)

        if experiment_name:
            try:
                self.experiment_id = self.mlflow_client.create_experiment(
                    experiment_name,
                    user_id = user_id,
                    artifact_location=artifact_location,
                )
            except MlflowException:
                self.experiment_id = self.mlflow_client.get_experiment_by_name(experiment_name).experiment_id

        if self.run_id is None:
            #self.run_id = mlflow.start_run().info.run_id
            self.run_id = self.mlflow_client.create_run(experiment_id = self.experiment_id).info.run_id
        
    def set_terminated(self, status: Optional[str] = None, end_time: Optional[int] = None
    ) -> None:
        """Set a run's status to terminated.
        :param status: A string value of :py:class:`mlflow.entities.RunStatus`.
                       Defaults to "FINISHED".
        :param end_time: If not provided, defaults to the current time.
        .. code-block:: python
            :caption: Example
            from mlflow.tracking import MlflowClient
            def print_run_info(r):
                print("run_id: {}".format(r.info.run_id))
                print("status: {}".format(r.info.status))
            # Create a run under the default experiment (whose id is '0').
            # Since this is low-level CRUD operation, this method will create a run.
            # To end the run, you'll have to explicitly terminate it.
            client = MlflowClient()
            experiment_id = "0"
            run = client.create_run(experiment_id)
            print_run_info(run)
            print("--")
            # Terminate the run and fetch updated status. By default,
            # the status is set to "FINISHED". Other values you can
            # set are "KILLED", "FAILED", "RUNNING", or "SCHEDULED".
            client.set_terminated(run.info.run_id, status="KILLED")
            run = client.get_run(run.info.run_id)
            print_run_info(run)
        .. code-block:: text
            :caption: Output
            run_id: 575fb62af83f469e84806aee24945973
            status: RUNNING
            --
            run_id: 575fb62af83f469e84806aee24945973
            status: KILLED
        """
        self.mlflow_client.set_terminated(self.run_id, status, end_time)

    def log_param(self, key: str, value: Any) -> None:
        """
        Log a parameter against the run ID.
        :param run_id: The run id to which the param should be logged.
        :param key: Parameter name (string). This string may only contain alphanumerics, underscores
                    (_), dashes (-), periods (.), spaces ( ), and slashes (/).
                    All backend stores will support keys up to length 250, but some may
                    support larger keys.
        :param value: Parameter value (string, but will be string-ified if not).
                      All backend stores will support values up to length 5000, but some
                      may support larger values.
        .. code-block:: python
            :caption: Example
            from mlflow.tracking import MlflowClient
            def print_run_info(r):
                print("run_id: {}".format(r.info.run_id))
                print("params: {}".format(r.data.params))
                print("status: {}".format(r.info.status))
            # Create a run under the default experiment (whose id is '0').
            # Since these are low-level CRUD operations, this method will create a run.
            # To end the run, you'll have to explicitly end it.
            client = MlflowClient()
            experiment_id = "0"
            run = client.create_run(experiment_id)
            print_run_info(run)
            print("--")
            # Log the parameter. Unlike mlflow.log_param this method
            # does not start a run if one does not exist. It will log
            # the parameter in the backend store
            client.log_param(run.info.run_id, "p", 1)
            client.set_terminated(run.info.run_id)
            run = client.get_run(run.info.run_id)
            print_run_info(run)
        .. code-block:: text
            :caption: Output
            run_id: e649e49c7b504be48ee3ae33c0e76c93
            params: {}
            status: RUNNING
            --
            run_id: e649e49c7b504be48ee3ae33c0e76c93
            params: {'p': '1'}
            status: FINISHED
        """
        self.mlflow_client.log_param(self.run_id, key, value)

    def _load(self):
        self._validate_run_id()
        
        metric_history = self.mlflow_client.get_metric_history(
            run_id=self.run_id, key=self.key
        )  # gets active run if no run_id was given

        # the metric history is always a list of mlflow.entities.metric.Metric
        # we want the value of the last one stored because this dataset only deal with one single metric
        step = self._load_args.get("step")

        if step is None:
            # we take the last value recorded
            metric_value = metric_history[-1].value
        else:
            # we should take the last historical value with the given step
            # (it is possible to have several values with the same step)
            metric_value = next(
                metric.value
                for metric in reversed(metric_history)
                if metric.step == step
            )

        return metric_value

    def _save(self, data: float):
        if self._logging_activated:
            self._validate_run_id()
            run_id = (
                self.run_id
            )  # we access it once instead of calling self.run_id everywhere to avoid looking or an active run each time

            #mlflow_client = MlflowClient()

            # get the metric history if it has been saved previously to ensure
            #  to retrieve the right data
            # reminder: this is True even if no run_id was originally specified but a run is active
            metric_history = (
                self.mlflow_client.get_metric_history(run_id=run_id, key=self.key)
                if self._exists()
                else []
            )

            save_args = deepcopy(self._save_args)
            step = save_args.pop("step", None)
            if step is None:
                if self.mode == "overwrite":
                    step = max([metric.step for metric in metric_history], default=0)
                elif self.mode == "append":
                    # I put a max([]) default to -1 so that default "step" equals 0
                    step = (
                        max([metric.step for metric in metric_history], default=-1) + 1
                    )
                else:
                    raise ValueError(
                        f"save_args['mode'] must be one of {self.SUPPORTED_SAVE_MODES}, got '{self.mode}' instead."
                    )

            self.mlflow_client.log_metric(
                run_id=run_id,
                key=self.key,
                value=data,
                step=step,
                **save_args,
            )