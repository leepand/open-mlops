import uvicorn
from typing import List
from pathlib import Path
from datetime import datetime
import aiofiles

import logging
import os
from functools import lru_cache

from fastapi import File, UploadFile, FastAPI,Form, Depends,HTTPException
from fastapi.responses import FileResponse

from pydantic import BaseSettings, PostgresDsn, AnyHttpUrl
from pydantic import BaseModel
from mlflow.tracking import MlflowClient
from mlopskit.config import CONFIG

mlflow_local_server_uri  = CONFIG["mlflow_local_server_uri"]
mlops_art_basepath = CONFIG["mlops_art_basepath"]

mlflow_client=MlflowClient(tracking_uri= mlflow_local_server_uri)

log = logging.getLogger("uvicorn")
app = FastAPI()

class Item(BaseModel):  # 定义一个类用作参数
    name: str

def make_containing_dirs(path):
    """
    Create the base directory for a given file path if it does not exist; also creates parent
    directories.
    """
    dir_name = os.path.dirname(path)
    if not os.path.exists(dir_name):
        os.makedirs(dir_name)

class Settings(BaseSettings):
    environment: str = os.getenv("ENVIRONMENT", "dev")
    testing: bool = os.getenv("TESTING", False)
    database_url: PostgresDsn = os.environ.get("DATABASE_URL")
    filestore_dir: str = os.environ.get("FILESTORE_DIR",mlops_art_basepath)
    backend_cors_origins: List[AnyHttpUrl] = []


@lru_cache()
def get_settings() -> Settings:
    log.info("Loading config settings from the environment...")
    return Settings()


async def save_file(file: UploadFile, filestore: str) -> str:
    """
    Saves the file to the filestore location.
    :param file: The temporary spooled file-like object.
    :param filestore: The location to where the file will be saved.
    :return: filename
    """
    try:
        #async with aiofiles.open(os.path.join(filestore, file.filename), "wb") as f:
        async with aiofiles.open(filestore, "wb") as f:
            print(os.path.join(filestore, file.filename,"fsfdf"))
            # Read the data in chunks and save it, as we go.
            for i in iter(lambda: file.file.read(1024 * 1024 * 64), b""):

                # We can improve this by keeping track of the chunks saved,
                # report that number with an API endpoint and have the client
                # start the upload from the last saved chunk if the upload was
                # interrupted intentionally or due to a network failure.
                await f.write(i)
        log.info(f"File saved as {file.filename}")
    except Exception as e:

        # Not trying to cover all possible errors here, just bubble up the details.
        # Response format based on https://datatracker.ietf.org/doc/html/rfc7807
        problem_response = {"type": str(type(e).__name__), "details": str(e)}
        headers = {"Content-Type": "application/problem+json"}
        log.error(problem_response)
        raise HTTPException(status_code=500, detail=problem_response, headers=headers)
    return file.filename


@app.post("/file", status_code=201)
async def upload_file(
    run_id: str = Form(''),
    experiment_name: str = Form(''),
    art_file: str = Form(''),
    file: UploadFile = File(...),
    settings: Settings = Depends(get_settings)
):
    file_store = os.path.join(settings.filestore_dir,art_file)
    make_containing_dirs(file_store)
    filename = await save_file(file, file_store)
    #print(filename,settings.filestore_dir,"sfff")
    run_info = mlflow_client.get_run(run_id).info
    #art_uri = '/Users/leepand/Downloads/codes/mlflow'
    #log_file = os.path.join(art_uri,art_file)
    #print(run_info,"sffllll",art_file,"fsf")
    #mlflow_client.log_artifact(run_info.run_id, art_file, log_file)
    
    
    #payload = UploadPayloadSchema(
    #    filename=filename,
    #)
    #upload = await crud.post_upload(payload)
    return filename


@app.post("/files", status_code=201)
async def upload_files(
    file_list: List[UploadFile] = File(...), settings: Settings = Depends(get_settings)
):
    uploads = []
    log.info(file_list)
    for file in file_list:
        filename = await save_file(file, settings.filestore_dir)


    return file_list

@app.get("/files/{filename:path}")
async def download_file(filename: str):
    current = Path()
    file_path = current / "files" / filename
    response = FileResponse(
                    path=file_path,
                    filename=f"download_{datetime.now().strftime('%Y%m%d%H%M%S')}_{filename}"
                )
    return response


@app.get("/listfiles")
async def list_files(item: Item):  # item需要与Item对象定义保持一致
    return {
        "method": 'post',
        "people_name": item.name,  
    }




if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8895)
