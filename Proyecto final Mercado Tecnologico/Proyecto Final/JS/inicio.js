/* ============TECNOSTORE - JAVASCRIPT================== */

// Carrito
let carrito = [];

/* =========AGREGAR PRODUCTO AL CARRITO=========== */

function agregarAlCarrito(nombre, precio) {

    const producto = {
        nombre: nombre,
        precio: precio
    };

    carrito.push(producto);

    actualizarCarrito();

    alert(
        nombre + " fue agregado al carrito."
    );
}


/* =========ACTUALIZAR CANTIDAD DEL CARRITO=================== */

function actualizarCarrito() {

    const contador = document.querySelector(
        ".contador-carrito"
    );

    if (contador) {
        contador.textContent = carrito.length;
    }
}

/* =====MOSTRAR PRODUCTOS DEL CARRITO============ */

function mostrarCarrito() {

    if (carrito.length === 0) {
        alert(
            "Tu carrito está vacío."
        );
        return;
    }

    let mensaje = "Productos en tu carrito:\n\n";
    carrito.forEach(function (producto, indice) {

        mensaje +=
            (indice + 1) +
            ". " +
            producto.nombre +
            " - S/ " +
            producto.precio.toFixed(2) +
            "\n";

    });

    mensaje +=
        "\nTotal de productos: " +
        carrito.length;
    alert(mensaje);
}

/* =============BOTONES AGREGAR================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const botones =
            document.querySelectorAll(
                ".producto-pie button"
            );

        botones.forEach(function (boton) {

            boton.addEventListener(
                "click",
                function () {

                    const producto =
                        boton.closest(".producto");

                    const nombre =
                        producto.querySelector(
                            "h3"
                        ).textContent;

                    const precioTexto =
                        producto.querySelector(
                            ".producto-pie strong"
                        ).textContent;

                    const precio =
                        parseFloat(
                            precioTexto
                                .replace("S/", "")
                                .replace(",", "")
                        );

                    agregarAlCarrito(
                        nombre,
                        precio
                    );

                }
            );

        });

    }
);