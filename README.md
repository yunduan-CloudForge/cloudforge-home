# 为云锻科技官网项目创建README.md

根据您的项目结构和内容，我为您创建一个适合的README.md文件，包含项目介绍、功能特点、安装说明和使用方法等内容。

```markdown:d:\云锻科技\官网\README.md
# 云锻开源团队官网

## 项目介绍

云锻开源团队官网是一个基于Flask的全栈网站项目，旨在展示云锻开源团队的使命、愿景、项目和团队成员，同时提供联系表单功能，方便访问者与团队取得联系。

![云锻开源团队官网](images/project1.jpg)

## 功能特点

- **响应式设计**：适配各种设备屏幕尺寸
- **单页应用**：流畅的用户体验
- **联系表单**：访客可以直接在网站上发送留言
- **邮件通知**：自动发送邮件通知团队成员
- **API接口**：提供RESTful API接口
- **CORS支持**：支持跨域资源共享
- **本地存储**：留言内容保存到本地文件

## 技术栈

- **前端**：HTML5, CSS3, JavaScript
- **后端**：Python, Flask
- **邮件服务**：Flask-Mail
- **API**：RESTful API
- **部署**：支持Docker部署

## 目录结构

```
云锻科技/官网/
├── app.py                 # Flask应用主文件
├── index.html             # 网站首页
├── about.html             # 关于我们页面
├── contact.html           # 联系我们页面
├── css/                   # CSS样式文件
│   └── style.css          # 主样式文件
├── js/                    # JavaScript文件
│   ├── main.js            # 主脚本文件
│   └── backend-status.js  # 后端状态检测脚本
├── images/                # 图片资源
├── messages/              # 存储留言的目录
└── README.md              # 项目说明文档
```

## 安装说明

### 环境要求

- Python 3.8+
- pip 包管理工具

### 安装步骤

1. 克隆仓库到本地

```bash
git clone https://github.com/yunduan-CloudForge/website.git
cd website
```

2. 安装依赖包

```bash
pip install -r requirements.txt
```

如果没有requirements.txt文件，请安装以下依赖：

```bash
pip install flask flask-mail flask-cors
```

3. 配置邮件服务

编辑`app.py`文件，修改邮件配置部分：

```python
# 邮件配置
app.config['MAIL_SERVER'] = 'your_mail_server'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = 'your_email@example.com'
app.config['MAIL_PASSWORD'] = 'your_password'
```

## 使用方法

### 本地运行

```bash
python app.py
```

服务器将在 http://localhost:5000 启动。

### 部署到生产环境

推荐使用Gunicorn和Nginx进行部署：

```bash
gunicorn -w 4 -b 127.0.0.1:5000 app:app
```

然后配置Nginx反向代理到该地址。

## API文档

### 获取API信息

```
GET /api
```

返回API基本信息和可用端点。

### 联系表单提交

```
POST /api/contact
```

请求体示例：

```json
{
  "name": "姓名",
  "email": "邮箱",
  "message": "留言内容"
}
```

## 贡献指南

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个 Pull Request

## 联系我们

- 官方网站：[https://www.yunforge.xyz](https://www.yunforge.xyz)
- 邮箱：CloudForge-official@yunforge.xyz
- QQ群：[点击加入](https://qm.qq.com/q/lvISn1GCZ4)

## 许可证

本项目采用 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件。

## 致谢

感谢所有为云锻开源团队做出贡献的开发者和社区成员！
```

这个README.md文件包含了项目的基本信息、功能特点、技术栈、安装和使用方法、API文档以及贡献指南等内容，适合放在您的项目根目录下，帮助其他开发者了解和使用您的项目。您可以根据实际情况进一步调整和完善。