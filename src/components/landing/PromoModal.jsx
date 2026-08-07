import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { X } from 'lucide-react';
import bannerImg from '@/assets/banner.webp';

export default function PromoModal() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show the modal shortly after the page loads
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500); // 1.5 second delay so it doesn't immediately block them before rendering
    return () => clearTimeout(timer);
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
            className="relative z-10 flex rounded-[2rem] overflow-hidden shadow-2xl border"
            style={{ 
              borderColor: theme.accent1,
              boxShadow: `0 20px 60px -10px ${theme.glow}`,
              backgroundColor: theme.cardBg
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Clickable Banner Image */}
            <div 
              className="relative cursor-pointer group flex"
              onClick={() => {
                setIsOpen(false);
                window.open('https://wa.me/51982423722?text=Hola,%20estoy%20interesado%20en%20la%20promoci%C3%B3n%20del%20banner!', '_blank');
              }}
            >
              <img 
                src={bannerImg} 
                alt="Promoción Especial" 
                className="max-h-[85vh] max-w-[90vw] w-auto transition-transform duration-700 group-hover:scale-[1.02]"
                style={{ display: 'block', objectFit: 'contain' }}
              />
              <div className="absolute top-4 left-4 z-20 bg-red-600 text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider animate-pulse shadow-lg pointer-events-none">
                ¡Promoción Especial!
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
