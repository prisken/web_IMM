import { MetadataRoute } from 'next';
import { locales } from '../i18n/request';

// Mock blog posts data - in a real app, this would come from a CMS or API
const blogPosts = [
  'future-ai-media-production',
  'compelling-tv-commercials-2024',
  'kol-marketing-authentic-partnerships',
  'hong-kong-creative-industry-trends',
  'storyboard-to-screen-production-process',
  'digital-marketing-trends-2024'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://immmedia.hk'; // Replace with your actual domain
  
  const routes = [
    '',
    '/services',
    '/portfolio',
    '/blog',
    '/ai-generator',
    '/about',
    '/contact',
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Add main pages for each locale
  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
      });
    });

    // Add blog posts for each locale
    blogPosts.forEach((slug) => {
      sitemap.push({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });
  });

  return sitemap;
} 