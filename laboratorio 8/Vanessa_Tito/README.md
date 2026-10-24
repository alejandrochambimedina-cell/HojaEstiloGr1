# FrontLab Talleres · PC2 · Sass y Less

Catálogo de 4 talleres con el mismo `index.html` y dos implementaciones de estilos: Sass (SCSS) y Less.

## Cómo compilar
```
npm install --save-dev --save-exact sass less   # si no tienes package-lock.json
npm ci                                          # si ya existe package-lock.json
npm run versions
npm run build
```
Genera `dist/css/sass.css`, `sass.css.map`, `less.css` y `less.css.map`. Para alternar, cambia solo el `href` del `<link>` en `index.html` (`dist/css/sass.css` o `dist/css/less.css`).

Versiones usadas: _(pega aquí la salida de `npm run versions`)_

## Cambios de la PC2
- **Cuarto taller** "Accesibilidad web aplicada" con estado escrito "Próximamente" y consulta por correo (`subject=Accesibilidad`).
- **`badge--soon`:** en Sass usa los tokens `$soon-bg` y `$soon-ink`; en Less amplía `.status` con un guard `soon`.
- **`info-panel`** bajo el catálogo, con `surface` y padding de 2rem en ambos lenguajes.
- **Regla intermedia:** 1 columna por debajo de 36rem, 2 desde `$mid` / `@mid` (36rem) y 3 desde 48rem.
- **Tokens cambiados:** `brand` pasó de `#174ea6` a `#0f5e73` y `radius` de `0.9rem` a `0.5rem`.

## Dos decisiones y su efecto
1. **Cambiar `brand`:** el token alimenta `--brand`, así que cambian a la vez los enlaces, el borde y fondo de los botones, el contorno de foco y el texto del botón `--outline`. Un solo valor modifica cuatro componentes.
2. **Cambiar `radius`:** lo usan `surface` (tarjetas e `info-panel`) y `.button`. Con 0.5rem las esquinas son más rectas en todos ellos tras recompilar.

## Contraste (calculado, WCAG 1.4.3)
| Texto / fondo | Relación |
|---|---|
| Blanco sobre `#0f5e73` (botón) | 7.32 : 1 |
| `#0f5e73` sobre `#f1f5f9` (enlaces) | 6.68 : 1 |
| `#78350f` sobre `#fef3c7` (badge Próximamente) | 8.15 : 1 |
| `#475569` sobre `#f1f5f9` (texto atenuado) | 6.92 : 1 |

Todas superan 4.5 : 1.

## Matriz de pruebas
Aún no ejecutada: requiere compilar y abrir el navegador. Registrar C / F / NC por separado para `sass.css` y `less.css`.

| Caso | Sass | Less |
|---|---|---|
| P1 320 y 360 px | NC | NC |
| P2 600 px (2 columnas) | NC | NC |
| P3 1280 px (3 columnas; la 4.ª en otra fila) | NC | NC |
| P4 Tab y Shift+Tab | NC | NC |
| P5 Zoom 200 % | NC | NC |
| P6 Título de 100 caracteres y palabra larga | NC | NC |
| P7 Cuarto taller e `info-panel` | NC | NC |
| P8 Build sin errores y 4 archivos | NC | NC |
| P9 Trazabilidad en DevTools | NC | NC |
| P10 `npm ci` y build en otra carpeta | NC | NC |

Las capturas van en `evidencias/`.
