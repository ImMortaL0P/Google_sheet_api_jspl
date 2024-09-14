@echo off
cd /d "C:\Users\kumar\Desktop\JSPL\EXCEL DUMP PRODUCTION FILES\Google_sheet_api"
C:\Users\kumar\PycharmProjects\FirstPy\venv\Scripts\python.exe SendEmail.py
if %errorlevel% equ 0 (

) else (
    echo Failed to execute Python script.
)
