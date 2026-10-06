# FrontLab PC2 — Sass y Less

Proyecto base y resolución de la consigna de la Guía de Laboratorio Semana 8 de CSS Avanzado.

## Requisitos
- Node.js LTS
- npm
- Visual Studio Code
- Extensión Live Server (opcional)

## Instalación

Desde la raíz:

```bash
npm install
```

Si se entrega `package-lock.json`, se recomienda:

```bash
npm ci
```

## Compilación

Ver versiones:

```bash
npm run versions
```

Compilar ambas implementaciones:

```bash
npm run build
```

También se puede compilar por separado:

```bash
npm run build:sass
npm run build:less
```

## Cambiar entre Sass y Less

En `index.html` se activa inicialmente:

```html
<link rel="stylesheet" href="dist/css/sass.css">
```

Para probar Less, cambiar únicamente a:

```html
<link rel="stylesheet" href="dist/css/less.css">
```

No cambiar el HTML restante.

## Estructura

- `index.html`: HTML compartido.
- `src/scss/`: implementación Sass/SCSS.
- `src/less/`: implementación Less.
- `dist/css/`: CSS compilado y mapas.
- `evidencias/`: espacio para capturas y matriz de pruebas.

## Cambios de PC2 incluidos

- Cuarto taller con estado `Próximamente`.
- Variante `.badge--soon` en Sass y Less.
- `info-panel` bajo el catálogo.
- Breakpoint intermedio de 36rem a 48rem para dos columnas.
- Tres columnas desde 48rem.
- Token de radio y color principal centralizados.
- Foco visible.
- `min-width: 0` y `overflow-wrap: anywhere` para contenido largo.

## Pruebas sugeridas

Registrar resultados para:
1. 320/360 px: una columna.
2. 600 px: dos columnas.
3. 1280 px: tres columnas.
4. Tab/Shift+Tab: foco visible.
5. Zoom 200 %.
6. Título largo y palabra sin espacios.
7. Cuarto taller e info-panel.
8. Build de Sass y Less.
9. Trazabilidad mediante source maps.
10. `npm ci` + `npm run build` en una copia limpia.

No se deben marcar pruebas como cumplidas sin ejecutarlas.
