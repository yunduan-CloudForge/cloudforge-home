# 云锻开源社区官网

云锻开源社区官网是一个现代化的React应用，展示我们的开源项目、技术文档和社区资源。

## 🚀 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式方案**: TailwindCSS + Headless UI
- **路由管理**: React Router 6
- **状态管理**: Zustand
- **动画库**: Framer Motion
- **图标库**: Heroicons
- **部署平台**: GitHub Pages
- **CI/CD**: GitHub Actions

## 📦 安装和运行

### 环境要求

- Node.js >= 18
- pnpm >= 8 (推荐) 或 npm

### 本地开发

```bash
# 克隆项目
git clone https://github.com/cloudforge/Trae_CloudForge-home.git
cd Trae_CloudForge-home

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

### 构建和部署

```bash
# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview

# 代码检查
pnpm lint

# 类型检查
pnpm check
```

## 📁 项目结构

```
src/
├── components/          # 通用组件
│   ├── ui/             # 基础UI组件
│   ├── layout/         # 布局组件
│   └── features/       # 功能组件
├── pages/              # 页面组件
├── hooks/              # 自定义Hooks
├── utils/              # 工具函数
├── types/              # TypeScript类型
├── styles/             # 样式文件
└── content/            # 静态内容
```

## 🎨 设计系统

- **主色调**: 科技蓝 (#2563EB) 和深灰 (#1F2937)
- **辅助色**: 亮绿 (#10B981) 用于强调，橙色 (#F59E0B) 用于警告
- **字体**: 中文使用思源黑体，英文使用Inter，代码使用JetBrains Mono
- **布局**: 卡片式设计，响应式网格布局

## 🚀 部署

项目配置了GitHub Actions自动部署到GitHub Pages。当代码推送到main分支时，会自动触发构建和部署流程。

### 手动部署

```bash
# 构建项目
pnpm build

# 部署到GitHub Pages
# (需要配置GitHub Pages设置)
```

## 🤝 贡献指南

我们欢迎所有形式的贡献！请查看 [贡献指南](CONTRIBUTING.md) 了解详细信息。

### 开发流程

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系我们

- 邮箱: hello@cloudforge.org
- GitHub: [github.com/cloudforge](https://github.com/cloudforge)
- Discord: [discord.gg/cloudforge](https://discord.gg/cloudforge)
- Twitter: [@cloudforge](https://twitter.com/cloudforge)
