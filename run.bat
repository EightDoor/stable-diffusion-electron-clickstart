chcp 65001

@echo off

call environment.bat

cd %~dp0webui
call webui-user.bat
