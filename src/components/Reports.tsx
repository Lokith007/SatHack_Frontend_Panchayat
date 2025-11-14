import { motion } from 'motion/react';
import { Download, Calendar, TrendingUp, TrendingDown, Droplets, Users } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';

const reports = [
  {
    id: 1,
    titleKey: 'reports.weekly',
    date: 'Nov 7 - Nov 14, 2025',
    dateHi: '7 नवंबर - 14 नवंबर, 2025',
    stats: {
      totalUsage: '45,320 L',
      change: '+12%',
      trend: 'up',
      efficiency: '87%',
      topFarmer: 'Ramesh Kumar',
    },
  },
  {
    id: 2,
    titleKey: 'reports.sustainability',
    date: 'Oct 31 - Nov 7, 2025',
    dateHi: '31 अक्टूबर - 7 नवंबर, 2025',
    stats: {
      totalUsage: '42,450 L',
      change: '-5%',
      trend: 'down',
      efficiency: '91%',
      topFarmer: 'Sunita Patil',
    },
  },
  {
    id: 3,
    titleKey: 'reports.analysis',
    date: 'Oct 24 - Oct 31, 2025',
    dateHi: '24 अक्टूबर - 31 अक्टूबर, 2025',
    stats: {
      totalUsage: '48,900 L',
      change: '+8%',
      trend: 'up',
      efficiency: '89%',
      topFarmer: 'Vijay Mehta',
    },
  },
  {
    id: 4,
    titleKey: 'reports.leak',
    date: 'Nov 7 - Nov 14, 2025',
    dateHi: '7 नवंबर - 14 नवंबर, 2025',
    stats: {
      totalUsage: '2,340 L',
      change: '-18%',
      trend: 'down',
      efficiency: '94%',
      topFarmer: 'N/A',
    },
  },
];

export function Reports() {
  const { t, language } = useLanguage();
  
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-[#2D1B12] mb-2">{t('reports.title')}</h2>
          <p className="text-gray-600">{t('reports.subtitle')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h3 className="text-[#2D1B12] mb-2">{t(report.titleKey)}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{language === 'en' ? report.date : report.dateHi}</span>
                </div>
              </div>
              <Button 
                size="sm" 
                className="bg-[#0095F6] hover:bg-[#0085e0] text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                {t('reports.download')}
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Total Usage */}
              <div className="bg-[#F5EBE6] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-4 h-4 text-[#0095F6]" />
                  <span className="text-xs text-gray-600">{t('reports.totalUsage')}</span>
                </div>
                <div className="text-[#2D1B12]">
                  {report.stats.totalUsage}
                  {report.id === 4 && language === 'en' && <span className="text-sm text-red-500 ml-1">(wasted)</span>}
                  {report.id === 4 && language === 'hi' && <span className="text-sm text-red-500 ml-1">{t('reports.wasted')}</span>}
                </div>
                <div className={`flex items-center gap-1 text-sm mt-1 ${
                  report.stats.trend === 'up' ? 'text-[#FF6B35]' : 'text-[#00C896]'
                }`}>
                  {report.stats.trend === 'up' ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span>{report.stats.change}</span>
                </div>
              </div>

              {/* Efficiency */}
              <div className="bg-[#E8F5E9] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-[#00C896]" />
                  <span className="text-xs text-gray-600">{t('reports.efficiency')}</span>
                </div>
                <div className="text-[#2D1B12]">{report.stats.efficiency}</div>
                <div className="text-sm text-[#00C896] mt-1">{t('reports.good')}</div>
              </div>

              {/* Top Farmer */}
              <div className="col-span-2 bg-[#F3E8FF] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-[#A855F7]" />
                  <span className="text-xs text-gray-600">{t('reports.topUser')}</span>
                </div>
                <div className="text-[#2D1B12]">{report.stats.topFarmer}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-[#0095F6] rounded-2xl p-8 text-white shadow-lg"
      >
        <h3 className="mb-4">{t('reports.custom')}</h3>
        <p className="mb-6 opacity-90">
          {t('reports.customDesc')}
        </p>
        <Button className="bg-white text-[#0095F6] hover:bg-gray-100">
          {t('reports.create')}
        </Button>
      </motion.div>
    </div>
  );
}
