// 检查后端状态
document.addEventListener('DOMContentLoaded', function() {
    // 避免与其他脚本冲突
    setTimeout(checkBackendStatus, 500);
});

function checkBackendStatus() {
    const backendStatusEl = document.getElementById('backendStatus');
    const apiStatusEl = document.getElementById('apiStatus');
    
    if (!backendStatusEl || !apiStatusEl) {
        console.error('状态指示器元素未找到');
        return;
    }
    
    console.log('开始检查后端状态');
    
    // 关键修改：使用相对路径，不要使用window.location.origin
    
    // 检查基本后端状态
    fetch('/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
        }
    })
    .then(response => {
        console.log('后端基本状态响应:', response.status);
        updateStatusIndicator(backendStatusEl, response.ok, '在线');
        
        // 检查API状态
        return fetch('/api', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Cache-Control': 'no-cache'
            }
        });
    })
    .then(response => {
        console.log('API状态响应:', response.status);
        if (response.ok) {
            return response.json().catch(() => {
                // 处理非JSON响应
                return { endpoints: ['/api/contact'] };
            });
        }
        throw new Error('API响应异常: ' + response.status);
    })
    .then(data => {
        console.log('API数据:', data);
        // 显示API状态信息
        updateStatusIndicator(apiStatusEl, true, `在线 (${data.endpoints ? data.endpoints.length : 1}个接口可用)`);
    })
    .catch(error => {
        console.error('检查后端状态时出错:', error);
        
        if (error.message.includes('Failed to fetch')) {
            updateStatusIndicator(backendStatusEl, false, '离线 (无法连接到服务器)');
            updateStatusIndicator(apiStatusEl, false, '离线 (无法连接到API)');
        } else {
            updateStatusIndicator(apiStatusEl, false, `错误: ${error.message}`);
        }
    });
}

function updateStatusIndicator(element, isOnline, customText) {
    const statusDot = element.querySelector('.status-dot');
    const statusText = element.querySelector('.status-text');
    
    if (!statusDot || !statusText) {
        console.error('状态指示器子元素未找到');
        return;
    }
    
    statusDot.classList.remove('checking', 'online', 'offline');
    statusDot.classList.add(isOnline ? 'online' : 'offline');
    
    statusText.textContent = customText || (isOnline ? '在线' : '离线');
}

// 将检查间隔从5秒改为60秒
setInterval(checkBackendStatus, 600000);