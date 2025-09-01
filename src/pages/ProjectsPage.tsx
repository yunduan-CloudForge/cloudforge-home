import React from 'react';
import { Link } from 'react-router-dom';
import { StarIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import SEOHead from '../components/ui/SEOHead';

const projects = [
  {
    id: 'cloudforge-cli',
    name: 'CloudForge CLI',
    description: '强大的云原生开发工具，支持多云部署、容器编排和微服务管理。',
    language: 'Go',
    stars: 1200,
    forks: 180,
    status: 'active',
    tags: ['CLI', '云原生', 'DevOps'],
    lastUpdate: '2024-01-15',
  },
  {
    id: 'react-ui-kit',
    name: 'React UI Kit',
    description: '现代化的React组件库，基于TailwindCSS构建，提供丰富的UI组件。',
    language: 'TypeScript',
    stars: 850,
    forks: 120,
    status: 'active',
    tags: ['React', 'UI', 'TypeScript'],
    lastUpdate: '2024-01-12',
  },
  {
    id: 'microservice-framework',
    name: 'Microservice Framework',
    description: '轻量级微服务框架，支持服务发现、负载均衡和分布式追踪。',
    language: 'Java',
    stars: 650,
    forks: 95,
    status: 'active',
    tags: ['微服务', 'Java', 'Spring'],
    lastUpdate: '2024-01-10',
  },
  {
    id: 'data-pipeline',
    name: 'Data Pipeline',
    description: '高性能数据处理管道，支持实时数据流处理和批量数据分析。',
    language: 'Python',
    stars: 420,
    forks: 68,
    status: 'beta',
    tags: ['数据处理', 'Python', 'ETL'],
    lastUpdate: '2024-01-08',
  },
  {
    id: 'monitoring-dashboard',
    name: 'Monitoring Dashboard',
    description: '可视化监控面板，提供系统性能监控、日志分析和告警功能。',
    language: 'Vue.js',
    stars: 380,
    forks: 52,
    status: 'active',
    tags: ['监控', 'Vue.js', '可视化'],
    lastUpdate: '2024-01-05',
  },
  {
    id: 'api-gateway',
    name: 'API Gateway',
    description: '高性能API网关，支持路由、认证、限流和API版本管理。',
    language: 'Node.js',
    stars: 290,
    forks: 41,
    status: 'active',
    tags: ['API', 'Node.js', '网关'],
    lastUpdate: '2024-01-03',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'beta':
      return 'bg-yellow-100 text-yellow-800';
    case 'archived':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getLanguageColor = (language: string) => {
  const colors: { [key: string]: string } = {
    'TypeScript': 'bg-blue-100 text-blue-800',
    'JavaScript': 'bg-yellow-100 text-yellow-800',
    'Python': 'bg-green-100 text-green-800',
    'Go': 'bg-cyan-100 text-cyan-800',
    'Java': 'bg-red-100 text-red-800',
    'Vue.js': 'bg-emerald-100 text-emerald-800',
    'Node.js': 'bg-lime-100 text-lime-800',
  };
  return colors[language] || 'bg-gray-100 text-gray-800';
};

export default function ProjectsPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <SEOHead 
        title="开源项目 - 云锻开源社区"
        description="探索云锻开源社区的开源项目，涵盖云原生、前端框架、数据处理等多个技术领域。包括CloudForge CLI、React UI Kit、微服务框架等高质量开源项目。"
        keywords="开源项目,CloudForge CLI,React UI Kit,微服务框架,云原生,前端框架,数据处理,GitHub开源"
        type="website"
        image="https://cloudforge.org.cn/images/og-projects.jpg"
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            开源项目
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            探索我们的开源项目，涵盖云原生、前端框架、数据处理等多个技术领域。
            所有项目都在GitHub上开源，欢迎贡献代码。
          </p>
        </div>

        {/* Projects Grid */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              className="flex flex-col items-start justify-between bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-x-4 text-xs w-full">
                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getLanguageColor(project.language)}`}>
                  {project.language}
                </span>
                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
                <time dateTime={project.lastUpdate} className="text-gray-500 ml-auto">
                  {new Date(project.lastUpdate).toLocaleDateString('zh-CN')}
                </time>
              </div>
              
              <div className="group relative mt-4 w-full">
                <h3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                  <Link to={`/projects/${project.id}`}>
                    <span className="absolute inset-0" />
                    {project.name}
                  </Link>
                </h3>
                <p className="mt-3 text-sm leading-6 text-gray-600 line-clamp-3">
                  {project.description}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-x-4 mt-6 text-sm text-gray-500 w-full">
                <div className="flex items-center gap-x-1">
                  <StarIcon className="h-4 w-4" />
                  <span>{project.stars}</span>
                </div>
                <div className="flex items-center gap-x-1">
                  <CodeBracketIcon className="h-4 w-4" />
                  <span>{project.forks}</span>
                </div>
                <Link
                  to={`/projects/${project.id}`}
                  className="ml-auto text-blue-600 hover:text-blue-500 font-medium transition-colors duration-200"
                >
                  查看详情 →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="mx-auto max-w-2xl">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              想要贡献代码？
            </h3>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              我们欢迎所有形式的贡献，从代码提交到文档改进，从bug报告到功能建议。
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <Link
                to="/community"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200"
              >
                加入社区
              </Link>
              <a
                href="https://github.com/cloudforge"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors duration-200"
              >
                访问GitHub <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}