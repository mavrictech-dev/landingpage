import React from 'react';
import { useTheme } from '@/lib/ThemeContext';
import BorderRainEffect from './BorderRainEffect';
import iconAzul from '@/assets/iconazul.svg';
import iconDorado from '@/assets/icondorado.svg';
import letraDark from '@/assets/dark.svg';
import letraSL from '@/assets/light.svg';
import SocialLinksPanel from './SocialLinksPanel';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const { theme, rainMode, currentThemeName } = useTheme();
  const solidBg = theme.isLight ? theme.gradientEnd : '#070B14';
  const useDarkWordmark = ['morning', 'midday', 'afternoon'].includes(currentThemeName);
  const wordmarkSrc = useDarkWordmark ? letraDark : letraSL;
  const logoSrc = useDarkWordmark ? iconAzul : iconDorado;

  return (
    <footer
      className="relative py-10 px-4 sm:px-6 border-t transition-colors duration-700"
      style={{
        borderColor: theme.isLight ? 'rgba(15,23,42,0.1)' : 'rgba(248,250,252,0.06)',
        background: solidBg,
      }}
    >
      {rainMode && <BorderRainEffect edge="top" count={8} />}

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-6 sm:gap-8 lg:gap-12">
          <div className="flex flex-col items-center lg:items-start gap-3 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <img src={logoSrc} alt="Mavric logo" className="h-8 sm:h-12 w-auto object-contain" />
              <img src={wordmarkSrc} alt="Mavric Technologies" className="h-5 sm:h-8 w-auto object-contain" />
            </div>
            <p className="hidden sm:block text-sm leading-relaxed text-justify max-w-xs transition-colors duration-700" style={{ color: theme.textMuted }}>
              Desarrollo de software, automatización de procesos, plataformas
              cloud y soluciones con IA para empresas que buscan crecer con tecnología.
            </p>
            <div className="flex items-center justify-center lg:justify-start">
              <SocialLinksPanel variant="footer" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:col-span-2">
            <div className="text-left">
              <h4 className="text-[11px] sm:text-xs font-mono tracking-widest mb-2 sm:mb-4 uppercase transition-colors duration-700" style={{ color: theme.textMuted }}>Empresa</h4>
              <div className="flex flex-col gap-1.5 sm:gap-3 items-start">
                {[
                  { label: 'Servicios', href: '#solutions' },
                  { label: 'Nosotros', href: '#nosotros' },
                  { label: 'Equipo', href: '#team' },
                  { label: 'Contacto', href: '#contact' },
                ].map(link => (
                  <a key={link.label} href={link.href} className="text-xs sm:text-sm transition-colors duration-500" style={{ color: theme.textSecondary }}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="text-left">
              <h4 className="text-[11px] sm:text-xs font-mono tracking-widest mb-2 sm:mb-4 uppercase transition-colors duration-700" style={{ color: theme.textMuted }}>Contacto</h4>
              <div className="flex flex-col gap-2 sm:gap-3 items-start">
                <a
                  href="mailto:informe@mavrictec.com"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm transition-colors duration-500 hover:underline break-all"
                  style={{ color: theme.textSecondary }}
                >
                  <Mail className="h-4 w-4" />
                  informe@mavrictec.com
                </a>
                {/*<a
                  href="tel:+51987654321"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm transition-colors duration-500 hover:underline"
                  style={{ color: theme.textSecondary }}
                >
                  <Phone className="h-4 w-4" />
                  +51 987654321
                </a>*/}
                <span className="inline-flex items-center gap-2 text-xs sm:text-sm transition-colors duration-700" style={{ color: theme.textSecondary }}>
                  <MapPin className="h-4 w-4" />
                  PIURA-PERU
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-10 pt-4 sm:pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3 transition-colors duration-700" style={{ borderColor: theme.isLight ? 'rgba(15,23,42,0.08)' : 'rgba(248,250,252,0.05)' }}>
          <p className="text-xs transition-colors duration-700" style={{ color: theme.textMuted }}>
            © {new Date().getFullYear()} Mavric Technologies. Todos los derechos reservados.
          </p>
          <p className="text-xs font-mono transition-colors duration-700" style={{ color: theme.textMuted }}>
            Tecnología con propósito.
          </p>
        </div>
      </div>
    </footer>
  );
}
