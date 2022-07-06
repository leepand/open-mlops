import os
import time

from abkit.models import Experiment
import abkit.db as db

from markdown import markdown
import requests
from functools import wraps
import shutil

from math import log2
from time import ctime
from flask import Markup
import mistune
import sys
from pygments import highlight
from pygments.lexers import get_lexer_by_name
from pygments.formatters import html

try:
    from pygments import formatters, highlight, lexers
except ImportError:
    import warnings
    warnings.warn('pygments library not found.', ImportWarning)
    syntax_highlight = lambda data: '<pre>%s</pre>' % data
else:
    def syntax_highlight(data):
        if not data:
            return ''
        lexer = lexers.get_lexer_by_name('python')
        formatter = formatters.HtmlFormatter(linenos=False)
        return highlight(data, lexer, formatter)
def highlight_filter(data):
    return Markup(syntax_highlight(data))

class HighlightRenderer(mistune.Renderer):
    def block_code(self, code, lang):
        if not lang:
            return '\n<pre><code>%s</code></pre>\n' % \
                mistune.escape(code)
        lexer = get_lexer_by_name(lang, stripall=True)
        formatter = html.HtmlFormatter()
        return highlight(code, lexer, formatter)

def get_parent_directory(path, base_directory):
    difference = get_relative_path(path, base_directory)
    difference_fields = difference.split('/')
    if len(difference_fields) == 1:
        return ''
    else:
        return '/'.join(difference_fields[:-1])

def is_valid_subpath(relative_directory, base_directory):
    in_question = os.path.abspath(os.path.join(base_directory, relative_directory))
    _base_directory = os.path.abspath(base_directory)
    return os.path.commonprefix([_base_directory, in_question]) == _base_directory
def del_file(filepath):
    """
    删除某一目录下的所有文件或文件夹
    :param filepath: 路径
    :return:
    """
    del_list = os.listdir(filepath)
    for f in del_list:
        file_path = os.path.join(filepath, f)
        if os.path.isfile(file_path):
            os.remove(file_path)
        elif os.path.isdir(file_path):
            shutil.rmtree(file_path)

def get_relative_path(file_path, base_directory):
    #return file_path.split(os.path.commonprefix([base_directory, file_path]))[1][1:]
    return file_path.split(os.path.commonprefix([base_directory, file_path]))[1][0:]


def human_readable_file_size(size):
    # Taken from Dipen Panchasara
    # https://stackoverflow.com/questions/1094841/reusable-library-to-get-human-readable-version-of-file-size
    _suffixes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    order = int(log2(size) / 10) if size else 0
    return '{:.4g} {}'.format(size / (1 << (order * 10)), _suffixes[order])


def process_files(directory_files, base_directory,exclude=[]):
    files = []
    for file in directory_files:
        if file.name in exclude:
            continue
        if file.is_dir():
            size = '--'
            size_sort = -1
        else:
            size = human_readable_file_size(file.stat().st_size)
            size_sort = file.stat().st_size
            
        fname = file.name
        if fname.endswith('.py'):
            with open(file, 'rb') as f:
                source = f.read()
            code_content = highlight_filter(source)
        elif fname.endswith('.log') or fname.endswith('.txt') or fname.endswith('.json'):
            with open(file, 'rb') as f:
                code_content = f.read()
        elif fname.endswith('.MD') or fname.endswith('.md'):
            with open(file, 'rb') as f:
                md_text = f.read()
                rd = HighlightRenderer()
                markdown = mistune.Markdown(renderer=rd)
                html = markdown(md_text.decode())
  
                # 为了避免中文乱码 以及添加高亮样式
                head_css = '<meta http-equiv="Content-Type"\
                content="text/html; charset=utf-8" />\n'
                css_name = "code.css"
                code_css = '<link rel="stylesheet" href="' + css_name \
                    + '" type="text/css"/>\n'
                code_css = head_css + code_css
                code_content = code_css+html
        else:
            code_content=""
        files.append({
            'name': file.name,
            'is_dir': file.is_dir(),
            'rel_path': get_relative_path(file.path, base_directory),
            'size': size,
            'size_sort': size_sort,
            'code_content':"code_content",
            'last_modified': ctime(file.stat().st_mtime),
            'last_modified_sort': file.stat().st_mtime
        })
    return files

def exception_resistant(func):
    num_fails = 0
    max_fails = 6

    @wraps(func)
    def wrapper(*args, **kwargs):
        nonlocal num_fails
        func_name = func.__name__
        try:
            return func(*args, **kwargs)
        except Exception as e:
            num_fails += 1
            if num_fails == 1:
                print(('Something went wrong in `{}`. ' +
                       'The process will continue to ' +
                       'execute.').format(func_name))
            if num_fails <= max_fails:
                print('`{}`: {}'.format(func_name, e))
            elif num_fails == max_fails + 1:
                print(('The rest of the `{}` errors ' +
                       'are hidden.').format(func_name))
    return wrapper

def check_service_ifready(port,host="localhost"):
    url = "http://{host}:{port}/meta".format(host=host,port=port)
    try:
        resp=requests.get(url)
        return resp.status_code
    except Exception as e:
        print(e) 
        return 300
    
#check_service_ifready(9002)

def wait_until_port_used(
    port, max_wait_sec=20, interval_sec=0.5
):
    """
    wait until the port is used.  *Notice this function will invoke\
    a bash shell to execute command [netstat]!*
    :return:
        return True if the port is used
    """
    curr_wait_sec = 0 
    while curr_wait_sec < max_wait_sec:
        fd_pid = os.popen("lsof -i:%s|awk '{print $2}'" % str(port))
        pids = fd_pid.read().strip().split('\n')
        #if is_port_free(port) is None:
        if len(pids)>1:
            return True
        curr_wait_sec += interval_sec
        time.sleep(interval_sec)
    return False

def kill9_byport(port):
    """
    kill -9 process by name
    """
    fd_pid = os.popen("lsof -i:%s|awk '{print $2}'" % str(port))
    pids = fd_pid.read().strip().split('\n')
    
    fd_pid.close()
    print(pids)
    for pid in pids:
        os.system("kill -9 %s" % (pid))
        
        
#kill9_byport("9001")





def determine_period():
    per={'period':'day'}
    period = per.get('period', 'day')
    if period not in ['day', 'week', 'month', 'year']:
        err = {'error': 'invalid argument: {0}'.format(period), 'status': 400}
        #abort(400, jsonify(err))
    return period
def simple_markdown(experiment):
    description = experiment['description']
    if description and description != '':
        experiment['pretty_description'] = markdown(description)
    return experiment

def experiment_list():
    experiments = Experiment.all(redis=db.REDIS)
    period = determine_period()
    experiments = [simple_markdown(exp.objectify_by_period(period)) for exp in experiments]
    return experiments
def archived():
    experiments = Experiment.archived(redis=db.REDIS)
    period = determine_period()
    experiments = [simple_markdown(exp.objectify_by_period(period)) for exp in experiments]
    return experiments

def paused():
    experiments = Experiment.paused(redis=db.REDIS)
    period = determine_period()
    experiments = [simple_markdown(exp.objectify_by_period(period)) for exp in experiments]#[exp.name for exp in experiments]
    return experiments


def find_or_404(experiment_name,kpi=None):
    try:
        experiment_name = experiment_name
        exp = Experiment.find(experiment_name, db.REDIS)
        if kpi:#设置kpi，用于页面查询，需要kpis列表非空否则出错，server端调用时也需要有kpi的参数输入
            exp.set_kpi(kpi)
        #if request.args.get('kpi'):
        #   exp.set_kpi(request.args.get('kpi'))
        return True,exp
    except ValueError:
        return False,None

# Set winner for an experiment
def set_winner(experiment_name,alternative_name):
    bRet,experiment = find_or_404(experiment_name)
    if bRet:
        experiment.set_winner(alternative_name)
        return True,"Sucess"
    else:
        return False,"None experiment is found"

# Reset experiment not run
def reset_experiment_old(experiment_name):
    bRet,experiment = find_or_404(experiment_name)
    if experiment:
        exp_name = experiment.name
        exp_desc = experiment.description
        exp_alts = experiment.get_alternative_names()
        experiment.reset()
        print(exp_name,exp_alts,exp_desc,"haahhahah")
        new_exp = Experiment.find_or_create(exp_name,exp_alts,redis=db.REDIS)
        new_exp.update_description(exp_desc)
        return True,"Sucess"
    else:
        return False,"None experiment is found"
# Reset experiment running
def reset_experiment(experiment_name):
    bRet,experiment = find_or_404(experiment_name)
    if experiment:
        exp_name = experiment.name
        exp_desc = experiment.description
        exp_alts = experiment.get_alternative_names()
        experiment.delete()
        new_exp = Experiment.find_or_create(exp_name,exp_alts,redis=db.REDIS)
        new_exp.update_description(exp_desc)
        return True,"Sucess"
    else:
        return False,"None experiment is found"
# Pause experiment
def toggle_experiment_pause(experiment_name):
    bRet,experiment = find_or_404(experiment_name)
    if experiment.is_paused():
        experiment.resume()
    else:
        experiment.pause()
    return True,"Sucess"
# Pause experiment
def update_experiment_description(experiment_name,description):
    bRet,experiment = find_or_404(experiment_name)
    experiment.update_description(description)
    return True,"Sucess"

# Archive experiment
def toggle_experiment_archive(experiment_name):
    bRet,experiment = find_or_404(experiment_name)
    if experiment.is_archived():
        return False,"Exp has already archived"
    else:
        experiment.archive()
    return True,"Sucess"
# Delete experiment
def delete_experiment(experiment_name):
    bRet,experiment = find_or_404(experiment_name)
    experiment.delete()
    return True,"Sucess"

def reset_winner(experiment_name):
    bRet,experiment = find_or_404(experiment_name)
    experiment.reset_winner()
    return True,"Sucess"

