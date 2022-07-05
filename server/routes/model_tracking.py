from .. import app,auth,sql_db,mlflow_client
from flask import request,Response,send_file
from flask_cors import cross_origin
import datetime
import traceback
import json
import os
import nbformat
# 1. Import the exporter
from nbconvert import HTMLExporter

from sqlalchemy_paginator import Paginator
from pyjackson import deserialize, serialize

from .response import Response
from structlog import get_logger


from mlflow.protos.service_pb2 import ListExperiments
from mlflow.protos.model_registry_pb2 import (ListRegisteredModels,
                                              GetRegisteredModel,
                                              GetLatestVersions,
                                              GetModelVersion,
                                              SearchModelVersions,
                                              TransitionModelVersionStage)

from mlflow.protos.service_pb2 import GetExperiment
from mlflow.protos.service_pb2 import SearchRuns,GetRun

from mlflow.utils.proto_json_utils import message_to_json
from mlopskit.config import CONFIG

mlops_art_basepath = CONFIG["mlops_art_basepath"]


logger = get_logger(__name__)

rsp = Response()




@app.route('/api/experiments/get_model_experiments',methods=['GET'])  
@cross_origin()
@auth.login_required
def getModelExperiments():
    page_size = 10
    page = request.args.get('page', 1, type=int)
    name = request.args.get('name', '')
    user_name = request.args.get('user_key','')

    exps = mlflow_client.list_experiments()
    total_pages = 1
    
    response_message = ListExperiments.Response()
    response_message.experiments.extend([e.to_proto() for e in exps])
    
    data = json.loads(message_to_json(response_message))
    result = {"data":data,
            "page": page,
            "total": total_pages}
    return rsp.success(result)

@app.route('/api/experiments/add_model_experiment',methods=['POST'])  
@cross_origin()
@auth.login_required
def add_model_experiment():
    try:
        experiment_name = request.get_json()['name']
        tag = request.get_json().get("tag",None)
        user_name = request.get_json()['user']
        artifact_location = request.get_json().get("artifact_location",None)
        exp = mlflow_client.get_experiment_by_name(experiment_name)
        if exp is not None:
            return rsp.failed("模型项目{}已经存在".format(experiment_name))
        experiment_id = mlflow_client.create_experiment(
            experiment_name,
            artifact_location=artifact_location
        )
        if tag is None:
            return rsp.success('model experiment added success!')
        mlflow_client.set_experiment_tag(str(experiment_id),"model_experiment", tag)
        return rsp.success('model experiment added success!')
    except:
        exc_traceback = str(traceback.format_exc())
        return rsp.failed(exc_traceback)
    
@app.route('/api/models/get_registered_models',methods=['GET'])  
@cross_origin()
@auth.login_required
def getRegisteredModels():
    page = request.args.get('page', 1, type=int)
    name = request.args.get('name', '')
    user_name = request.args.get('user_key','')

    models = mlflow_client.list_registered_models()
    total_pages = 1
    
    response_message = ListRegisteredModels.Response()
    response_message.registered_models.extend([m.to_proto() for m in models])
    
    data = json.loads(message_to_json(response_message))
    registered_models = []
    if data:
        for model in data["registered_models"]:
            model_new_dict = {}
            model_new_dict["name"] =model["name"]
            model_new_dict["creation_timestamp"] =model["creation_timestamp"]
            model_new_dict["last_updated_timestamp"] =model["last_updated_timestamp"]
            model_new_dict["description"] =model.get("description",'无')

            if "latest_versions" in model:
                model_new_dict["latest_version"] = model["latest_versions"][-1]["version"]
                for latest_version in model["latest_versions"]:
                    if latest_version["current_stage"]=='Production':
                        model_new_dict["latest_version_prodcution"] =latest_version["version"]
                        break
            else:
                model_new_dict["latest_version_prodcution"] = ''
                model_new_dict["latest_version"] = ''
                
            registered_models.append(model_new_dict)

            
        
    result = {"data":registered_models,
            "page": page,
            "total": total_pages}
    return rsp.success(result)

@app.route('/api/models/register_model',methods=['POST'])  
@cross_origin()
@auth.login_required
def register_model():
    try:
        model_name = request.get_json()['name']
        description = request.get_json().get("description",None)
        user_name = request.get_json()['user']
        try:
            registered_model = mlflow_client.get_registered_model(model_name)
        except:
            registered_model = None
        if registered_model is not None:
            return rsp.failed("模型{}已经存在".format(model_name))
        mlflow_client.create_registered_model(model_name,description=description)
        return rsp.success('model added success!')
    except:
        exc_traceback = str(traceback.format_exc())
        return rsp.failed(exc_traceback)

@app.route('/api/models/get_model_base_info',methods=['GET'])  
@cross_origin()
@auth.login_required
def get_model_base_info():
    name = request.args.get('name', '')
    user_name = request.args.get('user_key','')

    registered_model = mlflow_client.get_registered_model(name=name)
    response_message = GetRegisteredModel.Response(registered_model=registered_model.to_proto())
    data = json.loads(message_to_json(response_message))
    result = data["registered_model"]
    meta_info = {}
    meta_info["name"] = result.get("name","无")
    meta_info["description"] = result.get("description","无")
    meta_info["creation_timestamp"] = result.get("creation_timestamp")
    meta_info["last_updated_timestamp"] = result.get("last_updated_timestamp")
    meta_info["tags"] = result.get("tags",{})
    return rsp.success(meta_info)

@app.route('/api/models/edit_model_description',methods=['POST'])  
@cross_origin()
@auth.login_required
def edit_model_description():
    try:
        model_name = request.get_json()['model_name']
        description = request.get_json().get("description",None)
        user_name = request.get_json()['user_key']

        mlflow_client.update_registered_model(
            name= model_name , description= description
        ) 
        
        return rsp.success('model desc edit success!')
    except:
        exc_traceback = str(traceback.format_exc())
        return rsp.failed(exc_traceback)

@app.route('/api/models/get_model_versions',methods=['GET'])  
@cross_origin()
@auth.login_required
def get_model_versions():
    name = request.args.get('model_name', '')
    page = request.args.get('page', 1)
    user_name = request.args.get('user_key','')
    stage_btn = request.args.get('stage_btn','all')

    if stage_btn == 'active':
        stages = ['Production',"Staging"]
        latest_versions = mlflow_client.get_latest_versions(
            name=name, stages=stages
        )
        response_message = GetLatestVersions.Response()
        response_message.model_versions.extend([e.to_proto() for e in latest_versions])
    else:
        filter_string = "name='{0}'".format(name)
        model_versions = mlflow_client.search_model_versions(filter_string)
        response_message = SearchModelVersions.Response()
        response_message.model_versions.extend([e.to_proto() for e in model_versions])

    json_data = json.loads(message_to_json(response_message))

    data = json_data.get("model_versions",[])
    result = {"data":data,
            "page": page,
            "total": 1}

    return rsp.success(result)

@app.route('/api/models/get_model_base_versioninfo',methods=['GET'])  
@cross_origin()
@auth.login_required
def get_model_base_versioninfo():
    name = request.args.get('name', '')
    version = request.args.get('version', '')
    user_name = request.args.get('user_key','')
    model_version = mlflow_client.get_model_version(
        name=name, version=version
    )
    response_proto = model_version.to_proto()
    response_message = GetModelVersion.Response(model_version=response_proto)
    
    json_data = json.loads(message_to_json(response_message))

    result = json_data.get("model_version",{})

    return rsp.success(result)

@app.route('/api/models/model_stage_transform',methods=['POST'])  
@cross_origin()
@auth.login_required
def model_stage_transform():
    try:
        model_name = request.get_json()['model_name']
        version = request.get_json().get("version_id",'1')
        user_name = request.get_json()['user_key']
        stage = request.get_json()['stage']
        model_version = mlflow_client.transition_model_version_stage(
            name=model_name,
            version=version,
            stage=stage
        )
        
        return rsp.success('model stage transform success!')
    except:
        exc_traceback = str(traceback.format_exc())
        return rsp.failed(exc_traceback)

@app.route('/api/models/edit_model_version_description',methods=['POST'])  
@cross_origin()
@auth.login_required
def edit_model_version_description():
    try:
        model_name = request.get_json()['model_name']
        version = request.get_json()['version']
        description = request.get_json().get("description",None)
        user_name = request.get_json()['user_key']

        mlflow_client.update_model_version(
            name= model_name ,version=version, description= description
        ) 
        
        return rsp.success('model model version desc edit success!')
    except:
        exc_traceback = str(traceback.format_exc())
        return rsp.failed(exc_traceback)

@app.route('/api/experiments/get_model_experiment',methods=['GET'])  
@cross_origin()
@auth.login_required
def get_model_experiment():
    experiment_id = request.args.get('experiment_id', '')
    user_name = request.args.get('user_key','')

    response_message = GetExperiment.Response()
    experiment = mlflow_client.get_experiment(experiment_id).to_proto()
    response_message.experiment.MergeFrom(experiment)

    json_data = json.loads(message_to_json(response_message))
    result = json_data.get("experiment",{})
    tags = result.get("tags",[{"key":"mlops.framework",'value': '无'}])
    result['tags'] = tags
    return rsp.success(result)

@app.route('/api/experiments/edit_experiment_description',methods=['POST'])  
@cross_origin()
@auth.login_required
def edit_experiment_description():
    try:
        experiment_id = request.get_json().get("experiment_id")
        description = request.get_json().get("description",None)
        user_name = request.get_json()['user_key']

        mlflow_client.set_experiment_tag(experiment_id, "mlops.framework", description)
        
        return rsp.success('model experiment desc edit success!')
    except:
        exc_traceback = str(traceback.format_exc())
        return rsp.failed(exc_traceback)

@app.route('/api/experiments/get_model_runs',methods=['GET'])  
@cross_origin()
@auth.login_required
def get_model_runs():
    experiment_id = request.args.get('experiment_id', '')
    user_name = request.args.get('user_key','')

    experiment_ids=[experiment_id]
    run_entities = mlflow_client.search_runs(
        experiment_ids, filter_string='', max_results=1000, order_by=None
    )
    response_message = SearchRuns.Response()
    response_message.runs.extend([r.to_proto() for r in run_entities])
    json_data = json.loads(message_to_json(response_message))
    result = json_data.get("runs",[])
    return rsp.success(result)  

@app.route('/api/experiments/get_model_run',methods=['GET'])  
@cross_origin()
@auth.login_required
def get_model_run():
    run_id = request.args.get('run_id', '')
    user_name = request.args.get('user_key','')

    response_message = GetRun.Response()
    #run_id = '7033fe2d709848d585683c6b3fd45be7'
    response_message.run.MergeFrom(mlflow_client.get_run(run_id).to_proto())
    json_data = json.loads(message_to_json(response_message))
    result = json_data.get("run",{})
    data = result.get("data",{})
    if len(data)<1:
        result['tags'] = [{"key":"mlops.framework",'value': '无'}]
    else:
        tags = data.get("tags",[{"key":"mlops.framework",'value': '无'}])
        result['tags'] = tags
    return rsp.success(result) 

@app.route('/api/experiments/edit_modelrun_description',methods=['POST'])  
@cross_origin()
@auth.login_required
def edit_modelrun_description():
    try:
        run_id = request.get_json().get("run_id")
        description = request.get_json().get("description",None)
        user_name = request.get_json()['user_key']

        mlflow_client.set_tag(run_id, "mlops.framework", description)
        
        return rsp.success('model run desc edit success!')
    except:
        exc_traceback = str(traceback.format_exc())
        return rsp.failed(exc_traceback)

@app.route('/api/models/get_models_markdown',methods=['POST'])  
@cross_origin()
@auth.login_required
def get_models_markdown():
    model_name = request.get_json()['model_name']
    version_id = request.get_json()['version_id']
    model_version = mlflow_client.get_model_version(
        name= model_name, version=version_id
    )
    response_proto = model_version.to_proto()
    response_message = GetModelVersion.Response(model_version=response_proto)
    
    json_data = json.loads(message_to_json(response_message))

    result = json_data.get("model_version",{})
    model_jupyter_path = os.path.join(mlops_art_basepath,result.get("source",""))
    print(model_jupyter_path,"model_jupyter_path")

    files = []
    _fnamePath = ''
    directory_files = os.scandir(model_jupyter_path)
    for file in directory_files:
        fname = file.name
        if fname.endswith('.ipynb'):
            if fname=="main":
                _fnamePath = file.path
            files.append(file.path)
    if _fnamePath:
        jupyterFile = _fnamePath
    else:
        jupyterFile = files[0]

    (_filename, extension) = os.path.splitext(jupyterFile)
    filename = _filename.split("/")[-1]
    to_html_filename = ".".join([filename,"html"])
    file1 = open(jupyterFile,"r+") 
    file_content = file1.read()
    print("Output of Read function is ")
    print(type(file1.read()))
    print()
    file1.close()


    jake_notebook = nbformat.reads(file_content, as_version=4)


    # 2. Instantiate the exporter. We use the `classic` template for now; we'll get into more details
    # later about how to customize the exporter further.
    html_exporter = HTMLExporter()
    html_exporter.template_name = 'classic'

    # 3. Process the notebook we loaded earlier
    (body, resources) = html_exporter.from_notebook_node(jake_notebook)

    # in other words, we replace the template tag
    # by the contents of the overfitting file
    # write the result to disk in index.html

    htmlpath = os.path.join(model_jupyter_path,".html")
    #os.makedirs(os.path.dirname(htmlpath), exist_ok=True)
    try:
        os.makedirs(htmlpath, exist_ok = True)
        print("Directory '%s' created successfully" %htmlpath)
    except OSError as error:
        print("Directory '%s' can not be created")
    file_to_view = os.path.join(htmlpath,to_html_filename)
    with open(file_to_view, 'w') as ofile:
        ofile.write(body)

    #file_to_view = os.path.join(filepath,file_to_view)
    print(file_to_view,"file_to_view")
    if file_to_view:
        # Check if file extension
        (filename, extension) = os.path.splitext(file_to_view)
        send_as_attachment=False
        if extension == '':
            mimetype = 'text/plain'
        else:
            mimetype = None
            
        return send_file(file_to_view, mimetype=mimetype, as_attachment=send_as_attachment)