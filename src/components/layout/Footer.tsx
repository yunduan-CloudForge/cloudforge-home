import React from 'react';
import { Link } from 'react-router-dom';

const navigation = {
  main: [
    { name: '首页', href: '/' },
    { name: '项目', href: '/projects' },
    { name: '文档', href: '/docs' },
    { name: '社区', href: '/community' },
    { name: '下载', href: '/downloads' },
    { name: '关于我们', href: '/about' },
    { name: '联系我们', href: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <Link
                to={item.href}
                className="text-base text-gray-400 hover:text-white transition-colors duration-200"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        
        <div className="mt-8 border-t border-gray-700 pt-8">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
            <div className="flex items-center space-x-2">
              <img 
                src="/LOGO.jpg" 
                alt="云锻开源社区" 
                className="h-6 w-6 rounded object-cover"
              />
              <span className="text-gray-400 text-sm">云锻开源社区</span>
            </div>
            <p className="text-center text-xs text-gray-400">
              &copy; {new Date().getFullYear()} 云锻开源社区. 保留所有权利.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}