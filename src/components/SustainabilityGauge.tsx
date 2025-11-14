import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export function SustainabilityGauge() {
  const { t } = useLanguage();
  const sustainabilityScore = 72;
  const fairnessScore = 85;

  const GaugeCircle = ({ score, label, color }: { score: number; label: string; color: string }) => {
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-44 h-44">
          <svg className="transform -rotate-90 w-44 h-44">
            {/* Background circle */}
            <circle
              cx="88"
              cy="88"
              r={radius}
              stroke="#E8DFD8"
              strokeWidth="16"
              fill="none"
            />
            {/* Progress circle */}
            <motion.circle
              cx="88"
              cy="88"
              r={radius}
              stroke={color}
              strokeWidth="16"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              strokeLinecap="round"
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[#2D1B12]">{score}%</span>
            <span className="text-sm text-gray-600">{label}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
      className="bg-white rounded-2xl p-6 shadow-md h-full flex flex-col"
    >
      <div className="mb-6">
        <h3 className="text-[#2D1B12] mb-1">{t('chart.sustainability')}</h3>
        <p className="text-sm text-gray-600">{t('chart.performance')}</p>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-8">
        <GaugeCircle score={sustainabilityScore} label={t('chart.sustainability')} color="#00C896" />
        <GaugeCircle score={fairnessScore} label={t('chart.fairUsage')} color="#A855F7" />
      </div>
    </motion.div>
  );
}