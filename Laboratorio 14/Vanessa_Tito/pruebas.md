# Pruebas · FrameworkLab (Semana 14)

Leyenda: **C** cumple · **F** falla · **NC** no comprobado. No se marca C sin ejecutar el caso.

Entorno: navegador y versión ____ · sistema ____

| Caso | Acción y resultado esperado | Estado |
|---|---|---|
| P1 | 360, 800 y 1200px: una, dos y tres columnas, sin scroll horizontal | NC |
| P2 | 767→768 y 991→992px: cambia el número de columnas en el límite | NC |
| P3 | Cada tarjeta lleva a su lectura; el enlace del pie vuelve al inicio | NC |
| P4 | A 360px abrir/cerrar el menú con teclado; a 992px se ven los enlaces | NC |
| P5 | Diálogo: recorrer controles, cerrar con Escape y verificar retorno del foco | NC |
| P6 | Tab al entrar: aparece el enlace de salto y el foco llega al contenido | NC |
| P7 | Zoom 200 % y título largo | NC |
| P8 | Sin red con archivos locales: conserva estilos y comportamiento | NC |
| P9 | Movimiento reducido: el diálogo funciona sin transición | NC |

## Registros de práctica (completar)
- **Antes/después de paleta** (`#295591`, `#1d406f`, `#152f52`): selector `.lab14 .btn-primary`, variable `--bs-btn-bg`, valor calculado en `background-color`.
- **Corrección de ejemplo**: «A 360px el menú no abría. El script apuntaba a otra carpeta. Corregí la ruta y repetí P4.» (reemplazar por un caso real si ocurre).
