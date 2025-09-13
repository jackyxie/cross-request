'use strict';

// Base64 编码解码函数
function _base64() {
    var InvalidCharacterError = function (message) {
        this.message = message;
    };
    InvalidCharacterError.prototype = new Error;
    InvalidCharacterError.prototype.name = 'InvalidCharacterError';

    var error = function (message) {
        throw new InvalidCharacterError(message);
    };

    var TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var REGEX_SPACE_CHARACTERS = /[\t\n\f\r ]/g;

    var decode = function (input) {
        input = String(input).replace(REGEX_SPACE_CHARACTERS, '');
        var length = input.length;
        if (length % 4 == 0) {
            input = input.replace(/==?$/, '');
            length = input.length;
        }
        if (length % 4 == 1 || /[^+a-zA-Z0-9/]/.test(input)) {
            error('Invalid character: the string to be decoded is not correctly encoded.');
        }
        var bitCounter = 0;
        var bitStorage;
        var buffer;
        var output = '';
        var position = -1;
        while (++position < length) {
            buffer = TABLE.indexOf(input.charAt(position));
            bitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer;
            if (bitCounter++ % 4) {
                output += String.fromCharCode(0xFF & bitStorage >> (-2 * bitCounter & 6));
            }
        }
        return output;
    };

    var encode = function (input) {
        input = String(input);
        if (/[^\0-\xFF]/.test(input)) {
            error('The string to be encoded contains characters outside of the Latin1 range.');
        }
        var padding = input.length % 3;
        var output = '';
        var position = -1;
        var a, b, c, d, buffer;
        var length = input.length - padding;

        while (++position < length) {
            a = input.charCodeAt(position) << 16;
            b = input.charCodeAt(++position) << 8;
            c = input.charCodeAt(++position);
            buffer = a + b + c;
            output += (
                TABLE.charAt(buffer >> 18 & 0x3F) +
                TABLE.charAt(buffer >> 12 & 0x3F) +
                TABLE.charAt(buffer >> 6 & 0x3F) +
                TABLE.charAt(buffer & 0x3F)
            );
        }

        if (padding == 2) {
            a = input.charCodeAt(position) << 8;
            b = input.charCodeAt(++position);
            buffer = a + b;
            output += (
                TABLE.charAt(buffer >> 10) +
                TABLE.charAt((buffer >> 4) & 0x3F) +
                TABLE.charAt((buffer << 2) & 0x3F) +
                '='
            );
        } else if (padding == 1) {
            buffer = input.charCodeAt(position);
            output += (
                TABLE.charAt(buffer >> 2) +
                TABLE.charAt((buffer << 4) & 0x3F) +
                '=='
            );
        }

        return output;
    };

    return {
        'encode': encode,
        'decode': decode
    };
}

var base64 = _base64();

function formUrlencode(data) {
    if (data && typeof data === 'object') {
        return Object.keys(data).map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
        }).join('&')
    }
    return '';
}

function encode(data) {
    return base64.encode(encodeURIComponent(JSON.stringify(data)));
}

function decode(data) {
    return JSON.parse(decodeURIComponent(base64.decode(data)));
}

// 处理来自popup和content script的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'get') {
        chrome.storage.local.get([request.name]).then((result) => {
            sendResponse(result[request.name]);
        });
        return true; // 保持消息通道开放以进行异步响应
    } else if (request.action === 'set') {
        chrome.storage.local.set({[request.name]: request.value}).then(() => {
            sendResponse('success');
        });
        return true;
    }
});

// 处理跨域请求 - 使用 fetch API (Service Worker 兼容)
function sendAjax(req, successFn, errorFn) {
    req.headers = req.headers || {};
    req.method = req.method || 'GET';
    
    // 处理 Content-Type
    req.headers['Content-Type'] = req.headers['Content-Type'] || req.headers['Content-type'] || req.headers['content-type'];

    var fetchOptions = {
        method: req.method,
        headers: {},
        signal: null
    };

    // 设置超时
    var timeoutId;
    var controller = new AbortController();
    if (req.timeout && req.timeout > 0) {
        timeoutId = setTimeout(function() {
            controller.abort();
        }, req.timeout);
        fetchOptions.signal = controller.signal;
    }

    // 处理请求体
    if (req.method.toLowerCase() !== 'get' && req.method.toLowerCase() !== 'head' && req.method.toLowerCase() !== 'options') {
        if (!req.headers['Content-Type'] || req.headers['Content-Type'].startsWith('application/x-www-form-urlencoded')) {
            req.headers['Content-Type'] = req.headers['Content-Type'] || 'application/x-www-form-urlencoded';
            fetchOptions.body = formUrlencode(req.data);
        } else if (typeof req.data === 'object' && req.data) {
            fetchOptions.body = JSON.stringify(req.data);
        } else if (req.data) {
            fetchOptions.body = req.data;
        }
    } else {
        delete req.headers['Content-Type'];
    }

    // 处理查询参数
    var url = req.url;
    if (req.query && typeof req.query === 'object') {
        var getUrl = formUrlencode(req.query);
        url = url + '?' + getUrl;
    }

    // 设置请求头
    if (req.headers) {
        for (var name in req.headers) {
            if (req.headers[name] !== undefined && req.headers[name] !== null) {
                try {
                    fetchOptions.headers[name] = req.headers[name];
                } catch (e) {
                    console.warn('无法设置请求头:', name, req.headers[name]);
                }
            }
        }
    }

    // 发送请求
    fetch(url, fetchOptions)
        .then(function(response) {
            // 清除超时定时器
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            // 解析响应头
            var headers = {};
            response.headers.forEach(function(value, name) {
                headers[name] = value;
            });

            // 获取响应体
            return response.text().then(function(body) {
                var result = {
                    headers: headers,
                    status: response.status,
                    statusText: response.statusText,
                    body: body
                };

                if (response.status >= 200 && response.status < 300) {
                    successFn(result);
                } else {
                    errorFn(result);
                }
            });
        })
        .catch(function(error) {
            // 清除超时定时器
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            var errorMessage;
            if (error.name === 'AbortError') {
                errorMessage = 'Request timeout after ' + (req.timeout || 1000000) + 'ms';
            } else {
                errorMessage = error.message || 'Network Error';
            }

            errorFn({
                body: errorMessage,
                status: 0,
                statusText: 'Network Error'
            });
        });
}

// 处理长连接请求
chrome.runtime.onConnect.addListener(function (port) {
    if (port.name === 'request') {
        port.onMessage.addListener(function (msg) {
            sendAjax(msg.req, function (res) {
                port.postMessage({
                    id: msg.id,
                    res: res
                });
            }, function (err) {
                port.postMessage({
                    id: msg.id,
                    res: err
                });
            });
        });
    }
});

// Service Worker 安装和激活
self.addEventListener('install', function(event) {
    console.log('Cross-request extension service worker installed');
    self.skipWaiting();
});

self.addEventListener('activate', function(event) {
    console.log('Cross-request extension service worker activated');
    event.waitUntil(self.clients.claim());
});