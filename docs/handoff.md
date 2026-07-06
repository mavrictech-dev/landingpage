# Handoff del proyecto: Mavric Website 2.0

Este documento resume qué es el proyecto, cómo está organizado, qué contiene cada parte importante y en qué estado quedó, para que la próxima persona pueda entrar rápido y sin reconstruir el contexto desde cero.

## Resumen ejecutivo

Mavric Website 2.0 es una SPA construida con **Vite 6 + React 18**. La aplicación tiene dos bloques funcionales principales:

1. **Landing corporativa de Mavric Technologies**
2. **Libro de Reclamaciones digital**

La landing está bastante avanzada y visualmente pulida. El proyecto además tiene un sistema de temas mucho más sofisticado que el de una landing típica: combina hora del día, clima y un modo visual "Deluxe".

El Libro de Reclamaciones también está implementado y conectado a un **Google Apps Script** externo para registrar datos, generar PDF y soportar el flujo operativo.

## Punto actual del proyecto

Hoy el proyecto se encuentra en este estado:

- **La landing principal está funcional y madura**.
- **El Libro de Reclamaciones está implementado** y ya tiene documentación específica en `docs/libro-reclamaciones-gas.md`.
- **No hay tests** automatizados.
- **No hay formateador** configurado (Prettier/Biome).
- Hay **código muerto o en pausa** que puede confundir a alguien nuevo.
- El flujo **OpenSpec / SDD está desincronizado**: hay cambios que figuran como planificación, pero el código ya existe.

En otras palabras: el proyecto ya tiene bastante trabajo hecho, pero le falta limpieza, trazabilidad y cierre formal en algunas áreas.

## Stack técnico

### Base

- **Vite 6**
- **React 18**
- **React Router DOM v6**
- **JavaScript/JSX** con verificación de tipos vía **JSDoc + TypeScript check**

### UI y estilos

- **Tailwind CSS v3**
- **shadcn/ui**
- **Radix UI**
- **Framer Motion**

### Estado / datos

- **TanStack React Query**

### Formularios y validación

- **react-hook-form**
- **zod**
- **@hookform/resolvers**

### Integraciones relevantes

- **Google Apps Script** para el Libro de Reclamaciones
- **Open-Meteo API** para clima en tiempo real

## Comandos disponibles

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
npm run lint:fix
npm run typecheck
```

### Qué hace cada uno

- `npm run dev`: arranca Vite en desarrollo.
- `npm run build`: genera el build de producción en `dist/`.
- `npm run preview`: sirve el build localmente.
- `npm run lint`: corre ESLint.
- `npm run lint:fix`: intenta corregir problemas automáticamente.
- `npm run typecheck`: corre chequeo de tipos sobre JS con JSDoc.

## Estructura principal del proyecto

| Ruta | Contenido |
|---|---|
| `src/` | Código fuente principal |
| `src/pages/` | Páginas enrutadas |
| `src/components/landing/` | Componentes de la landing |
| `src/components/reclamaciones/` | Flujo del Libro de Reclamaciones |
| `src/components/ui/` | Componentes base de UI (shadcn/ui) |
| `src/lib/` | Contextos, helpers y piezas de infraestructura |
| `src/hooks/` | Hooks reutilizables |
| `src/assets/` | Imágenes, logos y recursos visuales |
| `docs/` | Documentación del proyecto |
| `scripts/google-apps-script/` | Código del Apps Script usado por reclamaciones |
| `openspec/` | Artefactos del flujo SDD/OpenSpec |
| `public/` | Assets públicos, sitemap, robots, manifest, OG image |

## Rutas de la app

| Ruta | Archivo | Función |
|---|---|---|
| `/` | `src/pages/Landing.jsx` | Landing principal |
| `/libro-de-reclamaciones` | `src/pages/LibroReclamacionesPage.jsx` | Página del Libro de Reclamaciones |
| `*` | `src/lib/PageNotFound.jsx` | Página 404 |

## Arquitectura funcional

## 1. Landing principal

La landing se compone de múltiples secciones visuales, animaciones y controles de tema.

### Componentes visibles y activos

| Componente | Qué contiene / hace | Estado |
|---|---|---|
| `BackgroundAtmosphere` | Fondo dinámico con gradientes, orbes, estrellas, nubes y grilla sutil. | Activo |
| `RainOverlay` | Simulación de lluvia en canvas, con relámpagos según contexto visual. | Activo |
| `SnowOverlay` | Simulación de nieve en canvas. | Activo |
| `Navbar` | Navegación superior, versión mobile, scroll a secciones y branding adaptable al tema. | Activo |
| `ScrollProgress` | Barra lateral de progreso de scroll y sección actual. | Activo |
| `HeroSection` | Hero principal con CTA, métricas y panel de enlaces sociales. | Activo |
| `SolutionsSection` | Presentación de servicios/soluciones con efectos visuales. | Activo |
| `NosotrosSection` | Quiénes somos, misión y visión. | Activo |
| `TeamSection` | Presentación del equipo con fotos y descripciones. | Activo |
| `FinalCTA` | Cierre comercial / sección de contacto. | Activo |
| `Footer` | Footer con enlaces, contacto y acceso al Libro de Reclamaciones. | Activo |
| `ThemeControlPanel` | Panel flotante para controlar hora, clima, auto mode y modo Deluxe. | Activo |
| `SurveyEntryNotification` | Notificación fija para encuesta externa. | Activo |
| `WhatsAppFloatingButton` | Botón flotante de WhatsApp. | Activo |
| `SocialContact` | Botones de contacto social. | Activo |
| `SocialLinksPanel` | Enlaces sociales agrupados. | Activo |
| `BorderRainEffect` | Efecto decorativo asociado a modo lluvia. | Activo |

### Componentes construidos pero no mostrados actualmente

| Componente | Qué contiene / hace | Estado |
|---|---|---|
| `TrustStrip` | Métricas/contadores de impacto y resultados. | Comentado en la landing |
| `WhyMavricSection` | Bloque de diferenciadores de la empresa. | Comentado en la landing |
| `FeaturedWork` | Casos de éxito / trabajos destacados. | Comentado en la landing |
| `ProjectModal` | Modal usado por `FeaturedWork` para mostrar detalle de proyectos. | Semi-muerto |

### Qué significa esto

Hay componentes que parecen terminados pero **no están renderizándose**. No está documentado si:

- se quitaron por decisión de negocio,
- quedaron en pausa,
- o están reservados para una siguiente iteración.

La próxima persona debería validar eso antes de borrar o reactivar nada.

## 2. Sistema de temas

Archivo principal:

- `src/lib/ThemeContext.jsx`

Este contexto es una de las piezas más importantes del proyecto.

### Qué resuelve

- Cambia la identidad visual según **hora del día**.
- Cambia comportamiento visual según **clima**.
- Permite **modo automático** basado en ubicación real.
- Tiene un **modo Deluxe** para una estética especial.

### Dependencias funcionales

- `ThemeControlPanel` expone el control manual.
- `BackgroundAtmosphere`, `RainOverlay`, `SnowOverlay`, navbar y otras secciones reaccionan al tema actual.

### Observación importante

Este sistema ya tiene bastante lógica encima. Antes de tocarlo, conviene entenderlo como una pieza de arquitectura visual central, no como un detalle cosmético menor.

## 3. Libro de Reclamaciones digital

Archivos clave:

- `src/pages/LibroReclamacionesPage.jsx`
- `src/components/reclamaciones/libro-reclamaciones.jsx`
- `src/lib/reclamaciones-api.js`
- `docs/libro-reclamaciones-gas.md`
- `scripts/google-apps-script/libro-reclamaciones/`

### Qué contiene

El Libro de Reclamaciones incluye:

- formulario completo,
- validaciones,
- selección de tipo de reclamo,
- firma virtual,
- carga de firma,
- envío al endpoint externo,
- feedback de éxito/error,
- soporte para generación posterior de PDF y procesamiento externo.

### Flujo general

1. La persona completa el formulario.
2. El frontend valida la información.
3. Se construye el payload.
4. Se hace POST al Google Apps Script configurado por variable de entorno.
5. El Apps Script persiste y gestiona el resto del flujo.

### Variable de entorno importante

| Variable | Uso |
|---|---|
| `VITE_RECLAMACIONES_GAS_URL` | URL del Google Apps Script para procesar el Libro de Reclamaciones |

### Punto crítico para la próxima persona

Si el formulario “deja de funcionar”, lo primero que hay que revisar NO es solo React. También hay que revisar:

- la variable `VITE_RECLAMACIONES_GAS_URL`,
- el despliegue del Apps Script,
- permisos del script,
- estructura esperada del payload,
- y la documentación en `docs/libro-reclamaciones-gas.md`.

## 4. Infraestructura y utilidades relevantes

| Archivo | Qué contiene / hace |
|---|---|
| `src/lib/AuthContext.jsx` | Contexto de autenticación en modo local / bypass |
| `src/lib/query-client.js` | Configuración de React Query |
| `src/lib/utils.js` | Helpers generales |
| `src/hooks/use-mobile.jsx` | Hook para detectar viewport móvil |
| `src/utils/index.ts` | Helper de URL/páginas |

## Estado real del sistema de autenticación

Hoy la autenticación **no representa un sistema real conectado a backend**.

### Hallazgos

- `AuthContext.jsx` funciona en **local mode**.
- `ProtectedRoute.jsx` no participa en las rutas actuales.
- `UserNotRegisteredError.jsx` no está integrado en el flujo real.

### Conclusión práctica

La próxima persona no debería asumir que existe una arquitectura de auth productiva lista para usar. Hoy eso parece más bien un remanente o una base incompleta de una dirección anterior.

## Estado de documentación y proceso

### Documentación existente

- `README.md`: muy básico, orientado a setup local.
- `docs/libro-reclamaciones-gas.md`: documentación específica de la integración con Apps Script.
- `docs/handoff.md`: este documento.

### OpenSpec / SDD

Existe carpeta `openspec/`, pero el estado del proceso no está alineado con el código actual.

### Punto importante

El cambio relacionado con el **Libro de Reclamaciones** aparece con artefactos de planificación, pero su implementación ya está presente en el repo. Eso significa que el seguimiento formal del cambio quedó incompleto.

Para alguien nuevo esto puede ser confuso porque el repositorio muestra dos realidades distintas:

- lo que el código YA tiene,
- y lo que OpenSpec dice que todavía está “en propuesta”.

## Riesgos, deuda técnica y cosas que pueden confundir

### 1. No hay tests

No existen:

- tests unitarios,
- tests de integración,
- tests end-to-end,
- ni un runner configurado.

Esto vuelve más riesgoso cualquier refactor, sobre todo en:

- `ThemeContext.jsx`
- `libro-reclamaciones.jsx`
- overlays y animaciones de canvas

### 2. Hay código muerto o semi-muerto

Especialmente en:

- `ProtectedRoute.jsx`
- `UserNotRegisteredError.jsx`
- `ProjectModal.jsx` (dependiente de una sección comentada)

### 3. Hay secciones terminadas pero desactivadas

Eso genera dudas sobre si el proyecto está:

- incompleto,
- recortado por negocio,
- o pendiente de lanzamiento.

### 4. Cobertura de lint parcial

Hay zonas del proyecto que no están siendo validadas igual que el resto, especialmente en bibliotecas internas y componentes de UI.

### 5. Hay detalles menores a revisar

- Posibles links placeholder en redes.
- La 404 tiene un detalle cosmético en el manejo de pathname.
- `SurveyEntryNotification` aparece también en rutas donde quizás no aporta.
- `ScrollProgress` conserva referencias a secciones que hoy no se renderizan.

## Qué debería entender sí o sí la próxima persona

### 1. Este NO es solo un sitio estático

Aunque parezca una landing, hay lógica importante en:

- theming dinámico,
- optimización de efectos visuales,
- formularios complejos,
- integración externa con Apps Script.

### 2. El centro visual del proyecto está en el sistema de tema

No conviene cambiar componentes visuales grandes sin revisar antes cómo impactan en:

- clima,
- hora,
- auto mode,
- deluxe mode,
- overlays.

### 3. El centro funcional externo está en reclamaciones

Si hay incidencias funcionales reales de negocio, lo más sensible probablemente esté en:

- `libro-reclamaciones.jsx`
- `reclamaciones-api.js`
- Apps Script

### 4. La carpeta `openspec/` no refleja fielmente el estado del código actual

Hay que revisar si se va a:

- completar el proceso SDD,
- archivar cambios ya hechos,
- o limpiar artefactos desactualizados.

## Prioridades recomendadas para la próxima iteración

### Prioridad alta

1. **Definir qué hacer con las secciones comentadas** (`TrustStrip`, `WhyMavricSection`, `FeaturedWork`).
2. **Aclarar o eliminar el sistema de auth residual** si no se va a usar.
3. **Sincronizar OpenSpec con el estado real del proyecto**.

### Prioridad media

4. Agregar al menos pruebas mínimas para el Libro de Reclamaciones.
5. Agregar pruebas o validaciones para la lógica central del tema.
6. Revisar links placeholder y detalles menores de UX.

### Prioridad baja

7. Incorporar formatter.
8. Mejorar README principal enlazando esta documentación.
9. Revisar cobertura real de lint/typecheck.

## Archivos más importantes para empezar a entender el proyecto

Si alguien nuevo entra mañana, estos son los archivos que debería leer primero:

1. `src/pages/Landing.jsx`
2. `src/lib/ThemeContext.jsx`
3. `src/components/landing/HeroSection.jsx`
4. `src/components/landing/ThemeControlPanel.jsx`
5. `src/components/reclamaciones/libro-reclamaciones.jsx`
6. `src/lib/reclamaciones-api.js`
7. `docs/libro-reclamaciones-gas.md`
8. `src/lib/AuthContext.jsx`
9. `openspec/` relacionado a cambios activos

## Resumen final para handoff

El proyecto está en una etapa funcional avanzada, especialmente en la landing y en el Libro de Reclamaciones. Lo que más necesita la próxima persona NO es “terminar desde cero”, sino entender rápido:

- qué partes están realmente activas,
- qué partes están en pausa,
- qué piezas son críticas,
- y dónde el repositorio está diciendo algo distinto a lo que el código ya hace.

Si alguien entra con esa claridad, va a poder trabajar mucho mejor y sin romper cosas por asumir mal el estado del sistema.
