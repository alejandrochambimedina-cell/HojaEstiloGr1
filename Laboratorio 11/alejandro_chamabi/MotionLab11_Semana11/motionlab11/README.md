# MotionLab 11 — Compatibilidad entre navegadores con CSS

Proyecto resuelto para la Guía de Laboratorio, Semana 11. Está hecho con HTML semántico y CSS, sin dependencias ni compilación.

## Archivos
- `index.html`: catálogo con cuatro talleres, controles de prueba y enlaces internos funcionales.
- `css/styles.css`: base de una columna, mejora progresiva con `@supports`, Grid, `color-mix`, foco visible, animación voluntaria y respeto a `prefers-reduced-motion`.
- `INFORME.md`: investigación, plan de pruebas, matriz y plantilla de incidencia.

## Cómo ejecutarlo
1. Descomprime el ZIP.
2. Abre `index.html` en Chrome y Firefox (o los dos navegadores disponibles).
3. Para comparar, utiliza la misma versión del archivo y registra la versión exacta del navegador, sistema, viewport y zoom.
4. Prueba los enlaces, el teclado, anchos de 320/768/1280 px, zoom 200 %, vista básica y movimiento reducido.

No necesita servidor, Node, npm ni extensiones. Live Server es opcional.

## Controles
- **Forzar vista básica de prueba**: muestra una columna, elimina los efectos de movimiento y recupera el borde base.
- **Activar entrada breve de tarjetas**: reproduce una animación de 600 ms con retrasos de 0, 100, 200 y 300 ms.

La vista básica es una simulación de estilo, no una emulación de un navegador antiguo. El estado de la matriz debe reflejar pruebas ejecutadas realmente; no se deben inventar resultados para navegadores no comprobados.
