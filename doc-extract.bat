@echo off
@SETLOCAL
@SET PATHEXT=%PATHEXT:;.EXE;=;%
"%~dp0\antiword\antiword.exe" %*