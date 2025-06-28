import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['en', 'zh'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  
  // If no locale is provided, use default
  if (!locale) {
    return {
      locale: defaultLocale,
      messages: (await import(`../../messages/${defaultLocale}.json`)).default
    };
  }
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return {
    locale: locale as string,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
}); 