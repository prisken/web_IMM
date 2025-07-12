'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { BlogPost } from '@/lib/types';

export default function BlogClient({ locale }: { locale: string }) {
  const t = useTranslations('blog');
  const currentLocale = useLocale();
  
  console.log('🎬 BlogClient component rendered with locale:', locale);
  
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch blog posts
  const fetchPosts = async () => {
    console.log('🚀 Starting fetchPosts function');
    try {
      setLoading(true);
      setError(null);
      
      // Only fetch published posts for public blog page
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/blog?status=published`;
      console.log('🔍 Fetching posts from:', apiUrl);
      
      const response = await fetch(apiUrl);
      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📦 Response data:', data);
      
      if (data.posts && Array.isArray(data.posts)) {
        // Parse tags from JSON strings to arrays
        const postsWithParsedTags = data.posts.map((post: any) => ({
          ...post,
          tags: typeof post.tags === 'string' ? JSON.parse(post.tags) : post.tags || []
        }));
        
        console.log('✅ Parsed posts:', postsWithParsedTags.length);
        setPosts(postsWithParsedTags);
        
        // Extract unique categories
        const uniqueCategories = Array.from(new Set(postsWithParsedTags.map((post: any) => post.category))).filter(Boolean) as string[];
        setCategories(uniqueCategories);
      } else {
        console.error('❌ Invalid response format:', data);
        setError('Invalid response format');
      }
    } catch (err) {
      console.error('❌ Fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    } finally {
      console.log('🏁 Setting loading to false');
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('🔄 useEffect called, calling fetchPosts');
    fetchPosts();
  }, []);

  // Get all unique tags from posts
  const allTags = Array.from(new Set(
    posts.flatMap(post => Array.isArray(post.tags) ? post.tags : [])
  )).sort();

  // Filter posts based on search, category, and tags
  const filteredPosts = posts.filter(post => {
    const matchesSearch = !searchTerm || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    
    const matchesTag = !selectedTag || 
      (Array.isArray(post.tags) && post.tags.includes(selectedTag));
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedTag('');
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-8">
            <div className="text-red-600 mb-4 text-lg">Error: {error}</div>
            <button 
              onClick={fetchPosts} 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              {t('hero.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">
                <span className="text-sm font-medium">📱 Digital Marketing</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">
                <span className="text-sm font-medium">🎬 TV Commercials</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">
                <span className="text-sm font-medium">🤖 AI & Innovation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <input
                  type="text"
                  placeholder={t('search.placeholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
              
              {/* Category Filter */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              {/* Tag Filter */}
              <div>
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="">All Tags</option>
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Active Filters */}
            {(searchTerm || selectedCategory || selectedTag) && (
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                {searchTerm && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Search: "{searchTerm}"
                  </span>
                )}
                {selectedCategory && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Category: {selectedCategory}
                  </span>
                )}
                {selectedTag && (
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    Tag: {selectedTag}
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Loading blog posts...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          /* No Results */
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-gray-400 mb-4">
                <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {t('noResults.title')}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('noResults.description')}
              </p>
              <button
                onClick={clearFilters}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          /* Blog Posts Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                {/* Featured Image */}
                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                  <img
                    src={post.featured_image_url || '/api/placeholder/600/400'}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  {/* Meta Info */}
                  <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {post.author}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {post.read_time} min read
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    <Link href={`/${locale}/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  
                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  
                  {/* Tags */}
                  {Array.isArray(post.tags) && post.tags.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag: string) => (
                        <span 
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                          onClick={() => setSelectedTag(tag)}
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                          +{post.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                  
                  {/* Read More Link */}
                  <Link 
                    href={`/${locale}/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
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
        
        {/* Results Count */}
        {!loading && filteredPosts.length > 0 && (
          <div className="mt-8 text-center text-gray-600">
            Showing {filteredPosts.length} of {posts.length} posts
          </div>
        )}
      </div>
    </div>
  );
} 