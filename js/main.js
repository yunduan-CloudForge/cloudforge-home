// 主题切换功能
document.addEventListener('DOMContentLoaded', function() {
    // 创建主题切换按钮
    const createThemeToggle = () => {
        const nav = document.querySelector('.nav ul');
        const themeToggleItem = document.createElement('li');
        const themeToggleLink = document.createElement('a');
        themeToggleLink.href = '#';
        themeToggleLink.id = 'theme-toggle';
        themeToggleLink.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggleLink.setAttribute('title', '切换深色模式');
        themeToggleItem.appendChild(themeToggleLink);
        nav.appendChild(themeToggleItem);

        // 添加点击事件
        themeToggleLink.addEventListener('click', function(e) {
            e.preventDefault();
            toggleTheme();
        });
    };

    // 切换主题
    const toggleTheme = () => {
        const body = document.body;
        const themeToggle = document.getElementById('theme-toggle');
        
        if (body.classList.contains('dark-theme')) {
            // 切换到浅色模式
            body.classList.remove('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggle.setAttribute('title', '切换深色模式');
            localStorage.setItem('theme', 'light');
        } else {
            // 切换到深色模式
            body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.setAttribute('title', '切换浅色模式');
            localStorage.setItem('theme', 'dark');
        }
    };

    // 检查用户之前的主题偏好
    const checkThemePreference = () => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
            document.body.classList.add('dark-theme');
            const themeToggle = document.getElementById('theme-toggle');
            if (themeToggle) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                themeToggle.setAttribute('title', '切换浅色模式');
            }
        }
    };

    // 初始化
    createThemeToggle();
    checkThemePreference();
});

// 移动端菜单切换
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
});

// 联系表单提交功能
// 在main.js文件末尾添加以下代码

// 处理联系表单提交
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        console.log('找到联系表单，添加提交事件监听器');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('表单提交被触发');
            
            // 获取表单元素
            const nameInput = document.querySelector('input[name="name"]');
            const emailInput = document.querySelector('input[name="email"]');
            const messageInput = document.querySelector('textarea[name="message"]');
            
            // 调试信息
            console.log('表单元素:', {
                nameInput: nameInput ? nameInput.value : 'not found',
                emailInput: emailInput ? emailInput.value : 'not found',
                messageInput: messageInput ? messageInput.value : 'not found'
            });
            
            // 检查表单元素是否存在
            if (!nameInput || !emailInput || !messageInput) {
                console.error('表单元素未找到，尝试使用备用选择器');
                // 尝试备用选择器
                const inputs = contactForm.querySelectorAll('input, textarea');
                console.log('找到的输入元素数量:', inputs.length);
                
                if (inputs.length >= 3) {
                    // 使用表单中的前三个输入元素
                    const formData = {
                        name: inputs[0].value,
                        email: inputs[1].value,
                        message: inputs[2].value
                    };
                    console.log('使用备用方法获取的表单数据:', formData);
                    sendContactForm(formData);
                } else {
                    alert('表单元素未找到，请检查页面结构');
                }
                return;
            }
            
            const formData = {
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value
            };
            
            console.log('准备发送表单数据:', formData);
            sendContactForm(formData);
        });
    } else {
        console.error('联系表单未找到');
    }
    
    // 提取发送表单数据的函数
    function sendContactForm(formData) {
        console.log('开始发送表单数据');
        
        // 使用相对路径，适应不同环境
        const apiUrl = '/api/contact';
        console.log('提交到API:', apiUrl);
        
        // 显示加载状态
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.textContent : '发送留言';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = '发送中...';
        }
        
        // 发送到后端API
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData),
            // 添加这一行，确保不使用缓存
            cache: 'no-cache'
        })
        .then(response => {
            console.log('收到响应:', response.status, response.statusText);
            // 即使状态码不是200，也尝试解析JSON
            return response.json().catch(() => {
                // 处理非JSON响应
                if (!response.ok) {
                    throw new Error(`服务器返回错误状态码: ${response.status}`);
                }
                throw new Error('服务器返回了非JSON格式的响应');
            });
        })
        .then(data => {
            console.log('响应数据:', data);
            if (data.success) {
                alert('消息发送成功！');
                contactForm.reset();
            } else {
                alert('发送失败：' + (data.message || '未知错误'));
            }
        })
        .catch(error => {
            console.error('提交表单时出错:', error);
            // 更详细的错误信息
            alert('发送失败，请稍后再试。\n错误详情: ' + error.message);
        })
        .finally(() => {
            // 恢复按钮状态
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }
});