# FrameworkLab · Semana 15 · Tailwind CSS

Autora: Vanessa Tito · Curso: Hojas de Estilo en Cascada Avanzado (UTP)

## Estructura
```
laboratorio15/Vanessa_Tito/
├── package.json / package-lock.json   (Tailwind CSS 4.3.0 y @tailwindcss/cli 4.3.0)
├── src/entrada.css                    (importación, @source y tema de colores)
├── src/index.html                     (catálogo con clases de utilidad)
├── dist/estilos.css                   (CSS generado, minificado)
├── README.md
└── pruebas.md
```

## Cómo abrir y recompilar
- Abrir `src/index.html` en el navegador: ya carga `../dist/estilos.css` generado.
- Para modificar: `npm install`, luego `npm run dev` (recompila al guardar) y al final `npm run build`.
- `node_modules` no se entrega.

## Decisiones
- **Rejilla**: `grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3` → 1 columna base, 2 desde 48rem (768px), 3 desde 64rem (1024px). Con Bootstrap `lg` era 992px; aquí es 1024px.
- **Tema**: `--color-marca-50/700/800/950` en `@theme` permiten usar `bg-marca-700`, `hover:bg-marca-800`, etc. Cambiar `--color-marca-700` actualiza todos los enlaces a la vez.
- **Tarjeta**: `flex flex-col` + `mt-auto self-start` mantiene el enlace al pie sin estirarlo.
- **Accesibilidad**: `focus-visible:outline-2 outline-offset-4`, enlace de salto con `sr-only focus:not-sr-only`, `motion-safe:transition-colors` para respetar movimiento reducido.
- **Panel**: `<details>/<summary>` nativo; Tailwind solo estiliza `open:bg-marca-50`.
- **Fuente examinada**: `@import "tailwindcss" source(none)` + `@source "./index.html"`.

## Pregunta de cierre (borrador)
Con cinco páginas de la misma paleta y tarjetas distintas, compartiría en el tema los colores (`--color-marca-*`, p. ej. `bg-marca-700`), y mantendría en cada página la composición de la tarjeta y de la rejilla (`grid-cols-*`, `p-5`), porque dependen del contenido de cada página.
