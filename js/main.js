// 主JavaScript文件

document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const header = document.querySelector('.main-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 50) {
            // 向下滚动
            header.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动
            header.style.transform = 'translateY(0)';
        }
        
        // 更改导航栏背景透明度
        if (scrollTop > 10) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // 响应式菜单
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuIcon) {
        menuIcon.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 创建移动端菜单
            if (!document.querySelector('.mobile-menu')) {
                const mobileMenu = document.createElement('div');
                mobileMenu.className = 'mobile-menu';
                
                // 复制导航链接
                const navLinksClone = navLinks.cloneNode(true);
                mobileMenu.appendChild(navLinksClone);
                
                // 添加关闭按钮
                const closeBtn = document.createElement('button');
                closeBtn.className = 'close-menu';
                closeBtn.innerHTML = '&times;';
                mobileMenu.appendChild(closeBtn);
                
                document.body.appendChild(mobileMenu);
                
                // 防止滚动
                document.body.style.overflow = 'hidden';
                
                // 关闭菜单事件
                closeBtn.addEventListener('click', function() {
                    document.body.removeChild(mobileMenu);
                    document.body.style.overflow = '';
                });
                
                // 点击链接后关闭菜单
                const mobileLinks = mobileMenu.querySelectorAll('a');
                mobileLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        document.body.removeChild(mobileMenu);
                        document.body.style.overflow = '';
                    });
                });
            }
        });
    }
    
    // 添加滚动动画
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.product-item, .grid-item, .project-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.8) {
                element.classList.add('animate-in');
            }
        });
    };
    
    // 初始检查
    animateOnScroll();
    
    // 滚动时检查
    window.addEventListener('scroll', animateOnScroll);
    
    // 添加CSS动画类
    const style = document.createElement('style');
    style.textContent = `
        .product-item, .grid-item, .project-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .mobile-menu {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: white;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            animation: fadeIn 0.3s ease;
        }
        
        .mobile-menu .nav-links {
            display: flex;
            flex-direction: column;
            gap: 30px;
            text-align: center;
        }
        
        .mobile-menu .nav-links a {
            font-size: 24px;
        }
        
        .close-menu {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 40px;
            background: none;
            border: none;
            cursor: pointer;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 60,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 创建图片文件夹占位提示
    console.log('注意：请创建 images 文件夹并添加以下图片：');
    console.log('- product-engine.jpg');
    console.log('- product-toolchain.jpg');
    console.log('- product-platform.jpg');
});