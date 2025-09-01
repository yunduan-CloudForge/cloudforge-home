import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';
import SEOHead from '../components/ui/SEOHead';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactInfo = [
  {
    icon: EnvelopeIcon,
    title: '邮箱联系',
    content: 'hello@cloudforge.org',
    description: '我们会在24小时内回复您的邮件',
    href: 'mailto:hello@cloudforge.org',
    color: 'text-blue-600'
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: '在线讨论',
    content: 'Discord 社区',
    description: '加入我们的Discord服务器进行实时交流',
    href: 'https://discord.gg/cloudforge',
    color: 'text-purple-600'
  },
  {
    icon: MapPinIcon,
    title: '办公地址',
    content: '北京市海淀区中关村软件园',
    description: '欢迎预约参观我们的办公室',
    href: '#',
    color: 'text-green-600'
  },
  {
    icon: ClockIcon,
    title: '工作时间',
    content: '周一至周五 9:00-18:00',
    description: '北京时间，节假日除外',
    href: '#',
    color: 'text-orange-600'
  }
];

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/cloudforge',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    color: 'hover:text-gray-900'
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/cloudforge',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
      </svg>
    ),
    color: 'hover:text-blue-400'
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/cloudforge',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    ),
    color: 'hover:text-indigo-500'
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/cloudforge',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    color: 'hover:text-blue-600'
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 从环境变量获取EmailJS配置
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'contact@your-domain.com';
      
      // 检查配置是否完整
      if (!serviceId || !templateId || !publicKey) {
        console.error('EmailJS配置不完整，请检查环境变量');
        throw new Error('邮件服务配置不完整');
      }
      
      // 准备邮件模板参数
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: contactEmail,
        reply_to: formData.email,
        // 添加时间戳
        timestamp: new Date().toLocaleString('zh-CN', {
          timeZone: 'Asia/Shanghai',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      };
      
      // 发送邮件
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('邮件发送失败');
      }
    } catch (error) {
      console.error('邮件发送失败:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <SEOHead 
        title="联系我们 - 云锻开源社区"
        description="联系云锻开源社区，获取技术支持、项目合作或加入我们的开发者社区。多种联系方式：邮箱、Discord社区、GitHub等。"
        keywords="联系我们,技术支持,项目合作,开发者社区,邮箱联系,Discord,GitHub,云锻开源社区"
        type="website"
        image="https://cloudforge.org.cn/images/og-contact.jpg"
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.h1
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            联系我们
          </motion.h1>
          <motion.p
            className="mt-6 text-lg leading-8 text-gray-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            有任何问题或建议？我们很乐意听到您的声音。
            选择最适合您的联系方式，我们会尽快回复。
          </motion.p>
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8">联系方式</h2>
              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    >
                      <div className={`flex-shrink-0 p-2 rounded-lg bg-gray-100 ${item.color}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                        {item.href && item.href !== '#' ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith('http') ? '_blank' : undefined}
                            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-blue-600 hover:text-blue-500 font-medium transition-colors duration-200"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <p className="text-gray-900 font-medium">{item.content}</p>
                        )}
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Social Media */}
              <div className="mt-12">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">关注我们</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-lg bg-gray-100 text-gray-600 transition-all duration-200 ${social.color} hover:bg-gray-200 hover:scale-110`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                      whileHover={{ y: -2 }}
                    >
                      <span className="sr-only">{social.name}</span>
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8">发送消息</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      姓名 *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      placeholder="请输入您的姓名"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      邮箱 *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      placeholder="请输入您的邮箱"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    主题 *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="请输入消息主题"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    消息内容 *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 resize-none"
                    placeholder="请详细描述您的问题或建议..."
                  />
                </div>
                
                {/* Submit Status */}
                {submitStatus === 'success' && (
                  <motion.div
                    className="p-4 bg-green-50 border border-green-200 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-green-800 text-sm">✅ 消息发送成功！我们会尽快回复您。</p>
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div
                    className="p-4 bg-red-50 border border-red-200 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-red-800 text-sm">❌ 发送失败，请稍后重试或直接发送邮件。</p>
                  </motion.div>
                )}
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      发送中...
                    </>
                  ) : (
                    <>
                      <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                      发送消息
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* FAQ Section */}
        <motion.div
          className="mx-auto max-w-4xl mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900">常见问题</h2>
            <p className="mt-4 text-gray-600">在联系我们之前，您可能想了解这些常见问题的答案</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">如何贡献代码？</h3>
              <p className="text-sm text-gray-600">请查看我们的贡献指南，了解如何提交Pull Request和参与开源项目。</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">商业合作咨询</h3>
              <p className="text-sm text-gray-600">如需商业合作或技术支持服务，请直接发送邮件至 business@cloudforge.org</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">技术支持</h3>
              <p className="text-sm text-gray-600">遇到技术问题？请先查看文档，或在GitHub Issues中搜索相关问题。</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">媒体采访</h3>
              <p className="text-sm text-gray-600">媒体采访和新闻发布相关事宜，请联系 media@cloudforge.org</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}