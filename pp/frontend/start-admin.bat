@echo off
echo Starting Admin Dashboard...
echo.
echo Step 1: Starting development server...
npm run dev
echo.
echo Step 2: Opening admin dashboard in browser...
timeout /t 3 /nobreak >nul
start http://localhost:5173/admin/login
echo.
echo Admin Dashboard is now accessible at:
echo http://localhost:5173/admin/login
echo.
echo Admin Credentials:
echo Email: admin@example.com
echo Password: admin123
echo.
pause 