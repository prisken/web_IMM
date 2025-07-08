import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations({ namespace: 'errors.notFound' });
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
      <p className="mb-4">{t('description')}</p>
      <a href="/" className="text-blue-600 underline">{t('goHome')}</a>
    </div>
  );
} 