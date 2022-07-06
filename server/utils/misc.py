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
from pygments.styles import get_style_by_name

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
                
            lexer = lexers.get_lexer_by_name('python')
            style = get_style_by_name('native')
            formatter = formatters.HtmlFormatter(linenos=True,full=True, style=style)

            code_content = highlight(source, lexer, formatter)
            #code_css =formatters.HtmlFormatter().get_style_defs('.highlight')
            #code_content = highlight_filter(source)
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
            'code_content': code_content,
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

highlight_css="""
pre { line-height: 125%; }
td.linenos .normal { color: inherit; background-color: transparent; padding-left: 5px; padding-right: 5px; }
span.linenos { color: inherit; background-color: transparent; padding-left: 5px; padding-right: 5px; }
td.linenos .special { color: #000000; background-color: #ffffc0; padding-left: 5px; padding-right: 5px; }
span.linenos.special { color: #000000; background-color: #ffffc0; padding-left: 5px; padding-right: 5px; }
.highlight .hll { background-color: #ffffcc }
.highlight { background: #f8f8f8; }
.highlight .c { color: #3D7B7B; font-style: italic } /* Comment */
.highlight .err { border: 1px solid #FF0000 } /* Error */
.highlight .k { color: #008000; font-weight: bold } /* Keyword */
.highlight .o { color: #666666 } /* Operator */
.highlight .ch { color: #3D7B7B; font-style: italic } /* Comment.Hashbang */
.highlight .cm { color: #3D7B7B; font-style: italic } /* Comment.Multiline */
.highlight .cp { color: #9C6500 } /* Comment.Preproc */
.highlight .cpf { color: #3D7B7B; font-style: italic } /* Comment.PreprocFile */
.highlight .c1 { color: #3D7B7B; font-style: italic } /* Comment.Single */
.highlight .cs { color: #3D7B7B; font-style: italic } /* Comment.Special */
.highlight .gd { color: #A00000 } /* Generic.Deleted */
.highlight .ge { font-style: italic } /* Generic.Emph */
.highlight .gr { color: #E40000 } /* Generic.Error */
.highlight .gh { color: #000080; font-weight: bold } /* Generic.Heading */
.highlight .gi { color: #008400 } /* Generic.Inserted */
.highlight .go { color: #717171 } /* Generic.Output */
.highlight .gp { color: #000080; font-weight: bold } /* Generic.Prompt */
.highlight .gs { font-weight: bold } /* Generic.Strong */
.highlight .gu { color: #800080; font-weight: bold } /* Generic.Subheading */
.highlight .gt { color: #0044DD } /* Generic.Traceback */
.highlight .kc { color: #008000; font-weight: bold } /* Keyword.Constant */
.highlight .kd { color: #008000; font-weight: bold } /* Keyword.Declaration */
.highlight .kn { color: #008000; font-weight: bold } /* Keyword.Namespace */
.highlight .kp { color: #008000 } /* Keyword.Pseudo */
.highlight .kr { color: #008000; font-weight: bold } /* Keyword.Reserved */
.highlight .kt { color: #B00040 } /* Keyword.Type */
.highlight .m { color: #666666 } /* Literal.Number */
.highlight .s { color: #BA2121 } /* Literal.String */
.highlight .na { color: #687822 } /* Name.Attribute */
.highlight .nb { color: #008000 } /* Name.Builtin */
.highlight .nc { color: #0000FF; font-weight: bold } /* Name.Class */
.highlight .no { color: #880000 } /* Name.Constant */
.highlight .nd { color: #AA22FF } /* Name.Decorator */
.highlight .ni { color: #717171; font-weight: bold } /* Name.Entity */
.highlight .ne { color: #CB3F38; font-weight: bold } /* Name.Exception */
.highlight .nf { color: #0000FF } /* Name.Function */
.highlight .nl { color: #767600 } /* Name.Label */
.highlight .nn { color: #0000FF; font-weight: bold } /* Name.Namespace */
.highlight .nt { color: #008000; font-weight: bold } /* Name.Tag */
.highlight .nv { color: #19177C } /* Name.Variable */
.highlight .ow { color: #AA22FF; font-weight: bold } /* Operator.Word */
.highlight .w { color: #bbbbbb } /* Text.Whitespace */
.highlight .mb { color: #666666 } /* Literal.Number.Bin */
.highlight .mf { color: #666666 } /* Literal.Number.Float */
.highlight .mh { color: #666666 } /* Literal.Number.Hex */
.highlight .mi { color: #666666 } /* Literal.Number.Integer */
.highlight .mo { color: #666666 } /* Literal.Number.Oct */
.highlight .sa { color: #BA2121 } /* Literal.String.Affix */
.highlight .sb { color: #BA2121 } /* Literal.String.Backtick */
.highlight .sc { color: #BA2121 } /* Literal.String.Char */
.highlight .dl { color: #BA2121 } /* Literal.String.Delimiter */
.highlight .sd { color: #BA2121; font-style: italic } /* Literal.String.Doc */
.highlight .s2 { color: #BA2121 } /* Literal.String.Double */
.highlight .se { color: #AA5D1F; font-weight: bold } /* Literal.String.Escape */
.highlight .sh { color: #BA2121 } /* Literal.String.Heredoc */
.highlight .si { color: #A45A77; font-weight: bold } /* Literal.String.Interpol */
.highlight .sx { color: #008000 } /* Literal.String.Other */
.highlight .sr { color: #A45A77 } /* Literal.String.Regex */
.highlight .s1 { color: #BA2121 } /* Literal.String.Single */
.highlight .ss { color: #19177C } /* Literal.String.Symbol */
.highlight .bp { color: #008000 } /* Name.Builtin.Pseudo */
.highlight .fm { color: #0000FF } /* Name.Function.Magic */
.highlight .vc { color: #19177C } /* Name.Variable.Class */
.highlight .vg { color: #19177C } /* Name.Variable.Global */
.highlight .vi { color: #19177C } /* Name.Variable.Instance */
.highlight .vm { color: #19177C } /* Name.Variable.Magic */
.highlight .il { color: #666666 } /* Literal.Number.Integer.Long */
"""
