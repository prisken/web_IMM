import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import BlogPostClient from "./BlogPostClient";
import StructuredData from "../../../../components/StructuredData";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  published_at: string;
  category: string;
  tags: string[];
  read_time: number;
  featured_image_url: string;
  slug: string;
  seo_description: string;
  status: string;
}

async function getBlogPost(slug: string, locale: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/slug/${slug}?locale=${locale}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data.post || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string }> 
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  
  const post = await getBlogPost(slug, locale);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found | IMM Creative Media Production',
      description: 'The requested blog post could not be found.',
    };
  }
  
  // Parse tags if they're a JSON string
  const tags = typeof post.tags === 'string' ? JSON.parse(post.tags) : post.tags;
  
  return {
    title: `${post.title} | IMM Creative Media Production`,
    description: post.seo_description || post.excerpt,
    keywords: tags.join(', '),
    openGraph: {
      title: `${post.title} | IMM Creative Media Production`,
      description: post.seo_description || post.excerpt,
      type: 'article',
      locale: locale,
      publishedTime: post.published_at,
      authors: [post.author],
      tags: tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | IMM Creative Media Production`,
      description: post.seo_description || post.excerpt,
    },
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string }> 
}) {
  const { locale, slug } = await params;
  
  const post = await getBlogPost(slug, locale);
  
  if (!post) {
    notFound();
  }
  
  // Transform the API data to match the expected format
  const transformedPost = {
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    author: post.author,
    publishedAt: post.published_at,
    category: post.category,
    tags: typeof post.tags === 'string' ? JSON.parse(post.tags) : post.tags,
    readTime: post.read_time,
    imageUrl: post.featured_image_url || '/api/placeholder/1200/600',
    slug: post.slug,
    seoDescription: post.seo_description || post.excerpt,
  };
  
  return (
    <>
      <StructuredData 
        type="article" 
        data={{
          headline: post.title,
          description: post.excerpt,
          author: {
            '@type': 'Person',
            name: post.author,
          },
          publisher: {
            '@type': 'Organization',
            name: 'IMM Creative Media Production',
            logo: {
              '@type': 'ImageObject',
              url: 'https://immmedia.hk/logo.png',
            },
          },
          datePublished: post.published_at,
          dateModified: post.published_at,
          image: post.featured_image_url || '/api/placeholder/1200/600',
          url: `https://immmedia.hk/blog/${post.slug}`,
        }} 
      />
      <BlogPostClient post={transformedPost} locale={locale} />
    </>
  );
} 