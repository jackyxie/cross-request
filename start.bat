@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

REM Cross-Request 插件测试服务器启动脚本 (Windows)
REM 使用方法: start.bat [端口号]

REM 设置默认端口
set PORT=%1
if "%PORT%"=="" set PORT=8000

echo 🚀 Cross-Request 插件测试服务器
echo ==================================
echo.

REM 检查端口是否被占用
netstat -an | find ":%PORT%" | find "LISTENING" >nul
if !errorlevel! == 0 (
    echo ❌ 端口 %PORT% 已被占用
    echo 💡 请尝试使用其他端口: start.bat 3000
    echo 💡 或停止占用该端口的进程
    pause
    exit /b 1
)

REM 检查 Python 版本并启动服务器
python --version >nul 2>&1
if !errorlevel! == 0 (
    echo ✅ 使用 Python 启动服务器
    echo 📍 服务器地址: http://localhost:%PORT%
    echo 🧪 测试页面: http://localhost:%PORT%/test.html
    echo.
    echo 💡 提示: 按 Ctrl+C 停止服务器
    echo ==================================
    echo.
    
    REM 尝试自动打开浏览器
    echo 🌐 正在打开浏览器...
    timeout /t 2 /nobreak >nul
    start "" "http://localhost:%PORT%/test.html" 2>nul
    
    python -m http.server %PORT%
) else (
    echo ❌ 未找到 Python
    echo.
    echo 请安装 Python 后重试:
    echo • 从 python.org 下载安装 Python
    echo • 安装时勾选 "Add Python to PATH"
    echo.
    echo 或者使用 Node.js:
    echo • npm install -g http-server
    echo • http-server -p %PORT%
    echo.
    pause
    exit /b 1
)

pause
