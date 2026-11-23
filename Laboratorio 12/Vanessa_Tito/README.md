# CampusMotion · Semana 12 (PC3) · Animaciones CSS

Autora: Vanessa Tito · Curso: Hojas de Estilo en Cascada Avanzado (UTP)

## Cómo abrir
Abrir `index.html` en el navegador (o con Live Server). Rutas relativas; no requiere JavaScript ni dependencias.

## Estructura
```
laboratorio12/Vanessa_Tito/
├── index.html
├── css/styles.css
├── README.md
└── pruebas.md
```

## Uso de los controles
- **Activar animaciones**: inicia las entradas escalonadas de `.tile` y el movimiento del punto `.marker`.
- **Pausar animaciones**: congela ambas secuencias en el punto alcanzado; al desmarcar continúan.
- Desmarcar **Activar** detiene y devuelve todo a la vista estática. Para repetir la entrada: desactivar y volver a activar.

## Decisiones de movimiento
| Elemento | Técnica | Parámetros |
|---|---|---|
| `.tile` | `@keyframes tile-enter` | 0.75rem → 0, 600ms, ease-out, 1 iteración, `backwards`; retrasos 0/120/240ms |
| `.marker` | `@keyframes marker-rise` | 0 → -0.25rem, 1200ms, ease-in-out, infinite, alternate |
| `.card` | transición de `transform` | `translateY(-0.25rem) scale(1.02)` en `:focus-within` y `:hover` (si hay hover), 220ms ease-out |
| `.button` | transición de `background-color` | 180ms ease-out |

- **Envoltura vs. tarjeta**: la entrada va en `.tile` y la interacción en `.card`, así no compiten por `transform`.
- **fill-mode `backwards`**: aplica el primer fotograma durante el retraso y devuelve el estilo base al terminar. No se anima `opacity`, por lo que el texto siempre es visible (con Pausar antes de Activar, una entrada puede quedar un instante en el primer fotograma desplazado, pero legible).
- **Pausa**: se usa `animation-play-state: paused` declarado después de la abreviada; nunca se quita `animation-name`.
- **Tiempos nominales**: las entradas terminan a 600, 720 y 840ms desde la activación.
- **Grid**: mejora dentro de `@supports (display: grid)`; la base es una columna en bloques. 1 columna < 40rem, 2 desde 40rem, 3 desde 64rem.
- **Movimiento reducido**: todo el movimiento está dentro de `prefers-reduced-motion: no-preference`; con `reduce` no hay secuencias ni transiciones y el color de foco es inmediato.

## Personalización
Taller 02 pasó a "Animaciones CSS con propósito", con nueva descripción y su lectura `#tema-motion` actualizada. Los tres destinos de enlace se conservan.
