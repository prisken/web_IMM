'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Search, Filter, Calendar, User, Tag } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  tags: string[];
  readTime: number;
  imageUrl: string;
  slug: string;
}

// Mock blog data - in a real app, this would come from a CMS or API
const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of AI in Media Production',
    excerpt: 'Discover how artificial intelligence is revolutionizing the media production industry and what it means for creative professionals.',
    content: 'Full content here...',
    author: 'IMM Creative Team',
    publishedAt: '2024-01-15',
    category: 'Technology',
    tags: ['AI', 'Media Production', 'Innovation'],
    readTime: 5,
    imageUrl: '/api/placeholder/600/400',
    slug: 'future-ai-media-production'
  },
  {
    id: '2',
    title: 'Creating Compelling TV Commercials in 2024',
    excerpt: 'Learn the latest trends and techniques for creating TV commercials that capture attention and drive results.',
    content: 'Full content here...',
    author: 'IMM Creative Team',
    publishedAt: '2024-01-10',
    category: 'TV Commercials',
    tags: ['TV Commercials', 'Advertising', 'Trends'],
    readTime: 7,
    imageUrl: '/api/placeholder/600/400',
    slug: 'compelling-tv-commercials-2024'
  },
  {
    id: '3',
    title: 'KOL Marketing: Building Authentic Partnerships',
    excerpt: 'How to build successful partnerships with Key Opinion Leaders that drive real engagement and conversions.',
    content: 'Full content here...',
    author: 'IMM Creative Team',
    publishedAt: '2024-01-05',
    category: 'KOL Marketing',
    tags: ['KOL', 'Influencer Marketing', 'Partnerships'],
    readTime: 6,
    imageUrl: '/api/placeholder/600/400',
    slug: 'kol-marketing-authentic-partnerships'
  },
  {
    id: '4',
    title: 'Hong Kong\'s Creative Industry: Trends and Opportunities',
    excerpt: 'Explore the evolving landscape of Hong Kong\'s creative industry and the opportunities it presents for businesses.',
    content: 'Full content here...',
    author: 'IMM Creative Team',
    publishedAt: '2024-01-01',
    category: 'Industry Insights',
    tags: ['Hong Kong', 'Creative Industry', 'Trends'],
    readTime: 8,
    imageUrl: '/api/placeholder/600/400',
    slug: 'hong-kong-creative-industry-trends'
  },
  {
    id: '5',
    title: 'Storyboard to Screen: The Production Process',
    excerpt: 'A comprehensive guide to taking your storyboard from concept to final production.',
    content: 'Full content here...',
    author: 'IMM Creative Team',
    publishedAt: '2023-12-28',
    category: 'Production',
    tags: ['Storyboarding', 'Production', 'Process'],
    readTime: 9,
    imageUrl: '/api/placeholder/600/400',
    slug: 'storyboard-to-screen-production-process'
  },
  {
    id: '6',
    title: 'Digital Marketing Trends for 2024',
    excerpt: 'Stay ahead of the curve with these emerging digital marketing trends that will shape the industry in 2024.',
    content: 'Full content here...',
    author: 'IMM Creative Team',
    publishedAt: '2023-12-20',
    category: 'Digital Marketing',
    tags: ['Digital Marketing', 'Trends', '2024'],
    readTime: 6,
    imageUrl: '/api/placeholder/600/400',
    slug: 'digital-marketing-trends-2024'
  }
];

const categories = ['All', 'Technology', 'TV Commercials', 'KOL Marketing', 'Industry Insights', 'Production', 'Digital Marketing'];

export default function BlogClient({ locale }: { locale: string }) {
  const t = useTranslations('blog');
  const currentLocale = useLocale();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('');

  const filteredPosts = useMemo(() => {
    return mockBlogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchTerm, selectedCategory, selectedTag]);

  const allTags = Array.from(new Set(mockBlogPosts.flatMap(post => post.tags)));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(currentLocale === 'zh' ? 'zh-HK' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t('search.placeholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-80 pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                {t('filters.categories')}:
              </span>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700 flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                {t('filters.tags')}:
              </span>
              <button
                onClick={() => setSelectedTag('')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  !selectedTag
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t('filters.allTags')}
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedTag === tag
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('noResults.title')}
              </h3>
              <p className="text-gray-600">
                {t('noResults.description')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                  <Link href={`/${locale}/blog/${post.slug}`}>
                    <div className="aspect-video bg-gray-200 relative overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>
                  </Link>
                  
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(post.publishedAt)}
                      <span className="mx-2">•</span>
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                      <span className="mx-2">•</span>
                      {post.readTime} {t('readTime')}
                    </div>
                    
                    <Link href={`/${locale}/blog/${post.slug}`}>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                    </Link>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <Link
                      href={`/${locale}/blog/${post.slug}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      {t('readMore')}
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t('newsletter.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {t('newsletter.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('newsletter.placeholder')}
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              {t('newsletter.subscribe')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
} 