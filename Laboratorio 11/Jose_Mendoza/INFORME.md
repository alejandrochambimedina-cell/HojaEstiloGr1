# Informe de laboratorio — Semana 11
## Compatibilidad entre navegadores con CSS

### 1. Alcance y criterios de aceptación
**Objetivo:** conservar las tareas esenciales del catálogo en diferentes navegadores y ofrecer Grid, color y movimiento como mejoras opcionales.

**Tareas esenciales:** leer los tres talleres originales y sus lecturas; activar los enlaces internos; recorrer enlaces y casillas con teclado; identificar el foco; leer el contenido en viewport estrecho y con zoom; mantener el contenido estático con `prefers-reduced-motion: reduce`.

**Criterios:** todos los títulos, descripciones y enlaces están disponibles; Tab muestra foco visible; Enter activa enlaces y Espacio cambia casillas; no hay texto recortado ni scroll horizontal innecesario; la vista básica conserva lectura y navegación.

### 2. Entornos de prueba
Completar con datos observados durante la ejecución. No asumir versiones.

| ID | Navegador y versión | Sistema/dispositivo | Viewport y zoom | Estado |
|---|---|---|---|---|
| E1 | Pendiente de registrar | Pendiente | Pendiente | NC hasta probar |
| E2 | Pendiente de registrar | Pendiente | Pendiente | NC hasta probar |
| E3 | Opcional | Pendiente | Pendiente | NC si no se prueba |

`C` = cumple; `F` = falla; `NC` = no comprobado.

### 3. Ficha de investigación: `color-mix()`
- **Característica:** función CSS `color-mix()`.
- **Uso en este proyecto:** modifica únicamente el color del borde de `.card`.
- **Fuente indicada por la guía:** MDN, https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/color-mix
- **Fecha de consulta:** completar cuando se consulte la referencia.
- **Decisión:** la mejora está dentro de `@supports`; el borde `#b9c6d5` permanece como alternativa si la condición no se cumple.
- **Limitación:** soporte declarado en una tabla no equivale a una prueba real del catálogo; hay que comprobar el estilo calculado y la legibilidad en cada entorno objetivo.

### 4. Mejora progresiva aplicada
1. HTML semántico, títulos, descripciones y enlaces internos funcionales.
2. CSS base con una columna, colores explícitos, foco visible y tarjetas legibles.
3. `@supports (display: grid)` habilita Grid: una columna por defecto, dos desde `40rem` y tres desde `64rem`.
4. `@supports (color: color-mix(...))` habilita un borde alternativo.
5. `@media (prefers-reduced-motion: no-preference)` habilita transiciones, elevación y entrada voluntaria.
6. `@media (prefers-reduced-motion: reduce)` muestra un aviso y evita que se aplique el bloque de movimiento.
7. La casilla de vista básica fuerza una columna y retira movimiento, sin retirar enlaces ni foco.

`@supports` evalúa una característica CSS; no identifica el nombre del navegador. La condición verdadera tampoco garantiza por sí sola que el diseño renderizado sea correcto.

### 5. Matriz de pruebas
**No marcar C/F hasta ejecutar la prueba en el navegador correspondiente.** En esta entrega, todos los casos quedan NC para no presentar como reales pruebas que no se han ejecutado en el equipo del estudiante.

| Caso | Acción y resultado esperado | E1 | E2 | E3 |
|---|---|---|---|---|
| P1 | Cargar sin casillas marcadas; títulos y enlaces disponibles, sin entrada automática. | NC | NC | NC |
| P2 | Activar los cuatro enlaces; llegar a sus lecturas correctas. | NC | NC | NC |
| P3 | Usar Tab, Enter y Espacio; foco visible y controles operables. | NC | NC | NC |
| P4 | Probar 320, 768 y 1280 px; lectura, columnas según soporte y sin desbordamiento. | NC | NC | NC |
| P5 | Con `no-preference`, activar Entrada; orden y contenido final visibles antes de aproximadamente 1 s. | NC | NC | NC |
| P6 | Con `reduce`, activar Entrada; no hay movimiento y el contenido sigue disponible. | NC | NC | NC |
| P7 | Forzar Base; una columna, sin movimiento, enlaces y foco conservados. | NC | NC | NC |
| P8 | Combinar Base y Entrada; la vista básica prevalece y el contenido sigue disponible. | NC | NC | NC |
| P9 | Zoom 200 % y título largo; contenido ajustado y controles utilizables. | NC | NC | NC |
| P10 | Desactivar CSS; contenido y etiquetas siguen comprensibles. | NC | NC | NC |

**Evidencias que debes capturar al ejecutar:** vista estrecha, vista amplia, foco por teclado, vista básica, movimiento reducido y reporte antes/después. Cada captura debe indicar caso, navegador y versión, viewport, zoom y preferencia de movimiento. Una captura de E1 no demuestra el resultado de E2.

### 6. Fallo controlado y corrección
**Prueba controlada A — función de color:** en una copia, cambia `color-mix` por `color-mixx` tanto en la condición `@supports` como en la declaración. La mejora de borde deja de aplicarse y debe permanecer el borde base. Luego restaura `color-mix` y comprueba de nuevo.

**Prueba controlada B — selector inválido:** en una copia, cambia `.button:focus` por `.button:focus, .button:estado-inexistente` en la regla de fondo. El selector inválido puede invalidar esa regla completa; la regla general `a:focus` está separada y debería conservar el indicador de foco. Después restaura el selector correcto y repite la prueba con teclado.

No conservar las alteraciones de prueba en el entregable final.

#### Plantilla para registrar la incidencia observada
- **ID y caso de matriz:** completar.
- **Entorno y condiciones:** navegador/versión, sistema, viewport, zoom, preferencia de movimiento.
- **Pasos exactos:** completar.
- **Esperado y observado:** completar con datos reales.
- **Regla y causa verificada:** revisar Styles/Rules y Computed en DevTools.
- **Cambio aplicado:** describir el cambio concreto.
- **Repetición en E1 y E2:** registrar C/F/NC y adjuntar evidencias.

### 7. Reto breve: cuarto taller
Se añadió un cuarto taller, **Accesibilidad y movimiento**, con `id="lectura-accesibilidad"` y enlace interno funcional. El cuarto elemento utiliza el mismo patrón `.tile`/`.card`; su retraso es de 300 ms. Con duración de 600 ms, el final nominal se produce a los 900 ms desde la activación.

Debe verificarse con Grid disponible y con Base activada, con teclado y con `reduce`. Una diferencia visual leve de redondeado o tipografía puede aceptarse si no afecta la lectura; foco invisible, enlace que no funciona, texto recortado o movimiento contra la preferencia de reducción requieren corrección.

### 8. Respuestas de cierre
1. **¿Qué significa compatibilidad entre navegadores?** Que las tareas esenciales de la interfaz sigan siendo posibles en los entornos definidos, aunque algunos detalles visuales varíen.
2. **¿Para qué sirve `@supports`?** Para aplicar mejoras cuando el navegador reconoce una condición CSS, dejando una base fuera de la consulta.
3. **¿Por qué no basta consultar una tabla de soporte?** Porque el soporte teórico no demuestra que la página concreta se vea y funcione correctamente; se necesita probar el resultado renderizado.
4. **¿Qué aporta la mejora progresiva?** Conserva una presentación base funcional y añade mejoras como Grid o `color-mix` cuando están disponibles.
5. **¿Qué debe hacerse con movimiento reducido?** No aplicar las animaciones ni elevaciones; mantener el contenido estático y disponible.
6. **¿Qué hacer antes de añadir prefijos?** Consultar soporte y notas de las propiedades en las versiones objetivo; no añadir prefijos indiscriminadamente.
7. **¿Qué evidencia cierra una incidencia?** Pasos reproducibles, causa verificada, cambio aplicado y nueva ejecución en los entornos objetivo con capturas identificadas.

### 9. Referencias de la guía
- MDN, Introduction to cross-browser testing: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Testing/Introduction
- web.dev, Baseline: https://web.dev/baseline
- MDN, `@supports`: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@supports
- MDN, CSS error handling: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Syntax/Error_handling
- MDN, `color-mix()`: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/color-mix
- MDN, `CSS.supports()`: https://developer.mozilla.org/en-US/docs/Web/API/CSS/supports_static
- MDN, `prefers-reduced-motion`: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion
- Autoprefixer: https://github.com/postcss/autoprefixer
- W3C CSS Validation Service: https://jigsaw.w3.org/css-validator/
- Chrome DevTools, Emulate CSS media features: https://developer.chrome.com/docs/devtools/rendering/emulate-css
- Firefox DevTools, Examine and edit CSS: https://firefox-source-docs.mozilla.org/devtools-user/page_inspector/how_to/examine_and_edit_css/index.html
