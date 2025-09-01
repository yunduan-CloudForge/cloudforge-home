import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  type?: 'website' | 'article' | 'profile';
  image?: string;
  url?: string;
  siteName?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = '云锻开源社区',
  description = '专注于云原生技术的开源社区，致力于构建高质量的开源项目',
  keywords = '云锻开源社区,开源项目,云原生,技术社区',
  type = 'website',
  image = 'https://cloudforge.org.cn/images/og-default.jpg',
  url,
  siteName = '云锻开源社区',
  author = '云锻开源社区',
  publishedTime,
  modifiedTime
}) => {
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://cloudforge.org.cn');
  
  // 生成结构化数据
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'Organization',
    name: siteName,
    description,
    url: currentUrl,
    logo: {
      '@type': 'ImageObject',
      url: 'https://cloudforge.org.cn/images/logo.png'
    },
    sameAs: [
      'https://github.com/cloudforge',
      'https://twitter.com/cloudforge',
      'https://discord.gg/cloudforge'
    ],
    ...(type === 'article' && {
      headline: title,
      author: {
        '@type': 'Person',
        name: author
      },
      ...(publishedTime && { datePublished: publishedTime }),
      ...(modifiedTime && { dateModified: modifiedTime })
    })
  };

  return (
    <Helmet>
      {/* 基础元数据 */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@cloudforge" />
      
      {/* 额外的SEO标签 */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="zh-CN" />
      
      {/* 结构化数据 */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* 网站图标 */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* 规范链接 */}
      <link rel="canonical" href={currentUrl} />
    </Helmet>
  );
};

export default SEOHead;