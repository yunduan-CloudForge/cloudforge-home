import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = '云锻开源社区 - 专注于云原生技术的开源社区',
  description = '云锻开源社区致力于构建高质量的开源项目，为开发者提供创新的技术解决方案。我们相信开源的力量，通过协作和分享推动技术进步。',
  keywords = ['云锻', '开源社区', '云原生', 'React', 'TypeScript', 'Vite', '开源项目', '技术社区'],
  image = '/LOGO.jpg',
  url,
  type = 'website',
  author = '云锻开源社区',
  publishedTime,
  modifiedTime,
  section,
  tags
}) => {
  const siteUrl = 'https://yunduan-cloudforge.github.io/Trae_CloudForge-home';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
  
  // 生成结构化数据
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'Organization',
    name: '云锻开源社区',
    description,
    url: fullUrl,
    logo: fullImageUrl,
    sameAs: [
      'https://github.com/yunduan-CloudForge',
      'https://twitter.com/cloudforge',
      'https://discord.gg/cloudforge'
    ],
    ...(type === 'article' && {
      headline: title,
      author: {
        '@type': 'Person',
        name: author
      },
      publisher: {
        '@type': 'Organization',
        name: '云锻开源社区',
        logo: {
          '@type': 'ImageObject',
          url: fullImageUrl
        }
      },
      datePublished: publishedTime,
      dateModified: modifiedTime || publishedTime,
      articleSection: section,
      keywords: tags?.join(', ')
    })
  };

  return (
    <Helmet>
      {/* 基础元数据 */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="zh-CN" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Open Graph 元数据 */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="云锻开源社区" />
      <meta property="og:locale" content="zh_CN" />
      
      {/* Twitter Card 元数据 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@cloudforge" />
      <meta name="twitter:creator" content="@cloudforge" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {/* 文章特定元数据 */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {type === 'article' && section && (
        <meta property="article:section" content={section} />
      )}
      {type === 'article' && tags && tags.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      
      {/* 移动端优化 */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#2563EB" />
      <meta name="msapplication-TileColor" content="#2563EB" />
      
      {/* 预连接和DNS预解析 */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="//github.com" />
      <link rel="dns-prefetch" href="//discord.gg" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* 结构化数据 */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* 额外的SEO标签 */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* 安全相关 */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
    </Helmet>
  );
};

export default SEOHead;