import React from 'react';
import { useTheme } from '@/lib/ThemeContext';
import BorderRainEffect from './BorderRainEffect';

export default function Footer() {
  const { theme, rainMode, currentThemeName } = useTheme();
  const logoUpscaly = '/src/assets/logoupscaly.png';
  const letraDark = '/src/assets/letradark.png';
  const letraSL = '/src/assets/letrasl.png';


  const solidBg = theme.isLight ? theme.gradientEnd : '#070B14';
  const useDarkWordmark = ['morning', 'midday', 'afternoon'].includes(currentThemeName);
  const wordmarkSrc = useDarkWordmark ? letraDark : letraSL;

  return (
    <footer
      className="relative py-16 px-6 border-t transition-colors duration-700"
      style={{
        borderColor: theme.isLight ? 'rgba(15,23,42,0.1)' : 'rgba(248,250,252,0.06)',
        background: solidBg,
      }}
    >
      {rainMode && <BorderRainEffect edge="top" count={8} />}

      <div className="max-w-7xl mx-auto relative">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logoUpscaly} alt="Mavric logo" className="h-12 w-auto object-contain" />
              <img src={wordmarkSrc} alt="Mavric Technologies" className="h-12 w-auto object-contain" />
            </div>
            <p className="text-sm leading-relaxed max-w-xs transition-colors duration-700" style={{ color: theme.textMuted }}>
              Desarrollo de software, automatización de procesos, plataformas
              cloud y soluciones con IA para empresas que buscan crecer con tecnología.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-mono tracking-widest mb-4 uppercase transition-colors duration-700" style={{ color: theme.textMuted }}>Empresa</h4>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Servicios', href: '#solutions' },
                  { label: 'Soluciones', href: '#why-mavric' },
                  { label: 'Proyectos', href: '#work' },
                  { label: 'Equipo', href: '#team' },
                  { label: 'Contacto', href: '#contact' },
                ].map(link => (
                  <a key={link.label} href={link.href} className="text-sm transition-colors duration-500" style={{ color: theme.textSecondary }}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-mono tracking-widest mb-4 uppercase transition-colors duration-700" style={{ color: theme.textMuted }}>Conectar</h4>
              <div className="flex flex-col gap-3">
                <a href="mailto:hello@mavrictechnologies.com" className="text-sm transition-colors" style={{ color: theme.textSecondary }}>
                  Escríbenos
                </a>
                <a href="#" className="text-sm transition-colors" style={{ color: theme.textSecondary }}>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono tracking-widest mb-4 uppercase transition-colors duration-700" style={{ color: theme.textMuted }}>Contacto</h4>
            <a href="mailto:hello@mavrictechnologies.com" className="text-sm transition-colors" style={{ color: theme.accent1 }}>
              hello@mavrictechnologies.com
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4 transition-colors duration-700" style={{ borderColor: theme.isLight ? 'rgba(15,23,42,0.08)' : 'rgba(248,250,252,0.05)' }}>
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