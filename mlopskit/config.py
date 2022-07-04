import yaml
import os

config_path = os.environ.get('MLOPS_CONFIG', None)

if config_path:
    try:
        CONFIG = yaml.safe_load(open(config_path, 'r'))
    except IOError:
        raise RuntimeError(
            'MLOPS_CONFIG - {0} - is an invalid path'.format(config_path))
    except yaml.YAMLError as exc:
        raise RuntimeError('Error in configuration file: {0}'.format(str(exc)))
else:
    CONFIG = {
        'mlops_art_basepath': os.environ.get('MLOPS_ART_BASEPATH', os.getcwd()),
        'mlflow_remote_server_uri': os.environ.get('MLFLOW_REMOTE_SERVER_URI', 
                                                   "http://0.0.0.0:8904"),
        'mlflow_local_server_uri': os.environ.get('MLFLOW_LOCAL_SERVER_URI', 
                                                   "http://0.0.0.0:8904"),
        'mlops_sqlite_db': os.environ.get("MLOPS_SQLITE_DB","mlops.db")
    }