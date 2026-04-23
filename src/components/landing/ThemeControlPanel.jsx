import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { Sun, Moon, Cloud, CloudRain, Clock, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

const timeLabels = [
  { hour: 8, label: 'Mañana' },
  { hour: 13, label: 'Mediodía' },
  { hour: 16, label: 'Tarde' },
  { hour: 17, label: 'Atardecer' },
  { hour: 19, label: 'Anochecer' },
  { hour: 22, label: 'Noche' },
];

function getWeatherVisual(weatherMode, isNight) {
  if (weatherMode === 'rain') {
    return {
      Icon: CloudRain,
      label: 'Lluvia',
      accentColor: '#64748B',
      glowColor: 'rgba(100, 116, 139, 0.25)',
      gradientBg: isNight
        ? 'linear-gradient(135deg, rgba(30,41,59,0.5) 0%, rgba(51,65,85,0.3) 100%)'
        : 'linear-gradient(135deg, rgba(148,163,184,0.3) 0%, rgba(100,116,139,0.2) 100%)',
      iconSize: 18,
    };
  }
  if (weatherMode === 'cloudy') {
    return {
      Icon: Cloud,
      label: 'Nublado',
      accentColor: '#94A3B8',
      glowColor: 'rgba(148, 163, 184, 0.2)',
      gradientBg: isNight
        ? 'linear-gradient(135deg, rgba(30,41,59,0.4) 0%, rgba(71,85,105,0.25) 100%)'
        : 'linear-gradient(135deg, rgba(203,213,225,0.35) 0%, rgba(148,163,184,0.2) 100%)',
      iconSize: 18,
    };
  }
  // clear
  if (isNight) {
    return {
      Icon: Moon,
      label: 'Despejado',
      accentColor: '#A5B4FC',
      glowColor: 'rgba(165, 180, 252, 0.2)',
      gradientBg: 'linear-gradient(135deg, rgba(30,27,75,0.4) 0%, rgba(55,48,163,0.2) 100%)',
      iconSize: 18,
    };
  }
  return {
    Icon: Sun,
    label: 'Despejado',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.18)',
    gradientBg: 'linear-gradient(135deg, rgba(254,243,199,0.35) 0%, rgba(253,224,71,0.15) 100%)',
    iconSize: 18,
  };
}

export default function ThemeControlPanel() {
  const { currentHour, piuraMinute, piuraTemp, autoTime, autoWeather, weatherMode, setHour, enableAutoTime, setWeatherMode, theme } = useTheme();
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  const isNight = currentHour >= 19 || currentHour < 6;
  const visual = getWeatherVisual(weatherMode, isNight);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
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
    { key: 'clear', label: 'Despejado', icon: isNight ? Moon : Sun },
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
          <motion.button
            key="compact"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(true)}
            className="relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl border transition-all duration-700 cursor-pointer hover:scale-[1.02] overflow-hidden"
            style={{
              background: theme.isLight
                ? 'rgba(255, 255, 255, 0.55)'
                : 'rgba(10, 16, 32, 0.65)',
              borderColor: theme.isLight
                ? 'rgba(15, 23, 42, 0.08)'
                : 'rgba(248, 250, 252, 0.08)',
              backdropFilter: 'blur(24px)',
              boxShadow: `0 4px 20px rgba(0,0,0,${theme.isLight ? '0.06' : '0.35'}), 0 0 20px ${visual.glowColor}`,
            }}
          >
            {/* Weather gradient accent */}
            <div
              className="absolute inset-0 transition-all duration-1000"
              style={{ background: visual.gradientBg }}
            />

            <div className="relative flex items-center gap-3">
              {/* Weather icon with glow */}
              <div className="relative">
                <visual.Icon
                  size={visual.iconSize}
                  style={{ color: visual.accentColor }}
                  className="relative z-10"
                />
                <div
                  className="absolute inset-0 blur-[8px] -m-1"
                  style={{ background: visual.glowColor, borderRadius: '50%' }}
                />
              </div>

              <div className="flex flex-col items-start gap-0.5">
                <div className="flex items-center gap-1.5">
                  <MapPin size={8} style={{ color: theme.textMuted }} />
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
                </div>
              </div>
            </div>

            <ChevronDown size={10} className="relative" style={{ color: theme.textMuted }} />
          </motion.button>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="relative rounded-2xl border overflow-hidden transition-all duration-700"
            style={{
              background: theme.isLight
                ? 'rgba(255, 255, 255, 0.6)'
                : 'rgba(10, 16, 32, 0.7)',
              borderColor: theme.isLight
                ? 'rgba(15, 23, 42, 0.08)'
                : 'rgba(248, 250, 252, 0.08)',
              backdropFilter: 'blur(28px)',
              boxShadow: `0 8px 32px rgba(0,0,0,${theme.isLight ? '0.08' : '0.4'}), 0 0 24px ${visual.glowColor}`,
            }}
          >
            {/* Top gradient accent strip */}
            <div
              className="absolute top-0 left-0 right-0 h-16 transition-all duration-1000"
              style={{ background: visual.gradientBg, opacity: 0.7 }}
            />

            {/* Header */}
            <button
              className="relative w-full flex items-center justify-between px-4 py-3 transition-colors"
              onClick={() => setOpen(false)}
            >
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <visual.Icon size={16} style={{ color: visual.accentColor }} />
                  <div
                    className="absolute inset-0 blur-[6px] -m-0.5"
                    style={{ background: visual.glowColor, borderRadius: '50%' }}
                  />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[9px] font-mono tracking-wider" style={{ color: theme.textMuted }}>
                    Castilla, Piura · {visual.label}
                  </span>
                  <span className="text-sm font-heading font-semibold tabular-nums" style={{ color: theme.textPrimary }}>
                    {timeStr}
                    {piuraTemp !== null && (
                      <span className="text-[10px] font-mono font-normal ml-2" style={{ color: theme.textMuted }}>
                        {piuraTemp}°C
                      </span>
                    )}
                  </span>
                </div>
              </div>
              <ChevronUp size={12} style={{ color: theme.textMuted }} />
            </button>

            <div className="relative px-4 pb-4 space-y-4">
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
                        borderColor: isActive ? `${theme.accent1}50` : theme.isLight ? 'rgba(15,23,42,0.08)' : 'rgba(248,250,252,0.06)',
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
                    borderColor: (autoTime && autoWeather) ? `${theme.accent1}50` : theme.isLight ? 'rgba(15,23,42,0.08)' : 'rgba(248,250,252,0.06)',
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
                          borderColor: isActive ? `${theme.accent1}50` : theme.isLight ? 'rgba(15,23,42,0.08)' : 'rgba(248,250,252,0.06)',
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