import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CodeBracketIcon, 
  DocumentTextIcon, 
  BugAntIcon, 
  LightBulbIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const contributionTypes = [
  {
    name: '代码贡献',
    description: '提交代码、修复bug、实现新功能',
    icon: CodeBracketIcon,
    color: 'bg-blue-50 text-blue-600',
    actions: [
      'Fork 项目仓库',
      '创建功能分支',
      '提交 Pull Request',
      '参与代码审查'
    ]
  },
  {
    name: '文档改进',
    description: '完善文档、翻译内容、编写教程',
    icon: DocumentTextIcon,
    color: 'bg-green-50 text-green-600',
    actions: [
      '改进现有文档',
      '编写新教程',
      '翻译文档内容',
      '优化文档结构'
    ]
  },
  {
    name: 'Bug 报告',
    description: '发现并报告问题，帮助改进项目质量',
    icon: BugAntIcon,
    color: 'bg-red-50 text-red-600',
    actions: [
      '详细描述问题',
      '提供复现步骤',
      '附加相关日志',
      '验证修复结果'
    ]
  },
  {
    name: '功能建议',
    description: '提出新功能想法，参与产品设计讨论',
    icon: LightBulbIcon,
    color: 'bg-yellow-50 text-yellow-600',
    actions: [
      '提出功能需求',
      '参与设计讨论',
      '评估技术方案',
      '收集用户反馈'
    ]
  },
  {
    name: '社区支持',
    description: '帮助其他用户解决问题，分享经验',
    icon: ChatBubbleLeftRightIcon,
    color: 'bg-purple-50 text-purple-600',
    actions: [
      '回答用户问题',
      '分享使用经验',
      '组织技术分享',
      '维护社区秩序'
    ]
  },
  {
    name: '技术布道',
    description: '推广项目，撰写技术文章，参与会议',
    icon: AcademicCapIcon,
    color: 'bg-indigo-50 text-indigo-600',
    actions: [
      '撰写技术博客',
      '参与技术会议',
      '制作视频教程',
      '社交媒体推广'
    ]
  },
];

const guidelines = [
  {
    title: '代码规范',
    items: [
      '遵循项目的编码风格和命名约定',
      '编写清晰的注释和文档',
      '确保代码通过所有测试',
      '保持提交信息的清晰和规范'
    ]
  },
  {
    title: 'PR 流程',
    items: [
      '在开始工作前先创建 Issue 讨论',
      '保持 PR 的小而专注',
      '提供详细的 PR 描述',
      '及时响应审查意见'
    ]
  },
  {
    title: '社区准则',
    items: [
      '保持友善和尊重的态度',
      '建设性地提供反馈',
      '帮助新手融入社区',
      '遵守开源许可证条款'
    ]
  }
];

const resources = [
  {
    name: 'GitHub 仓库',
    description: '查看源代码，提交 Issue 和 PR',
    href: 'https://github.com/cloudforge',
    external: true
  },
  {
    name: 'Discord 社区',
    description: '实时交流，获取帮助和分享经验',
    href: 'https://discord.gg/cloudforge',
    external: true
  },
  {
    name: '贡献者指南',
    description: '详细的贡献流程和规范说明',
    href: '/docs/contributing',
    external: false
  },
  {
    name: '开发环境搭建',
    description: '本地开发环境的配置指南',
    href: '/docs/development-setup',
    external: false
  }
];

export default function CommunityPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            加入我们的社区
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            云锻开源社区欢迎所有形式的贡献。无论你是经验丰富的开发者还是刚入门的新手，
            都可以在这里找到适合自己的参与方式。
          </p>
        </div>

        {/* Contribution Types */}
        <div className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-3">
          {contributionTypes.map((type, index) => (
            <motion.div
              key={type.name}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-x-3 mb-4">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${type.color}`}>
                  <type.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{type.name}</h3>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
              </div>
              
              <ul className="space-y-2">
                {type.actions.map((action, actionIndex) => (
                  <li key={actionIndex} className="flex items-center text-sm text-gray-600">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {action}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Guidelines */}
        <div className="mt-20">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              贡献指南
            </h3>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              为了确保项目的质量和社区的和谐，请遵循以下指南
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {guidelines.map((guideline, index) => (
              <motion.div
                key={guideline.title}
                className="bg-gray-50 rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-4">{guideline.title}</h4>
                <ul className="space-y-3">
                  {guideline.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start text-sm text-gray-600">
                      <svg className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="mt-20">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              有用资源
            </h3>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              这些资源将帮助你更好地参与社区贡献
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {resource.external ? (
                  <a
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 group"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                      {resource.name}
                    </h4>
                    <p className="mt-2 text-sm text-gray-600">{resource.description}</p>
                    <div className="mt-4 flex items-center text-sm text-blue-600 group-hover:text-blue-500">
                      <span>访问链接</span>
                      <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </a>
                ) : (
                  <Link
                    to={resource.href}
                    className="block bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 group"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                      {resource.name}
                    </h4>
                    <p className="mt-2 text-sm text-gray-600">{resource.description}</p>
                    <div className="mt-4 flex items-center text-sm text-blue-600 group-hover:text-blue-500">
                      <span>查看详情</span>
                      <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="mx-auto max-w-2xl">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              准备好开始贡献了吗？
            </h3>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              选择一个你感兴趣的项目，阅读贡献指南，然后开始你的开源之旅吧！
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <Link
                to="/projects"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200"
              >
                浏览项目
              </Link>
              <a
                href="https://github.com/cloudforge"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors duration-200"
              >
                访问 GitHub <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}