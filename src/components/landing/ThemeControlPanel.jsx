import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { Sun, Cloud, CloudRain, Clock, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

const timeLabels = [
  { hour: 8, label: 'Mañana' },
  { hour: 13, label: 'Mediodía' },
  { hour: 16, label: 'Tarde' },
  { hour: 17, label: 'Atardecer' },
  { hour: 19, label: 'Anochecer' },
  { hour: 22, label: 'Noche' },
];

const weatherLabels = { clear: 'Despejado', cloudy: 'Nublado', rain: 'Lluvia' };
const WeatherIcon = ({ mode, size = 10, style }) => {
  if (mode === 'rain') return <CloudRain size={size} style={style} />;
  if (mode === 'cloudy') return <Cloud size={size} style={style} />;
  return <Sun size={size} style={style} />;
};

export default function ThemeControlPanel() {
  const { currentHour, piuraMinute, piuraTemp, autoTime, autoWeather, weatherMode, setHour, enableAutoTime, setWeatherMode, theme } = useTheme();
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [open]);

  const timeStr = `${String(currentHour).padStart(2, '0')}:${String(piuraMinute).padStart(2, '0')}`;

  const weatherOptions = [
    { key: 'clear', label: 'Despejado', icon: Sun },
    { key: 'cloudy', label: 'Nublado', icon: Cloud },
    { key: 'rain', label: 'Lluvia', icon: CloudRain },
  ];

  return (
    <motion.div
      ref={panelRef}
      className="fixed top-20 right-4 z-50"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 1.5 }}
    >
      <AnimatePresence mode="wait">
        {!open ? (
          /* Compact card */
          <motion.button
            key="compact"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(true)}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border transition-all duration-700 cursor-pointer hover:scale-[1.02]"
            style={{
              background: theme.panelBg,
              borderColor: theme.panelBorder,
              backdropFilter: 'blur(20px)',
              boxShadow: theme.isLight ? '0 4px 20px rgba(0,0,0,0.06)' : '0 4px 20px rgba(0,0,0,0.35)',
            }}
          >
            <div className="flex flex-col items-start gap-0.5">
              <div className="flex items-center gap-1.5">
                <MapPin size={9} style={{ color: theme.textMuted }} />
                <span className="text-[9px] font-mono tracking-wider" style={{ color: theme.textMuted }}>
                  Castilla, Piura
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-heading font-semibold tabular-nums" style={{ color: theme.textPrimary }}>
                  {timeStr}
                </span>
                {piuraTemp !== null && (
                  <span className="text-[10px] font-mono" style={{ color: theme.textMuted }}>
                    {piuraTemp}°C
                  </span>
                )}
                <WeatherIcon mode={weatherMode} size={11} style={{ color: theme.accent1 }} />
              </div>
            </div>
            <ChevronDown size={10} style={{ color: theme.textMuted }} />
          </motion.button>
        ) : (
          /* Expanded panel */
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
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
              onClick={() => setOpen(false)}
            >
              <div className="flex items-center gap-2">
                <MapPin size={10} style={{ color: theme.accent1 }} />
                <span className="text-[11px] font-mono tracking-wider" style={{ color: theme.textMuted }}>
                  Castilla, Piura · {timeStr}
                  {piuraTemp !== null && ` · ${piuraTemp}°C`}
                </span>
              </div>
              <ChevronUp size={12} style={{ color: theme.textMuted }} />
            </button>

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
                    background: theme.isLight
                      ? 'linear-gradient(90deg, #CBD5E1, #64748B, #475569)'
                      : 'linear-gradient(90deg, #334155, #64748B, #334155)',
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

              {/* Weather + Auto */}
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
                  <Clock size={10} /> Auto (Castilla)
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
    </motion.div>
  );
}