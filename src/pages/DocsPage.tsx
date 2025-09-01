import React from 'react';
import { Link } from 'react-router-dom';
import { DocumentTextIcon, BookOpenIcon, CodeBracketIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const docCategories = [
  {
    name: '快速开始',
    description: '从安装到第一个项目，快速上手我们的开源工具',
    icon: BookOpenIcon,
    color: 'bg-blue-50 text-blue-600',
    docs: [
      { title: '安装指南', href: '/docs/getting-started/installation', description: '详细的安装步骤和环境配置' },
      { title: '快速开始', href: '/docs/getting-started/quick-start', description: '5分钟创建你的第一个项目' },
      { title: '基础概念', href: '/docs/getting-started/concepts', description: '了解核心概念和架构设计' },
    ],
  },
  {
    name: 'API 参考',
    description: '完整的API文档和接口说明',
    icon: CodeBracketIcon,
    color: 'bg-green-50 text-green-600',
    docs: [
      { title: 'REST API', href: '/docs/api/rest', description: 'RESTful API接口文档' },
      { title: 'GraphQL API', href: '/docs/api/graphql', description: 'GraphQL查询和变更操作' },
      { title: 'WebSocket API', href: '/docs/api/websocket', description: '实时通信接口文档' },
      { title: 'SDK 参考', href: '/docs/api/sdk', description: '各语言SDK使用指南' },
    ],
  },
  {
    name: '开发指南',
    description: '深入的开发教程和最佳实践',
    icon: DocumentTextIcon,
    color: 'bg-purple-50 text-purple-600',
    docs: [
      { title: '架构设计', href: '/docs/guides/architecture', description: '系统架构和设计模式' },
      { title: '部署指南', href: '/docs/guides/deployment', description: '生产环境部署最佳实践' },
      { title: '性能优化', href: '/docs/guides/performance', description: '性能调优和监控指南' },
      { title: '安全指南', href: '/docs/guides/security', description: '安全配置和防护措施' },
    ],
  },
  {
    name: '常见问题',
    description: '常见问题解答和故障排除',
    icon: QuestionMarkCircleIcon,
    color: 'bg-orange-50 text-orange-600',
    docs: [
      { title: '安装问题', href: '/docs/faq/installation', description: '安装过程中的常见问题' },
      { title: '配置问题', href: '/docs/faq/configuration', description: '配置相关的疑难解答' },
      { title: '性能问题', href: '/docs/faq/performance', description: '性能问题诊断和解决' },
      { title: '错误排查', href: '/docs/faq/troubleshooting', description: '常见错误和解决方案' },
    ],
  },
];

const popularDocs = [
  { title: '快速开始指南', href: '/docs/getting-started/quick-start', views: '12.5K' },
  { title: 'API 认证', href: '/docs/api/authentication', views: '8.2K' },
  { title: '部署到生产环境', href: '/docs/guides/deployment', views: '6.8K' },
  { title: '性能优化技巧', href: '/docs/guides/performance', views: '5.4K' },
  { title: '常见错误解决', href: '/docs/faq/troubleshooting', views: '4.9K' },
];

export default function DocsPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            技术文档
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            从快速开始到深入指南，这里有你需要的所有技术文档。
            我们提供详细的API参考、开发教程和最佳实践。
          </p>
        </div>

        {/* Search Bar */}
        <div className="mx-auto mt-12 max-w-xl">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索文档..."
              className="block w-full rounded-md border-0 py-3 pl-4 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Documentation Categories */}
        <div className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {docCategories.map((category, index) => (
            <motion.div
              key={category.name}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-x-3 mb-4">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${category.color}`}>
                  <category.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              </div>
              
              <ul className="space-y-3">
                {category.docs.map((doc) => (
                  <li key={doc.href}>
                    <Link
                      to={doc.href}
                      className="block group hover:bg-gray-50 rounded-md p-3 transition-colors duration-200"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                            {doc.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">{doc.description}</p>
                        </div>
                        <svg className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Popular Documentation */}
        <div className="mt-20">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
              热门文档
            </h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <ul className="space-y-4">
                {popularDocs.map((doc, index) => (
                  <motion.li
                    key={doc.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Link
                      to={doc.href}
                      className="flex items-center justify-between p-3 bg-white rounded-md hover:bg-blue-50 transition-colors duration-200 group"
                    >
                      <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                        {doc.title}
                      </span>
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs text-gray-500">{doc.views} 次查看</span>
                        <svg className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="mx-auto max-w-2xl">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              没有找到你需要的文档？
            </h3>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              我们持续改进文档质量，如果你有任何建议或发现了错误，请告诉我们。
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <Link
                to="/community"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200"
              >
                反馈建议
              </Link>
              <a
                href="https://github.com/cloudforge/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors duration-200"
              >
                编辑文档 <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}