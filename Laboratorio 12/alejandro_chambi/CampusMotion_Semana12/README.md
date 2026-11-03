# CampusMotion — Semana 12

Proyecto de laboratorio de CSS avanzado: animaciones accesibles, controles nativos y mejora progresiva con CSS Grid.

## Archivos
- `index.html`: estructura semántica, tres talleres, destinos internos y controles.
- `css/styles.css`: estilos base, Grid condicional, animaciones, interacciones y preferencias.
- `pruebas.md`: matriz de comprobación y plantilla para registrar evidencia real.

## Cómo abrir
1. Descomprime la carpeta.
2. Abre `index.html` en un navegador moderno. También puedes abrir la carpeta en VS Code y usar Live Server, si lo tienes instalado.
3. No requiere JavaScript, frameworks, paquetes ni compilación.

## Uso de controles
- **Activar animaciones**: inicia las entradas escalonadas y el movimiento decorativo.
- **Pausar animaciones**: congela ambas secuencias en el punto temporal alcanzado; desmarca para continuar.
- Desmarcar **Activar animaciones** elimina las secuencias y vuelve a la presentación estática.
- Los enlaces de cada tarjeta navegan a su contenido dentro de esta página.

## Decisiones técnicas
- `.tile` anima su entrada (600 ms, `ease-out`, una ejecución, `backwards`) con retrasos de 0, 120 y 240 ms.
- `.marker` se mueve 0.25 rem y vuelve (1200 ms, `ease-in-out`, `infinite`, `alternate`).
- `.card` aplica `translateY(-0.25rem) scale(1.02)` al foco interno y al hover cuando existe; transición de 220 ms.
- Los enlaces suavizan el color de fondo durante 180 ms.
- Grid se usa dentro de `@supports`; fuera de ello la base es una columna.
- Las animaciones solo se habilitan con `prefers-reduced-motion: no-preference`. En `reduce`, no hay secuencias ni transiciones.
- El contenido y los controles permanecen disponibles sin movimiento.

## Nota de pruebas
El archivo `pruebas.md` contiene una matriz para que se anoten el navegador, versión, sistema, viewport y resultado observados. No se consignan pruebas como realizadas si no se ejecutaron en el equipo del estudiante.
