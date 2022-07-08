from invoke import task, run
import shutil
from distutils import dir_util
from mlopskit.utils.file_utils import make_containing_dirs

make_containing_dirs('../mlflow_workspace')

@task
def backend(context):
    print("####### BUILDING BACKEND #######")
    run("pip install -r requirements.txt")


@task
def frontend(context):
    print("####### BUILDING FRONTEND #######")
    run("cd frontend && npm install")
    #dir_util.copy_tree("backend/app/templates/", "frontend/public/")
    run("cd frontend && npm run build")
    #run("cd frontend && npm run serve")

@task
def production(context):
    print("####### PREPARE PRODUCTION BUILD #######")
    shutil.copy("frontend/dist/index.html", "server/templates/index.html")
    dir_util.copy_tree("frontend/dist/", "server/static/")
    
    

@task
def build(context):
    backend(context)
    frontend(context)
    production(context)


@task
def serve(context):
    print("####### RUN WEB SERVER #######")
    #run("cd backend && uwsgi -s 0.0.0.0:5001 --protocol=http --module app --callable app")
@task
def serve_art(context):
    print("####### RUN Artifacts SERVER #######")
    with open('artifacts_server/run_server.sh',"w") as f:
        f.write("python app.py")
    run("cd artifacts_server && chmod +x *.sh && sh run.sh")
@task
def serve_mlflow_server(context):
    print("####### RUN MLFLOW SERVER #######")
    with open('../mlflow_workspace/run_mlflow_server.sh',"w") as f:
        f.write("mlflow server  --default-artifact-root artifacts\
        --backend-store-uri sqlite:///mlflow.db --host 0.0.0.0 -p 8904")
    run("cd ../mlflow_workspace && chmod +x *.sh && \
    nohup run_mlflow_server.sh >run_mlflow_server.log 2>&1 &")


@task
def buildAndServe(context):
    build(context)
    serve(context)
    #serve_art(context)
    #serve_mlflow_server(context)
