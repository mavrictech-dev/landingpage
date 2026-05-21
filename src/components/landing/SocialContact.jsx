import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { Gmail } from '@/components/ui/icons/gmail';
import { WhatsApp } from '@/components/ui/icons/whatsapp';
import { Instagram } from '@/components/ui/icons/instagram';
import { LinkedIn } from '@/components/ui/icons/linkedin';

const CONTACT_LINKS = [
  /*{
    label: 'GMAIL',
    href: 'mailto:informes@mavrictec.com',
    Icon: Gmail,
    iconColor: null,
    borderColor: 'transparent',
    shadow: '0 8px 24px rgba(15, 23, 42, 0.18)',
  },*/
  {
    label: 'WHATSAPP',
    href: 'https://wa.me/982423722?text=Hola,%20me%20gustaría%20conocer%20más%20sobre%20sus%20servicios',
    Icon: WhatsApp,
    iconColor: null,
    borderColor: 'transparent',
    shadow: '0 8px 24px rgba(37, 211, 102, 0.2)',
  },
  {
    label: 'INSTAGRAM',
    href: 'https://www.instagram.com/mavrictec/',
    Icon: Instagram,
    iconColor: null,
    borderColor: 'transparent',
    shadow: '0 8px 24px rgba(228, 64, 95, 0.2)',
  },
  {
    label: 'LINKEDIN',
    href: 'https://www.linkedin.com/company/mavrictec',
    Icon: LinkedIn,
    iconColor: null,
    borderColor: 'transparent',
    shadow: '0 8px 24px rgba(10, 102, 194, 0.2)',
  },
];

/** @typedef {'hero' | 'footer'} SocialContactVariant */

export default function SocialContact(
  /** @type {{ variant?: SocialContactVariant, className?: string }} */ { variant = 'footer', className = '' }
) {
  const { theme } = useTheme();
  const isFooter = variant === 'footer';
  const iconSizeClass = variant === 'footer' ? 'h-5 w-5' : 'h-6 w-6';
  const textSizeClass = variant === 'footer' ? 'text-[11px]' : 'text-xs';
  const buttonPadding = variant === 'footer' ? 'px-3 py-2' : 'px-3.5 py-2.5';
  const iconBoxClass = variant === 'footer' ? 'h-9 w-9' : 'h-10 w-10';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`inline-flex ${isFooter ? 'flex-col items-start' : 'flex-wrap items-center'} gap-2 ${className}`}
    >
      {CONTACT_LINKS.map((item, index) => (
        <motion.a
          key={item.label}
          href={item.href}
          target={item.label !== 'GMAIL' ? '_blank' : undefined}
          rel={item.label !== 'GMAIL' ? 'noreferrer' : undefined}
          aria-label={item.label}
          className={`group inline-flex justify-center items-center gap-2 rounded-xl ${isFooter ? 'border-0' : 'border'} ${buttonPadding} transition-all duration-500`}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: index * 0.05 }}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          style={{
            color: theme.textPrimary,
            borderColor: isFooter ? 'transparent' : item.borderColor,
            background:'transparent',
            boxShadow: 'none',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = item.shadow;
            if (!isFooter) {
              e.currentTarget.style.borderColor = theme.accent1;
            }
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = 'none';
            if (!isFooter) {
              e.currentTarget.style.borderColor = item.borderColor;
            }
          }}
        >
          <span
            className={`inline-flex items-center justify-center rounded-xl ${iconBoxClass} bg-white/10 backdrop-blur-md border transition-transform duration-500 group-hover:-translate-x-1`}
            style={{
              color: 'currentColor',
              borderColor: theme.isLight ? 'rgba(15, 23, 42, 0.12)' : 'rgba(248, 250, 252, 0.12)',
              boxShadow: theme.isLight ? '0 6px 16px rgba(15, 23, 42, 0.08)' : '0 6px 16px rgba(2, 6, 23, 0.5)',
            }}
          >
            <item.Icon className={`${iconSizeClass}`} />
          </span>
          <span className={`${textSizeClass} font-mono tracking-wider font-semibold max-w-0 opacity-0 translate-x-1 overflow-hidden transition-all duration-500 group-hover:max-w-[140px] group-hover:opacity-100 group-hover:translate-x-0`}>
            {item.label}
          </span>
        </motion.a>
      ))}
    </motion.div>
  );
}
