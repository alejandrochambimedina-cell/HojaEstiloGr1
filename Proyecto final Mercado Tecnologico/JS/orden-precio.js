/* ========================================================
   ORDENAR PRODUCTOS POR PRECIO (compartido)
   --------------------------------------------------------
   Lo usan las páginas de catálogo hechas con frameworks.
   Funciona con un <select> normal o con componentes como
   <md-outlined-select>: solo necesita que exista un elemento
   #ordenarPrecio con valor "relevancia", "menor" o "mayor".
   El filtro y la búsqueda siguen en inicio.js.
   ======================================================== */
document.addEventListener("DOMContentLoaded", function () {
    const selectOrden = document.getElementById("ordenarPrecio");
    const productos = Array.from(document.querySelectorAll(".producto"));

    if (!selectOrden || productos.length === 0) return;

    // Todas las tarjetas son hermanas dentro del mismo contenedor
    const contenedor = productos[0].parentNode;
    const mensajeSinResultados = document.getElementById("mensajeSinResultados");

    // Guarda la posición original para poder volver a "Relevancia"
    productos.forEach(function (producto, posicion) {
        if (!producto.hasAttribute("data-orden")) {
            producto.setAttribute("data-orden", posicion);
        }
    });

    function obtenerPrecio(producto) {
        const texto = producto.querySelector(".producto-pie strong").textContent;
        return parseFloat(texto.replace("S/", "").replace(/,/g, "").trim());
    }

    function aplicarOrden() {
        const valor = selectOrden.value;
        const lista = Array.from(contenedor.querySelectorAll(":scope > .producto"));

        lista.sort(function (a, b) {
            if (valor === "menor") return obtenerPrecio(a) - obtenerPrecio(b);
            if (valor === "mayor") return obtenerPrecio(b) - obtenerPrecio(a);
            return Number(a.getAttribute("data-orden")) - Number(b.getAttribute("data-orden"));
        });

        lista.forEach(function (producto) {
            if (mensajeSinResultados && mensajeSinResultados.parentNode === contenedor) {
                contenedor.insertBefore(producto, mensajeSinResultados);
            } else {
                contenedor.appendChild(producto);
            }
        });
    }

    selectOrden.addEventListener("change", aplicarOrden);
});
