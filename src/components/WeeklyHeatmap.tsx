import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

// Generate hourly data for each day of the week (0-23 hours, 7 days)
const generateHeatmapData = () => {
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const data: { day: string; hour: number; value: number }[] = [];
  
  days.forEach((day, dayIndex) => {
    for (let hour = 0; hour < 24; hour++) {
      // Peak usage during 6-10 AM and 5-8 PM
      let baseValue = 20;
      if ((hour >= 6 && hour <= 10) || (hour >= 17 && hour <= 20)) {
        baseValue = 70 + Math.random() * 30;
      } else if (hour >= 11 && hour <= 16) {
        baseValue = 40 + Math.random() * 20;
      } else {
        baseValue = 10 + Math.random() * 15;
      }
      
      // Weekend has slightly different patterns
      if (dayIndex >= 5) {
        baseValue *= 0.8;
      }
      
      data.push({
        day,
        hour,
        value: Math.round(baseValue),
      });
    }
  });
  
  return data;
};

export function WeeklyHeatmap() {
  const { t } = useLanguage();
  const data = generateHeatmapData();
  
  const getColor = (value: number) => {
    if (value >= 80) return '#EF4444'; // Red - high
    if (value >= 60) return '#FF6B35'; // Orange - moderate-high
    if (value >= 40) return '#FFA726'; // Light orange - moderate
    if (value >= 20) return '#00C896'; // Green - low-moderate
    return '#E8F5E9'; // Very light green - very low
  };
  
  const days = [
    { key: 'mon', label: t('days.mon') },
    { key: 'tue', label: t('days.tue') },
    { key: 'wed', label: t('days.wed') },
    { key: 'thu', label: t('days.thu') },
    { key: 'fri', label: t('days.fri') },
    { key: 'sat', label: t('days.sat') },
    { key: 'sun', label: t('days.sun') },
  ];
  
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.3 }}
      className="bg-white rounded-2xl p-6 shadow-md"
    >
      <div className="mb-6">
        <h3 className="text-[#2D1B12] mb-1">{t('heatmap.title')}</h3>
        <p className="text-sm text-gray-600">{t('heatmap.subtitle')}</p>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Hours header */}
          <div className="flex mb-2">
            <div className="w-16 flex-shrink-0"></div>
            <div className="flex-1 flex">
              {[0, 3, 6, 9, 12, 15, 18, 21].map((hour) => (
                <div key={hour} className="flex-1 text-center text-xs text-gray-500">
                  {hour}:00
                </div>
              ))}
            </div>
          </div>
          
          {/* Heatmap grid */}
          <div className="space-y-2">
            {days.map((day, dayIndex) => (
              <div key={day.key} className="flex items-center">
                <div className="w-16 flex-shrink-0 text-sm text-gray-700 pr-3">
                  {day.label}
                </div>
                <div className="flex-1 flex gap-1">
                  {hours.map((hour) => {
                    const cellData = data.find(
                      d => d.day === day.key && d.hour === hour
                    );
                    const value = cellData?.value || 0;
                    const color = getColor(value);
                    
                    return (
                      <motion.div
                        key={hour}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: dayIndex * 0.05 + hour * 0.002 }}
                        className="flex-1 h-10 rounded cursor-pointer hover:opacity-80 transition-opacity relative group"
                        style={{ backgroundColor: color }}
                        title={`${day.label} ${hour}:00 - ${value}%`}
                      >
                        {/* Tooltip on hover */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                          {day.label} {hour}:00
                          <br />
                          {value}% {t('map.usage')}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="mt-6 flex items-center justify-center gap-6 text-sm">
            <span className="text-gray-600">{t('map.lowSustainable')}</span>
            <div className="flex gap-1">
              <div className="w-8 h-6 rounded" style={{ backgroundColor: '#E8F5E9' }}></div>
              <div className="w-8 h-6 rounded" style={{ backgroundColor: '#00C896' }}></div>
              <div className="w-8 h-6 rounded" style={{ backgroundColor: '#FFA726' }}></div>
              <div className="w-8 h-6 rounded" style={{ backgroundColor: '#FF6B35' }}></div>
              <div className="w-8 h-6 rounded" style={{ backgroundColor: '#EF4444' }}></div>
            </div>
            <span className="text-gray-600">{t('map.high')}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
