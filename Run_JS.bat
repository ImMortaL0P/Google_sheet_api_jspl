@echo off
cd /d "C:\Users\kumar\Desktop\JSPL\EXCEL DUMP PRODUCTION FILES\Google_sheet_api"
node main.js
if %errorlevel% equ 0 (
) else (
    echo Failed to execute JavaScript.
)