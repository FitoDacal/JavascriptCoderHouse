// FUNCIONES

function menu() {
    return parseInt(prompt("Selecciona el número correspondiente al producto que desea adquirir.\n1)- Remera oversize.\n2)- Buzo oversize.\n3)- Jean oversize.\n4)- Carrito.\n0)- Salir."));
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

while (productos != 0 ) {
    switch (productos) {
        case 1:
            const seccionRemeras = parseInt(prompt("Remera oversize: 35.000$\nSelecciona el número correspondiente a la acción que desea realizar.\n1)- Añadir al carrito.\n2)- Volver al menú principal."));

            if (seccionRemeras === 1) {

                const cantidadRemeras = parseInt(prompt("Ingresa la cantidad de remeras que deseas agregar al carrito"));

                carrito += precioRemera * cantidadRemeras;

                totalRemeras += cantidadRemeras;

                alert("Se han ingresado " + cantidadRemeras + " al carrito. El total hasta ahora es de: " + carrito + "$")

            } else if (seccionRemeras === 2) {

                productos = menu();
            }
            break;

        case 2:
            const seccionBuzos = parseInt(prompt("Buzo oversize: 60.000$\nSelecciona el número correspondiente a la acción que desea realizar.\n1)- Añadir al carrito.\n2)- Volver al menú principal."));

            if (seccionBuzos === 1) {

                const cantidadBuzos = parseInt(prompt("Ingresa la cantidad de buzos que deseas agregar al carrito"));

                carrito += precioBuzo * cantidadBuzos;

                totalBuzos += cantidadBuzos;

                alert("Se han ingresado " + cantidadBuzos + " al carrito. El total hasta ahora es de: " + carrito + "$")

            } else if (seccionBuzos === 2) {

                productos = menu();
            }
            break;

        case 3:
            const seccionJeans = parseInt(prompt("Jean oversize: 50.000$\nSelecciona el número correspondiente a la acción que desea realizar.\n1)- Añadir al carrito.\n2)- Volver al menú principal."));

            if (seccionJeans === 1) {

                const cantidadJeans = parseInt(prompt("Ingresa la cantidad de jeans que deseas agregar al carrito"));

                carrito += precioJean * cantidadJeans;

                totalJeans += cantidadJeans;

                alert("Se han ingresado " + cantidadJeans + " al carrito. El total hasta ahora es de: " + carrito + "$")

            } else if (seccionJeans === 2) {

                productos = menu();
            }
            break;

        case 4:
            let mensajeCarrito = ("Tu carrito:\n");

            if (totalRemeras === 0 && totalBuzos === 0 && totalJeans === 0) {
                mensajeCarrito += "Aún no has ingresado ningún producto a tu carrito\n"
            }

            if (totalRemeras > 0) {
                mensajeCarrito += totalRemeras + " Remera(s)\n";
            }

            if (totalBuzos > 0) {
                mensajeCarrito += totalBuzos + " Buzo(s)\n";
            }

            if (totalJeans > 0) {
                mensajeCarrito += totalJeans + " Jean(s)\n"
            }

            mensajeCarrito += "Valor total del carrito: " + carrito + "$";

            alert(mensajeCarrito);

            productos = menu();
            break;

        default:
            alert("Por favor ingresa una opción válida");
            productos = menu();
    }
}


