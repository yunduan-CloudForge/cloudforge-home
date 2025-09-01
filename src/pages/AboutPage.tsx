import React from 'react';
import { motion } from 'framer-motion';

const team = [
  {
    name: '张伟',
    role: '创始人 & 技术负责人',
    bio: '10年云原生开发经验，专注于微服务架构和容器技术。曾在多家知名互联网公司担任技术架构师。',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    social: {
      github: 'https://github.com/zhangwei',
      twitter: 'https://twitter.com/zhangwei',
      linkedin: 'https://linkedin.com/in/zhangwei'
    }
  },
  {
    name: '李明',
    role: '前端架构师',
    bio: '资深前端开发者，React和Vue.js专家。热衷于开源项目，贡献了多个流行的前端工具库。',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    social: {
      github: 'https://github.com/liming',
      twitter: 'https://twitter.com/liming',
      linkedin: 'https://linkedin.com/in/liming'
    }
  },
  {
    name: '王芳',
    role: '产品经理',
    bio: '拥有丰富的产品设计经验，专注于开发者工具和开源生态建设。致力于提升开发者体验。',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    social: {
      github: 'https://github.com/wangfang',
      twitter: 'https://twitter.com/wangfang',
      linkedin: 'https://linkedin.com/in/wangfang'
    }
  },
  {
    name: '陈强',
    role: '后端工程师',
    bio: 'Go和Java专家，专注于高性能系统设计和分布式架构。对云原生技术有深入研究。',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    social: {
      github: 'https://github.com/chenqiang',
      twitter: 'https://twitter.com/chenqiang',
      linkedin: 'https://linkedin.com/in/chenqiang'
    }
  },
  {
    name: '刘娜',
    role: 'DevOps 工程师',
    bio: 'Kubernetes和Docker专家，专注于CI/CD流程优化和基础设施自动化。',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    social: {
      github: 'https://github.com/liuna',
      twitter: 'https://twitter.com/liuna',
      linkedin: 'https://linkedin.com/in/liuna'
    }
  },
  {
    name: '赵磊',
    role: '社区运营',
    bio: '负责社区建设和开发者关系维护，组织技术分享和开源活动。热爱开源文化。',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    social: {
      github: 'https://github.com/zhaolei',
      twitter: 'https://twitter.com/zhaolei',
      linkedin: 'https://linkedin.com/in/zhaolei'
    }
  },
];

const timeline = [
  {
    year: '2022',
    title: '社区成立',
    description: '云锻开源社区正式成立，发布第一个开源项目CloudForge CLI。'
  },
  {
    year: '2022',
    title: '快速发展',
    description: '社区成员突破100人，GitHub Stars超过1000，发布多个核心项目。'
  },
  {
    year: '2023',
    title: '生态扩展',
    description: '建立完整的开发者生态，推出文档平台和开发者工具链。'
  },
  {
    year: '2023',
    title: '国际化',
    description: '项目获得国际关注，吸引全球开发者参与贡献。'
  },
  {
    year: '2024',
    title: '持续创新',
    description: '继续推出创新项目，建设更加完善的开源生态系统。'
  },
];

const values = [
  {
    name: '开放透明',
    description: '我们相信开放的力量，所有项目代码、决策过程和发展规划都是透明的。'
  },
  {
    name: '技术驱动',
    description: '以技术创新为核心，追求代码质量和工程实践的卓越。'
  },
  {
    name: '社区优先',
    description: '社区的需求和反馈是我们发展的重要驱动力，用户体验至上。'
  },
  {
    name: '协作共赢',
    description: '鼓励协作，分享知识，与全球开发者共同构建更好的技术生态。'
  },
];

const contactInfo = [
  {
    label: '邮箱',
    value: 'hello@cloudforge.org',
    href: 'mailto:hello@cloudforge.org'
  },
  {
    label: 'GitHub',
    value: 'github.com/cloudforge',
    href: 'https://github.com/cloudforge'
  },
  {
    label: 'Discord',
    value: 'discord.gg/cloudforge',
    href: 'https://discord.gg/cloudforge'
  },
  {
    label: 'Twitter',
    value: '@cloudforge',
    href: 'https://twitter.com/cloudforge'
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            关于我们
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            云锻开源社区致力于构建高质量的开源项目，为开发者提供创新的技术解决方案。
            我们相信开源的力量，通过协作和分享推动技术进步。
          </p>
        </div>

        {/* Mission */}
        <div className="mx-auto mt-20 max-w-4xl">
          <div className="text-center">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              我们的使命
            </h3>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              通过开源技术创新，降低开发门槛，提升开发效率，
              让每个开发者都能轻松构建高质量的应用程序。
              我们致力于建设一个开放、包容、创新的技术社区。
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mx-auto mt-20 max-w-7xl">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              核心价值观
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.name}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-4">{value.name}</h4>
                <p className="text-sm text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mx-auto mt-20 max-w-4xl">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              发展历程
            </h3>
          </div>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                className="flex gap-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex-none">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                    <span className="text-sm font-semibold text-white">{item.year}</span>
                  </div>
                </div>
                <div className="flex-auto">
                  <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
                  <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mx-auto mt-20 max-w-7xl">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              核心团队
            </h3>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              我们的团队由来自不同背景的技术专家组成，共同致力于开源事业
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-x-4 mb-4">
                  <img
                    className="h-16 w-16 rounded-full object-cover"
                    src={member.avatar}
                    alt={member.name}
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{member.name}</h4>
                    <p className="text-sm text-blue-600">{member.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{member.bio}</p>
                <div className="flex space-x-3">
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <span className="sr-only">GitHub</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <span className="sr-only">Twitter</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="mx-auto mt-20 max-w-4xl">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              联系我们
            </h3>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              有任何问题或建议？我们很乐意听到你的声音
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((contact, index) => (
              <motion.div
                key={contact.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <dt className="text-sm font-semibold text-gray-900">{contact.label}</dt>
                <dd className="mt-2">
                  <a
                    href={contact.href}
                    target={contact.href.startsWith('http') ? '_blank' : undefined}
                    rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-sm text-blue-600 hover:text-blue-500 transition-colors duration-200"
                  >
                    {contact.value}
                  </a>
                </dd>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}