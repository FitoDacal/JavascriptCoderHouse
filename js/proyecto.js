// ARRAYS

const productos = [
    {nombre: "Remera", precio: 35000, total: 0, stock: 10},
    {nombre: "Buzo", precio: 60000, total: 0, stock: 5},
    {nombre: "Jean", precio: 50000, total: 0, stock: 8},
];

let carrito = 0;

// FUNCIONES

function agregarAlCarrito(producto) {
    let cantidad;
    do {
        cantidad = parseInt(prompt(`Ingresa la cantidad de ${producto.nombre} que deseas agregar al carrito (stock disponible: ${producto.stock})`), 10);
        if (isNaN(cantidad) || cantidad < 1 || cantidad > producto.stock) {
            alert(`Por favor, ingresa una cantidad válida entre 1 y ${producto.stock}.`);
        }
    } while (isNaN(cantidad) || cantidad < 1 || cantidad > producto.stock);

    carrito += producto.precio * cantidad;
    producto.total += cantidad;
    producto.stock -= cantidad;
    alert(`Se han ingresado ${cantidad} ${producto.nombre}(s) al carrito. El total hasta ahora es de: ${carrito}$`);
}

function mostrarCarrito() {
    let mensajeCarrito = "Tu carrito:\n";

    productos.forEach(producto => {
        if (producto.total > 0) {
            mensajeCarrito += `${producto.total} ${producto.nombre}(s)\n`;
        }
    });

    mensajeCarrito += carrito === 0 ? "Aún no has ingresado ningún producto a tu carrito\n" : `Valor total del carrito: ${carrito}$`;
    alert(mensajeCarrito);
}

// INICIO DEL PROGRAMA

let seleccion = menu();

while (seleccion !== 0) {
    if (seleccion >= 1 && seleccion <= 3) {
        agregarAlCarrito(productos[seleccion - 1]);
    } else if (seleccion === 4) {
        mostrarCarrito();
    } else {
        alert("Por favor ingresa una opción válida");
    }
    seleccion = menu();
}
