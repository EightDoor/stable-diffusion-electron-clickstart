@echo off

call environment.bat

set COMMANDLINE_ARGS=--use-directml --update-check --update-all-extensions --reinstall-xformers --reinstall-torch

cd %~dp0webui

call webui-user.bat
