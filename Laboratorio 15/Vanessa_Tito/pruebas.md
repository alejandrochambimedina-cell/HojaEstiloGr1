# Pruebas · FrameworkLab (Semana 15)

Leyenda: **C** cumple · **F** falla · **NC** no comprobado. No se marca C sin ejecutar el caso.
Entorno: navegador y versión ____ · sistema ____

| Caso | Qué hacer y observar | Estado |
|---|---|---|
| P1 | 360, 800 y 1200px: 1, 2 y 3 columnas, sin scroll horizontal | NC |
| P2 | 767/768 y 1023/1024px: la rejilla cambia en cada umbral | NC |
| P3 | Los tres enlaces de tarjeta llevan a su lectura | NC |
| P4 | Tab al entrar: aparece "Saltar al contenido" y el foco va a `main` | NC |
| P5 | Tab por enlaces y abrir/cerrar "Criterios de entrega" con teclado; foco visible | NC |
| P6 | Cambiar `--color-marca-700`: el reposo cambia en todas las tarjetas | NC |
| P7 | Emular movimiento reducido: cambio de estado sin transición | NC |
| P8 | Zoom 200 %: títulos, descripciones y enlaces legibles y operables | NC |

## Verificación realizada en la generación
- `npm run build` con Tailwind 4.3.0 terminó sin errores y generó `dist/estilos.css` (~11 KB).
- Las utilidades `grid-cols-3`, `bg-marca-700` y el umbral `48rem` aparecen en el CSS generado.
- Todos los enlaces `#...` del HTML apuntan a ids existentes.

## Evidencias a adjuntar
`display` y `grid-template-columns` en Computado a 800 y 1200px · foco por teclado · antes/después de `marca-700` (`#0f6b68` → `#244d80`) · panel abierto.
