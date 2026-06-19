import React from 'react';
import { useTheme } from '@/lib/ThemeContext';
import BorderRainEffect from './BorderRainEffect';
import iconAzul from '@/assets/iconazul.svg';
import iconDorado from '@/assets/icondorado.svg';
import letraDark from '@/assets/dark.svg';
import letraSL from '@/assets/light.svg';
import mapImage from '@/assets/maps.png';
import SocialLinksPanel from './SocialLinksPanel';
import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const { theme, rainMode, currentThemeName } = useTheme();
  const solidBg = theme.isLight ? theme.gradientEnd : '#070B14';
  const useDarkWordmark = ['morning', 'midday', 'afternoon'].includes(currentThemeName);
  const wordmarkSrc = useDarkWordmark ? letraDark : letraSL;
  const logoSrc = useDarkWordmark ? iconAzul : iconDorado;
  const dividerColor = theme.isLight ? 'rgba(15,23,42,0.12)' : 'rgba(248,250,252,0.07)';

  return (
    <footer
      className="relative py-12 px-4 sm:px-6 border-t transition-colors duration-700"
      style={{
        borderColor: theme.isLight ? 'rgba(15,23,42,0.1)' : 'rgba(248,250,252,0.06)',
        background: solidBg,
      }}
    >
      {rainMode && <BorderRainEffect edge="top" count={8} />}

      <div className="max-w-6xl mx-auto relative">
        <div className="relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr_1fr] gap-8 lg:gap-10">
            <div className="flex flex-col items-center lg:items-start gap-4 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <img src={logoSrc} alt="Mavric logo" className="h-9 sm:h-12 w-auto object-contain" />
                <img src={wordmarkSrc} alt="Mavric Technologies" className="h-5 sm:h-8 w-auto object-contain" />
              </div>
              <p
                className="text-sm sm:text-[15px] leading-relaxed max-w-xs sm:max-w-sm transition-colors duration-700"
                style={{ color: theme.textSecondary }}
              >
                Desarrollo de software, automatización de procesos, plataformas cloud y soluciones con IA para empresas que buscan crecer con tecnología.
              </p>
              <div className="flex items-center justify-center lg:justify-start">
                <SocialLinksPanel variant="footer" />
              </div>
              <Link
                to="/libro-de-reclamaciones"
                aria-label="Abrir libro de reclamaciones digital"
                className="group inline-flex items-center justify-center rounded-2xl border border-transparent transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400/60"
              >
                <img
                  src="/libro_reclamaciones_digital.svg"
                  alt="Libro de reclamaciones digital"
                  className="h-auto w-full max-w-[240px] rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-shadow duration-300 group-hover:shadow-[0_16px_40px_rgba(37,99,235,0.16)]"
                />
              </Link>
            </div>

            <div className="lg:border-l lg:pl-8" style={{ borderColor: dividerColor }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[11px] sm:text-xs font-mono tracking-[0.4em] uppercase" style={{ color: theme.textMuted }}>
                  Empresa
                </span>
                <span className="h-px flex-1" style={{ background: dividerColor }} />
              </div>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Servicios', href: '#solutions' },
                  { label: 'Nosotros', href: '#nosotros' },
                  { label: 'Equipo', href: '#team' },
                  { label: 'Contacto', href: '#contact' },
                ].map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="group flex items-center justify-between gap-3 rounded-full px-3 py-2 text-xs sm:text-sm transition-all duration-300"
                    style={{ color: theme.textSecondary }}
                  >
                    <span className="inline-flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: theme.isLight ? '#3B82F6' : '#60A5FA' }} />
                      {link.label}
                    </span>
                    <span className="text-[10px] opacity-60 transition-transform duration-300 group-hover:translate-x-1">&gt;</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:border-l lg:pl-8" style={{ borderColor: dividerColor }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[11px] sm:text-xs font-mono tracking-[0.4em] uppercase" style={{ color: theme.textMuted }}>
                  Contacto
                </span>
                <span className="h-px flex-1" style={{ background: dividerColor }} />
              </div>
              <div className="flex flex-col gap-3 items-start">
                <a
                  href="mailto:informe@mavrictec.com"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm transition-colors duration-500 hover:underline break-all"
                  style={{ color: theme.textSecondary }}
                >
                  <Mail className="h-4 w-4" />
                  informe@mavrictec.com
                </a>
                <a
                  href="https://maps.app.goo.gl/CPfr7N3PEMFXsWYM6"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Abrir ubicacion en Google Maps"
                  className="group relative h-[150px] w-full max-w-[260px] overflow-hidden rounded-2xl border transition-all duration-500 hover:-translate-y-0.5"
                  style={{
                    color: theme.textSecondary,
                    borderColor: theme.isLight ? 'rgba(15,23,42,0.18)' : 'rgba(248,250,252,0.16)',
                  }}
                >
                  <img
                    src={mapImage}
                    alt="Mapa de ubicacion"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: theme.isLight
                        ? 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(15,23,42,0.2) 100%)'
                        : 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)',
                    }}
                  />
                  <div
                    className="absolute left-3 top-3 text-[10px] font-mono uppercase tracking-[0.32em]"
                    style={{ color: theme.textMuted }}
                  >
                    Ubicacion
                  </div>
                  <div
                    className="absolute left-3 bottom-3 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em]"
                    style={{
                      color: theme.textSecondary,
                      borderColor: theme.isLight ? 'rgba(15,23,42,0.22)' : 'rgba(248,250,252,0.22)',
                      background: theme.isLight ? 'rgba(255,255,255,0.75)' : 'rgba(2,6,23,0.55)',
                    }}
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    Ubicanos
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div
            className="mt-8 pt-5 border-t flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3 transition-colors duration-700"
            style={{ borderColor: theme.isLight ? 'rgba(15,23,42,0.08)' : 'rgba(248,250,252,0.05)' }}
          >
            <p className="text-xs transition-colors duration-700" style={{ color: theme.textMuted }}>
              © {new Date().getFullYear()} Mavric Technologies. Todos los derechos reservados.
            </p>
            <p className="text-xs font-mono transition-colors duration-700" style={{ color: theme.textMuted }}>
              Tecnología con propósito.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
