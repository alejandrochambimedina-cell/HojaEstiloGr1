# Matriz de pruebas de MotionLab

Estado: C cumple, F falla, NC no comprobado. Completa tras probar y guarda las capturas en esta carpeta.

| Caso | Procedimiento | Resultado esperado | Estado |
|------|---------------|--------------------|--------|
| P1 | Carga con ambas casillas desmarcadas | Contenido completo y sin movimiento | NC |
| P2 | Activar con no-preference | Entradas en orden y punto repetitivo | NC |
| P3 | Pausar y continuar el indicador | Se detiene y retoma sin reiniciar | NC |
| P4 | Desactivar y reactivar tras un instante | Restaura la base y repite la entrada | NC |
| P5 | Pausar antes de activar | No avanza; desactivar devuelve contenido visible | NC |
| P6 | Preferencia reduce y Activar marcada | Sin animaciones; tarjetas y enlaces visibles | NC |
| P7 | 320 y 360px; luego 1280px | Una columna móvil y tres en escritorio; sin scroll horizontal | NC |
| P8 | Tab y Espacio sobre controles | Foco visible y estados operables | NC |
| P9 | Título largo y zoom 200 % | Texto ajusta; contenido sigue accesible | NC |
| P10 | CSS desactivado | Contenido y etiquetas siguen comprensibles | NC |

## Capturas requeridas

- Vista estática móvil
- Vista estática de escritorio
- Panel de animaciones con los retrasos
- Movimiento reducido
