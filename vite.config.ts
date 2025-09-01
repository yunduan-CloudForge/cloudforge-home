import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import { traeBadgePlugin } from 'vite-plugin-trae-solo-badge';

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/Trae_CloudForge-home/' : '/',
  build: {
    sourcemap: 'hidden',
    // 代码分割优化
    rollupOptions: {
      output: {
        // 手动分割代码块
        manualChunks: {
          // 将React相关库分离到单独的chunk
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // 将UI库分离
          'ui-vendor': ['framer-motion', '@heroicons/react'],
          // 将工具库分离
          'utils-vendor': ['@emailjs/browser']
        },
        // 优化chunk文件名
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    // 压缩配置
    minify: 'terser',
    terserOptions: {
      compress: {
        // 移除console.log
        drop_console: true,
        // 移除debugger
        drop_debugger: true,
        // 移除未使用的代码
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      }
    },
    // 设置chunk大小警告限制
    chunkSizeWarningLimit: 1000,
    // 启用CSS代码分割
    cssCodeSplit: true
  },
  // 开发服务器优化
  server: {
    // 预热常用文件
    warmup: {
      clientFiles: ['./src/main.tsx', './src/App.tsx']
    }
  },
  // 依赖优化
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      '@heroicons/react/24/outline',
      '@emailjs/browser'
    ]
  },
  plugins: [
    react({
      babel: {
        plugins: [
          'react-dev-locator',
        ],
      },
    }),
    traeBadgePlugin({
      variant: 'dark',
      position: 'bottom-right',
      prodOnly: true,
      clickable: true,
      clickUrl: 'https://www.trae.ai/solo?showJoin=1',
      autoTheme: true,
      autoThemeTarget: '#root'
    }), 
    tsconfigPaths()
  ],
})
