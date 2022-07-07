import os
from typing import Any, Dict, List, Optional, Union

import fastapi
from rich.console import Console
from structlog import get_logger

from mlopskit.core.errors import ModelsNotFound
from mlopskit.core.library import LibrarySettings, ModelConfiguration, ModelLibrary
from mlopskit.core.model import AbstractModel, AsyncModel
from mlopskit.core.types import LibraryModelsType
from gunicorn.app.base import BaseApplication

logger = get_logger(__name__)


class MlopskitAPIRouter(fastapi.APIRouter):
    def __init__(
        self,
        # ModelLibrary arguments
        settings: Optional[Union[Dict, LibrarySettings]] = None,
        assetsmanager_settings: Optional[dict] = None,
        configuration: Optional[
            Dict[str, Union[Dict[str, Any], ModelConfiguration]]
        ] = None,
        models: Optional[LibraryModelsType] = None,
        required_models: Optional[Union[List[str], Dict[str, Any]]] = None,
        # APIRouter arguments
        **kwargs,
    ) -> None:
        # add custom startup/shutdown events
        on_startup = kwargs.pop("on_startup", [])
        # on_startup.append(self._on_startup)
        kwargs["on_startup"] = on_startup
        on_shutdown = kwargs.pop("on_shutdown", [])
        on_shutdown.append(self._on_shutdown)
        kwargs["on_shutdown"] = on_shutdown
        super().__init__(**kwargs)

        self.lib = ModelLibrary(
            required_models=required_models,
            settings=settings,
            assetsmanager_settings=assetsmanager_settings,
            configuration=configuration,
            models=models,
        )

    async def _on_shutdown(self):
        await self.lib.aclose()


class MlopskitAutoAPIRouter(MlopskitAPIRouter):
    def __init__(
        self,
        # ModelLibrary arguments
        required_models: Optional[List[str]] = None,
        settings: Optional[Union[Dict, LibrarySettings]] = None,
        assetsmanager_settings: Optional[dict] = None,
        configuration: Optional[
            Dict[str, Union[Dict[str, Any], ModelConfiguration]]
        ] = None,
        models: Optional[LibraryModelsType] = None,
        # paths overrides change the configuration key into a path
        route_paths: Optional[Dict[str, str]] = None,
        # APIRouter arguments
        **kwargs,
    ) -> None:
        super().__init__(
            required_models=required_models,
            settings=settings,
            assetsmanager_settings=assetsmanager_settings,
            configuration=configuration,
            models=models,
            **kwargs,
        )

        route_paths = route_paths or {}
        for model_name in self.lib.required_models:
            m: AbstractModel = self.lib.get(model_name)
            if not isinstance(m, AbstractModel):
                continue
            path = route_paths.get(model_name, "/predict/" + model_name)
            batch_path = route_paths.get(model_name, "/predict/batch/" + model_name)

            summary = ""
            description = ""
            if m.__doc__:
                doclines = m.__doc__.strip().split("\n")
                summary = doclines[0]
                if len(doclines) > 1:
                    description = "".join(doclines[1:])

            console = Console(no_color=True)
            with console.capture() as capture:
                t = m.describe()
                console.print(t)
            description += "\n\n```" + str(capture.get()) + "```"

            logger.info("Adding model", name=model_name)
            item_type = m._item_type or Any
            try:
                item_type.schema()  # type: ignore
            except (ValueError, AttributeError):
                logger.info(
                    "Discarding item type info for model", name=model_name, path=path
                )
                item_type = Any

            self.add_api_route(
                path,
                self._make_model_endpoint_fn(m, item_type),
                methods=["POST"],
                description=description,
                summary=summary,
                tags=[str(type(m).__module__)],
            )
            self.add_api_route(
                batch_path,
                self._make_batch_model_endpoint_fn(m, item_type),
                methods=["POST"],
                description=description,
                summary=summary,
                tags=[str(type(m).__module__)],
            )
            logger.info("Added model to service", name=model_name, path=path)

    def _make_model_endpoint_fn(self, model, item_type):
        if isinstance(model, AsyncModel):

            async def _aendpoint(
                item: item_type = fastapi.Body(...),
                model=fastapi.Depends(lambda: self.lib.get(model.configuration_key)),
            ):  # noqa: B008
                return await model.predict(item)

            return _aendpoint

        def _endpoint(
            item: item_type = fastapi.Body(...),
            model=fastapi.Depends(lambda: self.lib.get(model.configuration_key)),
        ):  # noqa: B008
            return model.predict(item)

        return _endpoint

    def _make_batch_model_endpoint_fn(self, model, item_type):
        if isinstance(model, AsyncModel):

            async def _aendpoint(
                item: List[item_type] = fastapi.Body(...),
                model=fastapi.Depends(lambda: self.lib.get(model.configuration_key)),
            ):  # noqa: B008
                return await model.predict_batch(item)

            return _aendpoint

        def _endpoint(
            item: List[item_type] = fastapi.Body(...),
            model=fastapi.Depends(lambda: self.lib.get(model.configuration_key)),
        ):  # noqa: B008
            return model.predict_batch(item)

        return _endpoint


def create_mlopskit_app(models=None, required_models=None):
    """
    Creates a mlopskit FastAPI app with the specified models and required models.

    This is meant to be used in conjunction with gunicorn or uvicorn in order to
     start a server.

    Run with:
    ```
    export MLOPSKIT_REQUIRED_MODELS=... # optional
    export MLOPSKIT_DEFAULT_PACKAGE=... # mandatory
    gunicorn --workers 4 \
            --preload \
            --worker-class=uvicorn.workers.UvicornWorker \
            'mlopskit.api.create_mlopskit_app()'
    ```
    """
    if not (models or os.environ.get("MLOPSKIT_DEFAULT_PACKAGE")):
        raise ModelsNotFound(
            "Please add `your_package` as argument or set the "
            "`MLOPSKIT_DEFAULT_PACKAGE=your_package` env variable."
        )

    if os.environ.get("MLOPSKIT_REQUIRED_MODELS") and not required_models:
        required_models = os.environ.get("MLOPSKIT_REQUIRED_MODELS").split(":")
    app = fastapi.FastAPI()
    router = MlopskitAutoAPIRouter(required_models=required_models, models=models)
    app.include_router(router)
    return app

class APPServer(BaseApplication):
    def __init__(self, app, options=None):
        self.options = options or {}
        self.application = app
        super().__init__()

    def load_config(self):
        config = {key: value for key, value in self.options.items()
                  if key in self.cfg.settings and value is not None}
        for key, value in config.items():
            self.cfg.set(key.lower(), value)
        self.cfg.set("worker_class","uvicorn.workers.UvicornWorker")

    def load(self):
        return self.application
    
def serving(models,required_models,ops={}):
    app = create_mlopskit_app(models = models,required_models=required_models)
    workers = ops.get("workers",2)
    port = ops.get("port",9000)
    host = ops.get("host",'0.0.0.0')
    _ops = {
        'bind': '{0}:{1}'.format(host,port),
        'workers': workers,
    }
    APPServer(app, _ops).run()