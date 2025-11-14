import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.map': 'Map',
    'nav.reports': 'Reports',
    'nav.alerts': 'Alerts',
    'nav.title': 'Panchayat',
    'nav.subtitle': 'Water Monitor',
    'nav.help': 'Need help?',
    'nav.support': 'Contact support team',
    
    // Dashboard
    'dashboard.title': 'Weekly Water Monitoring Report',
    'dashboard.subtitle': 'Real-time insights for the current week',
    'dashboard.dateRange': 'Nov 7 - Nov 14, 2025',
    
    // Stats
    'stats.totalUsage': 'Total Water Usage',
    'stats.activeBorewells': 'Active Borewells',
    'stats.registeredFarmers': 'Registered Farmers',
    'stats.efficiencyRate': 'Efficiency Rate',
    'stats.fromLastWeek': 'from last week',
    'stats.newThisWeek': 'new this week',
    'stats.thisWeek': 'this week',
    'stats.improvement': 'improvement',
    
    // Charts
    'chart.weeklyUsage': 'Weekly Water Usage Trend',
    'chart.dailyTrend': 'Daily consumption in liters (thousands)',
    'chart.topFarmers': 'Top Water Consuming Farmers',
    'chart.thisWeek': 'This week in liters',
    'chart.sustainability': 'Sustainability Metrics',
    'chart.performance': 'Weekly performance scores',
    'chart.fairUsage': 'Fair Usage',
    
    // Alerts
    'alerts.recent': 'Recent Alerts',
    'alerts.latest': 'Latest notifications and warnings',
    'alerts.active': 'Active Alerts',
    'alerts.resolved': 'Recently Resolved',
    'alerts.critical': 'Critical',
    'alerts.warnings': 'Warnings',
    'alerts.resolve': 'Resolve',
    
    // Map
    'map.title': 'Water Usage Heatmap',
    'map.subtitle': 'Interactive map showing groundwater consumption across the panchayat',
    'map.legend': 'Usage Legend',
    'map.lowSustainable': 'Low/Sustainable',
    'map.moderate': 'Moderate',
    'map.high': 'High',
    'map.markerTypes': 'Marker Types',
    'map.farm': 'Farm',
    'map.borewell': 'Borewell',
    'map.tank': 'Tank',
    'map.well': 'Well',
    'map.loading': 'Loading map...',
    'map.usage': 'Water Usage',
    'map.farmer': 'Farmer',
    'map.status': 'Status',
    'map.level': 'Water Level',
    'map.depth': 'Depth',
    'map.type': 'Type',
    
    // Reports
    'reports.title': 'Weekly Reports & Analytics',
    'reports.subtitle': 'Download detailed weekly reports on water usage and sustainability',
    'reports.weekly': 'Weekly Water Usage Report',
    'reports.sustainability': 'Weekly Sustainability Report',
    'reports.analysis': 'Weekly Analysis Report',
    'reports.leak': 'Weekly Leak Detection Report',
    'reports.download': 'PDF',
    'reports.totalUsage': 'Total Usage',
    'reports.efficiency': 'Efficiency',
    'reports.topUser': 'Top Water User',
    'reports.good': 'Good',
    'reports.wasted': '(wasted)',
    'reports.custom': 'Generate Custom Report',
    'reports.customDesc': 'Create a customized weekly report with specific date ranges, metrics, and data points.',
    'reports.create': 'Create Report',
    
    // Common
    'common.liters': 'L',
    'common.active': 'Active',
    'common.resolved': 'Resolved',
    'common.minsAgo': 'mins ago',
    'common.hourAgo': 'hour ago',
    'common.hoursAgo': 'hours ago',
    'common.dayAgo': 'day ago',
    'common.daysAgo': 'days ago',
    
    // Days
    'days.mon': 'Mon',
    'days.tue': 'Tue',
    'days.wed': 'Wed',
    'days.thu': 'Thu',
    'days.fri': 'Fri',
    'days.sat': 'Sat',
    'days.sun': 'Sun',
    
    // Heatmap
    'heatmap.title': 'Weekly Usage Heatmap',
    'heatmap.subtitle': 'Hour-by-hour water consumption patterns',
    'heatmap.hours': 'Hours of Day',
  },
  hi: {
    // Navigation
    'nav.dashboard': 'डैशबोर्ड',
    'nav.map': 'मानचित्र',
    'nav.reports': 'रिपोर्ट',
    'nav.alerts': 'अलर्ट',
    'nav.title': 'पंचायत',
    'nav.subtitle': 'जल मॉनिटर',
    'nav.help': 'मदद चाहिए?',
    'nav.support': 'सहायता टीम से संपर्क करें',
    
    // Dashboard
    'dashboard.title': 'साप्ताहिक जल निगरानी रिपोर्ट',
    'dashboard.subtitle': 'वर्तमान सप्ताह के लिए वास्तविक समय की जानकारी',
    'dashboard.dateRange': '7 नवंबर - 14 नवंबर, 2025',
    
    // Stats
    'stats.totalUsage': 'कुल जल उपयोग',
    'stats.activeBorewells': 'सक्रिय बोरवेल',
    'stats.registeredFarmers': 'पंजीकृत किसान',
    'stats.efficiencyRate': 'दक्षता दर',
    'stats.fromLastWeek': 'पिछले सप्ताह से',
    'stats.newThisWeek': 'इस सप्ताह नए',
    'stats.thisWeek': 'इस सप्ताह',
    'stats.improvement': 'सुधार',
    
    // Charts
    'chart.weeklyUsage': 'साप्ताहिक जल उपयोग प्रवृत्ति',
    'chart.dailyTrend': 'दैनिक उपभोग लीटर में (हजारों)',
    'chart.topFarmers': 'शीर्ष जल उपभोग करने वाले किसान',
    'chart.thisWeek': 'इस सप्ताह लीटर में',
    'chart.sustainability': 'स्थिरता मेट्रिक्स',
    'chart.performance': 'साप्ताहिक प्रदर्शन स्कोर',
    'chart.fairUsage': 'उचित उपयोग',
    
    // Alerts
    'alerts.recent': 'हाल के अलर्ट',
    'alerts.latest': 'नवीनतम सूचनाएं और चेतावनियां',
    'alerts.active': 'सक्रिय अलर्ट',
    'alerts.resolved': 'हाल ही में हल किया गया',
    'alerts.critical': 'गंभीर',
    'alerts.warnings': 'चेतावनियां',
    'alerts.resolve': 'हल करें',
    
    // Map
    'map.title': 'जल उपयोग हीटमैप',
    'map.subtitle': 'पंचायत भर में भूजल खपत दिखाने वाला इंटरैक्टिव मानचित्र',
    'map.legend': 'उपयोग किंवदंती',
    'map.lowSustainable': 'कम/टिकाऊ',
    'map.moderate': 'मध्यम',
    'map.high': 'उच्च',
    'map.markerTypes': 'मार्कर प्रकार',
    'map.farm': 'खेत',
    'map.borewell': 'बोरवेल',
    'map.tank': 'टैंक',
    'map.well': 'कुआं',
    'map.loading': 'मानचित्र लोड हो रहा है...',
    'map.usage': 'जल उपयोग',
    'map.farmer': 'किसान',
    'map.status': 'स्थिति',
    'map.level': 'जल स्तर',
    'map.depth': 'गहराई',
    'map.type': 'प्रकार',
    
    // Reports
    'reports.title': 'साप्ताहिक रिपोर्ट और विश्लेषण',
    'reports.subtitle': 'जल उपयोग और स्थिरता पर विस्तृत साप्ताहिक रिपोर्ट डाउनलोड करें',
    'reports.weekly': 'साप्ताहिक जल उपयोग रिपोर्ट',
    'reports.sustainability': 'साप्ताहिक स्थिरता रिपोर्ट',
    'reports.analysis': 'साप्ताहिक विश्लेषण रिपोर्ट',
    'reports.leak': 'साप्ताहिक रिसाव पता लगाने की रिपोर्ट',
    'reports.download': 'पीडीएफ',
    'reports.totalUsage': 'कुल उपयोग',
    'reports.efficiency': 'दक्षता',
    'reports.topUser': 'शीर्ष जल उपयोगकर्ता',
    'reports.good': 'अच्छा',
    'reports.wasted': '(बर्बाद)',
    'reports.custom': 'कस्टम रिपोर्ट बनाएं',
    'reports.customDesc': 'विशिष्ट तिथि श्रेणियों, मेट्रिक्स और डेटा बिंदुओं के साथ एक अनुकूलित साप्ताहिक रिपोर्ट बनाएं।',
    'reports.create': 'रिपोर्ट बनाएं',
    
    // Common
    'common.liters': 'ली',
    'common.active': 'सक्रिय',
    'common.resolved': 'हल किया गया',
    'common.minsAgo': 'मिनट पहले',
    'common.hourAgo': 'घंटा पहले',
    'common.hoursAgo': 'घंटे पहले',
    'common.dayAgo': 'दिन पहले',
    'common.daysAgo': 'दिन पहले',
    
    // Days
    'days.mon': 'सोम',
    'days.tue': 'मंगल',
    'days.wed': 'बुध',
    'days.thu': 'गुरु',
    'days.fri': 'शुक्र',
    'days.sat': 'शनि',
    'days.sun': 'रवि',
    
    // Heatmap
    'heatmap.title': 'साप्ताहिक उपयोग हीटमैप',
    'heatmap.subtitle': 'घंटे-दर-घंटे जल खपत पैटर्न',
    'heatmap.hours': 'दिन के घंटे',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
