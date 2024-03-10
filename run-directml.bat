@echo off

@REM set DIR=%~dp0system

@REM set PATH=%DIR%\git\bin;%DIR%\python;%DIR%\python\Scripts;%PATH%
@REM set PY_LIBS=%DIR%\python\Scripts\Lib;%DIR%\python\Scripts\Lib\site-packages
@REM set PY_PIP=%DIR%\python\Scripts
@REM set SKIP_VENV=1
@REM set PIP_INSTALLER_LOCATION=%DIR%\python\get-pip.py
@REM set TRANSFORMERS_CACHE=%DIR%\transformers-cache


@REM call environment.bat

cd %~dp0webui-directml

set PYTHON=
set GIT=
set VENV_DIR=
set COMMANDLINE_ARGS=--opt-sub-quad-attention --medvram --disable-nan-check --use-directml --update-check --update-all-extensions --reinstall-xformers --reinstall-torch
@REM 您可能不再需要 --lowvram 或 --medvram。
call webui.bat
