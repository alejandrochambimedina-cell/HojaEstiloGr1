# PC1 · UTP TechHub

## Decisiones de diseño
1. Base mobile-first: Todos los estilos parten de una columna única a 320px (Flexbox en `column` y Grid a 1 columna); las reglas para pantallas más grandes se agregan con `min-width` en `em`, nunca al revés.
2. Uso de Flexbox: Se usa en el header (marca + navegación), el hero (contenido + imagen), los grupos de botones, las tarjetas de taller (para que el enlace "Ver detalle" quede siempre al final con `margin-top: auto`) y en la sección de registro y el footer.
3. Uso de Grid: El listado de talleres (`.workshop-grid`) usa `grid-template-columns` con 1 columna en mobile, 2 en tablet (768px) y 3 en desktop (1024px), evitando así reordenar el HTML.
4. Breakpoint 1 (768px) y evidencia del problema que resuelve: En mobile el header apilado y las tarjetas en una sola columna generan mucho scroll. Desde 768px el header pasa a fila y las tarjetas a 2 columnas, aprovechando el ancho disponible.
5. Breakpoint 2 (1024px) y evidencia del problema que resuelve: En tablet la sección de agenda quedaba muy abajo del listado de talleres, alejada visualmente de "Talleres". Desde 1024px el contenido pasa a 2 columnas (talleres + agenda lateral pegajosa) y la grilla de talleres sube a 3 columnas.
6. Tratamiento de imagen y tipografía responsiva: La imagen del hero usa `max-width: 100%` y `height: auto` para no desbordar. La tipografía usa `clamp()` en `body`, `h1` y `h2` para escalar de forma fluida entre 320px y 1440px sin saltos bruscos ni texto desbordado.

## Matriz de pruebas
| Prueba | Resultado | Observación o corrección |
|---|---|---|
| 320 px | OK | Header, hero y tarjetas en una columna; sin scroll horizontal. |
| 768 px | OK | Header en fila y tarjetas en 2 columnas gracias al primer breakpoint. |
| 1024 px | OK | Agenda pasa a columna lateral pegajosa (`sticky`) y tarjetas a 3 columnas. |
| 1440 px | OK | El contenedor amplía su ancho máximo; el texto del hero no queda demasiado largo gracias al `max-width` en caracteres (`ch`). |
| Zoom 200 % | OK | Al usar unidades relativas (`rem`, `em`, `clamp`) el layout reflow sin cortar contenido; se revisó que ningún texto quede oculto. |
| Solo teclado | OK | El "skip-link" aparece al primer Tab y todos los enlaces/botones muestran un contorno de foco visible (`:focus-visible`) con buen contraste. |
| Cadena de 80 caracteres | OK | Se probó pegando una cadena larga sin espacios en una tarjeta; `overflow-wrap: break-word` evita que rompa el layout. |

## Validación
- HTML: Documento validado sin errores en el validador de W3C (estructura semántica: header, main, section, aside, footer).
- CSS: Sin errores en el validador de W3C; se usan solo propiedades estándar (Flexbox, Grid, clamp, custom properties).
- Advertencias justificadas: Ninguna advertencia relevante; el atributo `datetime` del `<time>` se mantiene igual al de la plantilla base.

## Autoevaluación
- Criterio mejor logrado: La transición mobile-first con Grid, que evita reordenar el HTML y solo cambia el número de columnas por breakpoint.
- Mejora pendiente: Agregar un menú tipo "hamburguesa" real para pantallas muy angostas cuando la navegación tenga más de 3 enlaces.
- Declaración de autoría y recursos consultados: El HTML corresponde a la plantilla base entregada en el curso (igual para todo el salón); el archivo `styles.css` fue elaborado por mí. Consulté la documentación oficial de MDN Web Docs para Flexbox, Grid y `clamp()`.
