// 1. Arreglo en memoria
let carrito = [];

// 2. Agregar producto o incrementar cantidad
function agregarAlCarrito(nombre, precio) {
    // Busca si el producto ya existe en el arreglo
    const productoExistente = carrito.find(item => item.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad += 1; // Si existe, suma 1
    } else {
        carrito.push({ nombre, precio: Number(precio), cantidad: 1 }); // Si no, lo crea con cantidad 1
    }

    renderizarCarrito();
    mostrarNotificacion(`Agregado: ${nombre}`);
}

// 3. Notificación flotante visual
let temporizadorToast;
function mostrarNotificacion(mensaje) {
    const toast = document.getElementById("notificacion");
    if (!toast) return;

    toast.textContent = mensaje;
    toast.classList.add("activa");

    clearTimeout(temporizadorToast);
    temporizadorToast = setTimeout(() => {
        toast.classList.remove("activa");
    }, 2500);
}

// 4. Eliminar producto por índice
function eliminarDelCarrito(posicion) {
    carrito.splice(posicion, 1);
    renderizarCarrito();
}

// 5. Vaciar carrito
function vaciarCarrito() {
    carrito = [];
    renderizarCarrito();
}

// 6. Abrir y cerrar modal
function mostrarCarrito() {
    document.getElementById("modal-carrito").style.display = "flex";
}

function cerrarCarrito() {
    document.getElementById("modal-carrito").style.display = "none";
}

// 7. Renderizar datos en el DOM
function renderizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    const totalSpan = document.getElementById("total-carrito");
    const contador = document.querySelector(".contador-carrito");

    // Suma la cantidad total de artículos (ej: 2 laptops + 1 mouse = 3)
    const totalArticulos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    if (contador) contador.textContent = totalArticulos;

    if (!lista || !totalSpan) return;

    lista.innerHTML = "";
    let totalPrecio = 0;

    if (carrito.length === 0) {
        lista.innerHTML = "<li style='color:#888; justify-content:center;'>Carrito vacío</li>";
    } else {
        carrito.forEach((prod, index) => {
            const subtotal = prod.precio * prod.cantidad;
            totalPrecio += subtotal;

            lista.innerHTML += `
                <li>
                    <span><strong>${prod.cantidad}x</strong> ${prod.nombre} (S/ ${subtotal.toFixed(2)})</span>
                    <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </li>
            `;
        });
    }

    totalSpan.textContent = totalPrecio.toFixed(2);
}

// 8. Finalizar compra
function finalizarCompra() {
    if (carrito.length === 0) return alert("Agrega productos primero.");
    alert("¡Compra procesada con éxito!");
    vaciarCarrito();
    cerrarCarrito();
}

// 9. Delegación global de clics para todas las páginas
document.addEventListener("click", function (e) {
    const btn = e.target.closest(".producto-pie button");
    if (!btn) return;

    const tarjeta = btn.closest(".producto");
    const nombre = tarjeta.querySelector("h3").textContent.trim();
    const textoPrecio = tarjeta.querySelector(".producto-pie strong").textContent;
    const precio = parseFloat(textoPrecio.replace("S/", "").replace(/,/g, "").trim());

    agregarAlCarrito(nombre, precio);
});

//___________________________________________
/* ========================================================
   FILTRO Y BÚSQUEDA UNIVERSAL DE PRODUCTOS
   ======================================================== */
document.addEventListener("DOMContentLoaded", function () {
    const inputBusqueda = document.getElementById("buscarProducto");
    const botonesFiltro = document.querySelectorAll(".filtro-btn");
    // Selecciona los productos sin importar si el contenedor se llama grid-computadoras, grid-gaming, etc.
    const productos = document.querySelectorAll(".producto");
    const mensajeSinResultados = document.getElementById("mensajeSinResultados");

    // Si la página actual no tiene barra de búsqueda ni botones de filtro, no hace nada y no genera error
    if (!inputBusqueda && botonesFiltro.length === 0) return;

    let filtroActivo = "todos";

    function aplicarFiltros() {
        const texto = inputBusqueda ? inputBusqueda.value.trim().toLowerCase() : "";
        let visibles = 0;

        productos.forEach(function (producto) {
            const tipo = producto.getAttribute("data-tipo") || "";
            const titulo = producto.querySelector("h3");
            const nombre = titulo ? titulo.textContent.toLowerCase() : "";

            const coincideCategoria = (filtroActivo === "todos" || tipo === filtroActivo);
            const coincideTexto = nombre.includes(texto);

            if (coincideCategoria && coincideTexto) {
                producto.style.display = "";
                visibles++;
            } else {
                producto.style.display = "none";
            }
        });

        if (mensajeSinResultados) {
            mensajeSinResultados.style.display = (visibles === 0) ? "block" : "none";
        }
    }

    // Eventos para los botones de categoría
    botonesFiltro.forEach(function (boton) {
        boton.addEventListener("click", function () {
            botonesFiltro.forEach(b => b.classList.remove("activo"));
            boton.classList.add("activo");
            filtroActivo = boton.getAttribute("data-filtro");
            aplicarFiltros();
        });
    });

    // Evento para el campo de texto
    if (inputBusqueda) {
        inputBusqueda.addEventListener("input", aplicarFiltros);
    }
});