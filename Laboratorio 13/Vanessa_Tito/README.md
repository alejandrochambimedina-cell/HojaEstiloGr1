# FrameworkLab · Semana 13 · Introducción a frameworks CSS

Autora: Vanessa Tito · Curso: Hojas de Estilo en Cascada Avanzado (UTP)

## Estructura
```
laboratorio13/Vanessa_Tito/
├── nativo.html          (catálogo con CSS propio)
├── framework.html       (mismo catálogo con Bootstrap 5.3.8)
├── css/nativo.css       (estilos de la versión nativa)
├── css/ajustes.css      (personalización de Bootstrap, se carga DESPUÉS)
├── vendor/bootstrap.min.css  (Bootstrap 5.3.8 compilado, local)
├── README.md
└── pruebas.md
```

## Cómo abrir
Abrir `nativo.html` o `framework.html`; la navegación superior permite cambiar entre ambas. No necesita compilación ni JavaScript.

## Decisiones
- **Paleta común**: ambas versiones usan verde `#146c43` (reposo), `#0f5132` (hover) y `#0a3622` (activo). En Bootstrap se logra con variables `--bs-btn-*` en `.demo13 .btn-primary`; en la versión nativa con las mismas declaraciones en `.demo-button`.
- **Rejilla**: la versión nativa usa CSS Grid; Bootstrap usa su sistema basado en Flexbox (`row-cols-1 row-cols-md-2 row-cols-lg-3`). Ambas dan 1, 2 y 3 columnas en 768px y 992px.
- **Cascada**: `ajustes.css` va después de `bootstrap.min.css` y su selector acotado (`.demo13 .btn-primary`) tiene mayor especificidad; no se edita el CSS del proveedor.
- **Reduce**: con `prefers-reduced-motion: reduce` el enlace/botón no tiene transición.
- **Dependencia**: Bootstrap local en `vendor/`; no se usa CDN.

## Comparación (completar con tus mediciones)
| Dimensión | CSS propio | Con framework |
|---|---|---|
| Reglas que mantienes | `nativo.css` (~60 líneas escritas por mí) | `ajustes.css` (~25 líneas) + dependencia |
| Dependencias y versiones | Ninguna | Bootstrap 5.3.8 |
| Cambio de una tarjeta | Editar `.demo-card` | Cambiar clases (`card`, utilidades) |
| Personalización de color | Declaraciones directas | Variables `--bs-btn-*` |
| Pruebas y problemas | ver `pruebas.md` | ver `pruebas.md` |
| Uso que propondría | Página pequeña, pocos elementos | Interfaz con muchos patrones repetidos |
