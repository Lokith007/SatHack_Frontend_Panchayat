import { motion } from 'motion/react';
import { Droplets, Activity, Users, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { WeeklyUsageChart } from './WeeklyUsageChart';
import { TopFarmersChart } from './TopFarmersChart';
import { SustainabilityGauge } from './SustainabilityGauge';
import { RecentAlerts } from './RecentAlerts';
import { WeeklyHeatmap } from './WeeklyHeatmap';
import { LanguageToggle } from './LanguageToggle';

export function Dashboard() {
  const { t } = useLanguage();
  
  const stats = [
    {
      label: t('stats.totalUsage'),
      value: '45,320 ' + t('common.liters'),
      change: '+12% ' + t('stats.fromLastWeek'),
      icon: Droplets,
      bgColor: 'bg-[#0095F6]',
    },
    {
      label: t('stats.activeBorewells'),
      value: '24',
      change: '2 ' + t('stats.newThisWeek'),
      icon: Activity,
      bgColor: 'bg-[#FF6B35]',
    },
    {
      label: t('stats.registeredFarmers'),
      value: '156',
      change: '+8 ' + t('stats.thisWeek'),
      icon: Users,
      bgColor: 'bg-[#00C896]',
    },
    {
      label: t('stats.efficiencyRate'),
      value: '87%',
      change: '+5% ' + t('stats.improvement'),
      icon: TrendingUp,
      bgColor: 'bg-[#A855F7]',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-[#2D1B12] mb-2">{t('dashboard.title')}</h2>
          <p className="text-gray-600">{t('dashboard.subtitle')}</p>
          <p className="text-sm text-[#FF6B35] mt-1">{t('dashboard.dateRange')}</p>
        </div>
        <div className="lg:hidden">
          <LanguageToggle />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`${stat.bgColor} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
              <div className="text-[#2D1B12] mb-2">{stat.value}</div>
              <div className="text-sm text-[#00C896]">{stat.change}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Weekly Heatmap - Full Width */}
      <WeeklyHeatmap />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WeeklyUsageChart />
        </div>
        <div>
          <SustainabilityGauge />
        </div>
      </div>

      {/* Second Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopFarmersChart />
        <RecentAlerts />
      </div>
    </div>
  );
}
