# Pruebas · CampusMotion (Semana 12)

Leyenda: **C** cumple · **F** falla · **NC** no comprobado.
Regla de este registro: no se marca C sin haber ejecutado el procedimiento en el navegador.

## Entornos
| ID | Navegador y versión | Sistema | Viewport / zoom | Preferencia |
|---|---|---|---|---|
| E1 | ____ | ____ | ____ / 100 % | no-preference |
| E2 | ____ | ____ | ____ / 100 % | no-preference |

## Matriz (completar al ejecutar)
| Caso | Procedimiento | Resultado esperado | E1 | E2 |
|---|---|---|---|---|
| P1 | Cargar sin casillas marcadas | Contenido completo, sin movimiento | NC | NC |
| P2 | Activar (no-preference) | Entradas 0/120/240ms y punto repetitivo | NC | NC |
| P3 | Activar + Pausar, luego quitar Pausar | Se detiene y continúa sin reiniciar | NC | NC |
| P4 | Desmarcar Activar | Vuelve a la base estática | NC | NC |
| P5 | Pausar antes de Activar | No avanza; desactivar devuelve base | NC | NC |
| P6 | Emular `reduce` + Activar | Sin secuencias ni transiciones; contenido visible | NC | NC |
| P7 | 320, 768 y 1280px | 1, 2 y 3 columnas; sin scroll horizontal | NC | NC |
| P8 | Tab / Espacio / Enter | Foco visible y controles operables | NC | NC |
| P9 | Zoom 200 % y título largo | Sin recortes | NC | NC |
| P10 | CSS desactivado | Contenido comprensible | NC | NC |

## Evidencias a adjuntar
Vista estrecha y amplia · foco por teclado · pausa/continuar (grabación breve) · `reduce` activo · bloque Grid retirado temporalmente (columna base funcional) · corrección.

## Reporte de corrección (prueba controlada)
| Campo | Registro |
|---|---|
| Caso y entorno | Diagnóstico controlado en una copia, E1 |
| Pasos | Cambiar `animation: tile-enter` por `animation: tile-enterr` en `.tile`; activar animaciones |
| Esperado / observado | Esperado: entradas escalonadas. Observado (a verificar): las tarjetas no entran, pero el punto sí se mueve |
| Causa | El nombre no coincide con ningún `@keyframes`; la otra secuencia usa otro nombre |
| Cambio | Restaurar `tile-enter` |
| Repetición y evidencia | Repetir P2 y adjuntar captura/grabación. (Copia defectuosa no se entrega) |
