# MotionLab 10 — Guía resuelta

Proyecto de laboratorio para CSS Avanzado, Semana 10: transiciones y transformaciones CSS.

## Archivos
- `index.html`: catálogo, controles del experimento, lecturas y reto de extensión.
- `css/styles.css`: estilos base, tarjetas, diseño responsivo, transiciones, transformaciones y movimiento reducido.

## Cómo ejecutarlo
1. Descomprime la carpeta `MotionLab10_Semana10`.
2. Abre `index.html` en Chrome, Edge o Firefox. No requiere Node, JavaScript, paquetes ni compilación.
3. Opcional: abre la carpeta en VS Code y usa Live Server si lo tienes instalado.

## Qué probar
1. Con las casillas desmarcadas, observa el estado inicial.
2. Pulsa `Tab` para navegar por enlaces y comprobar el foco.
3. Marca **Aplicar transformaciones** para comparar A y B.
4. Desmarca esa casilla; marca **Usar origen superior izquierdo** y vuelve a aplicar.
5. En la sección de extensión, marca **Aplicar escala y traslación** y compara C y D.
6. Activa la preferencia del sistema `prefers-reduced-motion: reduce` en el navegador y repite las pruebas.
7. Comprueba la página en anchuras de 320 px, 360 px y 1280 px.

## Respuestas y observaciones

### Predicción de estado y transición
Si se declara `transform` en el estado de foco sin `transition`, el elemento cambia de posición al entrar en ese estado, pero el cambio es inmediato, no gradual.

### Por qué `transform` va en el estado y `transition` en la base
La transformación define el valor visual cuando se activa `:focus-within`, `:hover` o `:checked`. La transición en la regla base permite interpolar tanto al entrar al estado como al regresar al estado inicial.

### Orden de funciones
`translateX(2rem) rotate(20deg)` y `rotate(20deg) translateX(2rem)` dan resultados diferentes porque el orden de composición cambia el sistema de coordenadas en el que se aplica el desplazamiento. En el primer caso el desplazamiento es horizontal respecto al eje original; en el segundo sigue la dirección girada.

### Movimiento reducido
Con `prefers-reduced-motion: reduce`, se eliminan los desplazamientos y transiciones, pero se conservan el contenido, los enlaces, los controles y los estados de color/foco.

### Matriz de pruebas
No se marcan los casos como ejecutados de antemano. Usa C (cumple), F (falla) o NC (no comprobado) después de probar:
- P1: abrir con casillas desmarcadas.
- P2–P4: foco con Tab, retorno y hover.
- P5–P6: comparar orden y origen.
- P7: activar movimiento reducido.
- P8: probar 320, 360 y 1280 px.
- P9–P10: activar enlaces con Enter y revisar zoom al 200 %.
- P11: desactivar CSS temporalmente.

### Preguntas de comprobación
1. **¿Por qué reducir duration no elimina el estado final transformado?** Porque `duration` solo controla cuánto tarda la interpolación; no cambia el valor final de `transform`.
2. **¿Qué dos condiciones pueden mantener elevada una tarjeta?** Que un enlace dentro conserve el foco (`:focus-within`) o que el puntero permanezca encima (`:hover`).
3. **¿Qué aporta conservar los colores fuera de la condición de movimiento?** La interacción sigue comunicándose incluso si se ha solicitado movimiento reducido.

### Reflexión final
1. Una transformación cambia la geometría visual; una transición suaviza el paso entre valores cuando cambia el estado.
2. Al invertir el orden, cambia la dirección visual del desplazamiento porque se aplica en un sistema de coordenadas diferente.
3. Con movimiento reducido se conserva el contenido y su operabilidad, además del foco y las respuestas de color, sin desplazamientos animados.

## Extensión incluida
Se agregó una cuarta tarjeta con destino real dentro de la página y una demostración de escala/traslación con dos órdenes diferentes. La transición se mantiene en 500 ms para las cajas; las tarjetas usan 220 ms para equilibrar respuesta y legibilidad.
