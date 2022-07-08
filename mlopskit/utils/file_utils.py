from urllib.parse import unquote
from urllib.request import pathname2url
import posixpath
import os
import sys

import tarfile
import gzip
import tempfile
import errno

def relative_path_to_artifact_path(path):
    if os.path == posixpath:
        return path
    if os.path.abspath(path) == path:
        raise Exception("This method only works with relative paths.")
    return unquote(pathname2url(path))

def make_tarfile(output_filename, source_dir, archive_name, custom_filter=None):
    # Helper for filtering out modification timestamps
    def _filter_timestamps(tar_info):
        tar_info.mtime = 0
        return tar_info if custom_filter is None else custom_filter(tar_info)

    unzipped_file_handle, unzipped_filename = tempfile.mkstemp()
    try:
        with tarfile.open(unzipped_filename, "w") as tar:
            tar.add(source_dir, arcname=archive_name, filter=_filter_timestamps)
        # When gzipping the tar, don't include the tar's filename or modification time in the
        # zipped archive (see https://docs.python.org/3/library/gzip.html#gzip.GzipFile)
        with gzip.GzipFile(
            filename="", fileobj=open(output_filename, "wb"), mode="wb", mtime=0
        ) as gzipped_tar, open(unzipped_filename, "rb") as tar:
            gzipped_tar.write(tar.read())
    finally:
        os.close(unzipped_file_handle)
        
        
#make_tarfile(
#        output_filename='dd.tar.gz', source_dir='0', archive_name="some-archive"
#    )

def is_directory(name):
    return os.path.isdir(name)


def is_file(name):
    return os.path.isfile(name)


def exists(name):
    return os.path.exists(name)

def list_all(root, filter_func=lambda x: True, full_path=False):
    """
    List all entities directly under 'dir_name' that satisfy 'filter_func'
    :param root: Name of directory to start search
    :param filter_func: function or lambda that takes path
    :param full_path: If True will return results as full path including `root`
    :return: list of all files or directories that satisfy the criteria.
    """
    if not is_directory(root):
        raise Exception("Invalid parent directory '%s'" % root)
    matches = [x for x in os.listdir(root) if filter_func(os.path.join(root, x))]
    return [os.path.join(root, m) for m in matches] if full_path else matches


def list_subdirs(dir_name, full_path=False):
    """
    Equivalent to UNIX command:
      ``find $dir_name -depth 1 -type d``
    :param dir_name: Name of directory to start search
    :param full_path: If True will return results as full path including `root`
    :return: list of all directories directly under 'dir_name'
    """
    return list_all(dir_name, os.path.isdir, full_path)


def list_files(dir_name, full_path=False):
    """
    Equivalent to UNIX command:
      ``find $dir_name -depth 1 -type f``
    :param dir_name: Name of directory to start search
    :param full_path: If True will return results as full path including `root`
    :return: list of all files directly under 'dir_name'
    """
    return list_all(dir_name, os.path.isfile, full_path)


def find(root, name, full_path=False):
    """
    Search for a file in a root directory. Equivalent to:
      ``find $root -name "$name" -depth 1``
    :param root: Name of root directory for find
    :param name: Name of file or directory to find directly under root directory
    :param full_path: If True will return results as full path including `root`
    :return: list of matching files or directories
    """
    path_name = os.path.join(root, name)
    return list_all(root, lambda x: x == path_name, full_path)


def path_to_local_sqlite_uri(path):
    """
    Convert local filesystem path to sqlite uri.
    """
    path = posixpath.abspath(pathname2url(os.path.abspath(path)))
    prefix = "sqlite://" if sys.platform == "win32" else "sqlite:///"
    return prefix + path

def is_directory(name):
    return os.path.isdir(name)


def is_file(name):
    return os.path.isfile(name)

def exists(name):
    return os.path.exists(name)

def mkdir(root, name=None):
    """
    Make directory with name "root/name", or just "root" if name is None.
    :param root: Name of parent directory
    :param name: Optional name of leaf directory
    :return: Path to created directory
    """
    target = os.path.join(root, name) if name is not None else root
    try:
        os.makedirs(target)
    except OSError as e:
        if e.errno != errno.EEXIST or not os.path.isdir(target):
            raise e
    return target


def make_containing_dirs(path):
    """
    Create the base directory for a given file path if it does not exist; also creates parent
    directories.
    """
    dir_name = os.path.dirname(path)
    if not os.path.exists(dir_name):
        os.makedirs(dir_name)