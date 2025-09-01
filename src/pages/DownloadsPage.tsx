import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon, ArrowDownTrayIcon, CalendarIcon, TagIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface Version {
  id: string;
  version: string;
  releaseDate: string;
  downloadUrl: string;
  changelog: string[];
  fileSize: string;
  isStable: boolean;
  isLatest: boolean;
}

interface Project {
  id: string;
  name: string;
  description: string;
  icon: string;
  versions: Version[];
}

const projects: Project[] = [
  {
    id: 'cloudforge-cli',
    name: 'CloudForge CLI',
    description: '强大的云原生开发命令行工具，简化容器化应用的开发和部署流程。',
    icon: '🛠️',
    versions: [
      {
        id: 'v2.1.0',
        version: '2.1.0',
        releaseDate: '2024-01-15',
        downloadUrl: 'https://github.com/cloudforge/cli/releases/download/v2.1.0/cloudforge-cli-v2.1.0.tar.gz',
        changelog: [
          '新增 Docker Compose 支持',
          '优化构建性能，提升 30% 构建速度',
          '修复 Windows 平台兼容性问题',
          '新增配置文件验证功能'
        ],
        fileSize: '15.2 MB',
        isStable: true,
        isLatest: true
      },
      {
        id: 'v2.0.5',
        version: '2.0.5',
        releaseDate: '2023-12-20',
        downloadUrl: 'https://github.com/cloudforge/cli/releases/download/v2.0.5/cloudforge-cli-v2.0.5.tar.gz',
        changelog: [
          '修复安全漏洞',
          '更新依赖包版本',
          '改进错误提示信息'
        ],
        fileSize: '14.8 MB',
        isStable: true,
        isLatest: false
      }
    ]
  },
  {
    id: 'cloudforge-ui',
    name: 'CloudForge UI',
    description: '现代化的 React 组件库，为云原生应用提供一致的用户界面设计。',
    icon: '🎨',
    versions: [
      {
        id: 'v1.5.2',
        version: '1.5.2',
        releaseDate: '2024-01-10',
        downloadUrl: 'https://github.com/cloudforge/ui/releases/download/v1.5.2/cloudforge-ui-v1.5.2.tar.gz',
        changelog: [
          '新增暗色主题支持',
          '优化表格组件性能',
          '新增图表组件',
          '修复表单验证问题'
        ],
        fileSize: '8.7 MB',
        isStable: true,
        isLatest: true
      },
      {
        id: 'v1.4.8',
        version: '1.4.8',
        releaseDate: '2023-11-25',
        downloadUrl: 'https://github.com/cloudforge/ui/releases/download/v1.4.8/cloudforge-ui-v1.4.8.tar.gz',
        changelog: [
          '修复按钮组件样式问题',
          '更新 TypeScript 类型定义',
          '改进响应式布局'
        ],
        fileSize: '8.2 MB',
        isStable: true,
        isLatest: false
      }
    ]
  },
  {
    id: 'cloudforge-sdk',
    name: 'CloudForge SDK',
    description: '多语言 SDK，帮助开发者快速集成云锻开源项目的核心功能。',
    icon: '📦',
    versions: [
      {
        id: 'v3.0.0-beta.1',
        version: '3.0.0-beta.1',
        releaseDate: '2024-01-20',
        downloadUrl: 'https://github.com/cloudforge/sdk/releases/download/v3.0.0-beta.1/cloudforge-sdk-v3.0.0-beta.1.tar.gz',
        changelog: [
          '重构核心 API',
          '新增 Python 和 Go 语言支持',
          '改进错误处理机制',
          '新增异步操作支持'
        ],
        fileSize: '12.5 MB',
        isStable: false,
        isLatest: true
      },
      {
        id: 'v2.8.3',
        version: '2.8.3',
        releaseDate: '2023-12-15',
        downloadUrl: 'https://github.com/cloudforge/sdk/releases/download/v2.8.3/cloudforge-sdk-v2.8.3.tar.gz',
        changelog: [
          '修复内存泄漏问题',
          '优化网络请求性能',
          '更新文档和示例'
        ],
        fileSize: '11.8 MB',
        isStable: true,
        isLatest: false
      }
    ]
  }
];

const VersionCard: React.FC<{ version: Version; projectName: string }> = ({ version, projectName }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <TagIcon className="h-5 w-5 text-blue-600" />
            <span className="text-lg font-semibold text-gray-900">
              {projectName} v{version.version}
            </span>
          </div>
          <div className="flex space-x-2">
            {version.isLatest && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                最新版本
              </span>
            )}
            {version.isStable ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <CheckCircleIcon className="h-3 w-3 mr-1" />
                稳定版
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                测试版
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center text-sm text-gray-500 mb-1">
            <CalendarIcon className="h-4 w-4 mr-1" />
            {version.releaseDate}
          </div>
          <div className="text-sm text-gray-500">{version.fileSize}</div>
        </div>
      </div>

      <div className="mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <ChevronDownIcon
            className={`h-4 w-4 mr-1 transform transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
          更新日志
        </button>
        {isExpanded && (
          <motion.div
            className="mt-3 pl-5"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="space-y-1">
              {version.changelog.map((change, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  {change}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>

      <div className="flex justify-end">
        <a
          href={version.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
          下载
        </a>
      </div>
    </motion.div>
  );
};

const ProjectSection: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="mb-12">
      <div className="flex items-center mb-6">
        <span className="text-3xl mr-3">{project.icon}</span>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{project.name}</h3>
          <p className="text-gray-600 mt-1">{project.description}</p>
        </div>
      </div>
      <div className="grid gap-6">
        {project.versions.map((version) => (
          <VersionCard
            key={version.id}
            version={version}
            projectName={project.name}
          />
        ))}
      </div>
    </div>
  );
};

export default function DownloadsPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.h1
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            下载中心
          </motion.h1>
          <motion.p
            className="mt-6 text-lg leading-8 text-gray-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            获取云锻开源社区的最新项目版本，包含详细的更新日志和下载链接。
            所有项目都经过严格测试，确保稳定性和安全性。
          </motion.p>
        </div>

        {/* Installation Guide */}
        <motion.div
          className="mx-auto max-w-4xl mb-16 bg-blue-50 border border-blue-200 rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-blue-900 mb-4">安装指南</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-blue-800 mb-2">使用包管理器安装</h4>
              <div className="bg-blue-100 rounded p-3 font-mono text-sm text-blue-900">
                npm install -g @cloudforge/cli<br />
                yarn global add @cloudforge/cli
              </div>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">手动下载安装</h4>
              <div className="bg-blue-100 rounded p-3 font-mono text-sm text-blue-900">
                wget [下载链接]<br />
                tar -xzf cloudforge-*.tar.gz
              </div>
            </div>
          </div>
        </motion.div>

        {/* Projects */}
        <div className="mx-auto max-w-6xl">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <ProjectSection project={project} />
            </motion.div>
          ))}
        </div>

        {/* Support */}
        <motion.div
          className="mx-auto max-w-4xl mt-16 text-center bg-white border border-gray-200 rounded-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">需要帮助？</h3>
          <p className="text-gray-600 mb-6">
            如果在下载或安装过程中遇到问题，请查看我们的文档或联系社区支持。
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/docs"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              查看文档
            </a>
            <a
              href="/community"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              社区支持
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}