// 导航栏功能
class Navigation {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.navbar = document.querySelector('.navbar');
        
        this.init();
    }
    
    init() {
        // 汉堡菜单点击事件
        this.hamburger.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        
        // 导航链接点击事件
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
        
        // 滚动事件
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
        
        // 页面加载时设置活动链接
        this.setActiveLink();
    }
    
    toggleMobileMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        
        // 动画效果
        const bars = this.hamburger.querySelectorAll('.bar');
        if (this.hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    }
    
    closeMobileMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        
        const bars = this.hamburger.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
    
    handleScroll() {
        const scrollTop = window.pageYOffset;
        
        // 导航栏背景透明度
        if (scrollTop > 50) {
            this.navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            this.navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            this.navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            this.navbar.style.boxShadow = 'none';
        }
        
        // 设置活动导航链接
        this.setActiveLink();
    }
    
    setActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// 平滑滚动
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        // 为所有内部链接添加平滑滚动
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 70; // 考虑固定导航栏高度
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// 动画观察器
class AnimationObserver {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }
    
    init() {
        // 创建观察器
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, this.observerOptions);
        
        // 观察需要动画的元素
        const animateElements = document.querySelectorAll(
            '.project-card, .team-member, .stat, .floating-card, .feature'
        );
        
        animateElements.forEach(el => {
            el.classList.add('animate-element');
            this.observer.observe(el);
        });
        
        // 添加CSS动画样式
        this.addAnimationStyles();
    }
    
    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .animate-element {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .animate-element.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .floating-card.animate-element {
                transform: translateY(50px) scale(0.9);
            }
            
            .floating-card.animate-element.animate-in {
                transform: translateY(0) scale(1);
            }
        `;
        document.head.appendChild(style);
    }
}

// 表单处理
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form form');
        this.feishuBtn = document.querySelector('#feishu-contact');
        this.init();
    }
    
    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                this.handleSubmit(e);
            });
        }
        
        if (this.feishuBtn) {
            this.feishuBtn.addEventListener('click', () => {
                this.openFeishuContact();
            });
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(this.form);
        const data = {
            name: this.form.querySelector('input[name="name"]').value,
            email: this.form.querySelector('input[name="email"]').value,
            subject: this.form.querySelector('select[name="subject"]').value,
            message: this.form.querySelector('textarea[name="message"]').value
        };
        
        // 验证表单
        if (this.validateForm(data)) {
            this.submitToFeishuEmail(data);
        }
    }
    
    openFeishuContact() {
        // 获取表单数据
        const name = this.form.querySelector('input[name="name"]').value || '访客';
        const email = this.form.querySelector('input[name="email"]').value;
        const subject = this.form.querySelector('select[name="subject"]').value || '咨询';
        const message = this.form.querySelector('textarea[name="message"]').value;
        
        // 构建飞书机器人消息
        const feishuMessage = this.buildFeishuMessage(name, email, subject, message);
        
        // 这里可以集成飞书机器人API或打开飞书应用
        // 目前先显示提示信息
        this.showFeishuContactInfo(feishuMessage);
    }
    
    buildFeishuMessage(name, email, subject, message) {
        return `【网站联系表单】\n` +
               `姓名：${name}\n` +
               `邮箱：${email}\n` +
               `主题：${subject}\n` +
               `消息：${message}\n` +
               `时间：${new Date().toLocaleString('zh-CN')}`;
    }
    
    showFeishuContactInfo(message) {
        const modal = document.createElement('div');
        modal.className = 'feishu-modal';
        modal.innerHTML = `
            <div class="feishu-modal-content">
                <div class="feishu-modal-header">
                    <h3><i class="fas fa-comments"></i> 飞书联系方式</h3>
                    <button class="feishu-modal-close">&times;</button>
                </div>
                <div class="feishu-modal-body">
                    <p><strong>企业邮箱：</strong>contact@cloudforge.feishu.cn</p>
                    <p><strong>飞书群组：</strong>CloudForge开源社区</p>
                    <div class="feishu-qr-placeholder">
                        <i class="fas fa-qrcode"></i>
                        <p>扫码加入飞书群组</p>
                    </div>
                    <div class="feishu-message-preview">
                        <h4>消息预览：</h4>
                        <pre>${message}</pre>
                    </div>
                </div>
                <div class="feishu-modal-footer">
                    <button class="btn btn-primary" onclick="window.open('mailto:contact@cloudforge.feishu.cn?subject=${encodeURIComponent(this.form.querySelector('select[name=\"subject\"]').value || '网站咨询')}&body=${encodeURIComponent(message)}')">
                        <i class="fas fa-envelope"></i> 发送邮件
                    </button>
                    <button class="btn btn-secondary feishu-modal-close">关闭</button>
                </div>
            </div>
        `;
        
        // 添加样式
        this.addFeishuModalStyles();
        
        // 添加到页面
        document.body.appendChild(modal);
        
        // 绑定关闭事件
        modal.querySelectorAll('.feishu-modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
        });
        
        // 点击背景关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
    
    addFeishuModalStyles() {
        if (document.querySelector('#feishu-modal-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'feishu-modal-styles';
        style.textContent = `
            .feishu-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .feishu-modal-content {
                background: white;
                border-radius: 12px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                animation: slideIn 0.3s ease;
            }
            
            .feishu-modal-header {
                padding: 1.5rem;
                border-bottom: 1px solid #e2e8f0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .feishu-modal-header h3 {
                margin: 0;
                color: #1e293b;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .feishu-modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #64748b;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .feishu-modal-close:hover {
                background: #f1f5f9;
                color: #1e293b;
            }
            
            .feishu-modal-body {
                padding: 1.5rem;
            }
            
            .feishu-modal-body p {
                margin: 0.5rem 0;
                color: #475569;
            }
            
            .feishu-qr-placeholder {
                background: #f8fafc;
                border: 2px dashed #cbd5e1;
                border-radius: 8px;
                padding: 2rem;
                text-align: center;
                margin: 1rem 0;
                color: #64748b;
            }
            
            .feishu-qr-placeholder i {
                font-size: 3rem;
                margin-bottom: 0.5rem;
                display: block;
            }
            
            .feishu-message-preview {
                margin-top: 1rem;
            }
            
            .feishu-message-preview h4 {
                margin: 0 0 0.5rem 0;
                color: #1e293b;
            }
            
            .feishu-message-preview pre {
                background: #f1f5f9;
                padding: 1rem;
                border-radius: 6px;
                font-size: 0.9rem;
                white-space: pre-wrap;
                word-wrap: break-word;
                color: #475569;
                margin: 0;
            }
            
            .feishu-modal-footer {
                padding: 1.5rem;
                border-top: 1px solid #e2e8f0;
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideIn {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    validateForm(data) {
        const errors = [];
        
        if (!data.name.trim()) {
            errors.push('请输入您的姓名');
        }
        
        if (!data.email.trim() || !this.isValidEmail(data.email)) {
            errors.push('请输入有效的邮箱地址');
        }
        
        if (!data.subject) {
            errors.push('请选择主题');
        }
        
        if (!data.message.trim()) {
            errors.push('请输入您的消息');
        }
        
        if (errors.length > 0) {
            this.showMessage(errors.join('\n'), 'error');
            return false;
        }
        
        return true;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    submitToFeishuEmail(data) {
        // 构建邮件内容
        const subject = `[CloudForge官网] ${data.subject}`;
        const body = `姓名：${data.name}\n` +
                    `邮箱：${data.email}\n` +
                    `主题：${data.subject}\n` +
                    `消息：\n${data.message}\n\n` +
                    `发送时间：${new Date().toLocaleString('zh-CN')}`;
        
        // 构建mailto链接
        const mailtoLink = `mailto:contact@cloudforge.feishu.cn?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // 打开邮件客户端
        window.location.href = mailtoLink;
        
        // 显示成功消息
        this.showMessage('正在打开邮件客户端...如果没有自动打开，请手动发送邮件至 contact@cloudforge.feishu.cn', 'success');
        
        // 重置表单
        setTimeout(() => {
            this.form.reset();
        }, 2000);
    }
    
    simulateApiCall(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // 模拟90%成功率
                if (Math.random() > 0.1) {
                    console.log('表单数据:', data);
                    resolve();
                } else {
                    reject(new Error('模拟网络错误'));
                }
            }, 2000);
        });
    }
    
    showMessage(message, type) {
        // 创建消息元素
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = message;
        
        // 添加样式
        const style = {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px'
        };
        
        if (type === 'success') {
            style.background = '#10b981';
        } else {
            style.background = '#ef4444';
        }
        
        Object.assign(messageEl.style, style);
        
        // 添加到页面
        document.body.appendChild(messageEl);
        
        // 显示动画
        setTimeout(() => {
            messageEl.style.transform = 'translateX(0)';
        }, 100);
        
        // 自动移除
        setTimeout(() => {
            messageEl.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(messageEl);
            }, 300);
        }, 4000);
    }
}

// 统计数字动画
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        this.counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    
    animateCounter(element) {
        const target = element.textContent;
        const isNumber = /^\d+$/.test(target);
        
        if (isNumber) {
            const targetNum = parseInt(target);
            const duration = 2000;
            const step = targetNum / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= targetNum) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current).toString();
                }
            }, 16);
        }
    }
}

// 主题切换（可选功能）
class ThemeToggle {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }
    
    init() {
        // 应用保存的主题
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        // 可以在导航栏添加主题切换按钮
        // this.createToggleButton();
    }
    
    toggle() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }
}

// 性能优化：图片懒加载
class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            this.images.forEach(img => imageObserver.observe(img));
        } else {
            // 降级处理
            this.images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    // 基础功能
    new Navigation();
    new SmoothScroll();
    new AnimationObserver();
    new ContactForm();
    new CounterAnimation();
    new ThemeToggle();
    new LazyLoader();
    
    // 添加页面加载完成的淡入效果
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // 控制台欢迎信息
    console.log('%c欢迎来到云锻开源团队官网！', 'color: #2563eb; font-size: 16px; font-weight: bold;');
    console.log('%c如果您对我们的项目感兴趣，欢迎访问我们的GitHub：https://github.com/cloudforge-oss', 'color: #666; font-size: 12px;');
});

// 错误处理
window.addEventListener('error', (e) => {
    console.error('页面错误:', e.error);
});

// 导出类供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Navigation,
        SmoothScroll,
        AnimationObserver,
        ContactForm,
        CounterAnimation,
        ThemeToggle,
        LazyLoader
    };
}