import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * Rain-on-border ripple effect — visible droplet impacts along edges.
 * Place inside a position:relative container.
 * @param {string} edge - 'top' | 'bottom' | 'all'
 * @param {number} count - number of ripple points per edge
 */
export default function BorderRainEffect({ edge = 'top', count = 7 }) {
  const topRipples = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      pos: 5 + Math.random() * 90,
      delay: Math.random() * 3,
      duration: 1.8 + Math.random() * 1.2,
      size: 4 + Math.random() * 4,
    })), [count]
  );

  const bottomRipples = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      pos: 5 + Math.random() * 90,
      delay: Math.random() * 3,
      duration: 1.8 + Math.random() * 1.2,
      size: 4 + Math.random() * 4,
    })), [count]
  );

  const showTop = edge === 'top' || edge === 'all';
  const showBottom = edge === 'bottom' || edge === 'all';

  const renderRipples = (vertical, ripples) =>
    ripples.map(r => (
      <motion.div
        key={`${vertical}-${r.id}`}
        className="absolute"
        style={{
          left: `${r.pos}%`,
          [vertical]: -1,
          width: r.size,
          height: r.size * 0.35,
          borderRadius: '50%',
          background: 'rgba(148, 194, 255, 0.5)',
          boxShadow: '0 0 6px rgba(148, 194, 255, 0.3), 0 0 2px rgba(200, 220, 255, 0.4)',
        }}
        animate={{
          scale: [0, 2.5, 4.5],
          opacity: [0.7, 0.3, 0],
        }}
        transition={{
          duration: r.duration,
          delay: r.delay,
          repeat: Infinity,
          ease: 'easeOut',
        }}
      />
    ));

  return (
    <div className="absolute inset-0 overflow-visible pointer-events-none z-10">
      {showTop && renderRipples('top', topRipples)}
      {showBottom && renderRipples('bottom', bottomRipples)}
    </div>
  );
}