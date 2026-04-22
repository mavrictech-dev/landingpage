import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const ThemeContext = createContext();

const PIURA_TZ = 'America/Lima';

const THEMES = {
  morning: {
    name: 'Mañana',
    isLight: true,
    accent1: '#2563EB',
    accent2: '#0891B2',
    btnBg: '#2563EB',
    btnText: '#FFFFFF',
    highlightColor: '#2563EB',
    glow: 'rgba(37, 99, 235, 0.18)',
    gradientStart: '#E8F0FE',
    gradientMid: '#D4E4FC',
    gradientEnd: '#C7DAFA',
    aura: 'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.08) 0%, transparent 60%)',
    particleColor: 'rgba(37, 99, 235, 0.15)',
    textPrimary: '#0F172A',
    textSecondary: '#334155',
    textMuted: '#64748B',
    cardBg: 'rgba(255, 255, 255, 0.6)',
    cardBorder: 'rgba(15, 23, 42, 0.08)',
    navBg: 'rgba(232, 240, 254, 0.85)',
    navBorder: 'rgba(15, 23, 42, 0.06)',
    panelBg: 'rgba(255, 255, 255, 0.85)',
    panelBorder: 'rgba(15, 23, 42, 0.1)',
    gridLine: 'rgba(15, 23, 42, 0.04)',
    orbOpacity: 0.12,
    showStars: false,
    rainColor: 'rgba(30, 58, 138, 0.4)',
    rainHighlight: 'rgba(59, 130, 246, 0.25)',
    footerBorder: 'rgba(15, 23, 42, 0.08)',
  },
  midday: {
    name: 'Mediodía',
    isLight: true,
    accent1: '#0284C7',
    accent2: '#0EA5E9',
    btnBg: '#0284C7',
    btnText: '#FFFFFF',
    highlightColor: '#0284C7',
    glow: 'rgba(2, 132, 199, 0.2)',
    gradientStart: '#F0F9FF',
    gradientMid: '#E0F2FE',
    gradientEnd: '#D0EAFB',
    aura: 'radial-gradient(ellipse at 50% 0%, rgba(14,165,233,0.1) 0%, transparent 60%)',
    particleColor: 'rgba(14, 165, 233, 0.15)',
    textPrimary: '#0C1427',
    textSecondary: '#1E3A5F',
    textMuted: '#4B6A8F',
    cardBg: 'rgba(255, 255, 255, 0.65)',
    cardBorder: 'rgba(15, 23, 42, 0.07)',
    navBg: 'rgba(240, 249, 255, 0.88)',
    navBorder: 'rgba(15, 23, 42, 0.06)',
    panelBg: 'rgba(255, 255, 255, 0.88)',
    panelBorder: 'rgba(15, 23, 42, 0.1)',
    gridLine: 'rgba(15, 23, 42, 0.03)',
    orbOpacity: 0.1,
    showStars: false,
    rainColor: 'rgba(7, 89, 133, 0.35)',
    rainHighlight: 'rgba(56, 189, 248, 0.2)',
    footerBorder: 'rgba(15, 23, 42, 0.07)',
  },
  afternoon: {
    name: 'Tarde',
    isLight: true,
    accent1: '#1D7AB8',
    accent2: '#D97706',
    btnBg: '#1D7AB8',
    btnText: '#FFFFFF',
    highlightColor: '#B45309',
    glow: 'rgba(29, 122, 184, 0.16)',
    gradientStart: '#F5F0E8',
    gradientMid: '#E8E2D8',
    gradientEnd: '#DDD8CE',
    aura: 'radial-gradient(ellipse at 50% 30%, rgba(217,119,6,0.06) 0%, rgba(29,122,184,0.04) 40%, transparent 70%)',
    particleColor: 'rgba(217, 119, 6, 0.12)',
    textPrimary: '#1C1917',
    textSecondary: '#44403C',
    textMuted: '#78716C',
    cardBg: 'rgba(255, 255, 255, 0.55)',
    cardBorder: 'rgba(28, 25, 23, 0.08)',
    navBg: 'rgba(245, 240, 232, 0.88)',
    navBorder: 'rgba(28, 25, 23, 0.06)',
    panelBg: 'rgba(255, 255, 255, 0.88)',
    panelBorder: 'rgba(28, 25, 23, 0.1)',
    gridLine: 'rgba(28, 25, 23, 0.03)',
    orbOpacity: 0.1,
    showStars: false,
    rainColor: 'rgba(68, 64, 60, 0.3)',
    rainHighlight: 'rgba(217, 119, 6, 0.15)',
    footerBorder: 'rgba(28, 25, 23, 0.08)',
  },
  sunset: {
    name: 'Atardecer',
    isLight: true,
    accent1: '#C2410C',
    accent2: '#0E7490',
    btnBg: '#C2410C',
    btnText: '#FFFFFF',
    highlightColor: '#C2410C',
    glow: 'rgba(234, 88, 12, 0.18)',
    gradientStart: '#B4C6D6',
    gradientMid: '#E8BFA0',
    gradientEnd: '#F0C8A0',
    aura: 'radial-gradient(ellipse at 50% 60%, rgba(251,146,60,0.15) 0%, rgba(217,119,6,0.08) 40%, transparent 70%)',
    particleColor: 'rgba(234, 88, 12, 0.15)',
    textPrimary: '#1C1917',
    textSecondary: '#44403C',
    textMuted: '#6B5E54',
    cardBg: 'rgba(255, 255, 255, 0.45)',
    cardBorder: 'rgba(28, 25, 23, 0.1)',
    navBg: 'rgba(220, 200, 180, 0.8)',
    navBorder: 'rgba(28, 25, 23, 0.08)',
    panelBg: 'rgba(255, 248, 240, 0.85)',
    panelBorder: 'rgba(28, 25, 23, 0.1)',
    gridLine: 'rgba(28, 25, 23, 0.03)',
    orbOpacity: 0.15,
    showStars: false,
    rainColor: 'rgba(120, 80, 50, 0.3)',
    rainHighlight: 'rgba(251, 146, 60, 0.18)',
    footerBorder: 'rgba(28, 25, 23, 0.1)',
  },
  dusk: {
    name: 'Anochecer',
    isLight: false,
    accent1: '#60A5FA',
    accent2: '#22D3EE',
    btnBg: '#3B82F6',
    btnText: '#FFFFFF',
    highlightColor: '#60A5FA',
    glow: 'rgba(59, 130, 246, 0.18)',
    gradientStart: '#0B0E1F',
    gradientMid: '#111738',
    gradientEnd: '#161D45',
    aura: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 60%)',
    particleColor: 'rgba(200, 220, 255, 0.5)',
    textPrimary: '#F1F5F9',
    textSecondary: '#CBD5E1',
    textMuted: '#94A3B8',
    cardBg: 'rgba(17, 23, 56, 0.6)',
    cardBorder: 'rgba(248, 250, 252, 0.06)',
    navBg: 'rgba(11, 14, 31, 0.88)',
    navBorder: 'rgba(248, 250, 252, 0.06)',
    panelBg: 'rgba(11, 14, 31, 0.9)',
    panelBorder: 'rgba(248, 250, 252, 0.08)',
    gridLine: 'rgba(248, 250, 252, 0.03)',
    orbOpacity: 0.18,
    showStars: true,
    starCount: 25,
    rainColor: 'rgba(148, 163, 184, 0.35)',
    rainHighlight: 'rgba(59, 130, 246, 0.15)',
    footerBorder: 'rgba(248, 250, 252, 0.06)',
  },
  night: {
    name: 'Noche',
    isLight: false,
    accent1: '#60A5FA',
    accent2: '#22D3EE',
    btnBg: '#2563EB',
    btnText: '#FFFFFF',
    highlightColor: '#60A5FA',
    glow: 'rgba(37, 99, 235, 0.2)',
    gradientStart: '#050810',
    gradientMid: '#080D1A',
    gradientEnd: '#0A1025',
    aura: 'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.1) 0%, transparent 60%)',
    particleColor: 'rgba(220, 230, 255, 0.55)',
    textPrimary: '#F8FAFC',
    textSecondary: '#DCE7FF',
    textMuted: '#94A3B8',
    cardBg: 'rgba(16, 24, 43, 0.6)',
    cardBorder: 'rgba(248, 250, 252, 0.05)',
    navBg: 'rgba(5, 8, 16, 0.88)',
    navBorder: 'rgba(248, 250, 252, 0.06)',
    panelBg: 'rgba(5, 8, 16, 0.9)',
    panelBorder: 'rgba(248, 250, 252, 0.08)',
    gridLine: 'rgba(248, 250, 252, 0.03)',
    orbOpacity: 0.2,
    showStars: true,
    starCount: 55,
    rainColor: 'rgba(148, 194, 255, 0.4)',
    rainHighlight: 'rgba(37, 99, 235, 0.15)',
    footerBorder: 'rgba(248, 250, 252, 0.05)',
  },
};

const CLOUDY_OVERRIDES = {
  morning: { gradientStart: '#D1D5DB', gradientMid: '#C8CDD5', gradientEnd: '#BFC5CF', accent1: '#4B5563', accent2: '#6B7280', btnBg: '#4B5563', highlightColor: '#4B5563', glow: 'rgba(75, 85, 99, 0.12)', textPrimary: '#1F2937', textSecondary: '#374151', textMuted: '#6B7280', cardBg: 'rgba(255,255,255,0.5)', orbOpacity: 0.06, showStars: false },
  midday: { gradientStart: '#E5E7EB', gradientMid: '#D1D5DB', gradientEnd: '#C8CDD5', accent1: '#4B5563', accent2: '#6B7280', btnBg: '#4B5563', highlightColor: '#4B5563', glow: 'rgba(75, 85, 99, 0.12)', textPrimary: '#111827', textSecondary: '#374151', textMuted: '#6B7280', cardBg: 'rgba(255,255,255,0.5)', orbOpacity: 0.06, showStars: false },
  afternoon: { gradientStart: '#D6D3CC', gradientMid: '#CCC8C0', gradientEnd: '#C2BEB6', accent1: '#78716C', accent2: '#92400E', btnBg: '#78716C', highlightColor: '#78716C', glow: 'rgba(120, 113, 108, 0.1)', textPrimary: '#1C1917', textSecondary: '#44403C', textMuted: '#78716C', cardBg: 'rgba(255,255,255,0.45)', orbOpacity: 0.06, showStars: false },
  sunset: { gradientStart: '#A8A0A0', gradientMid: '#C4AFA0', gradientEnd: '#CCBAA8', accent1: '#92400E', accent2: '#0E7490', btnBg: '#92400E', highlightColor: '#92400E', glow: 'rgba(146, 64, 14, 0.1)', textPrimary: '#1C1917', textSecondary: '#44403C', textMuted: '#6B5E54', orbOpacity: 0.08, showStars: false },
  dusk: { gradientStart: '#0D0F1C', gradientMid: '#121530', gradientEnd: '#161940', accent1: '#6B7280', accent2: '#4B5563', btnBg: '#6B7280', highlightColor: '#6B7280', glow: 'rgba(107, 114, 128, 0.1)', orbOpacity: 0.08, showStars: false },
  night: { gradientStart: '#060810', gradientMid: '#0A0D18', gradientEnd: '#0D1020', accent1: '#6B7280', accent2: '#4B5563', btnBg: '#6B7280', highlightColor: '#6B7280', glow: 'rgba(107, 114, 128, 0.1)', orbOpacity: 0.08, showStars: false },
};

function hourToTheme(hour) {
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 15) return 'midday';
  if (hour >= 15 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 19) return 'sunset';
  if (hour >= 19 && hour < 21) return 'dusk';
  return 'night';
}

function getPiuraTime() {
  const now = new Date();
  const str = now.toLocaleString('en-US', { timeZone: PIURA_TZ, hour: 'numeric', minute: 'numeric', hour12: false });
  const [h, m] = str.split(':').map(Number);
  return { hour: h, minute: m };
}

async function fetchPiuraWeather() {
  try {
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=-5.1945&longitude=-80.6328&current=weather_code,temperature_2m&timezone=America/Lima'
    );
    const data = await res.json();
    const code = data?.current?.weather_code;
    const temp = data?.current?.temperature_2m;
    let weather = 'clear';
    if (code !== undefined && code !== null) {
      if (code <= 1) weather = 'clear';
      else if (code <= 3 || (code >= 45 && code <= 48)) weather = 'cloudy';
      else weather = 'rain';
    }
    return { weather, temp: temp !== undefined ? Math.round(temp) : null };
  } catch {
    return { weather: 'clear', temp: null };
  }
}

export function ThemeProvider({ children }) {
  const [autoTime, setAutoTime] = useState(true);
  const [manualHour, setManualHour] = useState(() => getPiuraTime().hour);
  const [weatherMode, setWeatherMode] = useState('clear');
  const [autoWeather, setAutoWeather] = useState(true);
  const [piuraMinute, setPiuraMinute] = useState(() => getPiuraTime().minute);
  const [piuraTemp, setPiuraTemp] = useState(null);

  useEffect(() => {
    fetchPiuraWeather().then(({ weather, temp }) => {
      if (autoWeather) setWeatherMode(weather);
      setPiuraTemp(temp);
    });
  }, []);

  const currentHour = autoTime ? getPiuraTime().hour : manualHour;
  const currentThemeName = hourToTheme(currentHour);

  const theme = useMemo(() => {
    let base = { ...THEMES[currentThemeName] };
    if (weatherMode === 'cloudy' || weatherMode === 'rain') {
      const overrides = CLOUDY_OVERRIDES[currentThemeName];
      if (overrides) base = { ...base, ...overrides };
    }
    return base;
  }, [currentThemeName, weatherMode]);

  // Update time every 30s
  useEffect(() => {
    if (!autoTime) return;
    const interval = setInterval(() => {
      const t = getPiuraTime();
      setManualHour(t.hour);
      setPiuraMinute(t.minute);
    }, 30000);
    return () => clearInterval(interval);
  }, [autoTime]);

  // Re-fetch weather every 10 min
  useEffect(() => {
    if (!autoWeather) return;
    const interval = setInterval(() => {
      fetchPiuraWeather().then(({ weather, temp }) => {
        setWeatherMode(weather);
        setPiuraTemp(temp);
      });
    }, 600000);
    return () => clearInterval(interval);
  }, [autoWeather]);

  const setHour = useCallback((h) => {
    setAutoTime(false);
    setManualHour(h);
  }, []);

  const enableAutoTime = useCallback(() => {
    setAutoTime(true);
    setAutoWeather(true);
    const t = getPiuraTime();
    setManualHour(t.hour);
    setPiuraMinute(t.minute);
    fetchPiuraWeather().then(({ weather, temp }) => {
      setWeatherMode(weather);
      setPiuraTemp(temp);
    });
  }, []);

  const handleSetWeatherMode = useCallback((mode) => {
    setAutoWeather(false);
    setWeatherMode(mode);
  }, []);

  const isRaining = weatherMode === 'rain';
  const isCloudy = weatherMode === 'cloudy' || weatherMode === 'rain';

  return (
    <ThemeContext.Provider value={{
      theme, currentThemeName, currentHour, autoTime, autoWeather,
      rainMode: isRaining, cloudyMode: isCloudy, weatherMode,
      piuraMinute, piuraTemp,
      setHour, enableAutoTime, setWeatherMode: handleSetWeatherMode,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}