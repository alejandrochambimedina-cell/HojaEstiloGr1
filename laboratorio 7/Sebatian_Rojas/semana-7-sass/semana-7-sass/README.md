# FrontLab — Semana 7: Sass modular

Portal de recursos construido con Dart Sass 1.104.1, usando `@use`/`@forward`, parciales por responsabilidad, mixins con `@content` y funciones propias sobre `sass:map`.

## Cómo correrlo

```bash
npm install
npm run build:css   # compila una vez, con source map
npm run watch:css   # recompila en cada cambio
npm run build:prod  # build comprimido, sin source map, para entrega
```

Luego abre `index.html` con un servidor local (por ejemplo la extensión Live Server de VS Code).

## Estructura

```
src/scss/
├─ abstracts/   → tokens, functions, mixins + _index.scss como fachada pública
├─ base/        → reset y estilos base (:root con custom properties)
├─ layout/      → contenedor y header
├─ components/  → button, card
└─ pages/       → composición de la home
```

## Compilación verificada

- `npm run build:css` genera `dist/css/main.css` y `dist/css/main.css.map` sin advertencias.
- El CSS de salida no contiene `$variables`, `@use` ni `@forward`: todo se resuelve en build.
- Se probó el error controlado de `abstracts/_functions.scss` (`a.space(99)`): Sass detiene el build con un `@error` explícito señalando archivo y línea, tal como exige la guía.

## Matriz de pruebas (resumen)

| Prueba | Resultado |
|---|---|
| 320 px | Cumple — sin scroll horizontal, tarjetas en columna |
| 768 px | Cumple — hero pasa a dos columnas vía `respond-min($bp-md)` |
| 1440 px | Cumple — `.container` limita el ancho a 72rem |
| Zoom 200% | Cumple — unidades relativas y `clamp()` |
| Teclado | Cumple — `focus-ring` visible, skip-link funcional |
| Texto largo | Cumple — `resource-grid` con `auto-fit`/`minmax` no rompe |
| Movimiento reducido | Cumple — media query `prefers-reduced-motion` |
| Source map | Cumple — DevTools conduce a los parciales `.scss` |
| Build limpio | Cumple — borrar `dist/css` y volver a compilar reproduce el resultado |

## Metacognición

**¿Qué mejora aporta `@use` frente a un espacio global de variables y mixins?**
Cada módulo se carga una sola vez y sus miembros solo son visibles bajo su namespace (`a.$color-primary`). Esto elimina colisiones de nombres y hace explícito, con solo leer el archivo, de dónde viene cada variable o mixin — algo que `@import` no garantizaba.

**¿Qué valor debería permanecer como custom property CSS en lugar de convertirse en variable Sass?**
Los colores de marca declarados en `:root` (`--color-primary`, `--color-ink`, etc.). Son candidatos a cambiar en runtime (tema oscuro, preferencia del usuario, JavaScript), algo que una variable Sass no permite una vez compilada.

**¿En qué caso elegirías un mixin y en qué caso una función?**
Mixin cuando el resultado son declaraciones CSS (`surface-card`, `respond-min`). Función cuando el resultado es un valor que se va a usar dentro de una declaración (`space(5)` devuelve un largo, no CSS).

**¿Qué dependencia sería difícil de localizar si eliminaras los namespaces?**
El origen de `$color-primary`, `$radius-md` y las funciones de `abstracts/` — sin el prefijo `a.` no se distinguiría si vienen de tokens, de un mixin local o de una librería externa.

**¿Qué parte del CSS generado revisarías para detectar una abstracción Sass excesiva?**
Bloques de reglas repetidas casi idénticas (señal de que un mixin generó variantes que debieron resolverse con una clase modificadora) y selectores con anidamiento excesivo heredado del nesting SCSS.

**Less vs. Sass: criterios para un proyecto real**
Ecosistema y mantenimiento activo (Dart Sass sigue evolucionando; Less tiene menor adopción hoy), sistema de módulos explícito (`@use`/`@forward` vs. el `@import` global de Less), funciones incorporadas más ricas (`sass:map`, `sass:color`), y mejor soporte de herramientas (linters, source maps, integración con bundlers modernos).
