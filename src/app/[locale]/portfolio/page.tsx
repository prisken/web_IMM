import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PortfolioClient from './PortfolioClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'portfolio' });
  
  return {
    title: `${t('title')} | Creative Media Production House`,
    description: t('subtitle'),
  };
}

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'portfolio' });

  const filters = [
    { id: 'all', name: t('filters.all') },
    { id: 'tvc', name: t('filters.tvc') },
    { id: 'kol', name: t('filters.kol') },
    { id: 'brand', name: t('filters.brand') },
    { id: 'social', name: t('filters.social') },
    { id: 'corporate', name: t('filters.corporate') }
  ];

  const projects = [
    {
      id: 1,
      title: t('projects.0.title'),
      category: 'tvc',
      client: t('projects.0.client'),
      description: t('projects.0.description'),
      image: '/api/placeholder/600/400',
      tags: t('projects.0.tags').split(',').map(f => f.trim()),
      results: t('projects.0.results').split(',').map(f => f.trim()),
      duration: t('projects.0.duration'),
      budget: t('projects.0.budget')
    },
    {
      id: 2,
      title: t('projects.1.title'),
      category: 'kol',
      client: t('projects.1.client'),
      description: t('projects.1.description'),
      image: '/api/placeholder/600/400',
      tags: t('projects.1.tags').split(',').map(f => f.trim()),
      results: t('projects.1.results').split(',').map(f => f.trim()),
      duration: t('projects.1.duration'),
      budget: t('projects.1.budget')
    },
    {
      id: 3,
      title: t('projects.2.title'),
      category: 'brand',
      client: t('projects.2.client'),
      description: t('projects.2.description'),
      image: '/api/placeholder/600/400',
      tags: t('projects.2.tags').split(',').map(f => f.trim()),
      results: t('projects.2.results').split(',').map(f => f.trim()),
      duration: t('projects.2.duration'),
      budget: t('projects.2.budget')
    },
    {
      id: 4,
      title: t('projects.3.title'),
      category: 'social',
      client: t('projects.3.client'),
      description: t('projects.3.description'),
      image: '/api/placeholder/600/400',
      tags: t('projects.3.tags').split(',').map(f => f.trim()),
      results: t('projects.3.results').split(',').map(f => f.trim()),
      duration: t('projects.3.duration'),
      budget: t('projects.3.budget')
    },
    {
      id: 5,
      title: t('projects.4.title'),
      category: 'corporate',
      client: t('projects.4.client'),
      description: t('projects.4.description'),
      image: '/api/placeholder/600/400',
      tags: t('projects.4.tags').split(',').map(f => f.trim()),
      results: t('projects.4.results').split(',').map(f => f.trim()),
      duration: t('projects.4.duration'),
      budget: t('projects.4.budget')
    },
    {
      id: 6,
      title: t('projects.5.title'),
      category: 'tvc',
      client: t('projects.5.client'),
      description: t('projects.5.description'),
      image: '/api/placeholder/600/400',
      tags: t('projects.5.tags').split(',').map(f => f.trim()),
      results: t('projects.5.results').split(',').map(f => f.trim()),
      duration: t('projects.5.duration'),
      budget: t('projects.5.budget')
    }
  ];

  const translations = {
    hero: {
      title: t('hero.title'),
      description: t('hero.description'),
      getQuote: t('hero.getQuote'),
      contactUs: t('hero.contactUs')
    },
    noProjects: t('noProjects'),
    viewProject: t('viewProject'),
    duration: t('duration'),
    budget: t('budget')
  };

  return (
    <PortfolioClient 
      filters={filters}
      projects={projects}
      translations={translations}
    />
  );
} 