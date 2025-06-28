import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  
  return {
    title: `${t('title')} | Creative Media Production House`,
    description: t('description'),
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t('title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {t('subtitle')}
            </p>
            <p className="text-lg md:text-xl mb-12 text-blue-100 max-w-3xl mx-auto">
              {t('description')}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('mission')}</h2>
                <p className="text-lg text-gray-600">{t('missionText')}</p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('vision')}</h2>
                <p className="text-lg text-gray-600">{t('visionText')}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('values')}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {t.raw('valuesList').map((value: string, index: number) => (
                  <div key={index} className="flex items-center">
                    <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-4">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-lg text-gray-700">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {t.raw('stats').map((stat: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">{stat.value}</span>
                  </div>
                  <p className="text-lg text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 