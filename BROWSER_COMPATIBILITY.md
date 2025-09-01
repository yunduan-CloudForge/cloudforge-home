# 浏览器兼容性测试指南

## 支持的浏览器版本

根据 `browserslist` 配置，我们支持以下浏览器版本：

### 生产环境
- **Chrome**: >= 88 (2021年1月发布)
- **Firefox**: >= 85 (2021年1月发布)
- **Safari**: >= 14 (2020年9月发布)
- **Edge**: >= 88 (2021年1月发布)
- 市场份额 > 0.2% 的浏览器
- 排除已停止维护的浏览器
- 排除 Opera Mini

### 开发环境
- 最新版本的 Chrome、Firefox、Safari

## 测试清单

### 1. 基础功能测试
- [ ] 页面加载和渲染
- [ ] 导航菜单功能
- [ ] 响应式布局
- [ ] 表单提交
- [ ] 链接跳转
- [ ] 图片加载

### 2. CSS 兼容性
- [ ] Flexbox 布局
- [ ] Grid 布局
- [ ] CSS 变量
- [ ] 动画效果
- [ ] 媒体查询
- [ ] Tailwind CSS 类

### 3. JavaScript 功能
- [ ] ES6+ 语法支持
- [ ] 异步操作 (async/await)
- [ ] 模块导入/导出
- [ ] DOM 操作
- [ ] 事件处理
- [ ] LocalStorage/SessionStorage

### 4. React 特性
- [ ] 组件渲染
- [ ] 状态管理 (Zustand)
- [ ] 路由导航 (React Router)
- [ ] 懒加载组件
- [ ] 动画效果 (Framer Motion)
- [ ] SEO 元数据 (React Helmet)

### 5. 第三方服务
- [ ] EmailJS 邮件发送
- [ ] 外部链接跳转
- [ ] 社交媒体集成

## 测试方法

### 1. 本地测试
```bash
# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

### 2. 浏览器开发者工具
- 使用 Chrome DevTools 的设备模拟
- 测试不同屏幕尺寸
- 检查控制台错误
- 验证网络请求

### 3. 在线测试工具
- **BrowserStack**: 真实设备测试
- **CrossBrowserTesting**: 自动化测试
- **LambdaTest**: 云端浏览器测试

### 4. 手动测试
在以下浏览器中手动测试：
- Chrome (最新版本)
- Firefox (最新版本)
- Safari (macOS/iOS)
- Edge (最新版本)
- 移动端浏览器 (Chrome Mobile, Safari Mobile)

## 常见兼容性问题

### 1. CSS 问题
- **Flexbox**: 旧版本 Safari 的 flex 属性
- **Grid**: IE 11 不完全支持
- **CSS 变量**: IE 不支持
- **Backdrop-filter**: 部分浏览器支持有限

### 2. JavaScript 问题
- **ES6 模块**: 需要 Babel 转译
- **Async/Await**: 旧版本浏览器不支持
- **Optional Chaining**: 需要 Babel 插件
- **Nullish Coalescing**: 需要 Babel 插件

### 3. 解决方案
- 使用 Autoprefixer 自动添加 CSS 前缀
- Vite 自动处理 JavaScript 兼容性
- Polyfills 通过 Vite 自动注入
- 使用 PostCSS 处理 CSS 兼容性

## 性能测试

### 1. 加载性能
- 首屏加载时间 < 3秒
- 资源压缩和缓存
- 代码分割效果
- 懒加载组件

### 2. 运行时性能
- 动画流畅度 (60fps)
- 内存使用情况
- CPU 占用率
- 响应时间

## 自动化测试

### 1. 单元测试
```bash
# 添加测试依赖
pnpm add -D @testing-library/react @testing-library/jest-dom vitest jsdom
```

### 2. E2E 测试
```bash
# 添加 Playwright
pnpm add -D @playwright/test
```

### 3. 视觉回归测试
```bash
# 添加 Chromatic
pnpm add -D chromatic
```

## 报告问题

发现兼容性问题时，请记录：
1. 浏览器名称和版本
2. 操作系统
3. 问题描述
4. 重现步骤
5. 预期行为
6. 实际行为
7. 截图或录屏

## 持续监控

- 定期检查 Can I Use 网站
- 监控浏览器市场份额变化
- 更新 browserslist 配置
- 关注新的 Web 标准
- 测试新版本浏览器