# -*- coding: utf-8 -*-
from flask import jsonify,request
from .. import app,auth,sql_db,mlflow_client
from flask_cors import cross_origin
import datetime

from pyjackson import deserialize, serialize

from ..models.models import (SDataCampaign,
                             SAbExpCase,
                             SAbExpOps)


from .response import Response
rsp = Response()


# 获取dashboard信息
@app.route('/api/dashboard/get_dashboard_info', methods=['GET'])  
@cross_origin()
@auth.login_required
def get_dashboard_info():
    user_name = request.args.get('user_key','')
    dashboard_all = {}
    _p=sql_db._get_objects(SDataCampaign)
    campaign_info = [serialize(o) for o in _p]
    dashboard_all["campaign_cnt"] = len(campaign_info)
    _p2=sql_db._get_objects(SAbExpCase) 
    ab_info = [serialize(o) for o in _p2]
    dashboard_all["ab_exp_cnt"] = len(ab_info)
    dashboard_all["models_cnt"] = len(mlflow_client.list_registered_models())
    result = {"data": dashboard_all}
    print(result,"result")
    return rsp.success(result)