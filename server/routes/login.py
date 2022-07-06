from flask import jsonify, request
from .. import app, auth, sql_db
from flask_cors import cross_origin
import os
import datetime

from .response import Response
from flask_cors import cross_origin
#from .check_pass import check_pass,auth


from ..models.models import SUsers

#from werkzeug.security import generate_password_hash, check_password_hash
rsp = Response()


@auth.verify_password
def check_pass(login_name, password):
    #user_query = user.select().where(user.mobile == mobile).dicts()
    user_query = sql_db._get_objects(SUsers, SUsers.mobile == login_name)
    if len(user_query) == 0:
        response = {
            'code': 403,
            'msg': '用户名或密码错误！',
        }
        return (False, response)
    else:
        for row in user_query:
            password_without_salt = row.password
            #salt_expire_time = row['salt_expire_time']
            #is_valid = row['is_valid']
            #salt = row['salt']
            is_valid = 1
            server_timestamp = datetime.datetime.now()
            if is_valid != 1:
                response = {
                    'code': 403,
                    'msg': '用户非生效中状态，禁止登录，请联系管理员',
                    'name': row.mobile,
                    'token': None
                }
                return (False, response)
            else:
                if password == password_without_salt:
                    s = {}  # Serializer(app.config['SECRET_KEY'], expires_in=600)
                    # print(password,"password")
                    #token = s.dumps({'id': row.id})
                    response = {'code': 200, 'msg': '验证成功！',
                                'name': row.name, 'token': "token.decode('ascii')"}
                    return (True, response)
                else:
                    response = {
                        'code': 403,
                        'msg': '用户名或密码错误！',
                        'name': row.mobile,
                        'token': None

                    }
                    return (False, response)
                """if server_timestamp < salt_expire_time:
                    password2compare = cf.md5_it(password_without_salt + salt)
                    if password == password2compare:
                        response = {'code': 200, 'msg': '验证成功！', 'user_name': row['name'], 'login_name': row['login_name'], 'user_id': row['id']}
                        return (True, response)
                    else:
                        response = {
                            'code': 403,
                            'msg': '用户名或密码错误！',
                        }
                        return (False, response)
                else:
                    response = {
                        'code': 403,
                        'msg': '时间戳已过期，请刷新页面！',
                    }
                    return (False, response)"""


@app.route('/login/userLogin', methods=['POST'])
@cross_origin()
@auth.login_required
def userLogin():
    user_info = request.get_json(force=True) or {}
    print(user_info, "user_info")
    login_name = request.get_json(force=True)['login_name']
    password = request.get_json(force=True)['password']
    print(login_name, password, "password")
    login_status, login_response = check_pass(login_name, password)
    login_response['user_key'] = login_name
    print(login_status, login_response, "login")

    resp = jsonify(login_response)
    #resp.headers['Access-Control-Allow-Origin'] = '*'
    if login_status:  # 如果登录成功
        return resp
    else:
        return resp
