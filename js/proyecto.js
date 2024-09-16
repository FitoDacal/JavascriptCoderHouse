// FUNCIONES

function menu() {
    return parseInt(prompt("Selecciona el número correspondiente al producto que desea adquirir.\n1)- Remera oversize.\n2)- Buzo oversize.\n3)- Jean oversize.\n4)- Carrito.\n0)- Salir."));
}

function agregarProductos(nombre, precio, total) {
    const opcion = parseInt(prompt(nombre + " oversize: " + precio + "$\nSelecciona el número correspondiente a la acción que desea realizar.\n1)- Añadir al carrito.\n2)- Volver al menú principal."));
    
    if (opcion === 1) {
        const cantidad = parseInt(prompt("Ingresa la cantidad de " + nombre + " que deseas agregar al carrito"));
        carrito += precio * cantidad;
        total += cantidad;
        alert("Se han ingresado " + cantidad + " " + nombre + "(s) al carrito. El total hasta ahora es de: " + carrito + "$");
    }
    
    return total;
}

function mostrarCarrito() {
    let mensajeCarrito = "Tu carrito:\n";

    if (totalRemeras === 0 && totalBuzos === 0 && totalJeans === 0) {
        mensajeCarrito += "Aún no has ingresado ningún producto a tu carrito\n";
    } else {
        if (totalRemeras > 0) mensajeCarrito += totalRemeras + " Remera(s)\n";
        if (totalBuzos > 0) mensajeCarrito += totalBuzos + " Buzo(s)\n";
        if (totalJeans > 0) mensajeCarrito += totalJeans + " Jean(s)\n";
    }

    mensajeCarrito += "Valor total del carrito: " + carrito + "$";
    alert(mensajeCarrito);
}

// INICIO DEL PROGRAMA

let productos = menu();

let precioRemera = 35000;
let totalRemeras = 0;

let precioBuzo = 60000;
let totalBuzos = 0;

let precioJean = 50000;
let totalJeans = 0;

let carrito = 0;

while (productos != 0) {
    switch (productos) {
        case 1:
            totalRemeras = agregarProductos("Remera(s)", precioRemera, totalRemeras);
            break;
        case 2:
            totalBuzos = agregarProductos("Buzo(s)", precioBuzo, totalBuzos);
            break;
        case 3:
            totalJeans = agregarProductos("Jean(s)", precioJean, totalJeans);
            break;
        case 4:
            mostrarCarrito();
            break;
        default:
            alert("Por favor ingresa una opción válida");
    }
    productos = menu();
}

