#!/bin/bash

# Cross-Request 插件测试服务器启动脚本
# 使用方法: ./start.sh [端口号]

# 设置默认端口
PORT=${1:-8000}

echo "🚀 Cross-Request 插件测试服务器"
echo "=================================="
echo ""

# 检查端口是否被占用
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
    echo "❌ 端口 $PORT 已被占用"
    echo "💡 请尝试使用其他端口: ./start.sh 3000"
    echo "💡 或停止占用该端口的进程"
    exit 1
fi

# 检查 Python 版本并启动服务器
if command -v python3 &> /dev/null; then
    echo "✅ 使用 Python 3 启动服务器"
    echo "📍 服务器地址: http://localhost:$PORT"
    echo "🧪 测试页面: http://localhost:$PORT/test.html"
    echo ""
    echo "💡 提示: 按 Ctrl+C 停止服务器"
    echo "=================================="
    echo ""
    
    # 尝试自动打开浏览器（macOS）
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "🌐 正在打开浏览器..."
        sleep 2
        open "http://localhost:$PORT/test.html" 2>/dev/null &
    fi
    
    python3 -m http.server $PORT
    
elif command -v python &> /dev/null; then
    echo "✅ 使用 Python 2 启动服务器"
    echo "📍 服务器地址: http://localhost:$PORT"
    echo "🧪 测试页面: http://localhost:$PORT/test.html"
    echo ""
    echo "💡 提示: 按 Ctrl+C 停止服务器"
    echo "=================================="
    echo ""
    
    # 尝试自动打开浏览器（macOS）
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "🌐 正在打开浏览器..."
        sleep 2
        open "http://localhost:$PORT/test.html" 2>/dev/null &
    fi
    
    python -m SimpleHTTPServer $PORT
    
else
    echo "❌ 未找到 Python"
    echo ""
    echo "请安装 Python 后重试:"
    echo "• macOS: brew install python3"
    echo "• Ubuntu: sudo apt install python3"
    echo "• Windows: 从 python.org 下载安装"
    echo ""
    echo "或者使用 Node.js:"
    echo "• npm install -g http-server"
    echo "• http-server -p $PORT"
    exit 1
fi
