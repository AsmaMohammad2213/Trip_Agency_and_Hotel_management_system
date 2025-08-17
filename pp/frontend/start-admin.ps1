Write-Host "🏢 Starting Admin Dashboard..." -ForegroundColor Green
Write-Host ""

Write-Host "Step 1: Starting development server..." -ForegroundColor Yellow
Write-Host "Server will start on http://localhost:5173" -ForegroundColor Cyan
Write-Host ""

# Start the development server
npm run dev

Write-Host ""
Write-Host "Step 2: Opening admin dashboard in browser..." -ForegroundColor Yellow

# Wait a moment for server to start
Start-Sleep -Seconds 3

# Open the admin login page
Start-Process "http://localhost:5173/admin/login"

Write-Host ""
Write-Host "✅ Admin Dashboard is now accessible!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Admin Credentials:" -ForegroundColor Cyan
Write-Host "   Email: admin@example.com" -ForegroundColor White
Write-Host "   Password: admin123" -ForegroundColor White
Write-Host ""
Write-Host "🔗 Quick Links:" -ForegroundColor Cyan
Write-Host "   Admin Login: http://localhost:5173/admin/login" -ForegroundColor White
Write-Host "   Test Component: http://localhost:5173/admin-test" -ForegroundColor White
Write-Host "   Main Website: http://localhost:5173/" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 