# Cross-Request 插件安装和调试指南

## 🚀 安装步骤

### 1. 准备工作
确保您使用的是 Chrome 88+ 版本，支持 Manifest V3。

### 2. 安装插件
1. 打开 Chrome 浏览器
2. 在地址栏输入 `chrome://extensions/`
3. 开启右上角的"开发者模式"开关
4. 点击"加载已解压的扩展程序"按钮
5. 选择 `cross-request` 项目文件夹
6. 确认插件已成功加载（应该在扩展列表中看到 "cross-request" 插件）

### 3. 验证安装
- 插件图标应该出现在浏览器工具栏中
- 点击插件图标应该能打开配置弹窗
- 在 `chrome://extensions/` 中确认插件状态为"已启用"

## 🔧 调试步骤

### 1. 基本检查

#### 检查插件状态
```bash
# 在 chrome://extensions/ 页面确认：
✅ Cross-Request 插件已启用
✅ 插件版本为 3.2
✅ 没有错误提示
```

#### 检查文件访问
```bash
# 测试页面必须通过以下方式访问：
✅ http://localhost/test.html
✅ https://example.com/test.html
❌ file:///path/to/test.html  # 本地文件协议不支持
```

### 2. 浏览器控制台调试

#### 打开开发者工具
1. 在测试页面按 F12 或右键选择"检查"
2. 切换到 "Console" 标签页
3. 刷新页面查看调试信息

#### 预期的控制台输出
```javascript
// 正常情况下应该看到：
cross-request-sign element found: true
Document ready state: loading (或 interactive/complete)
Check #1: crossRequest available: false
Check #2: crossRequest available: false
...
Check #N: crossRequest available: true
✅ crossRequest 函数已成功加载
🔍 页面加载完成，开始检查插件状态...
✅ Chrome 扩展 API 可用
📦 扩展资源URL: chrome-extension://[id]/index.js
✅ crossRequest 函数已找到
```

### 3. 插件内部调试

#### 检查 Service Worker
1. 访问 `chrome://extensions/`
2. 找到 Cross-Request 插件
3. 点击"检查视图" -> "Service Worker"
4. 查看是否有错误信息

#### 检查 Content Script
1. 在测试页面按 F12
2. 切换到 "Sources" 标签页
3. 展开 "Content scripts"
4. 查找 "response.js" 文件
5. 确认脚本已正确加载

### 4. 权限检查

#### 确认必要权限
在 `chrome://extensions/` 中点击插件详情，确认以下权限：
- ✅ 存储权限
- ✅ 访问所有网站数据
- ✅ 声明式网络请求

## 🛠️ 常见问题解决

### 问题1: 插件无法加载
**症状**: 在扩展页面看到错误提示
**解决**:
1. 检查 manifest.json 语法是否正确
2. 确认所有引用的文件都存在
3. 重新加载插件

### 问题2: crossRequest 函数未定义
**症状**: 测试页面显示函数未找到
**解决**:
1. 确保页面通过 http/https 协议访问
2. 检查页面是否包含 `cross-request-sign` 元素
3. 等待更长时间让脚本完全加载
4. 检查浏览器控制台的详细错误信息

### 问题3: 跨域请求失败
**症状**: 请求返回错误或被阻止
**解决**:
1. 检查目标 URL 是否可访问
2. 确认插件配置中允许目标域名
3. 检查网络连接

### 问题4: 文件上传不工作
**症状**: 文件上传请求失败
**解决**:
1. 确认 HTML 中有正确的文件输入元素
2. 检查文件输入元素的 ID 是否正确
3. 验证目标服务器支持文件上传

## 📝 测试清单

使用以下清单确保插件正常工作：

- [ ] 插件已正确安装并启用
- [ ] 测试页面通过 http/https 协议访问
- [ ] 页面包含 `cross-request-sign` 标识元素
- [ ] 浏览器控制台显示成功加载信息
- [ ] crossRequest 函数可以正常调用
- [ ] GET 请求测试通过
- [ ] POST 请求测试通过
- [ ] 自定义请求头测试通过
- [ ] JSON 数据发送测试通过
