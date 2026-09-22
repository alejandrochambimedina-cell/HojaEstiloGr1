# Semana 5 · CSS Build Lab (Sass vs Less)
## Autor
- Apellidos y nombres: Tito Valerio, Vanessa
- Código: [COMPLETAR]
- Sección: [COMPLETAR]

## Versiones y comandos
- Node.js: v22.x
- sass: 1.105.0 · less: 4.9.1
- Instalación: `npm install`
- Compilar Sass: `npm run build:sass` → genera `dist/css/main-sass.css` + `.map`
- Compilar Less: `npm run build:less` → genera `dist/css/main-less.css` + `.map`
- Compilar ambos: `npm run build`
- El `index.html` carga por defecto `dist/css/main-sass.css`; para comparar, se cambia el `href` a `dist/css/main-less.css` (ambos producen el mismo resultado visual).

## Estructura
```
Tito_Vanessa/
├── src/
│   ├── scss/main.scss   ← autoría en Sass ($variables, @mixin, anidamiento)
│   └── less/main.less   ← misma intención visual en Less (@variables, .mixin())
├── dist/css/
│   ├── main-sass.css (+ .map)
│   └── main-less.css (+ .map)
├── index.html
└── package.json
```

## Comparación Sass vs Less
| Aspecto | Sass (SCSS) | Less |
|---|---|---|
| Variables | `$color-primary: #0f4c5c;` | `@color-primary: #0f4c5c;` |
| Mixins | `@mixin focus-ring { ... }` / se usan con `@include` | `.focus-ring() { ... }` / se usan invocando el selector |
| Anidamiento y `&` | Igual sintaxis (`&:hover`, `&__mark`) | Igual sintaxis |
| Interpolación en funciones nativas CSS | `min(100% - 2rem, $container)` se compila sin tocarlo | Less intenta resolver la resta como operación matemática propia y la rompe |

## Resultado y corrección (evidencia)
Al compilar por primera vez `main.less`, la regla `.container` se generó como:
```css
width: min(98%, 70rem);
```
en vez de `min(100% - 2rem, 70rem)`. Less interpreta `100% - 2rem` como una resta matemática entre unidades distintas y la calcula mal (98%), perdiendo el `rem`. **Corrección aplicada:** se escapó la expresión con la sintaxis de Less `~"..."` para que la pase tal cual al CSS de salida:
```less
width: ~"min(100% - 2rem, @{container})";
```
Tras recompilar, ambos archivos (`main-sass.css` y `main-less.css`) generan exactamente `width: min(100% - 2rem, 70rem);`, confirmado con un `diff` entre ambas salidas (las únicas diferencias son saltos de línea en blanco, sin impacto visual).

## Autoevaluación
- Criterio mejor logrado: documentar y corregir una diferencia real de comportamiento entre ambos compiladores, no solo traducir sintaxis.
- Mejora pendiente: modularizar cada preprocesador en varios archivos parciales (se deja para el Laboratorio 6/7, donde sí se pide arquitectura por carpetas).
- Declaración de autoría: el HTML corresponde a la plantilla base entregada en el curso. Los archivos `main.scss` y `main.less`, así como su corrección, fueron elaborados por mí. Consulté la documentación oficial de Sass (sass-lang.com) y de Less (lesscss.org) para la sintaxis de escape `~""`.
