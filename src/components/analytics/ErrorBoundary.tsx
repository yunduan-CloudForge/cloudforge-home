import React, { Component, ErrorInfo, ReactNode } from 'react';
import { trackEvent } from './GoogleAnalytics';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 记录错误信息
    this.setState({ error, errorInfo });

    // 调用自定义错误处理函数
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // 发送错误到 Google Analytics
    trackEvent('exception', 'Error', error.message);

    // 在开发环境中打印错误信息
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // 可以在这里添加错误报告服务
    this.reportError(error, errorInfo);
  }

  private reportError = (error: Error, errorInfo: ErrorInfo) => {
    // 这里可以集成错误报告服务，如 Sentry
    const errorReport = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // 发送到错误报告服务
    if (import.meta.env.VITE_SENTRY_DSN) {
      // 这里可以集成 Sentry 或其他错误报告服务
      console.log('Error report:', errorReport);
    }
  };

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    trackEvent('click', 'Error Recovery', 'Retry Button');
  };

  private handleReload = () => {
    trackEvent('click', 'Error Recovery', 'Reload Page');
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // 如果提供了自定义降级 UI，则使用它
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // 默认错误 UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-red-500">
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                出现了一些问题
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                很抱歉，应用遇到了意外错误。我们已经记录了这个问题。
              </p>
              
              {import.meta.env.DEV && this.state.error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md text-left">
                  <h3 className="text-sm font-medium text-red-800 mb-2">错误详情（开发模式）:</h3>
                  <p className="text-xs text-red-700 font-mono break-all">
                    {this.state.error.message}
                  </p>
                  {this.state.error.stack && (
                    <details className="mt-2">
                      <summary className="text-xs text-red-600 cursor-pointer">查看堆栈跟踪</summary>
                      <pre className="text-xs text-red-600 mt-1 whitespace-pre-wrap break-all">
                        {this.state.error.stack}
                      </pre>
                    </details>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex flex-col space-y-3">
              <button
                onClick={this.handleRetry}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                重试
              </button>
              
              <button
                onClick={this.handleReload}
                className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                刷新页面
              </button>
              
              <a
                href="/"
                className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 text-center"
              >
                返回首页
              </a>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-gray-500">
                如果问题持续存在，请{' '}
                <a
                  href="/contact"
                  className="text-blue-600 hover:text-blue-500"
                  onClick={() => trackEvent('click', 'Error Recovery', 'Contact Support')}
                >
                  联系我们
                </a>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;