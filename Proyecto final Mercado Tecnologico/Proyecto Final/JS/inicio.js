// 1. Arreglo del carrito: se carga desde localStorage para no perderlo al cambiar de página
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Guarda el carrito en localStorage (se llama cada vez que el carrito cambia)
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

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
    animarContador();
    mostrarNotificacion(`Agregado: ${nombre}`);
}

// Reinicia la animación de "rebote" del contador del carrito
function animarContador() {
    const contador = document.querySelector(".contador-carrito");
    if (!contador) return;

    contador.classList.remove("rebote");
    void contador.offsetWidth; // fuerza al navegador a reiniciar la animación
    contador.classList.add("rebote");
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

// 4.1 Modificar cantidad: cambio vale +1 (botón +) o -1 (botón -)
function cambiarCantidad(posicion, cambio) {
    carrito[posicion].cantidad += cambio;

    // Si la cantidad llega a 0, se quita el producto del carrito
    if (carrito[posicion].cantidad <= 0) {
        carrito.splice(posicion, 1);
    }

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
    guardarCarrito(); // Cada vez que se redibuja el carrito, también se guarda

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
                    <span>${prod.nombre} (S/ ${subtotal.toFixed(2)})</span>
                    <div class="controles-cantidad">
                        <button class="btn-cantidad" onclick="cambiarCantidad(${index}, -1)">-</button>
                        <strong>${prod.cantidad}</strong>
                        <button class="btn-cantidad" onclick="cambiarCantidad(${index}, 1)">+</button>
                        <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </li>
            `;
        });
    }

    totalSpan.textContent = totalPrecio.toFixed(2);
}

// 8. Finalizar compra: cierra el carrito y abre el modal de pago con el total
function finalizarCompra() {
    if (carrito.length === 0) return alert("Agrega productos primero.");

    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    document.getElementById("total-pago").textContent = total.toFixed(2);

    cerrarCarrito();
    document.getElementById("modal-pago").style.display = "flex";
}

// 8.1 Validar los campos del pago; devuelve el mensaje de error o "" si todo está bien
function validarPago(nombre, tarjeta, vencimiento, cvv) {
    if (nombre === "") return "Ingresa el nombre del titular.";
    if (!/^\d{16}$/.test(tarjeta)) return "La tarjeta debe tener 16 números.";
    if (!/^\d{2}\/\d{2}$/.test(vencimiento)) return "El vencimiento debe tener el formato MM/AA.";
    if (!/^\d{3}$/.test(cvv)) return "El CVV debe tener 3 números.";
    return "";
}

// 8.2 Procesar el pago (se ejecuta al enviar el formulario)
function procesarPago(e) {
    e.preventDefault(); // Evita que la página se recargue

    const nombre = document.getElementById("pago-nombre").value.trim();
    const tarjeta = document.getElementById("pago-tarjeta").value.trim();
    const vencimiento = document.getElementById("pago-vencimiento").value.trim();
    const cvv = document.getElementById("pago-cvv").value.trim();

    const error = validarPago(nombre, tarjeta, vencimiento, cvv);
    document.getElementById("mensaje-error").textContent = error;
    if (error !== "") return; // Si hay error, se muestra y no se continúa

    // Pago "aprobado": se oculta el formulario, se muestra el éxito y se vacía el carrito
    document.getElementById("form-pago").style.display = "none";
    document.getElementById("mensaje-exito").style.display = "block";
    vaciarCarrito();
}

// 8.3 Cerrar el modal de pago y dejarlo listo para la próxima vez
function cerrarPago() {
    document.getElementById("modal-pago").style.display = "none";
    document.getElementById("form-pago").reset();
    document.getElementById("form-pago").style.display = ""; // "" = vuelve al estilo del CSS (flex)
    document.getElementById("mensaje-exito").style.display = "none";
    document.getElementById("mensaje-error").textContent = "";
}

// 8.4 Cancelar el pago: se cierra el modal pero el carrito NO se borra
function cancelarPago() {
    cerrarPago();
    mostrarNotificacion("Pago cancelado. Tus productos siguen en el carrito.");
}

// Al cargar cualquier página, se muestra el carrito guardado (contador del header incluido)
document.addEventListener("DOMContentLoaded", renderizarCarrito);

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

/* ========================================================
   MENÚ HAMBURGUESA (solo se ve en celular)
   ======================================================== */
document.addEventListener("DOMContentLoaded", function () {
    const btnMenu = document.getElementById("btnMenu");
    const navbar = document.querySelector(".navbar");

    if (!btnMenu || !navbar) return;

    function alternarMenu() {
        const abierto = navbar.classList.toggle("abierto");
        btnMenu.setAttribute("aria-expanded", abierto ? "true" : "false");

        // Cambia el ícono de tres rayitas (☰) a una X y viceversa
        const icono = btnMenu.querySelector("i");
        if (icono) {
            icono.classList.toggle("fa-bars", !abierto);
            icono.classList.toggle("fa-xmark", abierto);
        }
    }

    function cerrarMenu() {
        navbar.classList.remove("abierto");
        btnMenu.setAttribute("aria-expanded", "false");

        const icono = btnMenu.querySelector("i");
        if (icono) {
            icono.classList.add("fa-bars");
            icono.classList.remove("fa-xmark");
        }
    }

    btnMenu.addEventListener("click", function (e) {
        e.stopPropagation();
        alternarMenu();
    });

    // Cierra el menú al hacer clic en cualquier link de adentro
    // (incluido el carrito), para no dejarlo abierto tapando la página
    navbar.querySelectorAll("a").forEach(function (enlace) {
        enlace.addEventListener("click", cerrarMenu);
    });

    // Cierra el menú al tocar fuera de él
    document.addEventListener("click", function (e) {
        if (navbar.classList.contains("abierto") && !navbar.contains(e.target)) {
            cerrarMenu();
        }
    });

    // Si la pantalla vuelve a agrandarse (ej. giras el celular u
    // pasas de responsive a escritorio), reseteamos el estado
    window.addEventListener("resize", function () {
        if (window.innerWidth > 600) {
            cerrarMenu();
        }
    });
});



/* ========================================================
   VISTA AMPLIADA DE PRODUCTOS
   ======================================================== */

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal-producto");
    const imagenModal = document.getElementById("modal-imagen");
    const nombreModal = document.getElementById("modal-producto-nombre");
    const categoriaModal = document.getElementById("modal-categoria");
    const valoracionModal = document.getElementById("modal-valoracion");
    const precioModal = document.getElementById("modal-precio");
    const descuentoModal = document.getElementById("modal-descuento");
    const precioAnteriorModal = document.getElementById("modal-precio-anterior");
    const botonModal = document.getElementById("modal-boton-compra");
    const botonCerrar = document.getElementById("modal-producto-cerrar");

    if (!modal || !imagenModal || !botonCerrar) return;

    let elementoAnterior = null;

    function abrirModal(tarjeta) {
        const imagen = tarjeta.querySelector(".producto-imagen img");
        const nombre = tarjeta.querySelector(".producto-info h3");
        const categoria = tarjeta.querySelector(".producto-categoria");
        const valoracion = tarjeta.querySelector(".valoracion");
        const precioNormal = tarjeta.querySelector(".precio");
        const preciosOferta = tarjeta.querySelector(".precio-oferta");
        const descuento = tarjeta.querySelector(".oferta-etiqueta");
        const enlace = tarjeta.querySelector(".btn-producto");

        if (!imagen || !nombre) return;

        elementoAnterior = document.activeElement;

        imagenModal.src = imagen.src;
        imagenModal.alt = imagen.alt || nombre.textContent.trim();
        nombreModal.textContent = nombre.textContent.trim();
        categoriaModal.textContent = categoria ? categoria.textContent.trim() : "";
        valoracionModal.textContent = valoracion ? valoracion.textContent.trim() : "";

        if (preciosOferta) {
            const precioAnterior = preciosOferta.querySelector("span");
            const precioActual = preciosOferta.querySelector("strong");

            precioModal.textContent = precioActual ? precioActual.textContent.trim() : "";

            precioAnteriorModal.textContent = precioAnterior ? precioAnterior.textContent.trim() : "";
            precioAnteriorModal.style.display = precioAnterior ? "inline" : "none";

            descuentoModal.textContent = descuento ? descuento.textContent.trim() : "";
            descuentoModal.style.display = descuento ? "inline-block" : "none";
        } else {
            precioModal.textContent = precioNormal ? precioNormal.textContent.trim() : "";
            precioAnteriorModal.textContent = "";
            precioAnteriorModal.style.display = "none";
            descuentoModal.textContent = "";
            descuentoModal.style.display = "none";
        }

        botonModal.href = enlace ? enlace.href : "#";
        botonModal.textContent = enlace ? enlace.textContent.trim() : "Ver producto";

        modal.classList.add("activo");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        botonCerrar.focus();
    }

    function cerrarModal() {
        modal.classList.remove("activo");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";

        if (elementoAnterior) {
            elementoAnterior.focus();
        }
    }

    document.querySelectorAll(".producto .producto-imagen img").forEach(function (imagen) {
        imagen.style.cursor = "zoom-in";

        imagen.addEventListener("click", function () {
            const tarjeta = imagen.closest(".producto");
            if (tarjeta) abrirModal(tarjeta);
        });
    });

    botonCerrar.addEventListener("click", cerrarModal);

    modal.addEventListener("click", function (evento) {
        if (evento.target === modal) cerrarModal();
    });

    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape" && modal.classList.contains("activo")) {
            cerrarModal();
        }
    });
});
