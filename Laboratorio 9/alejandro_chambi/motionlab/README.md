# MotionLab Talleres

Laboratorio de la Semana 9 de CSS Avanzado (UTP): animaciones CSS con `@keyframes` y propiedades `animation`, controladas solo con HTML y CSS.

## Estructura

- `index.html`: cabecera, controles (casillas), tres tarjetas y sección de orientación.
- `css/styles.css`: base, layout, fotogramas (`card-enter`, `indicator-rise`) y reglas de activación, pausa y movimiento reducido.
- `evidencias/`: matriz de pruebas y espacio para capturas.

## Cómo ejecutarlo

Abre la carpeta en Visual Studio Code y usa Live Server (o abre `index.html` en el navegador). No requiere dependencias ni compilación.

## Funcionamiento

- Sin activar nada, se ven todas las tarjetas y enlaces (vista estática).
- **Activar movimiento**: las tarjetas entran con retrasos de 0, 120 y 240 ms y el indicador sube y baja de forma repetida.
- **Pausar movimiento**: conserva la posición temporal; al desmarcar continúa sin reiniciar.
- Desmarcar **Activar** retira la animación y restaura la vista base.
- Con `prefers-reduced-motion: reduce` la página permanece estática y conserva todo el contenido.

## Decisiones

- Las tarjetas parten de `opacity: 1` y `transform: none`, así el contenido nunca depende de la animación.
- Los retrasos se asignan con la variable `--delay` en clases modificadoras, sin repetir las ocho propiedades por tarjeta.
- Solo se animan `opacity` y `transform` para no afectar el layout.
- Los controles son hermanos anteriores de `.stage` (selector `~`).
