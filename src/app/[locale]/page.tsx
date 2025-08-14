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
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6">
              {t('title')}
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl mb-8 text-blue-100 max-w-3xl mx-auto">
              {t('description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/contact`}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-lg"
              >
                {t('cta')}
              </Link>
              <Link
                href={`/${locale}/services`}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors text-lg"
              >
                {t('learnMore')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              探索AI與創意的無限可能
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              運用最先進的AI技術和創意工具，為您的業務帶來革新性的解決方案，讓您在數位時代保持競爭優勢
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AI Storyboard Generator */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">AI驅動的創意故事板生成</h3>
              <p className="text-gray-600 mb-6">使用我們的AI技術，快速生成專業的故事板和創意概念，節省寶貴的規劃時間。</p>
              <Link
                href={`/${locale}/ai-generator`}
                className="text-blue-600 font-semibold hover:text-blue-700 flex items-center"
              >
                立即體驗
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* AI Workshop */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">參加我們的AI創意工作坊</h3>
              <p className="text-gray-600 mb-6">透過實踐學習，掌握AI創意工具的應用，提升您的創作效率和品質。</p>
              <Link
                href={`/${locale}/contact`}
                className="text-purple-600 font-semibold hover:text-purple-700 flex items-center"
              >
                了解更多
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* AI Solutions */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">提升業務的AI解決方案</h3>
              <p className="text-gray-600 mb-6">量身定制的AI解決方案，幫助您的業務實現數位轉型，提升競爭力。</p>
              <Link
                href={`/${locale}/services`}
                className="text-green-600 font-semibold hover:text-green-700 flex items-center"
              >
                探索方案
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Business Solutions Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              利用AI技術提升您的業務
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              整合AI技術與業務運營的完美解決方案，幫助您的企業在數位時代保持領先地位，創造更大的商業價值
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Business Integration */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">AI的內容整合的業務運作</h3>
              <p className="text-gray-600 mb-6">AI驅動的內容管理系統，實現高效的業務流程自動化。</p>
              <Link
                href={`/${locale}/services`}
                className="text-blue-600 font-semibold hover:text-blue-700 flex items-center"
              >
                了解更多
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Creative Tech Integration */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">創意與科技的完美結合</h3>
              <p className="text-gray-600 mb-6">將創意思維與先進技術完美融合，創造獨特的品牌體驗。</p>
              <Link
                href={`/${locale}/portfolio`}
                className="text-purple-600 font-semibold hover:text-purple-700 flex items-center"
              >
                查看案例
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Immediate Solutions */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">立即體驗AI應用的商業解決方案</h3>
              <p className="text-gray-600 mb-6">快速部署的AI解決方案，助您搶占市場先機。</p>
              <Link
                href={`/${locale}/ai-generator`}
                className="text-green-600 font-semibold hover:text-green-700 flex items-center"
              >
                立即開始
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              探索AI與創意的無限可能，立即報名參加工作坊！
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              透過我們的AI創意工作坊，學習如何運用最新的AI技術提升您的創作效率，並與行業專家交流經驗。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/contact`}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-lg"
              >
                立即報名
              </Link>
              <Link
                href={`/${locale}/about`}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors text-lg"
              >
                了解更多
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}