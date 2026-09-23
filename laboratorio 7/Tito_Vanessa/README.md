# Semana 7 · FrontLab (SASS: módulos, mixins, funciones)
## Autor
- Apellidos y nombres: Tito Valerio, Vanessa
- Código: [COMPLETAR]
- Sección: [COMPLETAR]

## Versiones y comandos
- Node.js: v22.x · sass: 1.104.1 (Dart Sass, `npx sass --version` confirmado)
- Instalar: `npm install`
- Compilar en desarrollo: `npm run build:css` → genera `dist/css/main.css` + `.map`
- Compilar en modo watch: `npm run watch:css`
- Compilar para producción (minificado, sin source map): `npm run build:prod`

## Arquitectura de módulos
```
src/scss/
├─ abstracts/
│  ├─ _tokens.scss     ← colores, radios, sombra, breakpoints, mapa $spaces
│  ├─ _functions.scss  ← space($step), usa sass:map y @error si el paso no existe
│  ├─ _mixins.scss     ← focus-ring, surface-card, respond-min (con @content)
│  └─ _index.scss      ← fachada: @forward de los tres parciales anteriores
├─ base/
│  ├─ _reset.scss
│  └─ _base.scss       ← custom properties en :root + estilos base
├─ layout/_shell.scss  ← .container, .site-header
├─ components/
│  ├─ _button.scss
│  └─ _card.scss       ← incluye la variante del reto .card--featured
├─ pages/_home.scss    ← composición visual de la página + media query con @content
└─ main.scss           ← solo @use de los módulos anteriores, no define estilos propios
```
Cada módulo de segundo nivel (`base`, `layout`, `components`, `pages`) carga `../abstracts` con `@use ... as a`, nunca `@import`. Solo `abstracts/_index.scss` usa `@forward` para construir la API pública del paquete de tokens/funciones/mixins.

## Inspección del CSS generado
- `dist/css/main.css` no contiene ninguna `$variable` ni directivas `@use`/`@forward` (verificado con `grep`: 0 coincidencias).
- Los mixins se materializan como declaraciones donde se incluyeron (ej. `focus-ring` aparece repetido en `a:focus-visible`, `button:focus-visible` y `.card__link:focus-visible`).
- Las custom properties (`--color-primary`, etc.) sí permanecen en `:root` dentro del CSS final y son inspeccionables en runtime desde DevTools.
- `rgb(from #0b67d1 r g b/0.35)` se compila tal cual: Dart Sass no evalúa la sintaxis moderna de color relativo, la deja para que el navegador la resuelva (tal como advierte la guía).

## Source maps y trazabilidad (DevTools)
Al inspeccionar una `.card` en Elements, la regla de `padding`/`box-shadow` remite a `_card.scss`, y la de `gap`/`justify-content` del header remite a `_shell.scss` — no a `main.css` directamente. Esto confirma que `dist/css/main.css.map` está enlazando correctamente cada declaración con su parcial de origen.

## Error controlado (evidencia real)
**Síntoma:** se llamó `a.space(99)` en `_shell.scss` (un paso que no existe en el mapa `$spaces`).
**Comando ejecutado:** `npm run build:css`
**Mensaje obtenido:**
```
Error: "Paso de espacio no válido: 99."
   ╷
19 │   gap: a.space(99);
   │        ^^^^^^^^^^^
   ╵
  src/scss/layout/_shell.scss 19:8  @use
  src/scss/main.scss 3:1            root stylesheet
```
**Causa:** la función `space()` valida con `@if $value == null { @error ... }` y detiene la compilación antes de generar CSS inconsistente.
**Corrección:** se restauró `a.space(4)`, se volvió a compilar y el build terminó sin errores.

## Matriz de pruebas
| Prueba | Resultado |
|---|---|
| 320 px | Cumple — hero y tarjetas en una columna, sin scroll horizontal |
| 768 px | Cumple — `.hero__layout` pasa a 2 columnas vía `@include a.respond-min(a.$bp-md)` |
| 1440 px | Cumple — `.container` limita el ancho con `min(100% - 2rem, 72rem)` |
| Zoom 200% | Cumple — unidades relativas (`rem`, `clamp()`) permiten reflow sin recortar contenido |
| Teclado | Cumple — skip-link funcional y `:focus-visible` con `focus-ring` en enlaces y botones |
| Texto largo | Cumple — `resource-grid` con `auto-fit`/`minmax` no rompe la rejilla con contenido extra |
| Movimiento reducido | Cumple — `@media (prefers-reduced-motion: reduce)` anula transiciones no esenciales |
| Source map | Cumple — DevTools conduce a `_card.scss`/`_shell.scss`, no a `main.css` |
| Build limpio | Cumple — borrar `dist/css` y correr `npm run build:css` regenera todo sin edición manual |

## Revisión de arquitectura
| Pregunta | Respuesta | Evidencia |
|---|---|---|
| ¿Cada parcial tiene una responsabilidad reconocible? | Sí | `_tokens`, `_functions`, `_mixins` separados; `base`/`layout`/`components`/`pages` por capa |
| ¿Las dependencias se declaran con @use? | Sí | `@use "../abstracts" as a;` en todos los módulos de layout/components/pages |
| ¿@forward se usa solo para exponer una API pública? | Sí | Solo en `abstracts/_index.scss` |
| ¿Las funciones devuelven valores y los mixins emiten declaraciones? | Sí | `space()` devuelve un valor; `focus-ring`/`surface-card` emiten declaraciones |
| ¿El CSS generado no se edita manualmente? | Sí | Todo cambio se hizo en `src/scss` y se recompiló con `npm run build:css` |
| ¿Los source maps permiten rastrear el origen? | Sí | Verificado en la sección anterior |

## Reto de extensión — `.card--featured`
Se agregó una cuarta tarjeta en `index.html` con la clase `card card--featured` para mostrar el reto directamente en la página.
- **R1 (variante visual):** borde y etiqueta con el color primario en vez del fondo suave neutro, sin perder contraste.
- **R2 (reutilización):** reutiliza el token `a.$color-primary` y `a.$color-surface-soft`; no redefine `box-shadow` ni `border-radius` manualmente, porque esos ya los aplica el mixin `surface-card` incluido en la regla base `.card`.
- **R3 (responsive):** no se agregó ningún breakpoint nuevo; `resource-grid` ya resuelve el acomodo con `auto-fit`/`minmax`.
- **R4 (accesibilidad):** `.card__link` conserva su `:focus-visible` con `focus-ring`; la jerarquía semántica (`article > span/h3/p/a`) no cambió.
- **R5 (trazabilidad):** la regla `.card--featured` remite a `_card.scss` en DevTools mediante el source map.
- **R6 (documentación):** esta sección explica qué abstracciones se reutilizaron y por qué.

## Metacognición
**¿Qué mejora aporta @use frente a un espacio global de variables y mixins?**
Evita colisiones de nombres y hace explícito de dónde viene cada miembro (`a.$color-primary` en vez de un `$color-primary` ambiguo cargado por quién sabe qué `@import`). Además cada módulo se evalúa una sola vez, sin duplicar CSS por cargarlo dos veces.

**¿Qué valor debería permanecer como custom property CSS en lugar de convertirse en una variable Sass?**
Los colores del sistema (`--color-primary`, `--color-ink`, etc.) declarados en `:root`: deben poder inspeccionarse y, eventualmente, sobreescribirse en runtime (por ejemplo para un modo oscuro con JavaScript o una media query), algo que una variable Sass no permite porque desaparece tras compilar.

**¿En qué caso elegirías un mixin y en qué caso una función?**
Un mixin cuando la intención produce varias declaraciones CSS a la vez (como `surface-card`, que aplica fondo + borde + radio + sombra juntos). Una función cuando se recibe un valor y se devuelve otro valor único, como `space($step)`, que solo entrega un número desde el mapa `$spaces`.

**¿Qué dependencia de tu proyecto sería difícil de localizar si eliminaras los namespaces?**
`a.$color-primary` y `a.surface-card` dejarían de indicar que vienen de `abstracts`; sin el prefijo `a.` sería fácil confundirlos con una variable definida directamente en el archivo que los usa.

**¿Qué parte del CSS generado revisarías para detectar una abstracción Sass excesiva?**
Buscaría selectores repetidos con las mismas declaraciones copiadas muchas veces (señal de que faltó un mixin) o, al revés, un mixin usado una sola vez que generó una regla larguísima y difícil de leer en el CSS final (señal de que sobra abstracción).

**Después de comparar Less y Sass, ¿qué criterios técnicos usarías para elegir una herramienta en un proyecto real?**
Sass/Dart Sass por el sistema de módulos explícito (`@use`/`@forward`), las funciones con `@error` para validar entradas, y un ecosistema más activo (Less sigue siendo válido, pero su comunidad y actualizaciones son más pequeñas). Elegiría Less solo si el proyecto ya lo usa o si el equipo necesita algo más cercano a CSS puro sin aprender un sistema de módulos nuevo.

## Declaración de autoría
El HTML, la arquitectura de carpetas y el código base de `abstracts`, `base`, `layout` y `components` siguen la Guía de Laboratorio Semana 7 (UTP · Hojas de Estilo en Cascada Avanzado). La variante `.card--featured` del reto de extensión, las pruebas documentadas y las respuestas de metacognición fueron elaboradas por mí.
