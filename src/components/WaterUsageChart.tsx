import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';

const data = [
  { day: 'Mon', groundwater: 6200, target: 5500 },
  { day: 'Tue', groundwater: 6800, target: 5500 },
  { day: 'Wed', groundwater: 6500, target: 5500 },
  { day: 'Thu', groundwater: 7200, target: 5500 },
  { day: 'Fri', groundwater: 6900, target: 5500 },
  { day: 'Sat', groundwater: 5800, target: 5500 },
  { day: 'Sun', groundwater: 5900, target: 5500 },
];

export function WeeklyUsageChart() {
  const { t, language } = useLanguage();
  
  const dataWithTranslation = data.map(item => ({
    ...item,
    day: t(`days.${item.day.toLowerCase()}`)
  }));
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.3 }}
      className="bg-white rounded-2xl p-6 shadow-md"
    >
      <div className="mb-6">
        <h3 className="text-[#2D1B12] mb-1">{t('chart.weeklyUsage')}</h3>
        <p className="text-sm text-gray-600">{t('chart.dailyTrend')}</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dataWithTranslation}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8DFD8" />
          <XAxis dataKey="day" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '2px solid #E8DFD8', 
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }} 
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="groundwater" 
            stroke="#0095F6" 
            strokeWidth={3} 
            dot={{ fill: '#0095F6', r: 5 }}
            activeDot={{ r: 7 }}
            name={language === 'en' ? 'Groundwater Usage' : 'भूजल उपयोग'}
          />
          <Line 
            type="monotone" 
            dataKey="target" 
            stroke="#00C896" 
            strokeWidth={3} 
            strokeDasharray="5 5"
            dot={{ fill: '#00C896', r: 5 }}
            activeDot={{ r: 7 }}
            name={language === 'en' ? 'Target' : 'लक्ष्य'}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}