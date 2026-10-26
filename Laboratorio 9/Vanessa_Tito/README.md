# MotionLab Talleres · Semana 9 · Animaciones CSS

Catálogo responsivo con dos secuencias `@keyframes` (`card-enter` e `indicator-rise`), controles nativos para activar y pausar, y respeto de `prefers-reduced-motion`. HTML y CSS puros, sin JavaScript.

## Uso
Abrir `index.html` en el navegador o con Live Server.

## Decisiones
- **Visibilidad primero:** la base de `.course-card` es `opacity: 1` y `transform: none`; el movimiento solo se aplica con `#run:checked` y `no-preference`.
- **Retrasos por modificador:** `--delay` se define en cada clase (`--second` 120 ms, `--third` 240 ms, `--fourth` 360 ms). Las ocho propiedades de reproducción se escriben una sola vez, en la regla `#run:checked ~ .stage .course-card`, y cada tarjeta solo cambia su variable.
- **Reto:** cuarta tarjeta "Estados y transformaciones" con retraso de 360 ms (final previsto: 960 ms). Se añadió un fotograma al 60 % en `card-enter` (opacidad 0.9 y `translateY(-0.1rem)`), con un sobrepaso mínimo de 0.1rem: la tarjeta "asienta" en su lugar sin rebotar mucho.
- **Columnas:** con 4 tarjetas, 2 columnas desde 48rem y 4 desde 64rem (3 columnas dejaría una tarjeta sola).

## Pruebas (Chromium automatizado)
| Caso | Estado |
|---|---|
| P1 Carga estática: 4 tarjetas con opacity 1, sin animación | C |
| P2 Activar: retrasos 0 / 0.12 / 0.24 / 0.36 s, duración 0.6 s, punto `infinite alternate` | C |
| P3 Pausar y continuar: el punto se detiene y retoma | C |
| P4 Desactivar y reactivar: restaura la base y vuelve a aplicar `card-enter` | C |
| P5 Pausar antes de activar: queda en `paused` con la 4.ª tarjeta en opacity 0; al desactivar vuelve a 1 | C |
| P6 Reduce + Activar: sin animaciones, tarjetas visibles | C |
| P7 320 y 360 px: 1 columna; 1280 px: 4 columnas; sin scroll horizontal | C |
| P8 Tab + Espacio: la casilla Activar cambia a marcada; foco con outline visible | C |
| P9 Zoom 200 % (viewport de 640 px): sin scroll horizontal. Título largo no probado | NC (parcial) |
| P10 CSS desactivado | NC |

`evidencias/` incluye capturas de la vista estática (escritorio y móvil) y de movimiento reducido. Faltan la captura del panel de animaciones de DevTools y las mediciones de Performance, que se hacen en el navegador.
