from flask import Flask, request, jsonify, send_from_directory
from flask_mail import Mail, Message
from flask_cors import CORS
import logging
import os

app = Flask(__name__, static_folder='.')
CORS(app, resources={r"/api/*": {"origins": "*"}})

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# 邮件配置
# 根据飞书管理后台信息优化SMTP配置
app.config['MAIL_SERVER'] = 'your_mail_server'
app.config['MAIL_PORT'] = 465  # 飞书可能使用465端口支持SSL
app.config['MAIL_USE_TLS'] = False  # 不使用TLS
app.config['MAIL_USE_SSL'] = True  # 使用SSL
app.config['MAIL_USERNAME'] = 'your_email@example.com'
app.config['MAIL_PASSWORD'] = 'your_password'
app.config['MAIL_DEFAULT_SENDER'] = 'your_email@example.com'
app.config['MAIL_MAX_EMAILS'] = 1  # 限制每次连接发送的邮件数量
app.config['MAIL_TIMEOUT'] = 60  # 增加超时时间
app.config['MAIL_DEBUG'] = True  # 启用邮件调试
app.config['MAIL_ASCII_ATTACHMENTS'] = False  # 支持非ASCII附件名

mail = Mail(app)

# 前端路由 - 提供静态文件
@app.route('/<path:path>')
def serve_static(path):
    if os.path.exists(path):
        return send_from_directory('.', path)
    else:
        return send_from_directory('.', 'index.html')

# 添加根路由，用于健康检查和提供首页
@app.route('/', methods=['GET'])
def index():
    # 检查是否是API请求
    accept_header = request.headers.get('Accept', '')
    if accept_header and 'application/json' in accept_header:
        # 添加CORS头，解决跨域问题
        response = jsonify({
            'status': 'ok',
            'message': '服务器正常运行'
        })
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    # 否则返回静态文件
    return send_from_directory('.', 'index.html')

@app.route('/api', methods=['GET', 'OPTIONS'])  # 添加OPTIONS方法支持
def api_info():
    """提供API信息"""
    # 处理CORS预检请求
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'ok'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'GET')
        return response
        
    logger.info("收到API信息请求")
    response = jsonify({
        'status': 'ok',
        'message': 'API服务正常运行',
        'endpoints': ['/api/contact'],
        'version': '1.0.0'
    })
    # 添加CORS头，解决跨域问题
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# 修改API路由处理
@app.route('/api/contact', methods=['POST', 'OPTIONS', 'GET'])  # 添加GET方法支持
# 修改联系表单处理函数中的邮件发送部分
@app.route('/api/contact', methods=['POST', 'OPTIONS', 'GET'])
def contact():
    # 处理CORS预检请求
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'ok'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Accept')
        response.headers.add('Access-Control-Allow-Methods', 'POST, GET')
        return response
    
    # 添加GET方法支持，用于测试API是否可访问
    if request.method == 'GET':
        response = jsonify({
            'status': 'ok',
            'message': '联系表单API可用，请使用POST方法提交数据',
            'example': {
                'name': '姓名',
                'email': '邮箱',
                'message': '留言内容'
            }
        })
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
        
    logger.info("收到联系表单提交")
    try:
        # 记录请求头和内容类型
        logger.info(f"请求头: {request.headers}")
        logger.info(f"内容类型: {request.content_type}")
        
        # 获取JSON数据 - 更健壮的处理
        try:
            data = request.get_json(force=True, silent=True)
            logger.info(f"原始请求数据: {request.data}")
        except Exception as e:
            logger.error(f"解析JSON失败: {str(e)}")
            data = None
            
        if not data:
            # 尝试从表单数据获取
            try:
                data = {
                    'name': request.form.get('name', ''),
                    'email': request.form.get('email', ''),
                    'message': request.form.get('message', '')
                }
                logger.info(f"从表单获取数据: {data}")
            except Exception as e:
                logger.error(f"获取表单数据失败: {str(e)}")
                response = jsonify({'success': False, 'message': '无法解析请求数据'})
                response.headers.add('Access-Control-Allow-Origin', '*')
                return response, 400
            
        logger.info(f"接收到的数据: {data}")
        
        # 验证必要字段
        required_fields = ['name', 'email', 'message']
        missing_fields = [field for field in required_fields if field not in data or not data[field]]
        if missing_fields:
            logger.warning(f"缺少必要字段: {missing_fields}")
            response = jsonify({'success': False, 'message': f'缺少必要字段: {", ".join(missing_fields)}'})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response, 400
        
        # 保存消息到本地文件
        try:
            save_message_to_file(data)
            logger.info("消息已保存到本地文件")
            
            # 尝试发送邮件，但不影响返回结果
            email_sent = False
            email_error = None
            
            try:
                # 尝试使用Flask-Mail发送
                msg = Message(
                    subject=f'云锻科技官网留言 - 来自 {data["name"]}',
                    recipients=['Reception@yunforge.xyz'],
                    body=f'''
                收到新的网站留言：
                
                姓名：{data["name"]}
                邮箱：{data["email"]}
                留言内容：
                {data["message"]}
                    '''
                )
                
                mail.send(msg)
                logger.info("邮件发送成功")
                email_sent = True
            except Exception as mail_error:
                logger.error(f"使用Flask-Mail发送邮件失败: {str(mail_error)}")
                email_error = str(mail_error)
                
                # 尝试使用备用方法
                try:
                    send_email_alternative(data)
                    logger.info("使用备用方法发送邮件成功")
                    email_sent = True
                except Exception as alt_error:
                    logger.error(f"备用方法发送邮件也失败: {str(alt_error)}")
                    email_error = str(alt_error)
            
            # 无论邮件是否发送成功，都返回成功响应
            response = jsonify({
                'success': True,
                'message': '留言已成功接收' + ('并发送邮件通知' if email_sent else '，但邮件通知发送失败'),
                'email_sent': email_sent,
                'email_error': email_error if not email_sent else None
            })
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
            
        except Exception as e:
            logger.error(f"保存消息到文件失败: {str(e)}")
            response = jsonify({'success': False, 'message': f'服务器错误: {str(e)}'})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response, 500
            
    except Exception as e:
        logger.error(f"处理联系表单时出错: {str(e)}", exc_info=True)
        response = jsonify({'success': False, 'message': f'服务器错误: {str(e)}'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response, 500

# 添加保存消息到文件的函数
def save_message_to_file(data):
    """将留言保存到本地文件"""
    import json
    import datetime
    
    # 确保messages目录存在
    if not os.path.exists('messages'):
        os.makedirs('messages')
    
    # 创建消息对象
    message = {
        'name': data['name'],
        'email': data['email'],
        'message': data['message'],
        'timestamp': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }
    
    # 生成文件名
    filename = f"messages/message_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    
    # 保存到文件
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(message, f, ensure_ascii=False, indent=2)

# 添加备用邮件发送方法
# 修改备用邮件发送方法
def send_email_alternative(data):
    """使用smtplib直接发送邮件的备用方法"""
    import smtplib
    from email.mime.text import MIMEText
    from email.mime.multipart import MIMEMultipart
    import socket
    
    # 设置socket超时
    socket.setdefaulttimeout(60)
    
    # 邮件服务器配置 - 使用SSL连接
    smtp_server = "smtp.feishu.cn"
    port = 465  # 使用SSL端口
    sender_email = "CloudForge-official@yunforge.xyz"
    password = "48TQc6oMaU6tMF1k"
    receiver_email = "Reception@yunforge.xyz"
    
    # 创建邮件
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = f'云锻科技官网留言 - 来自 {data["name"]}'
    
    # 邮件正文
    body = f'''
收到新的网站留言：

姓名：{data["name"]}
邮箱：{data["email"]}
留言内容：
{data["message"]}
    '''
    message.attach(MIMEText(body, "plain", "utf-8"))
    
    # 发送邮件
    try:
        # 创建SMTP_SSL会话
        server = smtplib.SMTP_SSL(smtp_server, port, timeout=60)
        server.set_debuglevel(1)  # 启用调试
        server.ehlo()  # 向邮件服务器标识自己
        
        # 登录
        server.login(sender_email, password)
        
        # 发送邮件
        server.sendmail(sender_email, receiver_email, message.as_string())
        
        # 关闭连接
        server.quit()
        return True
    except Exception as e:
        logger.error(f"备用邮件发送方法失败: {str(e)}")
        raise e

if __name__ == '__main__':
    logger.info("启动服务器，监听所有接口，端口5000")
    logger.info("前端和后端服务已同时启动，请访问 http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)