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
      <section className="relative min-h-[90vh] flex items-center bg-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black/50"></div>
          <video
            className="w-full h-full object-cover opacity-50"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/workshop-poster.jpg"
          >
            <source src="/videos/workshop-bg.mp4" type="video/mp4" />
          </video>
        </div>
        
        <div className="container relative z-10 mx-auto px-4 pt-20 pb-12 sm:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center sm:text-left">
              <span className="inline-block text-sm font-semibold px-4 py-2 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
                AI創意工作坊
              </span>
              <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
                探索AI與創意的
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  無限可能
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto sm:mx-0">
                在我們的AI創意工作坊中，您將學習如何運用最新的AI技術提升創作效率，並與行業專家交流經驗。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <Link
                  href="#dates"
                  className="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 text-lg shadow-lg hover:shadow-xl"
                >
                  立即報名
                </Link>
                <Link
                  href="#details"
                  className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all text-lg"
                >
                  了解更多
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Workshop Details Section */}
      <section id="details" className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl transform rotate-2"></div>
                <img
                  src="/images/workshop-details.jpg"
                  alt="Workshop Details"
                  className="relative w-full aspect-[4/3] object-cover rounded-xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500"
                />
              </div>
              <div className="relative">
                <span className="inline-block text-sm font-semibold px-4 py-2 bg-blue-100 text-blue-800 rounded-full mb-6">
                  工作坊特色
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">工作坊詳情</h2>
                <p className="text-gray-600 text-lg mb-8">
                  我們的工作坊專注於實踐學習，讓您能夠立即應用所學。每個工作坊都由行業專家親自指導，確保您能獲得最新、最實用的知識和技能。
                </p>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">專業導師一對一指導</h3>
                      <p className="text-gray-600">獲得專業導師的個人化指導和建議</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">實踐操作和案例分析</h3>
                      <p className="text-gray-600">透過實際案例學習，加深理解和應用</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">最新AI技術應用</h3>
                      <p className="text-gray-600">掌握最新的AI技術和應用方法</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Dates Section */}
      <section id="dates" className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-sm font-semibold px-4 py-2 bg-black text-white rounded-full mb-4">
              即將開課
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">工作坊日期與報名</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              選擇最適合您的時間，開始AI創意之旅
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-4 sm:gap-6">
              {workshops[0].dates.map((date, index) => (
                <div 
                  key={index} 
                  className="group bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-xl sm:text-2xl font-bold">{date.date}</h3>
                        {date.status === "報名中" && (
                          <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                            名額有限
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-6 text-gray-600">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          上午9:00 - 下午5:00
                        </div>
                        <div className="hidden sm:flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          香港
                        </div>
                      </div>
                    </div>
                    <div className="w-full sm:w-auto">
                      {date.status === "報名中" ? (
                        <Link
                          href="/contact"
                          className="block w-full sm:w-auto text-center bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                          立即報名
                        </Link>
                      ) : (
                        <span className="block w-full sm:w-auto text-center px-8 py-4 bg-gray-100 text-gray-500 rounded-xl font-medium">
                          {date.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-sm font-semibold px-4 py-2 bg-black text-white rounded-full mb-4">
              專業團隊
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">我們的導師</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              由行業專業精英組成的講師團隊，帶領您探索AI創意的無限可能
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div className="relative">
                  <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-purple-100">
                    {/* Placeholder for team member photo */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-xl sm:text-2xl mb-2">{member.name}</h3>
                      <p className="text-black/70 font-medium">{member.title}</p>
                    </div>
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </span>
                  </div>
                  <p className="text-gray-600 text-base mb-6">{member.description}</p>
                  <div className="flex items-center space-x-4">
                    <a 
                      href={member.social.linkedin} 
                      className="text-gray-600 hover:text-black transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a 
                      href={member.social.twitter} 
                      className="text-gray-600 hover:text-black transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
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
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-black/20"></div>
        </div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0),rgba(0,0,0,0.5))]"></div>
        </div>
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block text-sm font-semibold px-4 py-2 bg-white/10 text-white rounded-full mb-6 backdrop-blur-sm">
              開始學習
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold mb-6 text-white">
              準備好開始您的
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI創意之旅
              </span>
              了嗎？
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              立即報名參加我們的工作坊，與行業專家一起探索AI創意的無限可能！
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 text-lg shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
              >
                立即報名
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="#dates"
                className="text-white hover:text-gray-200 transition-colors inline-flex items-center gap-2"
              >
                查看課程日期
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}