# 部署指南

本项目支持多种部署方式，推荐使用 Vercel 进行自动化部署。

## 🚀 Vercel 部署（推荐）

### 1. 手动部署

#### 前置条件
- 安装 [Vercel CLI](https://vercel.com/cli)
- 拥有 Vercel 账户

#### 部署步骤
```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 部署项目
vercel

# 生产环境部署
vercel --prod
```

### 2. 自动化部署（CI/CD）

#### GitHub Actions 配置

项目已配置 GitHub Actions 工作流，支持：
- **Pull Request**: 自动创建预览部署
- **Main/Master 分支**: 自动部署到生产环境

#### 必需的 GitHub Secrets

在 GitHub 仓库设置中添加以下 Secrets：

```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

#### 获取 Vercel 配置信息

1. **获取 Vercel Token**:
   - 访问 [Vercel Tokens](https://vercel.com/account/tokens)
   - 创建新的 Token

2. **获取 Organization ID 和 Project ID**:
   ```bash
   # 在项目根目录运行
   vercel link
   
   # 查看 .vercel/project.json 文件
   cat .vercel/project.json
   ```

#### 工作流程

1. **代码提交到 main/master 分支**:
   - 自动运行测试
   - 类型检查和代码检查
   - 构建项目
   - 部署到生产环境

2. **创建 Pull Request**:
   - 运行相同的测试流程
   - 创建预览部署
   - 在 PR 中自动评论预览链接

## 🔧 其他部署选项

### Netlify 部署

1. 连接 GitHub 仓库到 Netlify
2. 配置构建设置：
   - **Build command**: `pnpm build`
   - **Publish directory**: `dist`
   - **Node version**: `18`

### 静态文件服务器

```bash
# 构建项目
pnpm build

# 使用任何静态文件服务器托管 dist 目录
# 例如使用 serve
npx serve dist
```

### Docker 部署

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🌍 环境变量配置

### 生产环境变量

在部署平台中配置以下环境变量：

```bash
# EmailJS 配置（如果使用邮件功能）
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_CONTACT_EMAIL=hello@cloudforge.org

# 其他配置
NODE_ENV=production
```

### 本地开发环境

创建 `.env.local` 文件：

```bash
# 复制环境变量模板
cp .env.example .env.local

# 编辑配置
vim .env.local
```

## 📊 部署监控

### 构建状态检查

- GitHub Actions 提供构建状态
- Vercel Dashboard 显示部署历史
- 自动错误通知

### 性能监控

- Vercel Analytics（自动启用）
- Web Vitals 监控
- 错误追踪

## 🔍 故障排除

### 常见问题

1. **构建失败**:
   ```bash
   # 本地测试构建
   pnpm build
   
   # 检查类型错误
   pnpm run check
   
   # 检查代码规范
   pnpm run lint
   ```

2. **环境变量问题**:
   - 确保所有必需的环境变量已配置
   - 检查变量名称拼写
   - 验证变量值格式

3. **路由问题**:
   - 确保 SPA 路由配置正确
   - 检查 `vercel.json` 中的 rewrites 规则

4. **缓存问题**:
   ```bash
   # 清除 Vercel 缓存
   vercel --force
   
   # 清除本地缓存
   pnpm store prune
   rm -rf node_modules
   pnpm install
   ```

### 调试技巧

1. **查看构建日志**:
   - GitHub Actions 日志
   - Vercel 部署日志
   - 浏览器开发者工具

2. **本地预览生产构建**:
   ```bash
   pnpm build
   pnpm preview
   ```

3. **检查网络请求**:
   - 使用浏览器开发者工具
   - 检查 API 调用
   - 验证资源加载

## 📋 部署检查清单

- [ ] 代码通过所有测试
- [ ] 类型检查无错误
- [ ] 代码规范检查通过
- [ ] 环境变量已配置
- [ ] 构建成功
- [ ] 预览部署正常
- [ ] 生产部署正常
- [ ] 所有页面可访问
- [ ] 表单功能正常
- [ ] 邮件发送功能正常
- [ ] 移动端适配正常
- [ ] SEO 元数据正确
- [ ] 性能指标达标

## 🔄 回滚策略

### Vercel 回滚

```bash
# 查看部署历史
vercel ls

# 回滚到指定版本
vercel rollback [deployment-url]
```

### GitHub 回滚

```bash
# 回滚到上一个提交
git revert HEAD
git push origin main

# 回滚到指定提交
git revert [commit-hash]
git push origin main
```

## 📞 支持

如果在部署过程中遇到问题，请：

1. 查看本文档的故障排除部分
2. 检查 GitHub Issues
3. 联系技术支持团队
4. 提交新的 Issue（包含详细的错误信息）