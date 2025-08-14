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
      <section className="bg-white py-8 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="relative min-h-[400px] sm:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/images/Change_the_girl_in_black_outline_into_a_real_person_An_office_lady_from_hong_kong.png"
              alt="Business woman with AI illustrations"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center">
              <div className="w-full px-6 sm:px-0 sm:w-auto sm:absolute sm:top-1/2 sm:left-16 sm:transform sm:-translate-y-1/2 max-w-lg">
                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl sm:bg-transparent sm:backdrop-blur-none sm:p-0">
                  <h1 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 text-black">用AI提升業務？</h1>
                  <p className="text-lg sm:text-xl mb-3 sm:mb-4 text-gray-800">透過AI技術，助您創造大衆效益</p>
                  <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-gray-800">讓業務在競爭中脫穎而出</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href={`/${locale}/workshop`}
                      className="bg-black text-white px-6 sm:px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-all transform hover:scale-105 text-base sm:text-lg inline-block text-center w-full sm:w-auto"
                    >
                      參加工作坊
                    </Link>
                  </div>
                  <div className="mt-6">
                    <ul className="text-base sm:text-lg space-y-2 text-gray-700">
                      <li className="flex items-center">
                        <span className="mr-2">•</span>
                        一對一業務探討
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2">•</span>
                        免費1分鐘宣傳影片
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-12 sm:py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 sm:mb-6">重點推介！</h2>
          <p className="text-lg sm:text-xl text-center mb-10 sm:mb-16 text-gray-600">讓您的品牌在市場中脫穎而出</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            {/* AI Storyboard */}
            <div className="bg-white rounded-xl p-4 sm:p-6 text-center transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-2xl">
              <div className="relative">
                <img
                  src="/images/use_real_people_for_the_person_holding_the_camera_a_male_from_hong_kong.png"
                  alt="AI Storyboard"
                  className="w-full h-48 sm:h-64 object-cover rounded-lg mb-4 sm:mb-6 shadow-md"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">AI生成廣告Storyboard</h3>
              <p className="text-gray-600 text-sm sm:text-base">運用AI技術，快速生成專業的廣告分鏡</p>
            </div>

            {/* AI Workshop */}
            <div className="bg-white rounded-xl p-4 sm:p-6 text-center transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-2xl">
              <div className="relative">
                <img
                  src="/images/change_the_person_into_a_female_from_Hong_Kong.png"
                  alt="AI Workshop"
                  className="w-full h-48 sm:h-64 object-cover rounded-lg mb-4 sm:mb-6 shadow-md"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">AI + 創意 Workshop</h3>
              <p className="text-gray-600 text-sm sm:text-base">專業導師帶領，探索AI創意應用</p>
            </div>

            {/* O2O Marketing */}
            <div className="bg-white rounded-xl p-4 sm:p-6 text-center transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-2xl">
              <div className="relative">
                <img
                  src="/images/use_real_people_for_the_person_on_top_a_male_office_worker_from_hong_kong.png"
                  alt="O2O Marketing"
                  className="w-full h-48 sm:h-64 object-cover rounded-lg mb-4 sm:mb-6 shadow-md"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">O成本宣傳效版</h3>
              <p className="text-gray-600 text-sm sm:text-base">智能優化您的營銷策略</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Questions Section */}
      <section className="relative py-20 sm:py-32">
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{
          backgroundImage: `url('/images/penpen3478_many_panels_of_beautiful_AI_generated_storyboard_4af169eb-a088-4829-82d5-457395b95e6d.webp')`,
          opacity: '0.15'
        }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-8">5 條 問 題</h2>
            <p className="text-xl sm:text-2xl mb-8 sm:mb-12 text-gray-700">生成專屬你產品的廣告</p>
            <Link
              href={`/${locale}/ai-generator`}
              className="inline-block bg-black text-white w-full sm:w-auto px-8 sm:px-16 py-4 rounded-lg hover:bg-gray-800 transition-all transform hover:scale-105 hover:shadow-xl text-base sm:text-lg font-semibold"
            >
              試吓...
            </Link>
          </div>
        </div>
      </section>

      {/* AI + Creativity Section */}
      <section className="py-16 sm:py-24 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8 text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold">AI + 創意=無限可能</h2>
              <div className="space-y-3 sm:space-y-4">
                <p className="text-lg sm:text-xl text-gray-700">帶您進入創新的世界！</p>
                <p className="text-lg sm:text-xl text-gray-700">學習如何利用AI提升業務</p>
                <p className="text-lg sm:text-xl text-gray-700">費用全免！抓緊機會，與專家一起探索 無限可能！</p>
              </div>
              <Link
                href={`/${locale}/workshop`}
                className="inline-block bg-black text-white w-full md:w-auto px-8 sm:px-12 py-4 sm:py-5 rounded-lg hover:bg-gray-800 transition-all transform hover:scale-105 hover:shadow-xl text-base sm:text-lg font-semibold"
              >
                立即報名
              </Link>
            </div>
            <div className="relative mt-8 md:mt-0">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl transform -rotate-2 hidden sm:block"></div>
              <img
                src="/images/A_infographic_drawing_of_an_egg_becoming_a_person_with_the_help_of_a_team_colorful_lines_on_white_background_the_final_person_is_a_realistic_person_male_30s_from_Hong_Kong.png"
                alt="Evolution illustration"
                className="relative w-full rounded-xl shadow-xl sm:shadow-2xl transform sm:rotate-2 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 sm:mb-8">
            <p className="text-gray-600 text-base sm:text-lg">訂閱我們的電子報，獲得最新的活動和優惠資訊！</p>
          </div>
          <div className="max-w-md mx-auto">
            <form className="flex flex-col sm:flex-row gap-3 sm:gap-2">
              <input
                type="email"
                placeholder="輸入你的電子郵件"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-base"
              />
              <button
                type="submit"
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all transform hover:scale-105 font-medium text-base w-full sm:w-auto"
              >
                訂閱
              </button>
            </form>
          </div>
          <div className="text-center mt-4 sm:mt-6">
            <p className="text-sm text-gray-500 px-4">訂閱即代表您同意接收我們的電子報和活動資訊。</p>
          </div>
        </div>
      </section>

    </div>
  );
}