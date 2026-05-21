import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/lib/ThemeContext";
import { WhatsApp } from "@/components/ui/icons/whatsapp";

const WHATSAPP_URL =
  "https://wa.me/982423722?text=Hola,%20me%20gustaria%20conocer%20mas%20sobre%20sus%20servicios";

export default function WhatsAppFloatingButton() {
  const { theme } = useTheme();

  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Abrir chat de WhatsApp"
      className="fixed bottom-4 right-4 z-50 inline-flex items-center justify-center rounded-full transition-transform md:bottom-6 md:right-6"
      style={{
        background: "transparent",
        color: "#1EBE5D",
        boxShadow: "none",
      }}
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -2, scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.35 }}
    >
      <span
        className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-emerald-400/50 bg-white text-emerald-600"
        style={{
          boxShadow: "0 12px 24px rgba(37, 211, 102, 0.35)",
        }}
      >
        <WhatsApp className="h-5 w-5" />
      </span>
    </motion.a>
  );
}
