@echo off

set PYTHON=
set GIT=
set VENV_DIR=
set COMMANDLINE_ARGS=--use-directml --update-check --update-all-extensions --reinstall-xformers --reinstall-torch

call webui.bat
