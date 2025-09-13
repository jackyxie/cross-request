# Cross-Request Chrome 扩展

<div align="center">

![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-brightgreen)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Version](https://img.shields.io/badge/Version-3.2-red)

> 原作者不再维护扩展程序，现采用Ai重新适配改写兼容新版chrome。

一个强大的跨域请求 Chrome 扩展，专为 YApi、Postman 等接口测试工具设计。

[安装指南](#安装方法) • [使用文档](#使用方法) • [API 参考](#api-参数说明) • [故障排除](#故障排除) • [开发指南](#开发说明)

</div>

## ✨ 功能特性

- 🌐 **跨域请求支持** - 绕过浏览器同源策略限制
- 🚀 **Manifest V3 兼容** - 支持最新 Chrome 扩展规范
- 📝 **多种请求方法** - 支持 GET、POST、PUT、DELETE、PATCH 等
- 🔧 **自定义请求头** - 支持 Authorization、Content-Type 等任意请求头
- 📊 **多种数据格式** - 支持 JSON、表单数据、文件上传等
- 🔄 **智能重连机制** - 自动处理扩展上下文失效问题
- 🎯 **YApi 优化** - 专为 YApi 接口测试工具优化
- 🛡️ **安全可靠** - 严格的权限控制和错误处理

## 🚀 快速开始

### 1. 安装插件

```bash
# 1. 下载或克隆项目
git clone https://github.com/jackyxie/cross-request.git
cd cross-request

# 2. 打开 Chrome 扩展页面
chrome://extensions/

# 3. 开启开发者模式，加载扩展文件夹
```

### 2. 启动测试服务器

由于浏览器安全限制，需要通过 HTTP 协议访问测试页面：

#### 方法一：Python 服务器（推荐）
```bash
# 进入项目目录
cd cross-request

# 启动服务器（选择适合的 Python 版本）
python3 -m http.server 8000        # Python 3.x
python -m SimpleHTTPServer 8000    # Python 2.x

# 看到以下输出表示启动成功：
# Serving HTTP on :: port 8000 (http://[::]:8000/) ...
```

#### 方法二：Node.js 服务器
```bash
# 安装并启动 http-server
npm install -g http-server
http-server -p 8000

# 或使用 npx（无需全局安装）
npx http-server -p 8000
```

#### 方法三：一键启动脚本
```bash
# Linux/macOS 用户
./start.sh          # 使用默认端口 8000
./start.sh 3000     # 使用指定端口 3000

# Windows 用户
start.bat           # 使用默认端口 8000
start.bat 3000      # 使用指定端口 3000

# 脚本会自动：
# ✅ 检测 Python 版本
# ✅ 检查端口占用
# ✅ 启动服务器
# ✅ 打开浏览器（macOS/Windows）
```

#### 方法四：VS Code Live Server
```bash
# 1. 安装 VS Code 扩展 "Live Server"
# 2. 右键点击 test.html 文件
# 3. 选择 "Open with Live Server"
# 4. 自动在浏览器中打开
```

### 3. 访问测试页面

```bash
# 在浏览器中访问以下地址：
http://localhost:8000/test.html

# 🎯 预期结果：
# ✅ 页面顶部显示绿色提示："插件已正确加载"
# ✅ 控制台显示："crossRequest 函数已成功加载"
# ✅ 四个测试按钮可以正常点击和响应
```

### 4. 功能测试

点击测试页面上的按钮验证功能：

```javascript
// 测试 1: GET 请求
// 预期：返回 httpbin.org 的 JSON 响应

// 测试 2: POST 请求  
// 预期：显示提交的表单数据

// 测试 3: 自定义请求头
// 预期：显示包含自定义头部的响应

// 测试 4: JSON 数据
// 预期：显示 JSON 格式的请求响应
```

### 5. 在项目中使用

```html
<!DOCTYPE html>
<html>
<head>
    <title>我的项目</title>
</head>
<body>
    <!-- 必需：添加标识元素 -->
    <div id="cross-request-sign" style="display: none;"></div>
    
    <script>
    // 发起跨域请求
    crossRequest({
        url: 'https://api.example.com/data',
        method: 'GET',
        success: function(response) {
            console.log('成功:', response);
        },
        error: function(error) {
            console.log('失败:', error);
        }
    });
    </script>
</body>
</html>
```

### 🚨 常见问题快速解决

#### 问题：页面显示"函数未找到"
```bash
# 解决方案：
# 1. 确保通过 HTTP 协议访问（不是 file:// 协议）
http://localhost:8000/test.html  ✅ 正确
file:///path/to/test.html        ❌ 错误

# 2. 检查插件是否已启用
chrome://extensions/ -> 确认插件状态为"已启用"

# 3. 重新加载插件
chrome://extensions/ -> 点击插件的刷新按钮
```

#### 问题：端口被占用
```bash
# 更换端口号
python3 -m http.server 3000  # 使用 3000 端口
python3 -m http.server 9000  # 使用 9000 端口

# 访问新端口
http://localhost:3000/test.html
```

### 📋 验证清单

- [ ] 插件已安装并启用
- [ ] 本地服务器正在运行
- [ ] 通过 HTTP 协议访问测试页面
- [ ] 页面显示绿色成功提示
- [ ] 至少一个测试按钮返回正确结果

**🎉 完成以上步骤后，您就可以开始使用 Cross-Request 插件了！**

> 💡 **提示**：查看 [QUICK_START.md](QUICK_START.md) 获取更详细的快速开始指南。

## 📋 版本更新

### v3.2 (当前版本) - Manifest V3 兼容版本

#### 🎉 新特性
- ✅ **完全兼容 Manifest V3** - 支持最新 Chrome 版本
- ✅ **Service Worker 架构** - 替代传统 Background Scripts
- ✅ **Fetch API 支持** - 替代 XMLHttpRequest，更现代化
- ✅ **Chrome Storage API** - 替代 localStorage，更安全

#### 🔧 技术改进
- ✅ **智能重连机制** - 自动处理扩展上下文失效
- ✅ **增强错误处理** - 更好的错误恢复和用户反馈
- ✅ **后备方案** - Content Script 直接请求作为备选
- ✅ **性能优化** - 减少内存占用和 CPU 使用

#### 🐛 问题修复
- ✅ 修复扩展上下文失效导致的连接断开
- ✅ 修复 Service Worker 中 XMLHttpRequest 不可用
- ✅ 修复权限配置不兼容新规范
- ✅ 修复脚本注入时序问题

### v3.1 (历史版本)
- 原始 Manifest V2 版本
- 基础跨域请求功能

## 🛠️ 安装方法

### 开发者模式安装（推荐）

1. **下载扩展**
   ```bash
   git clone https://github.com/your-repo/cross-request.git
   cd cross-request
   ```

2. **安装到 Chrome**
   - 打开 Chrome 浏览器
   - 访问 `chrome://extensions/`
   - 开启右上角的"开发者模式"
   - 点击"加载已解压的扩展程序"
   - 选择项目文件夹
   - 确认扩展已成功加载

3. **验证安装**
   - 扩展图标出现在工具栏
   - 点击图标可打开配置弹窗
   - 扩展状态显示为"已启用"

### 本地服务器设置

由于浏览器安全限制，测试页面需要通过 HTTP/HTTPS 协议访问：

```bash
# 使用 Python 启动本地服务器
cd cross-request
python3 -m http.server 8000

# 访问测试页面
http://localhost:8000/test.html
```

## 📖 使用方法

### 基本用法

#### 1. 页面准备
```html
<!DOCTYPE html>
<html>
<head>
    <title>Cross-Request 示例</title>
</head>
<body>
    <!-- 必需：添加标识元素 -->
    <div id="cross-request-sign" style="display: none;"></div>
    
    <script>
        // 您的代码...
    </script>
</body>
</html>
```

#### 2. GET 请求
```javascript
crossRequest({
    url: 'https://httpbin.org/get',
    method: 'GET',
    headers: {
        'User-Agent': 'Cross-Request/3.2'
    },
    success: function(response, headers, data) {
        console.log('响应数据:', response);
        console.log('响应头:', headers);
        console.log('请求信息:', data);
    },
    error: function(error, headers, data) {
        console.error('请求失败:', error);
    }
});
```

#### 3. POST 请求 (JSON)
```javascript
    crossRequest({
    url: 'https://httpbin.org/post',
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your-token'
        },
        data: {
        name: 'John Doe',
        email: 'john@example.com',
        settings: {
            theme: 'dark',
            notifications: true
        }
    },
    success: function(response) {
        console.log('创建成功:', JSON.parse(response));
    },
    error: function(error) {
        console.error('创建失败:', error);
    }
});
```

#### 4. POST 请求 (表单数据)
```javascript
crossRequest({
    url: 'https://httpbin.org/post',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
        username: 'admin',
        password: '123456',
        remember: 'true'
    },
    success: function(response) {
        console.log('登录成功:', response);
    }
});
```

#### 5. 文件上传
```html
<!-- HTML 文件输入 -->
<input type="file" id="fileInput" />
<button onclick="uploadFile()">上传文件</button>

<script>
function uploadFile() {
    crossRequest({
        url: 'https://httpbin.org/post',
        method: 'POST',
        data: {
            description: '文件描述',
            category: 'image'
        },
        files: {
            file: 'fileInput' // 对应 input 元素的 ID
        },
        success: function(response) {
            console.log('上传成功:', response);
        },
        error: function(error) {
            console.error('上传失败:', error);
        }
    });
}
</script>
```

#### 6. 带查询参数的请求
```javascript
crossRequest({
    url: 'https://httpbin.org/get',
    method: 'GET',
    query: {
        page: 1,
        limit: 10,
        sort: 'created_at',
        order: 'desc'
    },
    success: function(response) {
        console.log('查询结果:', response);
    }
});
```

### 高级用法

#### 超时设置
```javascript
crossRequest({
    url: 'https://slow-api.example.com/data',
    method: 'GET',
    timeout: 5000, // 5秒超时
    success: function(response) {
        console.log('响应:', response);
    },
    error: function(error) {
        if (error.includes('timeout')) {
            console.log('请求超时');
        }
    }
});
```

#### 错误处理
```javascript
crossRequest({
    url: 'https://api.example.com/data',
    method: 'GET',
    success: function(response, headers, data) {
        try {
            const result = JSON.parse(response);
            if (result.code === 0) {
                console.log('业务成功:', result.data);
            } else {
                console.log('业务错误:', result.message);
            }
        } catch (e) {
            console.log('响应解析失败:', e);
        }
    },
    error: function(error, headers, data) {
        console.error('网络错误:', error);
        // 可以根据 headers 中的状态码进行不同处理
        if (data && data.status === 401) {
            console.log('需要重新登录');
        }
    }
});
```

### 域名配置

1. **打开配置界面**
   - 点击浏览器工具栏中的扩展图标
   - 在弹出窗口中管理允许的域名

2. **添加域名**
   - 输入需要支持跨域的域名
   - 支持通配符 `*` 匹配所有域名
   - 支持具体域名如 `api.example.com`

3. **默认配置**
   - 默认允许所有域名 (`*`)
   - 可以根据需要限制特定域名

## 📚 API 参数说明

### crossRequest(options)

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `url` | String | ✅ | - | 请求地址 |
| `method` | String | ❌ | `'GET'` | 请求方法 (GET/POST/PUT/DELETE/PATCH等) |
| `headers` | Object | ❌ | `{}` | 自定义请求头 |
| `data` | Object/String | ❌ | - | 请求数据 |
| `query` | Object | ❌ | - | URL 查询参数 |
| `files` | Object | ❌ | - | 文件上传配置 |
| `timeout` | Number | ❌ | `1000000` | 超时时间(毫秒) |
| `success` | Function | ❌ | - | 成功回调函数 |
| `error` | Function | ❌ | - | 失败回调函数 |

### 回调函数参数

#### success(response, headers, data)
- `response`: 响应体内容 (字符串)
- `headers`: 响应头对象
- `data`: 请求相关信息 (包含请求时间等)

#### error(error, headers, data)
- `error`: 错误信息 (字符串)
- `headers`: 响应头对象 (如果有)
- `data`: 请求相关信息

### 支持的请求头

插件支持设置任意请求头，包括但不限于：

- `Authorization`: 认证信息
- `Content-Type`: 内容类型
- `User-Agent`: 用户代理
- `Accept`: 接受的内容类型
- `X-*`: 自定义头部
- 其他标准和非标准 HTTP 头部

## 🔧 故障排除

### 常见问题

#### 1. 插件无法加载
**症状**: 扩展页面显示错误或无法安装

**解决方案**:
```bash
# 检查文件完整性
ls -la cross-request/
# 应该包含: manifest.json, background.js, response.js, index.js 等

# 检查 manifest.json 语法
cat manifest.json | python -m json.tool

# 重新加载插件
chrome://extensions/ -> 点击刷新按钮
```

#### 2. crossRequest 函数未定义
**症状**: 控制台显示 `crossRequest is not defined`

**解决方案**:
1. **检查页面标识元素**
   ```html
   <div id="cross-request-sign" style="display: none;"></div>
   ```

2. **确保通过 HTTP/HTTPS 访问**
   ```bash
   # 错误: file:///path/to/test.html
   # 正确: http://localhost:8000/test.html
   ```

3. **检查插件状态**
   ```javascript
   // 在控制台执行
   console.log('crossRequest available:', typeof crossRequest !== 'undefined');
   ```

#### 3. 扩展上下文失效
**症状**: 控制台显示 `Extension context invalidated`

**解决方案**:
- 插件会自动重连，无需手动处理
- 如果问题持续，重新加载插件
- 检查 Service Worker 状态: `chrome://extensions/` -> 检查视图 -> Service Worker

#### 4. 跨域请求被阻止
**症状**: 请求返回 CORS 错误

**解决方案**:
1. **检查域名配置**
   - 点击插件图标
   - 确认目标域名在允许列表中

2. **检查网络连接**
   ```bash
   # 测试目标 URL 是否可访问
   curl -I https://api.example.com/test
   ```

3. **查看详细错误**
   ```javascript
   crossRequest({
       url: 'https://api.example.com/test',
       method: 'GET',
       error: function(error, headers, data) {
           console.log('Error:', error);
           console.log('Headers:', headers);
           console.log('Status:', data.status);
       }
   });
   ```

### 调试技巧

#### 1. 启用详细日志
```javascript
// 在控制台执行，启用详细日志
localStorage.setItem('cross-request-debug', 'true');
```

#### 2. 检查 Service Worker
```bash
# 1. 访问 chrome://extensions/
# 2. 找到 Cross-Request 插件
# 3. 点击 "检查视图" -> "Service Worker"
# 4. 查看控制台输出
```

#### 3. 网络面板调试
```bash
# 1. 按 F12 打开开发者工具
# 2. 切换到 "Network" 标签页
# 3. 发起请求，观察网络活动
# 4. 检查请求头和响应
```

## 🏗️ 技术架构

### 整体架构
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Web Page      │    │  Content Script  │    │ Service Worker  │
│                 │    │                  │    │                 │
│ ┌─────────────┐ │    │ ┌──────────────┐ │    │ ┌─────────────┐ │
│ │crossRequest │ │───▶│ │ response.js  │ │───▶│ │background.js│ │
│ │   API       │ │    │ │              │ │    │ │             │ │
│ └─────────────┘ │    │ └──────────────┘ │    │ └─────────────┘ │
│                 │    │        │         │    │        │        │
│ ┌─────────────┐ │    │ ┌──────▼──────┐ │    │ ┌──────▼──────┐ │
│ │   index.js  │◀│────│ │   inject    │ │    │ │ Fetch API   │ │
│ │ (injected)  │ │    │ │   script    │ │    │ │   Request   │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### 核心组件

#### 1. Manifest V3 配置
```json
{
    "manifest_version": 3,
    "permissions": ["storage", "declarativeNetRequest"],
    "host_permissions": ["<all_urls>"],
    "background": {
        "service_worker": "background.js"
    },
    "content_scripts": [{
        "matches": ["http://*/*", "https://*/*"],
        "js": ["response.js"]
    }]
}
```

#### 2. Service Worker (background.js)
- 使用 Fetch API 处理跨域请求
- 支持各种 HTTP 方法和请求头
- 自动处理超时和错误恢复
- Chrome Storage API 数据持久化

#### 3. Content Script (response.js)
- 注入 index.js 到页面
- 建立与 Service Worker 的通信
- 智能重连和错误处理
- 后备方案支持

#### 4. 注入脚本 (index.js)
- 提供 crossRequest API
- DOM 监控和初始化
- 请求队列管理
- 响应数据处理

### 数据流程

1. **请求发起**: 页面调用 `crossRequest()` 函数
2. **数据传递**: index.js → response.js → background.js
3. **网络请求**: Service Worker 使用 Fetch API 发起请求
4. **响应处理**: 响应数据逆向传递回页面
5. **回调执行**: 执行 success 或 error 回调函数

## 🔧 开发说明

### 项目结构
```
cross-request/
├── 📄 manifest.json          # 扩展配置文件 (Manifest V3)
├── 🔧 background.js          # Service Worker 后台脚本
├── 📱 popup.html             # 扩展弹窗界面
├── 📱 popup.js               # 弹窗逻辑脚本
├── 📜 response.js            # Content Script 内容脚本
├── 📜 index.js               # 注入到页面的脚本
├── 🧪 test.html              # 功能测试页面
├── 📚 README.md              # 主要说明文档
├── 🚀 QUICK_START.md         # 快速开始指南
├── 🔧 INSTALL_DEBUG.md       # 安装调试指南
├── 🎨 icon.png               # 扩展图标
├── 📦 jquery-3.1.1.js        # jQuery 库文件
├── 🖥️ start.sh               # Linux/macOS 启动脚本
└── 🖥️ start.bat              # Windows 启动脚本
```

### 开发环境设置

#### 1. 克隆项目
```bash
git clone https://github.com/your-repo/cross-request.git
cd cross-request
```

#### 2. 安装开发工具
```bash
# 安装 Chrome 扩展开发工具 (可选)
npm install -g chrome-extension-cli

# 启动本地服务器进行测试
python3 -m http.server 8000
```

#### 3. 加载到 Chrome
```bash
# 1. 打开 chrome://extensions/
# 2. 开启开发者模式
# 3. 点击"加载已解压的扩展程序"
# 4. 选择项目文件夹
```

### 调试方法

#### 1. Service Worker 调试
```bash
# 访问 chrome://extensions/
# 找到插件 -> 检查视图 -> Service Worker
# 在控制台中可以看到后台脚本的日志
```

#### 2. Content Script 调试
```bash
# 在任意网页按 F12
# Sources -> Content Scripts -> response.js
# 可以设置断点和查看变量
```

#### 3. 页面脚本调试
```bash
# 在测试页面按 F12
# Console 标签页查看 crossRequest 相关日志
# Network 标签页查看实际的网络请求
```

### 代码规范

#### JavaScript 规范
```javascript
// 使用 ES5 语法保证兼容性
// 变量命名使用驼峰式
var requestData = {};

// 函数命名清晰明确
function sendAjaxRequest(options) {
    // 函数实现
}

// 错误处理要完整
try {
    // 可能出错的代码
} catch (error) {
    console.error('Error:', error);
    // 错误恢复逻辑
}
```

#### 注释规范
```javascript
/**
 * 发送跨域请求
 * @param {Object} req - 请求配置对象
 * @param {Function} successFn - 成功回调函数
 * @param {Function} errorFn - 失败回调函数
 */
function sendAjax(req, successFn, errorFn) {
    // 函数实现
}
```

### 测试指南

#### 1. 单元测试
```javascript
// 测试 crossRequest 函数是否正确定义
console.assert(typeof crossRequest === 'function', 'crossRequest should be a function');

// 测试基本 GET 请求
crossRequest({
    url: 'https://httpbin.org/get',
    method: 'GET',
    success: function(response) {
        console.log('✅ GET 请求测试通过');
    },
    error: function(error) {
        console.error('❌ GET 请求测试失败:', error);
    }
});
```

#### 2. 集成测试
使用 `test.html` 进行完整的功能测试：
- GET/POST 请求测试
- 自定义请求头测试
- 文件上传测试
- 错误处理测试

#### 3. 兼容性测试
- Chrome 88+ 版本测试
- 不同操作系统测试
- HTTP/HTTPS 协议测试

## 📈 性能优化

### 内存管理
- 自动清理过期的回调函数
- 页面卸载时断开连接
- 避免内存泄漏

### 网络优化
- 智能重连机制
- 请求超时控制
- 错误重试策略

### 用户体验
- 详细的错误提示
- 实时的连接状态反馈
- 优雅的降级方案

## 🤝 贡献指南

### 报告问题
1. 在 GitHub 上创建 Issue
2. 提供详细的错误信息和复现步骤
3. 包含浏览器版本和操作系统信息

### 提交代码
1. Fork 项目到您的 GitHub
2. 创建功能分支: `git checkout -b feature/new-feature`
3. 提交更改: `git commit -am 'Add new feature'`
4. 推送分支: `git push origin feature/new-feature`
5. 创建 Pull Request

### 开发规范
- 遵循现有的代码风格
- 添加适当的注释和文档
- 确保向后兼容性
- 添加相应的测试用例

## 📋 更新日志

### v3.2.1 (计划中)
- [ ] 支持 WebSocket 跨域连接
- [ ] 添加请求缓存机制
- [ ] 优化大文件上传性能
- [ ] 增加更多的错误类型处理

### v3.2.0 (当前版本) - 2024-09-13
- ✅ 完全兼容 Manifest V3 规范
- ✅ 使用 Service Worker 替代 Background Scripts
- ✅ 使用 Fetch API 替代 XMLHttpRequest
- ✅ 添加智能重连和错误恢复机制
- ✅ 改进用户界面和错误提示
- ✅ 优化性能和内存使用

### v3.1.0 - 2023-12-01
- ✅ 基础跨域请求功能
- ✅ 支持多种请求方法和数据格式
- ✅ YApi 集成优化
- ✅ 基本的错误处理

## 🔗 相关链接

- **GitHub 仓库**: [https://github.com/jackyxie/cross-request](https://github.com/jackyxie/cross-request)
- **问题反馈**: [https://github.com/jackyxie/cross-request/issues](https://github.com/jackyxie/cross-request/issues)
- **YApi 官网**: [https://hellosean1025.github.io/yapi/](https://hellosean1025.github.io/yapi/)

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。

```
MIT License

Copyright (c) 2024 Cross-Request

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">

**如果这个项目对您有帮助，请给我们一个 ⭐ Star！**

</div>