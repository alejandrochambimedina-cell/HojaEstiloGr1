# FrameworkLab · Semana 14 · Bootstrap para interfaces responsivas

Autora: Vanessa Tito · Curso: Hojas de Estilo en Cascada Avanzado (UTP)

## Estructura
```
laboratorio14/Vanessa_Tito/
├── index.html
├── css/ajustes.css                 (paleta, foco y estilos propios; se carga después de Bootstrap)
├── vendor/bootstrap.min.css        (Bootstrap 5.3.8)
├── vendor/bootstrap.bundle.min.js  (Bootstrap 5.3.8, incluye Popper)
├── README.md
└── pruebas.md
```

## Cómo abrir
Abrir `index.html` (o Live Server). Todo es local: funciona sin red.

## Qué aporta cada archivo
- **bootstrap.min.css**: rejilla, tarjetas, botones, utilidades. Sin él se pierde el aspecto, pero los enlaces siguen funcionando.
- **bootstrap.bundle.min.js**: comportamiento del menú plegable (`collapse`) y del diálogo (`modal`) vía atributos `data-bs-*`. Sin él, el catálogo se ve igual pero menú y diálogo no responden.
- **ajustes.css**: personalización sin tocar el CSS del proveedor.

## Decisiones técnicas
- **Rejilla**: `col-12 col-md-6 col-lg-4` → 1 columna (<768px), 2 (≥768px), 3 (≥992px).
- **Tarjetas**: `h-100`, `d-flex flex-column` y `mt-auto align-self-start` mantienen el enlace al pie sin estirarlo.
- **Personalización**: variables `--bs-btn-*` en `.lab14 .btn-primary` (`#0f6b68` / `#095451` / `#073f3e`). El selector acotado gana por especificidad al `.btn-primary` del framework, y el archivo va después en el orden de carga.
- **Foco**: `:focus-visible` con contorno `#963d14` (blanco sobre la portada oscura).
- **Navegación vs. acción**: los enlaces con apariencia de botón navegan a lecturas (`<a href>`); el diálogo se abre con un `<button>`.
