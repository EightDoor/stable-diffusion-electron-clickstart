chcp 65001

@echo off

call environment.bat

cd %~dp0webui-directml

set PYTHON=
set GIT=
set VENV_DIR=
set COMMANDLINE_ARGS=--opt-sub-quad-attention --medvram --disable-nan-check --use-directml --update-check --update-all-extensions --reinstall-xformers --reinstall-torch
@REM 您可能不再需要 --lowvram 或 --medvram。
call webui.bat
