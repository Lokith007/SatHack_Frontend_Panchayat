import { motion } from 'motion/react';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const alerts = [
  {
    id: 1,
    type: 'critical',
    title: 'Leak Detected - Borewell #12',
    titleHi: 'रिसाव का पता चला - बोरवेल #12',
    description: 'Unusual water flow detected. Immediate action required.',
    descriptionHi: 'असामान्य जल प्रवाह का पता चला। तत्काल कार्रवाई आवश्यक।',
    time: '10 mins ago',
    timeHi: '10 मिनट पहले',
    icon: AlertTriangle,
  },
  {
    id: 2,
    type: 'warning',
    title: 'High Consumption Alert',
    titleHi: 'उच्च खपत अलर्ट',
    description: 'Farm zone B exceeded daily limit by 25%.',
    descriptionHi: 'फार्म ज़ोन बी ने दैनिक सीमा 25% से अधिक कर दी।',
    time: '1 hour ago',
    timeHi: '1 घंटा पहले',
    icon: AlertCircle,
  },
  {
    id: 3,
    type: 'info',
    title: 'Maintenance Scheduled',
    titleHi: 'रखरखाव निर्धारित',
    description: 'Tank #4 maintenance planned for tomorrow.',
    descriptionHi: 'टैंक #4 का रखरखाव कल के लिए निर्धारित।',
    time: '3 hours ago',
    timeHi: '3 घंटे पहले',
    icon: Info,
  },
];

export function RecentAlerts() {
  const { t, language } = useLanguage();
  
  const getAlertStyles = (type: string) => {
    switch (type) {
      case 'critical':
        return { bg: 'bg-red-50', border: 'border-red-500', icon: 'text-red-500' };
      case 'warning':
        return { bg: 'bg-orange-50', border: 'border-[#FF6B35]', icon: 'text-[#FF6B35]' };
      case 'info':
        return { bg: 'bg-blue-50', border: 'border-[#0095F6]', icon: 'text-[#0095F6]' };
      default:
        return { bg: 'bg-gray-50', border: 'border-gray-500', icon: 'text-gray-500' };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.7, duration: 0.3 }}
      className="bg-white rounded-2xl p-6 shadow-md"
    >
      <div className="mb-6">
        <h3 className="text-[#2D1B12] mb-1">{t('alerts.recent')}</h3>
        <p className="text-sm text-gray-600">{t('alerts.latest')}</p>
      </div>

      <div className="space-y-4">
        {alerts.map((alert, index) => {
          const Icon = alert.icon;
          const styles = getAlertStyles(alert.type);
          
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className={`${styles.bg} border-l-4 ${styles.border} rounded-lg p-4 hover:shadow-md transition-shadow duration-200`}
            >
              <div className="flex gap-3">
                <Icon className={`w-5 h-5 ${styles.icon} flex-shrink-0 mt-1`} />
                <div className="flex-1">
                  <div className="text-[#2D1B12] mb-1">
                    {language === 'en' ? alert.title : alert.titleHi}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {language === 'en' ? alert.description : alert.descriptionHi}
                  </p>
                  <span className="text-xs text-gray-500">
                    {language === 'en' ? alert.time : alert.timeHi}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}