const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export interface StrapiBlogPost {
  id: number;
  attributes: {
    title: string;
    excerpt: string;
    content: string;
    author: string;
    publishedAt: string;
    category: string;
    tags: string[];
    readTime: number;
    slug: string;
    seoDescription: string;
    image: {
      data: {
        attributes: {
          url: string;
          alternativeText: string;
        };
      };
    };
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

class StrapiAPI {
  private baseURL: string;
  private token: string | undefined;

  constructor() {
    this.baseURL = STRAPI_URL;
    this.token = STRAPI_API_TOKEN;
  }

  private async fetch(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}/api${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.statusText}`);
    }

    return response.json();
  }

  // Get all blog posts
  async getBlogPosts(locale: string = 'en'): Promise<StrapiResponse<StrapiBlogPost[]>> {
    return this.fetch(`/blog-posts?locale=${locale}&populate=image&sort=publishedAt:desc`);
  }

  // Get a single blog post by slug
  async getBlogPostBySlug(slug: string, locale: string = 'en'): Promise<StrapiResponse<StrapiBlogPost>> {
    return this.fetch(`/blog-posts?filters[slug][$eq]=${slug}&locale=${locale}&populate=image`);
  }

  // Get blog posts by category
  async getBlogPostsByCategory(category: string, locale: string = 'en'): Promise<StrapiResponse<StrapiBlogPost[]>> {
    return this.fetch(`/blog-posts?filters[category][$eq]=${category}&locale=${locale}&populate=image&sort=publishedAt:desc`);
  }

  // Get blog posts by tag
  async getBlogPostsByTag(tag: string, locale: string = 'en'): Promise<StrapiResponse<StrapiBlogPost[]>> {
    return this.fetch(`/blog-posts?filters[tags][$contains]=${tag}&locale=${locale}&populate=image&sort=publishedAt:desc`);
  }

  // Search blog posts
  async searchBlogPosts(query: string, locale: string = 'en'): Promise<StrapiResponse<StrapiBlogPost[]>> {
    return this.fetch(`/blog-posts?filters[$or][0][title][$containsi]=${query}&filters[$or][1][excerpt][$containsi]=${query}&filters[$or][2][content][$containsi]=${query}&locale=${locale}&populate=image&sort=publishedAt:desc`);
  }

  // Get categories
  async getCategories(locale: string = 'en'): Promise<StrapiResponse<any[]>> {
    return this.fetch(`/categories?locale=${locale}`);
  }

  // Get tags
  async getTags(locale: string = 'en'): Promise<StrapiResponse<any[]>> {
    return this.fetch(`/tags?locale=${locale}`);
  }
}

export const strapiAPI = new StrapiAPI();

// Helper function to transform Strapi data to our blog post format
export function transformStrapiPost(post: StrapiBlogPost) {
  return {
    id: post.id.toString(),
    title: post.attributes.title,
    excerpt: post.attributes.excerpt,
    content: post.attributes.content,
    author: post.attributes.author,
    publishedAt: post.attributes.publishedAt,
    category: post.attributes.category,
    tags: post.attributes.tags,
    readTime: post.attributes.readTime,
    imageUrl: post.attributes.image?.data?.attributes?.url 
      ? `${STRAPI_URL}${post.attributes.image.data.attributes.url}`
      : '/api/placeholder/600/400',
    slug: post.attributes.slug,
    seoDescription: post.attributes.seoDescription,
  };
}

// Helper function to transform multiple posts
export function transformStrapiPosts(posts: StrapiBlogPost[]) {
  return posts.map(transformStrapiPost);
} 