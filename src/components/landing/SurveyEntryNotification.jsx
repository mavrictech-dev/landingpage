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
          className="fixed bottom-4 left-0 right-0 z-40 mx-auto w-[calc(100%-1.5rem)] max-w-3xl sm:bottom-6 sm:w-[calc(100%-2rem)] lg:w-[min(64rem,calc(100%-3rem))]"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.35, ease: "easeOut" }}
        >
          <div
              className="relative overflow-hidden rounded-[24px] border px-4 py-2 backdrop-blur-xl lg:px-6 lg:py-3"
            style={{
              background: theme.isLight
                ? "linear-gradient(135deg, rgba(255,255,255,0.78) 0%, rgba(244,248,255,0.62) 100%)"
                : "linear-gradient(135deg, rgba(10,16,32,0.82) 0%, rgba(16,24,43,0.72) 100%)",
              borderColor: theme.isLight
                ? "rgba(15, 23, 42, 0.08)"
                : "rgba(248, 250, 252, 0.08)",
              boxShadow: `0 24px 60px rgba(0,0,0,${theme.isLight ? "0.12" : "0.4"}), 0 0 28px ${theme.glow}`,
            }}
          >
            <div
              className="pointer-events-none absolute inset-x-6 top-0 h-20 rounded-full blur-3xl"
              style={{
                background: theme.isLight
                  ? "rgba(37, 99, 235, 0.12)"
                  : "rgba(96, 165, 250, 0.14)",
              }}
            />

            <div className="relative flex flex-col gap-3 pr-9 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
              <div className="flex items-start gap-4 lg:min-w-0 lg:flex-1 lg:items-center">
                <div
                  className="flex size-12 shrink-0 items-center justify-center rounded-2xl border sm:size-14"
                style={{
                  color: theme.btnBg,
                  background: theme.isLight
                    ? "rgba(255,255,255,0.6)"
                    : "rgba(255,255,255,0.05)",
                  borderColor: theme.isLight
                    ? "rgba(37, 99, 235, 0.12)"
                    : "rgba(96, 165, 250, 0.18)",
                  boxShadow: `0 0 20px ${theme.glow}`,
                }}
              >
                  <MessageSquareHeart size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <h2
                    className="text-base font-heading font-semibold sm:text-sm"
                  style={{ color: theme.textPrimary }}
                  >
                    Tu feedback es importante
                  </h2>
                  <p
                    className="mt-1 text-sm leading-5 sm:max-w-2xl sm:text-xs sm:leading-6"
                  style={{ color: theme.textSecondary }}
                  >
                    Responde una encuesta rápida y ayúdanos a mejorar tu experiencia.
                  </p>
                </div>
              </div>

              <div className="relative flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end lg:shrink-0">
                <a
                  href={SURVEY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center justify-center rounded-2xl px-4 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 sm:min-h-10 sm:min-w-44 sm:px-6 sm:text-xs"
                  style={{
                    background: theme.btnBg,
                    color: theme.btnText,
                    boxShadow: `0 12px 28px ${theme.glow}`,
                    outlineColor: theme.accent1,
                  }}
                >
                  Responder encuesta
                </a>

                <button
                  type="button"
                  onClick={handleDismiss}
                  className="inline-flex min-h-10 items-center justify-center rounded-2xl px-4 text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2 sm:min-h-10 sm:px-5 sm:text-xs"
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
