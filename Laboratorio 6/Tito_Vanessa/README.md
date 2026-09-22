# Semana 6 · LESS Modular (Ruta Frontend)
## Autor
- Apellidos y nombres: Tito Valerio, Vanessa
- Código: [COMPLETAR]
- Sección: [COMPLETAR]

## Versiones y comandos
- Node.js: v22.x · less: 4.9.1
- Instalar: `npm install`
- Compilar: `npm run build` → genera `dist/css/main.css` + `.map`
- Verificar versión del compilador: `npm run check:less`

## Arquitectura de módulos
```
src/less/
├── tokens.less      ← única fuente de variables (colores, tipografía, espaciado, breakpoints)
├── mixins.less      ← bloques reutilizables (focus-ring, surface-card, stack, guardas de tamaño)
├── base.less        ← reset y estilos base del documento
├── layout.less      ← contenedores, hero, grids, media queries
├── components.less  ← header, nav, botones, tarjetas, footer
└── main.less        ← solo importa los módulos anteriores, en este orden
```
El orden de `@import` en `main.less` importa: primero `tokens` y `mixins` (definiciones que los demás módulos usan), luego `base`, `layout` y `components`.

## Decisiones de diseño
- **Guardas (`when`)**: `.button-size(@size)` usa tres variantes con guarda (`small`, `large` y `default()`) en vez de si-entonces manual, para que cada tamaño se resuelva en tiempo de compilación.
- **Mixins parametrizados**: `.focus-ring(@color: @color-focus)` y `.surface-card(@padding: @space-3)` reciben valores por defecto desde `tokens.less`, así un solo cambio de token actualiza todos los usos.
- **Anidamiento con `&`**: usado en `.button--primary`, `.card__title`/`.card__text` (BEM) y en los estados `:hover`/`:focus-visible`.
- **Escape de funciones nativas CSS**: en `layout.less`, `.container` usa `~"min(100% - 2rem, 1200px)"` para que Less no intente resolver la resta como si fuera una operación propia (el mismo problema detectado y documentado en el Laboratorio 5).

## Matriz de pruebas
| Prueba | Resultado |
|---|---|
| Compilación sin errores | `npm run build` termina con código de salida 0 |
| `.container` con `min()` | Se compila como `min(100% - 2rem, 1200px)`, sin que Less lo evalúe mal |
| Guardas de botón | `.button--small` y `.button--large` generan paddings distintos y correctos |
| Foco visible | `:focus-visible` en enlaces, nav y botones usa `.focus-ring()` con buen contraste |
| Responsive | `.card-grid` pasa de 1 a 2 columnas en 768px y a 3 en 1024px; `.hero` y `.split-layout` pasan a 2 columnas en 768px |

## Autoevaluación
- Criterio mejor logrado: separar tokens de mixins y de componentes para que un cambio de color o espaciado no obligue a tocar cada módulo.
- Mejora pendiente: extraer los breakpoints a mixins tipo `.respond-to(@bp)` en vez de repetir `@media (min-width: @bp-md)` en varios módulos.
- Declaración de autoría: el HTML corresponde a la plantilla base del curso ("Ruta Frontend"). Los archivos `.less` de `src/less/` fueron elaborados por mí. Consulté la documentación oficial de Less (lesscss.org) para la sintaxis de guardas (`when`) y de mixins parametrizados.
