import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Droplets, MapPin, Activity } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Sample data for water usage points in a village (coordinates around a sample village in India)
const waterPoints = [
  // High usage (red) - center area
  { lat: 20.5937, lng: 78.9629, intensity: 0.9, name: 'Farm Zone A', type: 'farm', usage: 4200, farmer: 'Ramesh Kumar' },
  { lat: 20.5940, lng: 78.9635, intensity: 0.85, name: 'Borewell #12', type: 'borewell', usage: 3800, status: 'Active' },
  { lat: 20.5945, lng: 78.9625, intensity: 0.95, name: 'Farm Zone B', type: 'farm', usage: 4500, farmer: 'Sunita Patil' },
  
  // Moderate usage (orange) - surrounding areas
  { lat: 20.5930, lng: 78.9640, intensity: 0.6, name: 'Tank #4', type: 'tank', usage: 2800, level: '65%' },
  { lat: 20.5950, lng: 78.9620, intensity: 0.55, name: 'Farm Zone C', type: 'farm', usage: 2600, farmer: 'Vijay Mehta' },
  { lat: 20.5925, lng: 78.9630, intensity: 0.65, name: 'Borewell #8', type: 'borewell', usage: 3000, status: 'Active' },
  { lat: 20.5948, lng: 78.9638, intensity: 0.5, name: 'Community Well', type: 'well', usage: 2200, depth: '45ft' },
  
  // Low/sustainable usage (green) - outer areas
  { lat: 20.5920, lng: 78.9650, intensity: 0.3, name: 'Farm Zone D', type: 'farm', usage: 1500, farmer: 'Lakshmi Reddy' },
  { lat: 20.5955, lng: 78.9610, intensity: 0.25, name: 'Tank #7', type: 'tank', usage: 1200, level: '82%' },
  { lat: 20.5918, lng: 78.9615, intensity: 0.35, name: 'Borewell #3', type: 'borewell', usage: 1800, status: 'Active' },
  { lat: 20.5952, lng: 78.9645, intensity: 0.28, name: 'Farm Zone E', type: 'farm', usage: 1400, farmer: 'Arjun Singh' },
];

export function MapView() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [selectedPoint, setSelectedPoint] = useState<typeof waterPoints[0] | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    if (!mapContainerRef.current) return;

    let map: any = null;

    // Load Leaflet dynamically
    const loadLeaflet = async () => {
      try {
        // Add Leaflet CSS via link tag
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        link.crossOrigin = '';
        document.head.appendChild(link);

        // Wait for CSS to load
        await new Promise(resolve => {
          link.onload = resolve;
          setTimeout(resolve, 500); // Fallback
        });

        // Load Leaflet library
        const L = (await import('leaflet')).default;

        // Initialize map
        map = L.map(mapContainerRef.current!).setView([20.5937, 78.9629], 14);

        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        // Get color based on intensity
        const getIntensityColor = (intensity: number) => {
          if (intensity >= 0.7) return '#EF4444'; // Red - high
          if (intensity >= 0.4) return '#FF6B35'; // Orange - moderate
          return '#00C896'; // Green - low/sustainable
        };

        // Add colored circles for heatmap effect
        waterPoints.forEach(point => {
          const color = getIntensityColor(point.intensity);
          const radius = point.intensity * 500; // Scale radius based on intensity

          // Add circle overlay
          L.circle([point.lat, point.lng], {
            color: color,
            fillColor: color,
            fillOpacity: 0.3,
            opacity: 0.6,
            radius: radius,
            weight: 2,
          }).addTo(map);
        });

        // Create custom icons for markers
        const createCustomIcon = (type: string) => {
          const colors: Record<string, string> = {
            farm: '#FF6B35',
            borewell: '#0095F6',
            tank: '#00C896',
            well: '#A855F7',
          };
          
          const color = colors[type] || '#666';
          
          return L.divIcon({
            className: 'custom-marker',
            html: `
              <div style="
                background-color: ${color};
                width: 32px;
                height: 32px;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                border: 3px solid white;
                box-shadow: 0 4px 6px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <div style="transform: rotate(45deg); color: white; font-size: 16px;">💧</div>
              </div>
            `,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
          });
        };

        // Add markers
        waterPoints.forEach(point => {
          const marker = L.marker([point.lat, point.lng], {
            icon: createCustomIcon(point.type)
          }).addTo(map);

          const popupContent = `
            <div style="font-family: system-ui; min-width: 200px;">
              <div style="font-weight: 600; color: #2D1B12; margin-bottom: 8px; font-size: 16px;">${point.name}</div>
              <div style="color: #666; font-size: 14px; margin-bottom: 4px;">Type: <strong>${point.type}</strong></div>
              <div style="color: #666; font-size: 14px; margin-bottom: 4px;">Usage: <strong>${point.usage}L</strong></div>
              ${point.farmer ? `<div style="color: #666; font-size: 14px; margin-bottom: 4px;">Farmer: <strong>${point.farmer}</strong></div>` : ''}
              ${point.status ? `<div style="color: #666; font-size: 14px; margin-bottom: 4px;">Status: <strong>${point.status}</strong></div>` : ''}
              ${point.level ? `<div style="color: #666; font-size: 14px; margin-bottom: 4px;">Level: <strong>${point.level}</strong></div>` : ''}
              ${point.depth ? `<div style="color: #666; font-size: 14px;">Depth: <strong>${point.depth}</strong></div>` : ''}
            </div>
          `;

          marker.bindPopup(popupContent);
          
          marker.on('click', () => {
            setSelectedPoint(point);
          });
        });

        setMapLoaded(true);
      } catch (error) {
        console.error('Error loading map:', error);
        setMapLoaded(true); // Still mark as loaded to remove spinner
      }
    };

    loadLeaflet();

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  const getUsageColor = (usage: number) => {
    if (usage > 4000) return 'text-red-500';
    if (usage > 2500) return 'text-[#FF6B35]';
    return 'text-[#00C896]';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'farm':
        return <MapPin className="w-5 h-5" />;
      case 'borewell':
        return <Activity className="w-5 h-5" />;
      default:
        return <Droplets className="w-5 h-5" />;
    }
  };
  
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[#2D1B12] mb-2">{t('map.title')}</h2>
        <p className="text-gray-600">{t('map.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-md overflow-hidden relative"
        >
          <div ref={mapContainerRef} className="w-full h-[600px]" />
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-[#0095F6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <div className="text-gray-500">{t('map.loading')}</div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Legend and Selected Point Info */}
        <div className="space-y-4">
          {/* Legend */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-md"
          >
            <h3 className="text-[#2D1B12] mb-4">{t('map.legend')}</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#00C896] rounded"></div>
                <span className="text-sm text-gray-700">{t('map.lowSustainable')}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#FF6B35] rounded"></div>
                <span className="text-sm text-gray-700">{t('map.moderate')}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-red-500 rounded"></div>
                <span className="text-sm text-gray-700">{t('map.high')}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t-2 border-[#E8DFD8]">
              <h4 className="text-[#2D1B12] mb-3">{t('map.markerTypes')}</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 bg-[#FF6B35] rounded-full"></div>
                  <span className="text-gray-700">{t('map.farm')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 bg-[#0095F6] rounded-full"></div>
                  <span className="text-gray-700">{t('map.borewell')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 bg-[#00C896] rounded-full"></div>
                  <span className="text-gray-700">{t('map.tank')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 bg-[#A855F7] rounded-full"></div>
                  <span className="text-gray-700">{t('map.well')}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Selected Point Details */}
          {selectedPoint && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-[#0095F6] p-3 rounded-lg text-white">
                  {getTypeIcon(selectedPoint.type)}
                </div>
                <div className="flex-1">
                  <h3 className="text-[#2D1B12] mb-1">{selectedPoint.name}</h3>
                  <p className="text-sm text-gray-600 capitalize">{selectedPoint.type}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-[#E8DFD8]">
                  <span className="text-sm text-gray-600">{t('map.usage')}</span>
                  <span className={`${getUsageColor(selectedPoint.usage)}`}>
                    {selectedPoint.usage}{t('common.liters')}
                  </span>
                </div>

                {selectedPoint.farmer && (
                  <div className="flex justify-between items-center py-2 border-b border-[#E8DFD8]">
                    <span className="text-sm text-gray-600">{t('map.farmer')}</span>
                    <span className="text-[#2D1B12]">{selectedPoint.farmer}</span>
                  </div>
                )}

                {selectedPoint.status && (
                  <div className="flex justify-between items-center py-2 border-b border-[#E8DFD8]">
                    <span className="text-sm text-gray-600">{t('map.status')}</span>
                    <span className="text-[#00C896]">{selectedPoint.status}</span>
                  </div>
                )}

                {selectedPoint.level && (
                  <div className="flex justify-between items-center py-2 border-b border-[#E8DFD8]">
                    <span className="text-sm text-gray-600">{t('map.level')}</span>
                    <span className="text-[#2D1B12]">{selectedPoint.level}</span>
                  </div>
                )}

                {selectedPoint.depth && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-600">{t('map.depth')}</span>
                    <span className="text-[#2D1B12]">{selectedPoint.depth}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}