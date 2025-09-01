import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: '首页', href: '/' },
  { name: '项目', href: '/projects' },
  { name: '文档', href: '/docs' },
  { name: '社区', href: '/community' },
  { name: '下载', href: '/downloads' },
  { name: '关于我们', href: '/about' },
  { name: '联系我们', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
          : 'bg-white/80 backdrop-blur-sm'
      }`}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Link 
              to="/" 
              className="group flex items-center space-x-3 transition-all duration-300"
              aria-label="返回首页"
            >
              <div className="relative">
                <motion.img 
                  src="/LOGO.jpg" 
                  alt="云锻开源社区" 
                  className="h-10 w-10 lg:h-12 lg:w-12 rounded-xl object-cover shadow-md group-hover:shadow-lg transition-shadow duration-300"
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-blue-500/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="hidden sm:block">
                <motion.span 
                  className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  云锻开源社区
                </motion.span>
                <div className="text-xs text-gray-500 font-medium tracking-wide">CloudForge OSS</div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group ${
                      isActive
                        ? 'text-blue-600 bg-blue-50/80'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50/80'
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-lg"
                        layoutId="activeTab"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <motion.div
                      className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full group-hover:left-0 transition-all duration-300"
                      whileHover={{ width: '100%', left: 0 }}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* GitHub Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <a
                href="https://github.com/yunduan-CloudForge"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center px-4 py-2 lg:px-6 lg:py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                aria-label="访问GitHub"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <svg className="relative z-10 w-4 h-4 lg:w-5 lg:h-5 mr-2 transition-transform duration-300 group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="relative z-10 hidden sm:inline">GitHub</span>
              </a>
            </motion.div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <motion.button
                type="button"
                className="relative inline-flex items-center justify-center p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100/80 rounded-xl transition-all duration-300"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <span className="sr-only">{mobileMenuOpen ? '关闭主菜单' : '打开主菜单'}</span>
                <motion.div
                  animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {mobileMenuOpen ? (
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  )}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-xl"
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="px-4 py-6 space-y-2">
                {navigation.map((item, index) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        to={item.href}
                        className={`block px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 ${
                          isActive
                            ? 'text-blue-600 bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50/80'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  );
                })}
                
                {/* Mobile GitHub Link */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: navigation.length * 0.1 }}
                  className="pt-4 border-t border-gray-200/50"
                >
                  <a
                    href="https://github.com/yunduan-CloudForge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50/80 rounded-xl transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                    访问 GitHub
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}