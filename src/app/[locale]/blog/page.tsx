import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import BlogClient from "./BlogClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  
  return {
    title: `${t('meta.title')} | IMM Creative Media Production`,
    description: t('meta.description'),
    keywords: t('meta.keywords'),
    openGraph: {
      title: `${t('meta.title')} | IMM Creative Media Production`,
      description: t('meta.description'),
      type: 'website',
      locale: locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('meta.title')} | IMM Creative Media Production`,
      description: t('meta.description'),
    },
    alternates: {
      canonical: `/${locale}/blog`,
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  return <BlogClient locale={locale} />;
} 