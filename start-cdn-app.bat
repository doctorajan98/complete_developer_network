@echo off
echo Starting Complete Developer Network Application...
echo.

echo Starting Backend API...
start "CDN Backend" cmd /k "cd /d "E:\Active Project\C# Projects\complete_developer_network\CDN.Presentation" && dotnet run"

echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak > nul

echo Starting React Frontend...
start "CDN Frontend" cmd /k "cd /d "E:\Active Project\C# Projects\complete_developer_network\cdn-frontend" && npm start"

echo.
echo Both applications are starting...
echo Backend will be available at: http://localhost:5238
echo Frontend will be available at: http://localhost:3000
echo.
echo Press any key to exit...
pause > nul
