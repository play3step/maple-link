import { Link } from 'react-router-dom'
import { FiClock, FiChevronRight } from 'react-icons/fi'

import HomeNavigation from '../components/home/HomeNavigation'
import HeroSection from '../components/home/HeroSection'
import GuildSearchSection from '../components/home/GuildSearchSection'
import CharacterSearchSection from '../components/home/CharacterSearchSection'
import FeatureShowcase from '../components/home/FeatureShowcase'
import { recentNotices } from '../data/notices'

const Home = () => {
  return (
    <div className="min-h-dvh bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <HomeNavigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <HeroSection />

        <div className="mb-6">
          <GuildSearchSection />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <CharacterSearchSection />
          <FeatureShowcase />
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">최근 소식</h2>
              <Link
                to="/notice"
                className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-medium">
                더보기
                <FiChevronRight />
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {recentNotices.reverse().map(notice => (
              <Link
                key={notice.id}
                to="/notice"
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <FiClock className="text-gray-400" />
                  <span className="text-gray-900">{notice.title}</span>
                </div>
                <span className="text-sm text-gray-500">{notice.date}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
