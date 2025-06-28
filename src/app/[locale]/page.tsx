import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from "next-intl";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'hero' });
  
  return {
    title: `${t('title')} ${t('location')} | Creative Media Production House`,
    description: t('description'),
    openGraph: {
      title: `${t('title')} ${t('location')}`,
      description: t('description'),
      locale: locale,
      type: 'website',
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'hero' });
  const tServices = await getTranslations({ locale: locale, namespace: 'services' });
  const tPortfolio = await getTranslations({ locale: locale, namespace: 'portfolio' });
  const tAbout = await getTranslations({ locale: locale, namespace: 'about' });
  const tContact = await getTranslations({ locale: locale, namespace: 'contact' });
  const tAI = await getTranslations({ locale: locale, namespace: 'ai' });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t('title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {t('location')}
            </p>
            <p className="text-lg md:text-xl mb-12 text-blue-100 max-w-3xl mx-auto">
              {t('description')}
            </p>
            
            {/* AI Storyboard Generator Feature */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12">
              <h2 className="text-3xl font-bold mb-4">{tAI('title')}</h2>
              <p className="text-lg mb-6 text-blue-100">{tAI('description')}</p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">{tAI('features.smart')}</h3>
                  <p className="text-sm text-blue-200">{tAI('features.smartDesc')}</p>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">{tAI('features.visual')}</h3>
                  <p className="text-sm text-blue-200">{tAI('features.visualDesc')}</p>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">{tAI('features.instant')}</h3>
                  <p className="text-sm text-blue-200">{tAI('features.instantDesc')}</p>
                </div>
              </div>
              <a
                href={`/${locale}/ai-generator`}
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                {tAI('cta')}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`/${locale}/contact`}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                {t('cta')}
              </a>
              <a
                href={`/${locale}/services`}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                {t('learnMore')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{tServices('title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{tServices('subtitle')}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* TV Commercials */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{tServices('tvc.title')}</h3>
              <p className="text-gray-600 mb-6">{tServices('tvc.description')}</p>
              <ul className="space-y-2">
                {tServices.raw('tvc.features').map((feature: string, index: number) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* KOL Videos */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{tServices('kol.title')}</h3>
              <p className="text-gray-600 mb-6">{tServices('kol.description')}</p>
              <ul className="space-y-2">
                {tServices.raw('kol.features').map((feature: string, index: number) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Digital Content */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{tServices('digital.title')}</h3>
              <p className="text-gray-600 mb-6">{tServices('digital.description')}</p>
              <ul className="space-y-2">
                {tServices.raw('digital.features').map((feature: string, index: number) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{tPortfolio('title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{tPortfolio('subtitle')}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tPortfolio.raw('projects').map((project: any, index: number) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string, tagIndex: number) => (
                      <span key={tagIndex} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">{tAbout('title')}</h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">{tAbout('description')}</p>
            
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{tAbout('mission')}</h3>
                <p className="text-gray-600">{tAbout('missionText')}</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{tAbout('vision')}</h3>
                <p className="text-gray-600">{tAbout('visionText')}</p>
              </div>
            </div>
            
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{tAbout('values')}</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {tAbout.raw('valuesList').map((value: string, index: number) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-gray-900 font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">{tContact('title')}</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">{tContact('description')}</p>
          <a
            href={`/${locale}/contact`}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
          >
            {tContact('form.submit')}
          </a>
        </div>
      </section>
    </div>
  );
}
