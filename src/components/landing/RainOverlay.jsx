import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/lib/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function RainOverlay() {
  const { rainMode, theme } = useTheme();
  const canvasRef = useRef(/** @type {HTMLCanvasElement | null} */ (null));
  const animRef = useRef(/** @type {number | null} */ (null));
  const dropsRef = useRef(/** @type {{ x: number; y: number; len: number; speed: number; opacity: number; width: number; }[]} */ ([]));

  useEffect(() => {
    if (!rainMode || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let w = window.innerWidth;
    let h = window.innerHeight;
    const cpuCores = navigator.hardwareConcurrency || 4;
    const lowPowerDevice = cpuCores <= 4 || w < 768;
    const targetFps = lowPowerDevice ? 30 : 45;
    const qualityScale = lowPowerDevice ? 0.72 : 0.85;
    const visibilityBoost = theme.isLight ? 1.28 : 1.12;
    let pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

    const setupCanvas = () => {
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.floor(w * pixelRatio * qualityScale);
      canvas.height = Math.floor(h * pixelRatio * qualityScale);
      const renderScale = (canvas.width / w) || 1;
      ctx.setTransform(renderScale, 0, 0, renderScale, 0, 0);
    };

    setupCanvas();

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      setupCanvas();
    };
    window.addEventListener('resize', resize, { passive: true });

    const windAngle = 0.42;

    const viewportArea = w * h;
    const densityFactor = lowPowerDevice ? 28000 : 22000;
    const dropCount = Math.max(34, Math.min(78, Math.floor(viewportArea / densityFactor)));
    dropsRef.current = Array.from({ length: dropCount }, () => ({
      x: Math.random() * (w + 200) - 100,
      y: Math.random() * h,
      len: Math.random() * 24 + 16,
      speed: Math.random() * 4.4 + 3.4,
      opacity: Math.min(0.8, (Math.random() * 0.2 + 0.2) * visibilityBoost),
      width: Math.random() * 2.2 + 1.4,
    }));

    const dx = Math.sin(windAngle);
    const dy = Math.cos(windAngle);

    const targetFrameMs = 1000 / targetFps;
    let lastFrameTs = 0;
    let adaptiveLoad = 1;

    const adaptLoad = (/** @type {number} */ frameMs) => {
      if (frameMs > targetFrameMs * 1.35) {
        adaptiveLoad = Math.max(0.55, adaptiveLoad - 0.05);
      } else if (frameMs < targetFrameMs * 0.95) {
        adaptiveLoad = Math.min(1, adaptiveLoad + 0.02);
      }
    };

    const draw = (ts = 0) => {
      if (document.visibilityState !== 'visible') {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      if (ts - lastFrameTs < targetFrameMs) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }
      const frameMs = ts - lastFrameTs;
      lastFrameTs = ts;
      adaptLoad(frameMs);

      ctx.clearRect(0, 0, w, h);
      const drops = dropsRef.current;
      const drawStride = adaptiveLoad < 0.7 ? 2 : 1;

      ctx.fillStyle = theme.rainColor;
      ctx.strokeStyle = theme.rainHighlight || 'rgba(200,220,255,0.3)';
      ctx.lineWidth = lowPowerDevice ? 0.95 : 1.15;
      ctx.lineCap = 'round';

      for (let i = 0; i < drops.length; i++) {
        if (i % drawStride !== 0) continue;
        const drop = drops[i];
        // Tail goes opposite to movement so the droplet head leads.
        const tailX = drop.x - dx * drop.len;
        const tailY = drop.y - dy * drop.len;

        // Tapered teardrop body
        const perpX = dy * drop.width * 0.5;
        const perpY = -dx * drop.width * 0.5;

        ctx.globalAlpha = Math.min(0.9, drop.opacity * 1.15);
        ctx.beginPath();
        ctx.moveTo(drop.x - perpX, drop.y - perpY);
        ctx.lineTo(drop.x + perpX, drop.y + perpY);
        ctx.lineTo(tailX, tailY);
        ctx.closePath();
        ctx.fill();

        if ((!lowPowerDevice || i % 2 === 0) && adaptiveLoad >= 0.65) {
          ctx.globalAlpha = Math.min(0.75, drop.opacity * 0.65);
          ctx.beginPath();
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();
        }

        drop.y += drop.speed * dy;
        drop.x += drop.speed * dx;
        if (drop.y > h || drop.x > w + 100) {
          drop.y = -(Math.random() * 50);
          drop.x = Math.random() * (w + 200) - 200;
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [rainMode, theme.rainColor, theme.rainHighlight]);

  return (
    <AnimatePresence>
      {rainMode && (
        <motion.canvas
          ref={canvasRef}
          className="fixed inset-0 z-40 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      )}
    </AnimatePresence>
  );
}