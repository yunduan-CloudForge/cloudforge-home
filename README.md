# 云锻开源团队官网

这是云锻开源团队（CloudForge OSS）的官方网站，采用现代化的静态网页设计，展示团队信息、项目成果和联系方式。

## 🌟 特性

- **现代化设计**：采用渐变色彩和玻璃拟态效果
- **响应式布局**：完美适配桌面端、平板和移动设备
- **流畅动画**：丰富的交互动画和视觉效果
- **性能优化**：图片懒加载、代码分割等优化措施
- **无障碍访问**：遵循Web无障碍设计标准
- **SEO友好**：优化的HTML结构和元数据

## 🚀 快速开始

### 本地运行

1. 克隆项目到本地：
```bash
git clone <repository-url>
cd CloudForge-OSS官网
```

2. 使用任意HTTP服务器运行：

**使用Python（推荐）：**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**使用Node.js：**
```bash
npx serve .
```

**使用PHP：**
```bash
php -S localhost:8000
```

3. 在浏览器中访问 `http://localhost:8000`

### 部署到生产环境

#### GitHub Pages
1. 将代码推送到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 选择主分支作为源

#### Netlify
1. 连接GitHub仓库到Netlify
2. 设置构建命令为空（静态站点）
3. 设置发布目录为根目录

#### Vercel
1. 导入GitHub仓库到Vercel
2. 保持默认设置
3. 部署完成

## 📁 项目结构

```
CloudForge-OSS官网/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # JavaScript功能
├── README.md           # 项目说明
└── assets/             # 资源文件（可选）
    ├── images/         # 图片资源
    ├── icons/          # 图标文件
    └── fonts/          # 字体文件
```

## 🎨 设计系统

### 颜色方案
- **主色调**：`#2563eb` (蓝色)
- **次要色**：`#7c3aed` (紫色)
- **强调色**：`#fbbf24` (金色)
- **文本色**：`#1e293b` (深灰)
- **背景色**：`#ffffff` (白色)

### 字体
- **主字体**：Inter (Google Fonts)
- **备用字体**：-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto

### 断点
- **移动端**：< 768px
- **平板端**：768px - 1024px
- **桌面端**：> 1024px

## 🔧 自定义配置

### 修改团队信息

在 `index.html` 中找到以下部分并修改：

```html
<!-- 团队成员部分 -->
<div class="team-member">
    <div class="member-avatar">
        <i class="fas fa-user"></i>
    </div>
    <h3>姓名</h3>
    <p class="member-role">职位</p>
    <p class="member-bio">个人简介</p>
    <!-- 社交链接 -->
</div>
```

### 修改项目信息

在项目展示部分更新项目卡片：

```html
<div class="project-card">
    <div class="project-icon">
        <i class="fas fa-项目图标"></i>
    </div>
    <h3>项目名称</h3>
    <p>项目描述</p>
    <div class="project-tech">
        <span class="tech-tag">技术栈</span>
    </div>
    <div class="project-links">
        <a href="#" class="project-link">
            <i class="fab fa-github"></i>
            GitHub
        </a>
    </div>
</div>
```

### 修改联系信息

更新联系我们部分的信息：

```html
<div class="contact-item">
    <i class="fas fa-envelope"></i>
    <div>
        <h4>邮箱</h4>
        <p>your-email@domain.com</p>
    </div>
</div>
```

## 🛠️ 技术栈

- **HTML5**：语义化标记
- **CSS3**：现代CSS特性（Grid、Flexbox、自定义属性）
- **JavaScript ES6+**：模块化编程
- **Font Awesome**：图标库
- **Google Fonts**：网络字体

## 📱 浏览器支持

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 🤝 贡献指南

我们欢迎社区贡献！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 代码规范

- 使用2个空格缩进
- 遵循语义化HTML
- CSS类名使用kebab-case
- JavaScript使用camelCase
- 添加适当的注释

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Font Awesome](https://fontawesome.com/) - 图标库
- [Google Fonts](https://fonts.google.com/) - 网络字体
- [Unsplash](https://unsplash.com/) - 高质量图片资源

## 📞 联系我们

- **邮箱**：hello@cloudforge-oss.org
- **GitHub**：[github.com/cloudforge-oss](https://github.com/cloudforge-oss)
- **网站**：[cloudforge-oss.org](https://cloudforge-oss.org)

---

**云锻开源团队** - 构建未来的开源生态 🚀