import React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { WhatsApp } from "@/components/ui/icons/whatsapp";

const AGENDLY_URL = "https://mavrictec.mavricitas.com/";
const WHATSAPP_URL =
  "https://wa.me/51982423722?text=Hola,%20me%20gustaria%20conocer%20mas%20sobre%20sus%20servicios";

export default function WhatsAppFloatingButton() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3 md:bottom-6 md:right-6">
      {/* Botón de Agendamiento / Calendario */}
      <motion.a
        href={AGENDLY_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Agendar cita en línea"
        title="Agendar cita en línea"
        className="inline-flex items-center justify-center rounded-full transition-transform"
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ y: -2, scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.35 }}
      >
        <span
          className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-blue-500/50 bg-white text-blue-600 transition-colors"
          style={{
            boxShadow: "0 12px 24px rgba(37, 99, 235, 0.35)",
          }}
        >
          <Calendar className="h-5 w-5" />
          <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-blue-500"></span>
          </span>
        </span>
      </motion.a>

      {/* Botón de WhatsApp */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Abrir chat de WhatsApp"
        title="Chatear por WhatsApp"
        className="inline-flex items-center justify-center rounded-full transition-transform"
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ y: -2, scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.35, delay: 0.05 }}
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
    </div>
  );
}
