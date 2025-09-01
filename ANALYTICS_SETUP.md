# 分析和监控工具配置指南

本项目集成了多种分析和监控工具，帮助您了解网站性能和用户行为。

**注意**: 所有分析工具都是可选的，不配置也不会影响网站的正常运行。

## 🔍 Google Analytics 4 (GA4) - 可选

**Google Analytics 是完全可选的功能**。如果您不需要用户行为分析，可以跳过此配置。

### 1. 设置 Google Analytics（可选）

1. **创建 GA4 属性**:
   - 访问 [Google Analytics](https://analytics.google.com/)
   - 创建新的 GA4 属性
   - 获取测量 ID (格式: G-XXXXXXXXXX)

2. **配置环境变量（可选）**:
   ```bash
   # .env.local
   # 如果不配置此项，Google Analytics 将不会加载
   VITE_GA_TRACKING_ID=G-XXXXXXXXXX
   ```
   
   **重要**: 如果您不想使用 Google Analytics，请保持此环境变量为空或不设置。

3. **验证安装**:
   - 打开网站并访问几个页面
   - 在 GA4 实时报告中查看数据
   - 检查浏览器开发者工具的网络标签

### 2. 自定义事件追踪

项目已预配置以下事件类型：

#### 导航事件
```typescript
import { useAnalytics } from '@/components/analytics/GoogleAnalytics';

const { trackClick } = useAnalytics();

// 菜单点击
trackClick('menu_item', 'header');

// Logo 点击
trackClick('logo', 'header');
```

#### 内容交互
```typescript
// 项目查看
trackEvent('project_view', 'Content', 'CloudForge CLI');

// 文档查看
trackEvent('doc_view', 'Content', 'Getting Started');

// 下载点击
trackDownload('cloudforge-cli-v1.0.0.zip', 'application/zip');
```

#### 表单提交
```typescript
// 联系表单
trackFormSubmit('contact_form', true);

// 订阅表单
trackFormSubmit('newsletter_signup', false);
```

#### 社交媒体
```typescript
// 社交媒体点击
trackSocialShare('github', 'https://github.com/cloudforge');
trackSocialShare('twitter', 'https://twitter.com/cloudforge');
```

### 3. 隐私设置

项目已配置隐私友好的设置：
- IP 匿名化已启用
- 禁用 Google 信号
- 禁用广告个性化

## 📊 性能监控

### 1. Web Vitals 监控

项目自动监控以下指标：
- **LCP** (Largest Contentful Paint): 最大内容绘制
- **FID** (First Input Delay): 首次输入延迟
- **CLS** (Cumulative Layout Shift): 累积布局偏移
- **FCP** (First Contentful Paint): 首次内容绘制
- **TTFB** (Time to First Byte): 首字节时间

### 2. 自定义性能指标

```typescript
import { PerformanceMonitor } from '@/utils/performance';

// 记录自定义指标
PerformanceMonitor.recordMetric('CustomAction', 1250);

// 记录资源加载时间
PerformanceMonitor.recordResourceTiming();
```

### 3. 性能数据上报

性能数据会自动发送到：
- Google Analytics (Web Vitals)
- 自定义分析端点（如果配置）

## 🚨 错误监控

### 1. 错误边界

项目使用 React Error Boundary 捕获组件错误：
- 自动捕获 React 组件错误
- 发送错误信息到 GA
- 显示用户友好的错误页面
- 提供错误恢复选项

### 2. Sentry 集成（可选）

如需更详细的错误监控，可以集成 Sentry：

1. **安装 Sentry**:
   ```bash
   pnpm add @sentry/react @sentry/tracing
   ```

2. **配置环境变量**:
   ```bash
   VITE_SENTRY_DSN=https://your-dsn@sentry.io/project-id
   ```

3. **初始化 Sentry**:
   ```typescript
   import * as Sentry from '@sentry/react';
   
   Sentry.init({
     dsn: import.meta.env.VITE_SENTRY_DSN,
     environment: import.meta.env.MODE,
     tracesSampleRate: 1.0,
   });
   ```

## 📈 其他分析工具

### 1. Microsoft Clarity（可选）

用于用户行为分析和热图：

```html
<!-- 在 index.html 中添加 -->
<script type="text/javascript">
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "YOUR_CLARITY_ID");
</script>
```

### 2. Hotjar（可选）

用于用户体验分析：

```html
<!-- 在 index.html 中添加 -->
<script>
  (function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:YOUR_HOTJAR_ID,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>
```

## 🔧 开发和调试

### 1. 开发模式

在开发模式下：
- GA 调试模式已启用
- 控制台会显示分析事件
- 错误详情会显示在错误边界中

### 2. 测试分析事件

```typescript
// 在浏览器控制台中测试
window.gtag('event', 'test_event', {
  event_category: 'Test',
  event_label: 'Console Test'
});
```

### 3. 验证数据

- **GA4 实时报告**: 查看实时数据
- **GA4 调试视图**: 验证事件参数
- **浏览器开发者工具**: 检查网络请求
- **GA4 DebugView**: 详细的事件调试

## 📋 配置检查清单

### Google Analytics
- [ ] 创建 GA4 属性
- [ ] 获取测量 ID
- [ ] 配置环境变量
- [ ] 验证页面浏览事件
- [ ] 测试自定义事件
- [ ] 检查实时报告

### 性能监控
- [ ] Web Vitals 数据正常上报
- [ ] 自定义性能指标工作正常
- [ ] 资源加载时间监控

### 错误监控
- [ ] 错误边界正常工作
- [ ] 错误信息发送到 GA
- [ ] Sentry 配置（如果使用）

### 隐私合规
- [ ] IP 匿名化已启用
- [ ] Cookie 横幅（如需要）
- [ ] 隐私政策更新
- [ ] GDPR 合规（如适用）

## 🔒 隐私和合规

### 1. GDPR 合规

如果您的网站面向欧盟用户：
- 实施 Cookie 同意横幅
- 提供数据删除选项
- 更新隐私政策

### 2. Cookie 管理

考虑添加 Cookie 同意管理：

```bash
pnpm add @cookiehub/cookiehub
```

### 3. 数据保留

在 GA4 中配置适当的数据保留期限：
- 事件数据: 2-14 个月
- 用户数据: 2-26 个月

## 📞 支持和故障排除

### 常见问题

1. **GA 数据不显示**:
   - 检查测量 ID 是否正确
   - 验证网络请求是否发送
   - 等待 24-48 小时数据处理

2. **事件未触发**:
   - 检查控制台错误
   - 验证事件参数
   - 使用 GA4 DebugView

3. **性能数据缺失**:
   - 检查浏览器兼容性
   - 验证 Web Vitals API 支持
   - 检查网络连接

### 获取帮助

- 查看 [Google Analytics 帮助中心](https://support.google.com/analytics)
- 检查项目 GitHub Issues
- 联系技术支持团队