import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics 配置接口
interface GoogleAnalyticsProps {
  trackingId?: string;
  debug?: boolean;
}

// 声明全局 gtag 函数
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date | object,
      config?: object
    ) => void;
    dataLayer: any[];
  }
}

const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ 
  trackingId = import.meta.env.VITE_GA_TRACKING_ID,
  debug = false 
}) => {
  const location = useLocation();

  useEffect(() => {
    // 如果没有提供 tracking ID，则不加载 GA
    if (!trackingId) {
      if (debug) {
        console.log('Google Analytics: No tracking ID provided');
      }
      return;
    }

    // 初始化 dataLayer
    window.dataLayer = window.dataLayer || [];
    
    // 定义 gtag 函数
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };

    // 设置初始时间戳
    window.gtag('js', new Date());

    // 配置 Google Analytics
    window.gtag('config', trackingId, {
      page_title: document.title,
      page_location: window.location.href,
      send_page_view: true,
      // 隐私设置
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });

    // 动态加载 GA 脚本
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script);

    if (debug) {
      console.log('Google Analytics initialized with ID:', trackingId);
    }

    // 清理函数
    return () => {
      // 移除脚本（可选）
      const existingScript = document.querySelector(`script[src*="${trackingId}"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [trackingId, debug]);

  // 监听路由变化，发送页面浏览事件
  useEffect(() => {
    if (!trackingId || !window.gtag) return;

    // 发送页面浏览事件
    window.gtag('config', trackingId, {
      page_title: document.title,
      page_location: window.location.href,
      page_path: location.pathname + location.search
    });

    if (debug) {
      console.log('GA Page View:', location.pathname + location.search);
    }
  }, [location, trackingId, debug]);

  return null; // 这是一个无渲染组件
};

// 事件追踪工具函数
export const trackEvent = (
  action: string,
  category: string = 'General',
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};

// 自定义事件追踪 Hook
export const useAnalytics = () => {
  const trackPageView = (path: string, title?: string) => {
    const trackingId = import.meta.env.VITE_GA_TRACKING_ID;
    if (typeof window !== 'undefined' && window.gtag && trackingId) {
      window.gtag('config', trackingId, {
        page_path: path,
        page_title: title || document.title
      });
    }
  };

  const trackClick = (elementName: string, location?: string) => {
    trackEvent('click', 'UI', `${elementName}${location ? ` - ${location}` : ''}`);
  };

  const trackDownload = (fileName: string, fileType?: string) => {
    trackEvent('download', 'File', fileName, fileType ? 1 : undefined);
  };

  const trackFormSubmit = (formName: string, success: boolean = true) => {
    trackEvent(success ? 'form_submit_success' : 'form_submit_error', 'Form', formName);
  };

  const trackSearch = (searchTerm: string, resultCount?: number) => {
    trackEvent('search', 'Search', searchTerm, resultCount);
  };

  const trackSocialShare = (platform: string, url: string) => {
    trackEvent('share', 'Social', `${platform} - ${url}`);
  };

  const trackOutboundLink = (url: string, linkText?: string) => {
    trackEvent('click', 'Outbound Link', linkText || url);
  };

  return {
    trackPageView,
    trackClick,
    trackDownload,
    trackFormSubmit,
    trackSearch,
    trackSocialShare,
    trackOutboundLink,
    trackEvent
  };
};

// 预定义的事件类型
export const AnalyticsEvents = {
  // 导航事件
  NAVIGATION: {
    MENU_CLICK: 'menu_click',
    LOGO_CLICK: 'logo_click',
    FOOTER_LINK: 'footer_link'
  },
  // 内容交互
  CONTENT: {
    PROJECT_VIEW: 'project_view',
    DOC_VIEW: 'doc_view',
    DOWNLOAD_CLICK: 'download_click'
  },
  // 表单事件
  FORM: {
    CONTACT_SUBMIT: 'contact_submit',
    NEWSLETTER_SIGNUP: 'newsletter_signup',
    FEEDBACK_SUBMIT: 'feedback_submit'
  },
  // 社交媒体
  SOCIAL: {
    GITHUB_CLICK: 'github_click',
    TWITTER_CLICK: 'twitter_click',
    DISCORD_CLICK: 'discord_click'
  }
};

export default GoogleAnalytics;