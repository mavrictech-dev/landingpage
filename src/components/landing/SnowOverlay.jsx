import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/lib/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function SnowOverlay() {
  const { snowMode, theme } = useTheme();
  const canvasRef = useRef(/** @type {HTMLCanvasElement | null} */ (null));
  const animRef = useRef(/** @type {number | null} */ (null));
  const flakesRef = useRef(/** @type {{ x: number; y: number; r: number; speed: number; drift: number; opacity: number; phase: number; }[]} */ ([]));
  const snowColorRef = useRef(theme.isLight ? 'rgba(255, 255, 255, 0.9)' : 'rgba(226, 232, 240, 0.95)');

  useEffect(() => {
    snowColorRef.current = theme.isLight ? 'rgba(255, 255, 255, 0.9)' : 'rgba(226, 232, 240, 0.95)';
  }, [theme.isLight]);

  useEffect(() => {
    if (!snowMode || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    const cpuCores = navigator.hardwareConcurrency || 4;
    const lowPowerDevice = cpuCores <= 4 || w < 768;
    const targetFps = lowPowerDevice ? 30 : 45;
    const densityFactor = lowPowerDevice ? 22000 : 18000;
    let pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

    const setupCanvas = () => {
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.floor(w * pixelRatio);
      canvas.height = Math.floor(h * pixelRatio);
      const renderScale = (canvas.width / w) || 1;
      ctx.setTransform(renderScale, 0, 0, renderScale, 0, 0);
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      setupCanvas();
      const viewportArea = w * h;
      const flakeCount = Math.max(60, Math.min(160, Math.floor(viewportArea / densityFactor)));
      flakesRef.current = Array.from({ length: flakeCount }, () => createFlake(w, h, true));
    };

    const createFlake = (width, height, randomY = false) => {
      const radius = Math.random() * 2.2 + 1.2;
      return {
        x: Math.random() * width,
        y: randomY ? Math.random() * height : -(Math.random() * height * 0.3),
        r: radius,
        speed: Math.random() * 0.55 + 0.35,
        drift: Math.random() * 0.6 + 0.2,
        opacity: Math.random() * 0.6 + 0.25,
        phase: Math.random() * Math.PI * 2,
      };
    };

    setupCanvas();
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const targetFrameMs = 1000 / targetFps;
    let lastFrameTs = 0;

    const draw = (ts = 0) => {
      if (document.visibilityState !== 'visible') {
        animRef.current = requestAnimationFrame(draw);
        return;
      }
      if (ts - lastFrameTs < targetFrameMs) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }
      lastFrameTs = ts;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = snowColorRef.current;

      for (let i = 0; i < flakesRef.current.length; i++) {
        const flake = flakesRef.current[i];
        const sway = Math.sin(flake.phase + ts * 0.0012) * flake.drift * 8;
        ctx.globalAlpha = flake.opacity;
        ctx.beginPath();
        ctx.arc(flake.x + sway, flake.y, flake.r, 0, Math.PI * 2);
        ctx.fill();

        flake.y += flake.speed;
        flake.x += flake.drift * 0.12;
        if (flake.y > h + 8) {
          flakesRef.current[i] = createFlake(w, h, false);
        }
        if (flake.x > w + 12) {
          flake.x = -12;
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [snowMode]);

  return (
    <AnimatePresence>
      {snowMode && (
        <motion.div
          className="fixed inset-0 z-20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <canvas ref={canvasRef} className="absolute inset-0" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
