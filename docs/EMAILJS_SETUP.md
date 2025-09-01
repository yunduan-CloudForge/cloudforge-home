# EmailJS 配置指南

本文档介绍如何配置 EmailJS 服务来实现联系表单的邮件发送功能。

## 1. 创建 EmailJS 账户

1. 访问 [EmailJS 官网](https://www.emailjs.com/)
2. 注册一个免费账户
3. 验证您的邮箱地址

## 2. 创建邮件服务

1. 登录 EmailJS 控制台
2. 点击 "Add New Service"
3. 选择您的邮件服务提供商：
   - **Gmail** - 适用于个人 Gmail 账户
   - **Outlook** - 适用于 Outlook/Hotmail 账户
   - **飞书邮箱** - 选择 "Custom SMTP" 或 "Other"
   - 其他 SMTP 服务
4. 按照指引完成邮件服务配置
5. 记录下 **Service ID**

### 飞书自定义域名邮箱配置

如果您使用飞书自定义域名邮箱，请选择 "Custom SMTP" 并配置：

- **SMTP Server**: smtp.feishu.cn
- **Port**: 465 (SSL) 或 587 (TLS)
- **Username**: 您的完整邮箱地址（如：noreply@your-domain.com）
- **Password**: 您的邮箱密码或应用专用密码
- **Security**: SSL/TLS

**建议配置：**
- **发信邮箱**: noreply@your-domain.com（用于发送邮件）
- **接收邮箱**: contact@your-domain.com（用于接收用户消息）

### 邮箱配置说明

**发信邮箱 (noreply@your-domain.com)**:
- 在 EmailJS 服务配置中设置
- 用于系统自动发送邮件
- 建议使用 noreply 前缀，表示这是一个不接收回复的邮箱
- 需要在飞书邮箱管理中创建此邮箱账户

**接收邮箱 (contact@your-domain.com)**:
- 通过环境变量 VITE_CONTACT_EMAIL 配置
- 用于接收用户通过联系表单发送的消息
- 这是您实际查收邮件的邮箱
- 用户的消息会发送到这个邮箱地址

## 3. 创建邮件模板

1. 在控制台中点击 "Email Templates"
2. 点击 "Create New Template"
3. 设计您的邮件模板，使用以下变量：
   - `{{from_name}}` - 发送者姓名
   - `{{from_email}}` - 发送者邮箱
   - `{{subject}}` - 邮件主题
   - `{{message}}` - 邮件内容
   - `{{to_email}}` - 接收者邮箱
   - `{{reply_to}}` - 回复邮箱
   - `{{timestamp}}` - 发送时间
4. 保存模板并记录下 **Template ID**

### 推荐的邮件模板

**发信邮箱**: noreply@your-domain.com（在 EmailJS 服务配置中设置）
**接收邮箱**: {{to_email}}（通过环境变量 VITE_CONTACT_EMAIL 配置）

**主题**: 来自云锻开源社区官网的新消息 - {{subject}}

**内容**:
```
您收到了一条来自云锻开源社区官网的新消息：

发送者：{{from_name}}
邮箱：{{from_email}}
主题：{{subject}}
发送时间：{{timestamp}}

消息内容：
{{message}}

---
此邮件由 noreply@your-domain.com 自动发送
来源：云锻开源社区官网联系表单
回复邮箱：{{reply_to}}
```

## 4. 获取 Public Key

1. 在控制台中点击 "Account"
2. 找到 "API Keys" 部分
3. 复制 **Public Key**

## 5. 配置环境变量

1. 复制项目根目录下的 `.env.example` 文件为 `.env.local`
2. 填入您的配置信息：

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here

# 飞书自定义域名邮箱配置
# 接收邮箱：用于接收用户发送的消息
VITE_CONTACT_EMAIL=contact@your-domain.com
# 发信邮箱：在 EmailJS 服务配置中设置为 noreply@your-domain.com
```

## 6. 测试配置

1. 重启开发服务器
2. 访问联系我们页面
3. 填写并提交测试表单
4. 检查您的邮箱是否收到测试邮件

## 7. 安全注意事项

- **不要** 将 `.env.local` 文件提交到版本控制系统
- Public Key 可以安全地暴露在前端代码中
- 确保在 EmailJS 控制台中设置适当的域名限制
- 定期检查 EmailJS 的使用配额

## 8. 故障排除

### 常见问题

1. **邮件发送失败**
   - 检查环境变量是否正确配置
   - 确认 Service ID、Template ID 和 Public Key 是否正确
   - 检查浏览器控制台的错误信息

2. **收不到邮件**
   - 检查垃圾邮件文件夹
   - 确认邮件服务配置是否正确
   - 检查 EmailJS 控制台的发送日志

3. **配额限制**
   - EmailJS 免费账户每月有 200 封邮件的限制
   - 超出限制后需要升级到付费计划

### 调试步骤

1. 打开浏览器开发者工具
2. 查看 Console 标签页的错误信息
3. 检查 Network 标签页的请求状态
4. 在 EmailJS 控制台查看发送历史

## 9. 生产环境部署

在部署到生产环境时，确保：

1. 在部署平台（如 Vercel、Netlify）中设置环境变量
2. 在 EmailJS 控制台中添加生产域名到允许列表
3. 测试生产环境的邮件发送功能

## 支持

如果您在配置过程中遇到问题，请：

1. 查看 [EmailJS 官方文档](https://www.emailjs.com/docs/)
2. 在项目 GitHub 仓库中创建 Issue
3. 联系项目维护者