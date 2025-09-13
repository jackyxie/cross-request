# 🚀 Cross-Request 快速开始指南

本指南将帮助您在 5 分钟内完成插件安装和功能测试。

## 📋 准备工作

### 系统要求
- Chrome 88+ 浏览器
- 支持命令行操作（Windows/macOS/Linux）

### 检查 Chrome 版本
```bash
# 打开 Chrome，访问 chrome://version/ 查看版本号
# 或在地址栏输入：chrome://version/
```

## ⚡ 一键启动测试

### 方法一：Python 服务器（推荐）

```bash
# 1. 进入项目目录
cd /Users/xym/IdeaProjects/cross-request

# 2. 启动服务器（选择一个命令）
python3 -m http.server 8000        # Python 3.x
python -m SimpleHTTPServer 8000    # Python 2.x

# 3. 打开浏览器访问
# http://localhost:8000/test.html
```

### 方法二：Node.js 服务器

```bash
# 1. 全局安装 http-server
npm install -g http-server

# 2. 启动服务器
cd /Users/xym/IdeaProjects/cross-request
http-server -p 8000

# 3. 访问测试页面
# http://localhost:8000/test.html
```

### 方法三：使用 npx（无需安装）

```bash
# 1. 进入项目目录
cd /Users/xym/IdeaProjects/cross-request

# 2. 启动服务器
npx http-server -p 8000

# 3. 访问测试页面
# http://localhost:8000/test.html
```

### 方法四：VS Code Live Server

```bash
# 1. 安装 VS Code 扩展 "Live Server"
# 2. 右键点击 test.html 文件
# 3. 选择 "Open with Live Server"
# 4. 自动在浏览器中打开测试页面
```

## 🔧 插件安装步骤

### 1. 快速安装
```bash
# 打开 Chrome 扩展页面
chrome://extensions/

# 或者使用快捷键：
# Windows/Linux: Ctrl + Shift + Delete 然后选择扩展
# macOS: Cmd + Shift + Delete 然后选择扩展
```

### 2. 加载插件
1. **开启开发者模式**：点击右上角的开关
2. **加载扩展**：点击"加载已解压的扩展程序"
3. **选择文件夹**：选择 `cross-request` 项目文件夹
4. **确认安装**：插件出现在扩展列表中

### 3. 验证安装
- ✅ 扩展图标出现在浏览器工具栏
- ✅ 点击图标可以打开配置弹窗
- ✅ 扩展状态显示为"已启用"

## 🧪 测试页面使用

### 访问测试页面
```bash
# 确保服务器正在运行，然后访问：
http://localhost:8000/test.html
```

### 预期结果
1. **成功加载**：页面顶部显示绿色提示
   ```
   🎉 成功: Cross-Request 插件已正确加载，可以开始测试。
   ```

2. **控制台输出**：按 F12 查看控制台，应该看到：
   ```javascript
   cross-request-sign element found: true
   扩展连接已建立
   ✅ crossRequest 函数已成功加载
   ```

3. **测试按钮**：页面上有四个测试按钮可以点击

### 测试功能

#### 1. 测试 GET 请求
```bash
# 点击 "测试 GET 请求" 按钮
# 预期结果：显示 httpbin.org 的响应数据
```

#### 2. 测试 POST 请求
```bash
# 点击 "测试 POST 请求" 按钮
# 预期结果：显示提交的表单数据和服务器响应
```

#### 3. 测试自定义头
```bash
# 点击 "测试自定义头" 按钮
# 预期结果：显示包含自定义请求头的响应
```

#### 4. 测试 JSON 请求
```bash
# 点击 "测试 JSON 请求" 按钮
# 预期结果：显示 JSON 格式的请求和响应数据
```

## 🐛 常见问题快速解决

### 问题1：页面显示红色警告
```
⚠️ 警告: crossRequest 函数未找到
```

**快速解决**：
```bash
# 1. 检查插件是否已安装并启用
chrome://extensions/

# 2. 确保通过 HTTP 协议访问（不是 file:// 协议）
http://localhost:8000/test.html  # ✅ 正确
file:///path/to/test.html        # ❌ 错误

# 3. 重新加载插件
chrome://extensions/ -> 点击插件的刷新按钮
```

### 问题2：服务器启动失败
```
Address already in use
```

**快速解决**：
```bash
# 更换端口号
python3 -m http.server 3000  # 使用 3000 端口
python3 -m http.server 9000  # 使用 9000 端口

# 或者停止占用 8000 端口的进程
lsof -ti:8000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :8000   # Windows 查看进程
```

### 问题3：测试请求失败
```
Network Error 或 CORS Error
```

**快速解决**：
```bash
# 1. 检查网络连接
ping httpbin.org

# 2. 检查插件配置
# 点击插件图标，确认域名配置正确

# 3. 重新加载页面和插件
Ctrl+F5 刷新页面
chrome://extensions/ -> 重新加载插件
```

## 📱 移动端测试（可选）

### 使用 Chrome 移动端
```bash
# 1. 启动服务器时绑定所有接口
python3 -m http.server 8000 --bind 0.0.0.0

# 2. 查看本机 IP 地址
ipconfig getifaddr en0  # macOS
ip addr show            # Linux
ipconfig               # Windows

# 3. 在手机浏览器访问
http://192.168.1.100:8000/test.html  # 替换为实际 IP
```

## ⚡ 一键脚本

### macOS/Linux 一键启动脚本

创建 `start.sh` 文件：
```bash
#!/bin/bash
echo "🚀 启动 Cross-Request 测试服务器..."

# 检查 Python 版本
if command -v python3 &> /dev/null; then
    echo "✅ 使用 Python 3"
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "✅ 使用 Python 2"
    python -m SimpleHTTPServer 8000
else
    echo "❌ 未找到 Python，请先安装 Python"
    exit 1
fi
```

使用方法：
```bash
chmod +x start.sh
./start.sh
```

### Windows 一键启动脚本

创建 `start.bat` 文件：
```batch
@echo off
echo 🚀 启动 Cross-Request 测试服务器...

python --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ 使用 Python
    python -m http.server 8000
) else (
    echo ❌ 未找到 Python，请先安装 Python
    pause
)
```

使用方法：
```batch
双击 start.bat 文件
```

## 🎯 快速验证清单

完成以下步骤确保一切正常：

- [ ] **插件安装**：chrome://extensions/ 中看到 Cross-Request 插件
- [ ] **服务器启动**：命令行显示 "Serving HTTP on..."
- [ ] **页面访问**：http://localhost:8000/test.html 可以正常打开
- [ ] **插件加载**：页面显示绿色成功提示
- [ ] **功能测试**：至少一个测试按钮返回正确结果
- [ ] **控制台检查**：F12 控制台没有红色错误信息

## 🆘 获取帮助

如果遇到问题，请按以下顺序检查：

1. **查看控制台**：F12 -> Console，查看详细错误信息
2. **检查网络**：F12 -> Network，查看请求是否发送成功
3. **重新加载**：刷新页面和重新加载插件
4. **重启服务器**：停止并重新启动本地服务器
5. **查看文档**：参考 [INSTALL_DEBUG.md](INSTALL_DEBUG.md) 获取详细调试信息

## 🎉 成功！

如果所有测试都通过，恭喜您已经成功安装并运行了 Cross-Request 插件！

现在您可以：
- 在自己的项目中使用 `crossRequest()` API
- 配置允许的域名列表
- 享受无障碍的跨域请求功能

---

**下一步**：查看 [README.md](README.md) 了解详细的 API 使用方法和高级功能。
