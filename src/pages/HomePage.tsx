import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CodeBracketIcon, DocumentTextIcon, UsersIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import SEOHead from '../components/ui/SEOHead';

const features = [
  {
    name: '开源项目',
    description: '探索我们的开源项目，包含云原生、微服务、前端框架等多个领域的创新解决方案。',
    icon: CodeBracketIcon,
    href: '/projects',
  },
  {
    name: '技术文档',
    description: '详细的技术文档、API参考和最佳实践指南，帮助开发者快速上手和深入学习。',
    icon: DocumentTextIcon,
    href: '/docs',
  },
  {
    name: '开发者社区',
    description: '加入我们的开发者社区，参与项目贡献，分享技术经验，共同推动开源生态发展。',
    icon: UsersIcon,
    href: '/community',
  },
];

const stats = [
  { name: 'GitHub Stars', value: '2.5K+' },
  { name: '项目下载量', value: '50K+' },
  { name: '活跃贡献者', value: '100+' },
  { name: '社区成员', value: '1K+' },
];

export default function HomePage() {
  return (
    <div className="bg-white">
      <SEOHead 
        title="云锻开源社区 - 专注云原生技术的开源社区"
        description="云锻开源社区致力于构建高质量的开源项目，为开发者提供创新的技术解决方案和学习资源。探索云原生、微服务、前端框架等多个领域的开源项目。"
        keywords="云锻开源社区,开源项目,云原生,微服务,前端框架,技术文档,开发者社区,GitHub,开源软件"
        type="website"
        image="https://cloudforge.org.cn/images/og-home.jpg"
      />
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-20 lg:pt-24 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-600 to-cyan-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
        
        <div className="mx-auto max-w-4xl py-16 sm:py-24 lg:py-32">
          <div className="text-center">
            <motion.h1 
              className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              云锻开源社区
            </motion.h1>
            <motion.p 
              className="mt-6 text-lg leading-8 text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              专注于云原生技术的开源社区，致力于构建高质量的开源项目，
              为开发者提供创新的技术解决方案和学习资源。
            </motion.p>
            <motion.div 
              className="mt-10 flex items-center justify-center gap-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                to="/projects"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200"
              >
                探索项目
              </Link>
              <Link
                to="/docs"
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors duration-200"
              >
                查看文档 <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-blue-600 to-cyan-400 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">快速开始</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              一切你需要的开源资源
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              从项目源码到技术文档，从社区支持到最佳实践，我们为开发者提供全方位的开源体验。
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div 
                  key={feature.name} 
                  className="flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <feature.icon className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                    <p className="mt-6">
                      <Link
                        to={feature.href}
                        className="text-sm font-semibold leading-6 text-blue-600 hover:text-blue-500 inline-flex items-center gap-1 transition-colors duration-200"
                      >
                        了解更多 <ArrowRightIcon className="h-4 w-4" />
                      </Link>
                    </p>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                社区数据
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                我们的开源项目正在被全球开发者使用和贡献
              </p>
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div 
                  key={stat.name} 
                  className="flex flex-col bg-white p-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <dt className="text-sm font-semibold leading-6 text-gray-600">{stat.name}</dt>
                  <dd className="order-first text-3xl font-bold tracking-tight text-gray-900">
                    {stat.value}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}