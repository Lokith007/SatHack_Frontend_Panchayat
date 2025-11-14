import { motion } from 'motion/react';
import { AlertTriangle, AlertCircle, Info, CheckCircle, MapPin, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

const allAlerts = [
  {
    id: 1,
    type: 'critical',
    title: 'Leak Detected - Borewell #12',
    description: 'Unusual water flow pattern detected at Borewell #12. Water wastage estimated at 450L/hour.',
    location: 'Farm Zone A, Sector 3',
    time: '10 mins ago',
    status: 'active',
  },
  {
    id: 2,
    type: 'critical',
    title: 'System Malfunction - Tank #4',
    description: 'Water level sensor not responding. Manual inspection required immediately.',
    location: 'Central Village Area',
    time: '25 mins ago',
    status: 'active',
  },
  {
    id: 3,
    type: 'warning',
    title: 'High Consumption Alert',
    description: 'Farm zone B exceeded daily water limit by 25%. Recommendation: implement drip irrigation.',
    location: 'Farm Zone B, Sector 5',
    time: '1 hour ago',
    status: 'active',
  },
  {
    id: 4,
    type: 'warning',
    title: 'Low Water Level - Tank #7',
    description: 'Water level dropped to 35%. Consider refilling within next 24 hours.',
    location: 'Farm Zone D, Sector 8',
    time: '2 hours ago',
    status: 'active',
  },
  {
    id: 5,
    type: 'info',
    title: 'Maintenance Scheduled',
    description: 'Routine maintenance planned for Tank #4 tomorrow at 9:00 AM.',
    location: 'Central Village Area',
    time: '3 hours ago',
    status: 'active',
  },
  {
    id: 6,
    type: 'info',
    title: 'New Farmer Registration',
    description: 'Arjun Singh registered for water monitoring program.',
    location: 'Farm Zone E, Sector 9',
    time: '5 hours ago',
    status: 'active',
  },
  {
    id: 7,
    type: 'success',
    title: 'Leak Repaired - Borewell #8',
    description: 'Previously detected leak has been successfully repaired. System back to normal.',
    location: 'Farm Zone C, Sector 6',
    time: '1 day ago',
    status: 'resolved',
  },
  {
    id: 8,
    type: 'success',
    title: 'Efficiency Target Achieved',
    description: 'Panchayat achieved 90% water efficiency target for the week.',
    location: 'All Zones',
    time: '2 days ago',
    status: 'resolved',
  },
];

export function Alerts() {
  const getAlertConfig = (type: string) => {
    switch (type) {
      case 'critical':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-500',
          iconColor: 'text-red-500',
          badgeColor: 'bg-red-500',
        };
      case 'warning':
        return {
          icon: AlertCircle,
          bgColor: 'bg-orange-50',
          borderColor: 'border-[#FF6B35]',
          iconColor: 'text-[#FF6B35]',
          badgeColor: 'bg-[#FF6B35]',
        };
      case 'success':
        return {
          icon: CheckCircle,
          bgColor: 'bg-green-50',
          borderColor: 'border-[#00C896]',
          iconColor: 'text-[#00C896]',
          badgeColor: 'bg-[#00C896]',
        };
      default:
        return {
          icon: Info,
          bgColor: 'bg-blue-50',
          borderColor: 'border-[#0095F6]',
          iconColor: 'text-[#0095F6]',
          badgeColor: 'bg-[#0095F6]',
        };
    }
  };

  const handleResolve = (alertId: number, title: string) => {
    toast.success(`Alert resolved: ${title}`);
  };

  const activeAlerts = allAlerts.filter(a => a.status === 'active');
  const resolvedAlerts = allAlerts.filter(a => a.status === 'resolved');

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-[#2D1B12] mb-2">Alerts & Notifications</h2>
          <p className="text-gray-600">Monitor and manage all system alerts and warnings</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm">
            {activeAlerts.filter(a => a.type === 'critical').length} Critical
          </div>
          <div className="bg-[#FF6B35] text-white px-4 py-2 rounded-lg text-sm">
            {activeAlerts.filter(a => a.type === 'warning').length} Warnings
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      <div>
        <h3 className="text-[#2D1B12] mb-4">Active Alerts</h3>
        <div className="space-y-4">
          {activeAlerts.map((alert, index) => {
            const config = getAlertConfig(alert.type);
            const Icon = config.icon;

            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`${config.bgColor} border-l-4 ${config.borderColor} rounded-xl p-6 hover:shadow-lg transition-all duration-200`}
              >
                <div className="flex items-start gap-4">
                  <div className={`${config.iconColor} flex-shrink-0 mt-1`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-[#2D1B12] mb-1">{alert.title}</h4>
                        <div className={`inline-block px-3 py-1 rounded-full text-xs text-white ${config.badgeColor} mb-3`}>
                          {alert.type.toUpperCase()}
                        </div>
                      </div>
                      {alert.type !== 'info' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleResolve(alert.id, alert.title)}
                          className="ml-4"
                        >
                          Resolve
                        </Button>
                      )}
                    </div>

                    <p className="text-gray-700 mb-4">{alert.description}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{alert.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{alert.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Resolved Alerts */}
      <div>
        <h3 className="text-[#2D1B12] mb-4">Recently Resolved</h3>
        <div className="space-y-4">
          {resolvedAlerts.map((alert, index) => {
            const config = getAlertConfig(alert.type);
            const Icon = config.icon;

            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="bg-white border-l-4 border-gray-300 rounded-xl p-6 opacity-75 hover:opacity-100 transition-opacity"
              >
                <div className="flex items-start gap-4">
                  <div className={`${config.iconColor} flex-shrink-0 mt-1`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <h4 className="text-[#2D1B12] mb-1">{alert.title}</h4>
                    <p className="text-gray-600 mb-3">{alert.description}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{alert.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{alert.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#00C896]" />
                        <span className="text-[#00C896]">Resolved</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
