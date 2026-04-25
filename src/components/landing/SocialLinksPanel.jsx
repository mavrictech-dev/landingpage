import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { LinkedIn } from '@/components/ui/icons/linkedin';
import { Instagram } from '@/components/ui/icons/instagram';
import { GitHub } from '@/components/ui/icons/github';
import { TikTok } from '@/components/ui/icons/tiktok';

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/mavric-technologies/',
    Icon: LinkedIn,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/mavrictechnologies/',
    Icon: Instagram,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/mavrictechnologies',
    Icon: GitHub,
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@mavrictechnologies',
    Icon: TikTok,
  },
];

/** @typedef {'hero' | 'footer'} SocialPanelVariant */

export default function SocialLinksPanel(
  /** @type {{ variant?: SocialPanelVariant, className?: string }} */ { variant = 'hero', className = '' }
) {
  const { theme } = useTheme();
  const iconSizeClass = variant === 'footer' ? 'h-4 w-4' : 'h-[18px] w-[18px]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`inline-flex items-center gap-2 ${className}`}
    >
      {SOCIAL_LINKS.map((item, index) => (
        <motion.a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          aria-label={item.label}
          className="group p-1 transition-all duration-500"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: index * 0.05 }}
          whileHover={{ y: -2, scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          style={{ color: theme.textSecondary }}
          onMouseEnter={e => {
            e.currentTarget.style.color = theme.accent1;
            e.currentTarget.style.filter = `drop-shadow(0 0 10px ${theme.glow})`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = theme.textSecondary;
            e.currentTarget.style.filter = 'none';
          }}
        >
          <item.Icon className={`${iconSizeClass}`} />
        </motion.a>
      ))}
    </motion.div>
  );
}
