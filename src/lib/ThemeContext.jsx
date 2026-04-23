import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const ThemeContext = createContext();

const PIURA_TZ = 'America/Lima';

// Single palette — night blue family (#050810)
// Dawn < Midday (brightest) > Afternoon > Sunset > Dusk > Night (darkest)
const THEMES = {
  morning: {
    name: 'Mañana',
    isLight: true,
    accent1: '#2563EB',
    accent2: '#0891B2',
    btnBg: '#2563EB',
    btnText: '#FFFFFF',
    highlightColor: '#2563EB',
    glow: 'rgba(37, 99, 235, 0.1)',
    // Dawn — soft, slightly muted light; NOT the brightest
    gradientStart: '#DCE6F5',
    gradientMid: '#CEDCF0',
    gradientEnd: '#C0D2EB',
    aura: 'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.06) 0%, transparent 60%)',
    particleColor: 'rgba(37, 99, 235, 0.08)',
    textPrimary: '#0F172A',
    textSecondary: '#334155',
    textMuted: '#64748B',
    cardBg: 'rgba(255, 255, 255, 0.55)',
    cardBorder: 'rgba(15, 23, 42, 0.08)',
    navBg: 'rgba(220, 230, 245, 0.88)',
    navBorder: 'rgba(15, 23, 42, 0.06)',
    panelBg: 'rgba(235, 242, 252, 0.9)',
    panelBorder: 'rgba(15, 23, 42, 0.1)',
    gridLine: 'rgba(15, 23, 42, 0.03)',
    orbOpacity: 0.07,
    showStars: false,
    rainColor: 'rgba(30, 58, 138, 0.28)',
    rainHighlight: 'rgba(59, 130, 246, 0.12)',
    footerBorder: 'rgba(15, 23, 42, 0.07)',
  },
  midday: {
    name: 'Mediodía',
    isLight: true,
    accent1: '#2563EB',
    accent2: '#0891B2',
    btnBg: '#2563EB',
    btnText: '#FFFFFF',
    highlightColor: '#2563EB',
    glow: 'rgba(37, 99, 235, 0.12)',
    // Brightest stage — near white, airy pale sky blue
    gradientStart: '#F5F8FF',
    gradientMid: '#EBF1FC',
    gradientEnd: '#E1EAF8',
    aura: 'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.05) 0%, transparent 60%)',
    particleColor: 'rgba(37, 99, 235, 0.08)',
    textPrimary: '#0F172A',
    textSecondary: '#334155',
    textMuted: '#64748B',
    cardBg: 'rgba(255, 255, 255, 0.65)',
    cardBorder: 'rgba(15, 23, 42, 0.07)',
    navBg: 'rgba(245, 248, 255, 0.9)',
    navBorder: 'rgba(15, 23, 42, 0.05)',
    panelBg: 'rgba(255, 255, 255, 0.92)',
    panelBorder: 'rgba(15, 23, 42, 0.08)',
    gridLine: 'rgba(15, 23, 42, 0.025)',
    orbOpacity: 0.06,
    showStars: false,
    rainColor: 'rgba(30, 58, 138, 0.25)',
    rainHighlight: 'rgba(59, 130, 246, 0.12)',
    footerBorder: 'rgba(15, 23, 42, 0.06)',
  },
  afternoon: {
    name: 'Tarde',
    isLight: true,
    accent1: '#3B82F6',
    accent2: '#0EA5E9',
    btnBg: '#2563EB',
    btnText: '#FFFFFF',
    highlightColor: '#2563EB',
    glow: 'rgba(37, 99, 235, 0.12)',
    // Noticeably less bright than midday — medium-light cool blue
    gradientStart: '#B8CAE4',
    gradientMid: '#A8BCDC',
    gradientEnd: '#98AED4',
    aura: 'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.07) 0%, transparent 60%)',
    particleColor: 'rgba(59, 130, 246, 0.1)',
    textPrimary: '#0F172A',
    textSecondary: '#334155',
    textMuted: '#546580',
    cardBg: 'rgba(255, 255, 255, 0.4)',
    cardBorder: 'rgba(15, 23, 42, 0.09)',
    navBg: 'rgba(184, 202, 228, 0.85)',
    navBorder: 'rgba(15, 23, 42, 0.07)',
    panelBg: 'rgba(200, 216, 240, 0.88)',
    panelBorder: 'rgba(15, 23, 42, 0.1)',
    gridLine: 'rgba(15, 23, 42, 0.03)',
    orbOpacity: 0.09,
    showStars: false,
    rainColor: 'rgba(30, 58, 138, 0.3)',
    rainHighlight: 'rgba(59, 130, 246, 0.12)',
    footerBorder: 'rgba(15, 23, 42, 0.08)',
  },
  sunset: {
    name: 'Atardecer',
    isLight: false,
    accent1: '#60A5FA',
    accent2: '#38BDF8',
    btnBg: '#2563EB',
    btnText: '#FFFFFF',
    highlightColor: '#60A5FA',
    glow: 'rgba(37, 99, 235, 0.16)',
    // Semi-dark — clearly transitioning to dark mode
    gradientStart: '#1E2D50',
    gradientMid: '#182648',
    gradientEnd: '#132040',
    aura: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.1) 0%, transparent 60%)',
    particleColor: 'rgba(147, 197, 253, 0.2)',
    textPrimary: '#F1F5F9',
    textSecondary: '#CBD5E1',
    textMuted: '#94A3B8',
    cardBg: 'rgba(24, 36, 64, 0.55)',
    cardBorder: 'rgba(248, 250, 252, 0.06)',
    navBg: 'rgba(24, 36, 64, 0.88)',
    navBorder: 'rgba(248, 250, 252, 0.06)',
    panelBg: 'rgba(24, 36, 64, 0.9)',
    panelBorder: 'rgba(248, 250, 252, 0.08)',
    gridLine: 'rgba(248, 250, 252, 0.03)',
    orbOpacity: 0.14,
    showStars: false,
    rainColor: 'rgba(148, 194, 255, 0.35)',
    rainHighlight: 'rgba(37, 99, 235, 0.15)',
    footerBorder: 'rgba(248, 250, 252, 0.06)',
  },
  dusk: {
    name: 'Anochecer',
    isLight: false,
    accent1: '#60A5FA',
    accent2: '#22D3EE',
    btnBg: '#2563EB',
    btnText: '#FFFFFF',
    highlightColor: '#60A5FA',
    glow: 'rgba(37, 99, 235, 0.18)',
    // Noticeably dark — deep blue, approaching night
    gradientStart: '#0E1628',
    gradientMid: '#0B1222',
    gradientEnd: '#090F1C',
    aura: 'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.1) 0%, transparent 60%)',
    particleColor: 'rgba(200, 220, 255, 0.4)',
    textPrimary: '#F8FAFC',
    textSecondary: '#DCE7FF',
    textMuted: '#94A3B8',
    cardBg: 'rgba(12, 18, 36, 0.6)',
    cardBorder: 'rgba(248, 250, 252, 0.05)',
    navBg: 'rgba(10, 16, 32, 0.9)',
    navBorder: 'rgba(248, 250, 252, 0.06)',
    panelBg: 'rgba(10, 16, 32, 0.92)',
    panelBorder: 'rgba(248, 250, 252, 0.08)',
    gridLine: 'rgba(248, 250, 252, 0.03)',
    orbOpacity: 0.18,
    showStars: true,
    starCount: 25,
    rainColor: 'rgba(148, 194, 255, 0.38)',
    rainHighlight: 'rgba(37, 99, 235, 0.15)',
    footerBorder: 'rgba(248, 250, 252, 0.05)',
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
    // Darkest — original night palette, unchanged
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

// Cloudy/rain — same family, muted & slightly dimmer per stage
const CLOUDY_OVERRIDES = {
  morning:   { gradientStart: '#C8D4E8', gradientMid: '#BCC8E0', gradientEnd: '#B0BED8', accent1: '#6B8AB0', accent2: '#5A90A8', glow: 'rgba(37, 99, 235, 0.05)', orbOpacity: 0.04, showStars: false },
  midday:    { gradientStart: '#DEE6F4', gradientMid: '#D2DCEE', gradientEnd: '#C6D2E8', accent1: '#6B8AB0', accent2: '#5A90A8', glow: 'rgba(37, 99, 235, 0.05)', orbOpacity: 0.04, showStars: false },
  afternoon: { gradientStart: '#A0B0CA', gradientMid: '#94A6C2', gradientEnd: '#889CBA', accent1: '#6B8AB0', accent2: '#5A90A8', glow: 'rgba(37, 99, 235, 0.05)', orbOpacity: 0.05, showStars: false },
  sunset:    { gradientStart: '#172440', gradientMid: '#131E38', gradientEnd: '#101A32', accent1: '#7D9CC0', accent2: '#5BA0B8', glow: 'rgba(37, 99, 235, 0.06)', orbOpacity: 0.06, showStars: false },
  dusk:      { gradientStart: '#0B1020', gradientMid: '#090D1A', gradientEnd: '#070B16', accent1: '#6B7E9A', accent2: '#4B6580', glow: 'rgba(37, 99, 235, 0.05)', orbOpacity: 0.06, showStars: false },
  night:     { gradientStart: '#04060C', gradientMid: '#060A14', gradientEnd: '#080D1C', accent1: '#6B7E9A', accent2: '#4B6580', glow: 'rgba(37, 99, 235, 0.05)', orbOpacity: 0.06, showStars: false },
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

// Castilla, Piura, Peru coordinates
async function fetchPiuraWeather() {
  try {
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=-5.1978&longitude=-80.6452&current=weather_code,temperature_2m&timezone=America/Lima'
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