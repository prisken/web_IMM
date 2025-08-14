import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  
  return {
    title: 'AI 服務提升 | Creative Media Production House',
    description: '我們利用AI技術，幫助您提高業務效率並降低成本，實現超越預期的創新目標。',
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const stats = [
    { value: '30%', label: '創新增長' },
    { value: '25%', label: '客戶滿意度' },
    { value: '40%', label: '市場佔有率' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              AI 服務提升
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl">
              我們利用AI技術，幫助您提高業務效率並降低成本，實現超越預期的創新目標。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#contact"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center justify-center"
              >
                了解更多
              </Link>
              <Link
                href="#details"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center"
              >
                聯絡我們
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced AI Technology Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-blue-100 rounded-full p-3 mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-6">探索我們的先進AI技術與應用</h2>
              <p className="text-gray-600 mb-6">
                我們的AI技術能夠為眾多領域帶來革新，自然語言處理及數據分析等，為您的業務帶來增值。無論是提升生產力或優化業務流程都能，我們都能助您實現您的業務目標。
              </p>
              <Link
                href="#contact"
                className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center"
              >
                了解更多
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="bg-gray-200 rounded-lg aspect-square">
              {/* Placeholder for service image */}
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Enhancement Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-200 rounded-lg aspect-square">
              {/* Placeholder for business image */}
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">利用AI服務，提升業務效率，降低成本，改善決策品質</h2>
              <p className="text-gray-600 mb-6">
                透過我們的AI服務，客戶能夠顯著提升工作效率，整體營運費用降低，並助於AI建議分析及預測功能，精確制定商業決策。
              </p>
              <Link
                href="#contact"
                className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center"
              >
                了解更多
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">我們的AI服務如何改變企業</h2>
            <p className="text-center mb-12 text-gray-300 max-w-3xl mx-auto">
              我們的AI服務能夠為眾多企業帶來革新與進步，根據統計，使用我們的AI解決方案的企業，業務效率提升平均超過了30%，並且成功降低運營成本約7成且提高業務品質的可行性。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl font-bold mb-4">{stat.value}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="#contact"
                className="bg-white text-gray-800 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                了解更多
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gray-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              立即聯繫我們了解AI服務
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              我們的AI服務能夠幫助您優化業務流程並提高效率，歡迎隨時與我們聯繫以獲取更多資訊。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-gray-800 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                了解更多
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                立即聯繫
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}