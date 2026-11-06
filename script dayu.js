
let carrito = [];

function agregarCarrito(nombre, precio) {

    let producto = carrito.find(item => item.nombre === nombre);

    if (producto) {
        producto.cantidad++;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }

    mostrarCarrito();

    alert(nombre + " agregado al carrito.");
}

function mostrarCarrito() {

    let lista = document.getElementById("lista-carrito");
    let totalElemento = document.getElementById("total");

    lista.innerHTML = "";

    let total = 0;

    if (carrito.length === 0) {
        lista.innerHTML = "<p>Tu carrito está vacío.</p>";
    }

    carrito.forEach((producto, indice) => {

        let subtotal = producto.precio * producto.cantidad;

        total += subtotal;

        lista.innerHTML += `
            <div class="item-carrito">

                <div>
                    <strong>${producto.nombre}</strong>
                    <p>Precio: RD$${producto.precio}</p>
                    <p>Cantidad: ${producto.cantidad}</p>
                    <p>Subtotal: RD$${subtotal.toLocaleString("es-DO")}</p>
                </div>

                <div>
                    <button onclick="cambiarCantidad(${indice}, -1)">−</button>
                    <button onclick="cambiarCantidad(${indice}, 1)">+</button>
                    <button onclick="eliminarProducto(${indice})">Eliminar</button>
                </div>

            </div>
        `;
    });

    totalElemento.textContent = "RD$" + total.toLocaleString("es-DO");
}

function cambiarCantidad(indice, cambio) {

    carrito[indice].cantidad += cambio;

    if (carrito[indice].cantidad <= 0) {
        carrito.splice(indice, 1);
    }

    mostrarCarrito();
}

function eliminarProducto(indice) {

    carrito.splice(indice, 1);

    mostrarCarrito();
}

function vaciarCarrito() {

    carrito = [];

    mostrarCarrito();
}

function comprarWhatsApp() {

    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega un helado primero.");
        return;
    }

    // CAMBIA ESTE NUMERO POR TU WHATSAPP
    // Escribe el código de país y tu número, sin + ni espacios.
    let telefono = "18492817234";

    let mensaje = "¡Hola! Quiero realizar un pedido de Helados Los Sabrosos:\n\n";

    let total = 0;

    carrito.forEach(producto => {

        let subtotal = producto.precio * producto.cantidad;

        total += subtotal;

        mensaje += producto.nombre +
            " x " + producto.cantidad +
            " = RD$" + subtotal.toLocaleString("es-DO") + "\n";
    });

    mensaje += "\nTOTAL: RD$" + total.toLocaleString("es-DO");

    mensaje += "\n\n¡Gracias!";

    let url = "https://wa.me/" + telefono + "?text=" + encodeURIComponent(mensaje);

    window.open(url, "_blank");
}

mostrarCarrito();
