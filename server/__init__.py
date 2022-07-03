""" A flask application for hosting machine learning models. """
import os
from flask import Flask
from flask_cors import CORS
from flask_httpauth import HTTPBasicAuth
from mlflow.tracking import MlflowClient
#from server.config import config
from colorama import init
from .routes import ui_routes,path_to_local_sqlite_uri
from .models import SysModelInit



defa_db_uri = path_to_local_sqlite_uri("/Users/leepand/Downloads/codes/checkpoint.db")
sys_db_uri = os.environ.get("DATABASE_URL", defa_db_uri)
sql_db=SysModelInit(sys_db_uri)
mlflow_client=MlflowClient(tracking_uri="http://0.0.0.0:8904")


if os.name == 'nt':
    init(convert=True)

config_name = os.getenv('FLASK_CONFIG') or 'default'
basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__,static_url_path="")
app.register_blueprint(ui_routes, url_prefix="/")
#FlaskDB(app, db) #解决peewee不自动关闭连接池连接，参见https://www.cnblogs.com/xueweihan/p/6698456.html

# r'/*' 是通配符，让本服务器所有的 URL 都允许跨域请求
CORS(app, resources=r'/*')
CORS(app, supports_credentials=True)
app.config['SECRET_KEY'] = 'hard to guess string'

#app.config.from_object(config[config_name])

auth = HTTPBasicAuth()
CSRF_ENABLED = True
app.debug = True

#import server.apps.settings
from .routes import login
from .routes import users
from .routes import campaign_registry
from .routes import dashboard
from .routes import model_tracking