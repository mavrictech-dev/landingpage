import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { Sun, Cloud, CloudRain, Clock, ChevronDown, ChevronUp } from 'lucide-react';

const timeLabels = [
  { hour: 8, label: 'Mañana' },
  { hour: 13, label: 'Mediodía' },
  { hour: 16, label: 'Tarde' },
  { hour: 17, label: 'Atardecer' },
  { hour: 19, label: 'Anochecer' },
  { hour: 22, label: 'Noche' },
];

export default function ThemeControlPanel() {
  const { currentHour, autoTime, autoWeather, weatherMode, setHour, enableAutoTime, setWeatherMode, theme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  const weatherOptions = [
    { key: 'clear', label: 'Despejado', icon: Sun },
    { key: 'cloudy', label: 'Nublado', icon: Cloud },
    { key: 'rain', label: 'Lluvia', icon: CloudRain },
  ];

  return (
    <motion.div
      className="fixed top-20 right-4 z-50"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 1.5 }}
    >
      <div
        className="rounded-2xl border overflow-hidden transition-all duration-700"
        style={{
          background: theme.panelBg,
          borderColor: theme.panelBorder,
          backdropFilter: 'blur(24px)',
          boxShadow: theme.isLight ? '0 8px 32px rgba(0,0,0,0.08)' : '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        {/* Header */}
        <button
          className="w-full flex items-center justify-between px-4 py-3 transition-colors"
          onClick={() => setCollapsed(!collapsed)}
          style={{ color: theme.textMuted }}
        >
          <div className="flex items-center gap-2">
            <Clock size={12} style={{ color: theme.accent1 }} />
            <span className="text-[11px] font-mono tracking-wider" style={{ color: theme.textMuted }}>
              ENTORNO
            </span>
          </div>
          {collapsed ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
        </button>

        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 space-y-4">
                {/* Time slider */}
                <div>
                  <div className="flex justify-between text-[10px] font-mono mb-2" style={{ color: theme.textMuted }}>
                    <span>00:00</span>
                    <span className="font-medium" style={{ color: theme.accent1 }}>
                      {String(currentHour).padStart(2, '0')}:00
                    </span>
                    <span>23:00</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={23}
                    step={1}
                    value={currentHour}
                    onChange={(e) => setHour(parseInt(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: 'linear-gradient(90deg, #22D3EE, #3B82F6, #D97706, #EA580C, #3B82F6, #0891B2)',
                    }}
                  />
                </div>

                {/* Quick time buttons */}
                <div className="grid grid-cols-3 gap-1.5">
                  {timeLabels.map(t => {
                    const isActive = currentHour === t.hour;
                    return (
                      <button
                        key={t.hour}
                        onClick={() => setHour(t.hour)}
                        className="text-[9px] font-mono tracking-wider py-1.5 rounded-lg border transition-all duration-300"
                        style={{
                          borderColor: isActive ? `${theme.accent1}50` : theme.panelBorder,
                          color: isActive ? theme.accent1 : theme.textMuted,
                          background: isActive ? `${theme.accent1}10` : 'transparent',
                        }}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>

                {/* Weather + Auto controls */}
                <div className="space-y-2">
                  <button
                    onClick={enableAutoTime}
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg border text-[10px] font-mono tracking-wider transition-all duration-300"
                    style={{
                      borderColor: (autoTime && autoWeather) ? `${theme.accent1}50` : theme.panelBorder,
                      color: (autoTime && autoWeather) ? theme.accent1 : theme.textMuted,
                      background: (autoTime && autoWeather) ? `${theme.accent1}10` : 'transparent',
                    }}
                  >
                    <Clock size={10} /> Auto (Piura)
                  </button>
                  <div className="grid grid-cols-3 gap-1.5">
                    {weatherOptions.map(w => {
                      const isActive = weatherMode === w.key;
                      return (
                        <button
                          key={w.key}
                          onClick={() => setWeatherMode(w.key)}
                          className="flex items-center justify-center gap-1 py-2 rounded-lg border text-[10px] font-mono tracking-wider transition-all duration-300"
                          style={{
                            borderColor: isActive ? `${theme.accent1}50` : theme.panelBorder,
                            color: isActive ? theme.accent1 : theme.textMuted,
                            background: isActive ? `${theme.accent1}10` : 'transparent',
                          }}
                        >
                          <w.icon size={10} /> {w.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}