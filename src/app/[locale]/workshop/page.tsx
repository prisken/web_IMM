import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'workshop' });
  
  return {
    title: '工作坊 | Creative Media Production House',
    description: '探索AI與創意的無限可能，立即報名參加工作坊！',
  };
}

export default async function WorkshopPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const workshops = [
    {
      title: "探索AI與創意的無限可能",
      description: "在我們的AI創意工作坊中，您將學習如何運用最新的AI技術提升創作效率，並與行業專家交流經驗。",
      image: "/workshop-1.jpg",
      dates: [
        { date: "2024年3月15日", status: "報名中" },
        { date: "2024年4月12日", status: "報名中" },
        { date: "2024年5月17日", status: "即將開放" },
        { date: "2024年6月14日", status: "即將開放" },
        { date: "2024年7月19日", status: "即將開放" },
        { date: "2024年8月16日", status: "即將開放" },
      ]
    }
  ];

  const teamMembers = [
    {
      name: "陳大文",
      title: "創意總監",
      description: "擁有10年以上UI/UX和社交媒體視覺創作經驗，專注於創新和用戶體驗。",
      image: "/team-1.jpg",
      social: {
        twitter: "#",
        linkedin: "#",
        instagram: "#"
      }
    },
    {
      name: "李小明",
      title: "數位總監",
      description: "數位行銷策略專家和數據分析師，擅長優化數位行銷效果。",
      image: "/team-2.jpg",
      social: {
        twitter: "#",
        linkedin: "#",
        instagram: "#"
      }
    },
    {
      name: "陳明明",
      title: "AI開發者",
      description: "專注於AI技術的研發與應用，擅長自然語言處理和機器學習。",
      image: "/team-3.jpg",
      social: {
        twitter: "#",
        linkedin: "#",
        instagram: "#"
      }
    },
    {
      name: "趙文文",
      title: "技術總監",
      description: "豐富的技術開發經驗，精通前後端技術和系統架構。",
      image: "/team-4.jpg",
      social: {
        twitter: "#",
        linkedin: "#",
        instagram: "#"
      }
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              探索AI與創意的無限可能
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              在我們的AI創意工作坊中，您將學習如何運用最新的AI技術提升創作效率，並與行業專家交流經驗。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#dates"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                立即報名
              </Link>
              <Link
                href="#details"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                了解更多
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Details Section */}
      <section id="details" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-200 rounded-lg aspect-square">
              {/* Placeholder for workshop image */}
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div>
              <div className="inline-block bg-blue-100 rounded-full p-2 mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-6">工作坊詳情</h2>
              <p className="text-gray-600 mb-6">
                我們的工作坊專注於實踐學習，讓您能夠立即應用所學。每個工作坊都由行業專家親自指導，確保您能獲得最新、最實用的知識和技能。
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>專業導師一對一指導</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>實踐操作和案例分析</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>最新AI技術應用</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Dates Section */}
      <section id="dates" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">工作坊日期與報名</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {workshops[0].dates.map((date, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex flex-col sm:flex-row justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold mb-2">{date.date}</h3>
                  <p className="text-gray-600">上午9:00 - 下午5:00</p>
                </div>
                <div className="mt-4 sm:mt-0">
                  {date.status === "報名中" ? (
                    <Link
                      href="/contact"
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
                    >
                      立即報名
                    </Link>
                  ) : (
                    <span className="text-gray-500 px-6 py-3 border border-gray-300 rounded-lg inline-block">
                      {date.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">我們的導師</h2>
          <p className="text-gray-600 text-center mb-12">由行業專業精英組成的講師團隊</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-square bg-gray-200">
                  {/* Placeholder for team member photo */}
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{member.name}</h3>
                  <p className="text-blue-600 text-sm mb-4">{member.title}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.description}</p>
                  <div className="flex space-x-4">
                    <a href={member.social.twitter} className="text-gray-400 hover:text-gray-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href={member.social.linkedin} className="text-gray-400 hover:text-gray-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a href={member.social.instagram} className="text-gray-400 hover:text-gray-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              準備好開始您的AI創意之旅了嗎？
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              立即報名參加我們的工作坊，與行業專家一起探索AI創意的無限可能！
            </p>
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
            >
              立即報名
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}