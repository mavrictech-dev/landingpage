import React from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowUpRight } from "lucide-react";
import { WhatsApp } from "@/components/ui/icons/whatsapp";

const MAVRICITAS_URL = "https://mavrictec.mavricitas.com/";
const WHATSAPP_URL =
  "https://wa.me/51982423722?text=Hola,%20me%20gustaria%20conocer%20mas%20sobre%20sus%20servicios";

export default function WhatsAppFloatingButton() {
  return (
    <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 z-50 flex items-center gap-2 sm:gap-3">
      {/* Botón de Mavricitas: desplegado permanentemente con rectángulo y badge ir */}
      <motion.a
        href={MAVRICITAS_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Ir a mavricitas.com"
        title="mavricitas.com"
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ y: -2, scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.3 }}
        className="group relative flex items-center h-11 sm:h-12 rounded-2xl border-2 border-blue-500/40 bg-white/95 text-blue-600 shadow-xl backdrop-blur-md transition-all duration-300 ease-out hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/25 px-2.5 sm:px-3 overflow-hidden"
        style={{
          boxShadow: "0 10px 25px rgba(37, 99, 235, 0.28)",
        }}
      >
        {/* Icono de Calendario / Mavricitas con indicador pulsante */}
        <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl text-blue-600">
          <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="absolute top-0.5 right-0.5 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500" />
          </span>
        </div>

        {/* Texto 'mavricitas.com' y botón 'ir': siempre desplegado tanto en móvil como en desktop */}
        <div className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap pl-1 pr-0.5">
          <span className="text-xs sm:text-sm font-semibold tracking-tight text-slate-800">
            mavricitas.com
          </span>
          <span className="inline-flex items-center gap-0.5 rounded-lg bg-blue-600 px-2 py-0.5 text-[10px] sm:text-[11px] font-bold text-white shadow-sm transition-transform group-hover:scale-105">
            ir
            <ArrowUpRight className="h-3 w-3" />
          </span>
        </div>
      </motion.a>

      {/* Botón de WhatsApp */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Abrir chat de WhatsApp"
        title="Chatear por WhatsApp"
        className="inline-flex items-center justify-center rounded-full transition-transform shrink-0"
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ y: -2, scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.35, delay: 0.05 }}
      >
        <span
          className="relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 border-emerald-400/50 bg-white text-emerald-600 shadow-xl transition-colors"
          style={{
            boxShadow: "0 10px 25px rgba(37, 211, 102, 0.3)",
          }}
        >
          <WhatsApp className="h-5 w-5" />
        </span>
      </motion.a>
    </div>
  );
}
