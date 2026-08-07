import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Rocket, CheckCircle2, Building2, ChevronUp, ChevronDown } from 'lucide-react';
import { useTheme } from "@/lib/ThemeContext";

export default function PromoFloatingBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // Inicia minimizada por defecto
  const [isDismissed, setIsDismissed] = useState(false);
  const { theme, weatherMode } = useTheme();

  useEffect(() => {
    // Retrasar la aparición a 1s
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = (e) => {
    if (e) e.stopPropagation();
    setIsVisible(false);
    setIsDismissed(true);
  };

  if (isDismissed) return null;

  const WHATSAPP_URL = "https://wa.me/51982423722?text=Hola,%20estoy%20interesado%20en%20la%20promoci%C3%B3n%20de%20la%20Landing%20Page%20Profesional.";

  const isDark = !theme.isLight;

  let headerColor = 'bg-blue-600';
  let boxColorLight = 'bg-slate-50';
  let badgeColor = 'bg-blue-100 text-blue-700';

  if (weatherMode === 'rain') {
    headerColor = 'bg-indigo-600';
    boxColorLight = 'bg-indigo-50';
    badgeColor = 'bg-indigo-100 text-indigo-700';
  } else if (weatherMode === 'cloudy') {
    headerColor = 'bg-slate-600';
    boxColorLight = 'bg-slate-100';
    badgeColor = 'bg-slate-200 text-slate-700';
  } else if (weatherMode === 'snow') {
    headerColor = 'bg-sky-500';
    boxColorLight = 'bg-sky-50';
    badgeColor = 'bg-sky-100 text-sky-700';
  } else {
    // clear
    headerColor = 'bg-amber-500';
    boxColorLight = 'bg-amber-50/50';
    badgeColor = 'bg-amber-100 text-amber-700';
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9, x: -20 }}
          animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
          exit={{ opacity: 0, y: 20, scale: 0.9, pointerEvents: 'none' }}
          transition={{ duration: 0.4, type: "spring", bounce: 0.25 }}
          className="fixed bottom-4 md:bottom-6 left-4 md:left-6 z-[100]"
        >
          {!isExpanded ? (
            /* Componente Minimizado (Pastilla flotante) */
            <motion.div
              layoutId="promo-banner-container"
              onClick={() => setIsExpanded(true)}
              className={`group flex items-center gap-3 p-1.5 pr-4 pl-3 rounded-full border shadow-xl cursor-pointer backdrop-blur-xl transition-all duration-300 hover:scale-[1.03]
                ${isDark 
                  ? 'bg-slate-950/95 border-slate-700 shadow-black/50 text-white hover:border-slate-500' 
                  : 'bg-white/95 border-slate-200 shadow-black/15 text-slate-900 hover:border-slate-300'}`}
            >
              <div className={`${headerColor} p-2 rounded-full flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:rotate-12`}>
                <Rocket className="w-4 h-4 animate-pulse" />
              </div>

              <div className="flex flex-col">
                <span className="font-bold text-xs tracking-wide uppercase leading-tight">
                  Promoción Especial
                </span>
                <span className="text-[10px] font-semibold text-emerald-500 flex items-center gap-1 leading-tight">
                  Ver detalle <ChevronUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>

              <div className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                50% OFF
              </div>

              <button 
                onClick={handleDismiss}
                aria-label="Cerrar promoción"
                className="ml-1 text-slate-400 hover:text-slate-200 transition-colors p-1 rounded-full hover:bg-slate-800/50"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ) : (
            /* Componente Ampliado (Detalle completo) */
            <motion.div
              layoutId="promo-banner-container"
              className={`w-[calc(100vw-2rem)] max-w-[340px] rounded-2xl border shadow-2xl overflow-hidden backdrop-blur-xl
                ${isDark 
                  ? 'bg-slate-950/95 border-slate-700 shadow-black/40 text-white' 
                  : 'bg-white/95 border-slate-200 shadow-black/10 text-slate-900'}`}
            >
              {/* Header */}
              <div className={`${headerColor} transition-colors duration-500 p-2.5 px-4 flex justify-between items-center shadow-md z-10 relative`}>
                <div className="flex items-center gap-2">
                  <Rocket className="w-4 h-4 text-white animate-pulse" />
                  <span className="font-bold text-xs tracking-wide text-white uppercase">PROMOCIÓN ESPECIAL</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
                    aria-label="Minimizar promoción"
                    className="text-white/90 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-1 flex items-center gap-1 px-2 text-[10px] font-medium"
                    title="Minimizar"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                    <span>Minimizar</span>
                  </button>
                  <button 
                    onClick={handleDismiss}
                    aria-label="Cerrar promoción"
                    className="text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-1"
                    title="Cerrar"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-4 relative">
                {/* Background glowing orb */}
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -z-10 ${isDark ? 'bg-blue-500/10' : 'bg-blue-400/10'}`}></div>
                
                <div>
                  <h3 className={`text-lg font-black leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Landing Page Profesional
                  </h3>
                  <p className={`text-xs font-semibold mt-1 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    Diseñada para convertir visitas en clientes
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <span className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Hasta <strong>10 secciones</strong> incluidas</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <span className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Diseño 100% personalizado</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <span className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Carga rápida y SEO optimizado</span>
                  </div>
                </div>

                <div className={`rounded-xl p-3 border space-y-3 transition-colors duration-500
                  ${isDark ? 'bg-slate-900 border-slate-700' : `${boxColorLight} border-slate-200`}
                `}>
                  <div className={`flex justify-between items-center border-b pb-2 ${isDark ? 'border-slate-800' : 'border-slate-200/60'}`}>
                    <span className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Inversión</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isDark ? 'bg-slate-800 text-slate-300' : badgeColor}`}>Cotiza con nosotros</span>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <div className={`flex items-center gap-1.5 mb-1 px-2 py-0.5 rounded text-right ${isDark ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-100 text-amber-700'}`}>
                      <Building2 className="w-3 h-3 shrink-0" />
                      <span className="text-[9px] font-bold uppercase tracking-wider leading-tight">Asociados Cám. de Comercio Piura</span>
                    </div>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className={`text-[10px] font-medium uppercase tracking-wide ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Descuento especial:</span>
                      <span className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>50%</span>
                    </div>
                  </div>
                </div>

                <a 
                  href={WHATSAPP_URL} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-all shadow-lg shadow-blue-600/30 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10">Solicitar Asesoría</span>
                  <Rocket className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
