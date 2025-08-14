'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations('footer');
  const tNav = useTranslations('navigation');

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-lg flex items-center justify-center mr-3">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-black">{t('company.name')}</span>
            </div>
            <p className="text-gray-600 mb-6 text-base sm:text-lg">
              {t('description')}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-6 text-black">{tNav('services')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}/services`} className="text-gray-600 hover:text-black transition-all duration-200 text-base py-1 block hover:translate-x-1">
                  {t('links.services')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="text-gray-600 hover:text-black transition-all duration-200 text-base py-1 block hover:translate-x-1">
                  {t('links.kolContent')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="text-gray-600 hover:text-black transition-all duration-200 text-base py-1 block hover:translate-x-1">
                  {t('links.creativeSolutions')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/ai-generator`} className="text-gray-600 hover:text-black transition-all duration-200 text-base py-1 block hover:translate-x-1">
                  {t('links.aiGenerator')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="text-gray-600 hover:text-black transition-all duration-200 text-base py-1 block hover:translate-x-1">
                  {t('links.brandVideos')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-6 text-black">{t('links.company')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}/about`} className="text-gray-600 hover:text-black transition-all duration-200 text-base py-1 block hover:translate-x-1">
                  {tNav('about')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/portfolio`} className="text-gray-600 hover:text-black transition-all duration-200 text-base py-1 block hover:translate-x-1">
                  {tNav('portfolio')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-gray-600 hover:text-black transition-all duration-200 text-base py-1 block hover:translate-x-1">
                  {tNav('contact')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className="text-gray-600 hover:text-black transition-all duration-200 text-base py-1 block hover:translate-x-1">
                  {t('links.blog')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-6 text-black">{t('newsletter.title')}</h3>
            <p className="text-gray-600 mb-6 text-base">
              {t('newsletter.description')}
            </p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-base min-h-[44px]"
              />
              <button
                type="submit"
                className="w-full bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 text-base min-h-[44px] transform hover:scale-105"
              >
                {t('newsletter.subscribe')}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-12 sm:mt-16 pt-8 sm:pt-10">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-600 text-sm sm:text-base">
              {t('copyright', { year: currentYear })}
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end space-x-6 sm:space-x-8">
              <a href="#" className="text-gray-600 hover:text-black text-sm sm:text-base transition-all duration-200 hover:translate-x-1">
                {t('legal.privacy')}
              </a>
              <a href="#" className="text-gray-600 hover:text-black text-sm sm:text-base transition-all duration-200 hover:translate-x-1">
                {t('legal.terms')}
              </a>
              <a href="#" className="text-gray-600 hover:text-black text-sm sm:text-base transition-all duration-200 hover:translate-x-1">
                {t('legal.cookies')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 