// Web Vitals 性能监控工具

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

interface WebVitalsConfig {
  enableLogging?: boolean;
  enableAnalytics?: boolean;
  analyticsEndpoint?: string;
}

class PerformanceMonitor {
  private config: WebVitalsConfig;
  private metrics: PerformanceMetric[] = [];

  constructor(config: WebVitalsConfig = {}) {
    this.config = {
      enableLogging: true,
      enableAnalytics: false,
      ...config
    };
  }

  // 获取性能评级
  private getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    const thresholds = {
      CLS: { good: 0.1, poor: 0.25 },
      FID: { good: 100, poor: 300 },
      FCP: { good: 1800, poor: 3000 },
      LCP: { good: 2500, poor: 4000 },
      TTFB: { good: 800, poor: 1800 }
    };

    const threshold = thresholds[name as keyof typeof thresholds];
    if (!threshold) return 'good';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  // 记录性能指标
  private recordMetric(name: string, value: number) {
    const metric: PerformanceMetric = {
      name,
      value,
      rating: this.getRating(name, value),
      timestamp: Date.now()
    };

    this.metrics.push(metric);

    if (this.config.enableLogging) {
      console.log(`[Performance] ${name}: ${value}ms (${metric.rating})`);
    }

    if (this.config.enableAnalytics && this.config.analyticsEndpoint) {
      this.sendToAnalytics(metric);
    }
  }

  // 发送数据到分析服务
  private async sendToAnalytics(metric: PerformanceMetric) {
    try {
      await fetch(this.config.analyticsEndpoint!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...metric,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error('Failed to send performance data:', error);
    }
  }

  // 监控 Largest Contentful Paint (LCP)
  public observeLCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.recordMetric('LCP', lastEntry.startTime);
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }

  // 监控 First Input Delay (FID)
  public observeFID() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          this.recordMetric('FID', entry.processingStart - entry.startTime);
        });
      });
      observer.observe({ entryTypes: ['first-input'] });
    }
  }

  // 监控 Cumulative Layout Shift (CLS)
  public observeCLS() {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        this.recordMetric('CLS', clsValue);
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    }
  }

  // 监控 First Contentful Paint (FCP)
  public observeFCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            this.recordMetric('FCP', entry.startTime);
          }
        });
      });
      observer.observe({ entryTypes: ['paint'] });
    }
  }

  // 监控 Time to First Byte (TTFB)
  public observeTTFB() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navigationEntries.length > 0) {
        const entry = navigationEntries[0];
        const ttfb = entry.responseStart - entry.requestStart;
        this.recordMetric('TTFB', ttfb);
      }
    }
  }

  // 监控资源加载性能
  public observeResourceTiming() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const resource = entry as PerformanceResourceTiming;
          const loadTime = resource.responseEnd - resource.startTime;
          
          if (this.config.enableLogging && loadTime > 1000) {
            console.log(`[Performance] Slow resource: ${resource.name} (${loadTime.toFixed(2)}ms)`);
          }
        });
      });
      observer.observe({ entryTypes: ['resource'] });
    }
  }

  // 启动所有性能监控
  public startMonitoring() {
    this.observeLCP();
    this.observeFID();
    this.observeCLS();
    this.observeFCP();
    this.observeTTFB();
    this.observeResourceTiming();

    // 页面卸载时记录总体性能
    window.addEventListener('beforeunload', () => {
      this.recordPagePerformance();
    });
  }

  // 记录页面整体性能
  private recordPagePerformance() {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        const pageLoadTime = navigation.loadEventEnd - navigation.fetchStart;
        const domContentLoadedTime = navigation.domContentLoadedEventEnd - navigation.fetchStart;
        
        this.recordMetric('PageLoad', pageLoadTime);
        this.recordMetric('DOMContentLoaded', domContentLoadedTime);
      }
    }
  }

  // 获取所有记录的指标
  public getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  // 获取性能报告
  public getPerformanceReport() {
    const report = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      metrics: this.getMetrics(),
      summary: {
        good: this.metrics.filter(m => m.rating === 'good').length,
        needsImprovement: this.metrics.filter(m => m.rating === 'needs-improvement').length,
        poor: this.metrics.filter(m => m.rating === 'poor').length
      }
    };

    return report;
  }
}

// 创建全局性能监控实例
export const performanceMonitor = new PerformanceMonitor({
  enableLogging: process.env.NODE_ENV === 'development',
  enableAnalytics: process.env.NODE_ENV === 'production'
});

// 自动启动监控
if (typeof window !== 'undefined') {
  // 等待页面加载完成后启动监控
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      performanceMonitor.startMonitoring();
    });
  } else {
    performanceMonitor.startMonitoring();
  }
}

export default PerformanceMonitor;