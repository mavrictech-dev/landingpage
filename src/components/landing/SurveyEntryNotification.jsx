import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageSquareHeart, X } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";

const SURVEY_URL = "https://xuj1u4f6.forms.app/formulario-sin-titulo";

export default function SurveyEntryNotification() {
  const { theme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setVisible(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible]);

  const handleDismiss = () => setVisible(false);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.section
          role="region"
          aria-label="Survey notification"
          className="fixed bottom-[68px] sm:bottom-[76px] md:bottom-6 inset-x-0 mx-auto z-40 w-[calc(100%-1.5rem)] max-w-lg md:max-w-xl"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
          animate={prefersReducedMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.35, ease: "easeOut" }}
        >
          <div
            className="relative overflow-hidden rounded-[22px] border px-4 py-3 sm:px-5 sm:py-3.5 backdrop-blur-xl shadow-2xl"
            style={{
              background: theme.isLight
                ? "linear-gradient(135deg, rgba(255,255,255,0.94) 0%, rgba(244,248,255,0.9) 100%)"
                : "linear-gradient(135deg, rgba(10,16,32,0.95) 0%, rgba(16,24,43,0.92) 100%)",
              borderColor: theme.isLight
                ? "rgba(15, 23, 42, 0.1)"
                : "rgba(248, 250, 252, 0.12)",
              boxShadow: `0 20px 50px rgba(0,0,0,${theme.isLight ? "0.15" : "0.5"}), 0 0 24px ${theme.glow}`,
            }}
          >
            {/* Botón cerrar X en la esquina superior */}
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Cerrar notificación"
              className="absolute top-3 right-3 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X size={16} />
            </button>

            <div
              className="pointer-events-none absolute inset-x-6 top-0 h-20 rounded-full blur-3xl"
              style={{
                background: theme.isLight
                  ? "rgba(37, 99, 235, 0.12)"
                  : "rgba(96, 165, 250, 0.14)",
              }}
            />

            <div className="relative flex flex-col gap-3 pr-6 sm:pr-8 md:flex-row md:items-center md:justify-between md:gap-5">
              <div className="flex items-start gap-3 sm:gap-4 md:min-w-0 md:flex-1 md:items-center">
                <div
                  className="flex size-10 sm:size-12 shrink-0 items-center justify-center rounded-2xl border"
                  style={{
                    color: theme.btnBg,
                    background: theme.isLight
                      ? "rgba(255,255,255,0.8)"
                      : "rgba(255,255,255,0.06)",
                    borderColor: theme.isLight
                      ? "rgba(37, 99, 235, 0.16)"
                      : "rgba(96, 165, 250, 0.2)",
                    boxShadow: `0 0 16px ${theme.glow}`,
                  }}
                >
                  <MessageSquareHeart size={18} className="sm:size-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <h2
                    className="text-sm sm:text-base font-heading font-semibold leading-tight"
                    style={{ color: theme.textPrimary }}
                  >
                    Tu feedback es importante
                  </h2>
                  <p
                    className="mt-0.5 sm:mt-1 text-xs sm:text-sm leading-relaxed"
                    style={{ color: theme.textSecondary }}
                  >
                    Responde una encuesta rápida y ayúdanos a mejorar tu experiencia.
                  </p>
                </div>
              </div>

              <div className="relative flex flex-wrap items-center gap-2 sm:shrink-0">
                <a
                  href={SURVEY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 sm:min-h-10 items-center justify-center rounded-xl px-3.5 sm:px-5 text-xs sm:text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2"
                  style={{
                    background: theme.btnBg,
                    color: theme.btnText,
                    boxShadow: `0 8px 20px ${theme.glow}`,
                    outlineColor: theme.accent1,
                  }}
                >
                  Responder encuesta
                </a>

                <button
                  type="button"
                  onClick={handleDismiss}
                  className="inline-flex min-h-9 sm:min-h-10 items-center justify-center rounded-xl px-3 text-xs sm:text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2"
                  style={{
                    color: theme.textMuted,
                    outlineColor: theme.accent1,
                  }}
                >
                  Más tarde
                </button>
              </div>
            </div>
          </div>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}
