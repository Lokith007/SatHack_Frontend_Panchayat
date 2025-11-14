import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';

const data = [
  { name: 'Ramesh K.', usage: 4200 },
  { name: 'Sunita P.', usage: 3800 },
  { name: 'Vijay M.', usage: 3500 },
  { name: 'Lakshmi R.', usage: 3200 },
  { name: 'Arjun S.', usage: 2900 },
];

export function TopFarmersChart() {
  const { t } = useLanguage();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.3 }}
      className="bg-white rounded-2xl p-6 shadow-md"
    >
      <div className="mb-6">
        <h3 className="text-[#2D1B12] mb-1">{t('chart.topFarmers')}</h3>
        <p className="text-sm text-gray-600">{t('chart.thisWeek')}</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#E8DFD8" />
          <XAxis type="number" stroke="#666" />
          <YAxis dataKey="name" type="category" width={100} stroke="#666" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '2px solid #E8DFD8', 
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }} 
          />
          <Bar dataKey="usage" fill="#FF6B35" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}