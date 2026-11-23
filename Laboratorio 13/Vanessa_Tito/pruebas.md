# Pruebas · FrameworkLab (Semana 13)

Leyenda: **C** cumple · **X** requiere corrección · **NC** no comprobado. No se marca C sin ejecutar el caso.

Entorno: navegador y versión ____ · sistema ____ · viewport ____ · zoom 100 %

| Caso | Procedimiento y resultado esperado | N | F |
|---|---|---|---|
| P1 | Abrir la página; tres títulos, descripciones y enlaces | NC | NC |
| P2 | Activar cada enlace; llegar a la lectura correcta | NC | NC |
| P3 | Cambiar de versión desde la navegación | NC | NC |
| P4 | 360, 800 y 1200px: una, dos y tres columnas | NC | NC |
| P5 | Tab: foco visible y salto al contenido | NC | NC |
| P6 | Zoom 200 % y título largo, sin recortes | NC | NC |
| P7 | Reposo, hover y foco: texto legible con la paleta verde | NC | NC |
| P8 | Emular `reduce`: enlace sin transición | NC | NC |
| P9 | Retirar la hoja principal: contenido y destinos presentes | NC | NC |
| P10 | Bootstrap local, sin red, recargar: recurso disponible | NC | NC |

## Evidencia mínima
Vistas estrecha y amplia de cada versión · prueba de foco · captura de una regla del framework (`.btn-primary` en `bootstrap.min.css`) y otra de su personalización (`.demo13 .btn-primary` en `ajustes.css`) · un cambio con su repetición.

## Diagnóstico de ejemplo (prueba controlada en copia)
- Caso: `framework.html`, hoja de Bootstrap desactivada.
- Esperado/observado: contenido y enlaces presentes, pero sin estilos del paquete.
- Causa: las clases dependen del CSS del proveedor.
- Cambio y repetición: restaurar el `link` y recargar; repetir P4.

## Decisión
Para un proyecto de ____ elegiría ____ porque necesita ____. La evidencia muestra ____. Antes de adoptarlo comprobaría ____.
