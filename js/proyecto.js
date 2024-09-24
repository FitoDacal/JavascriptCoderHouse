// ARRAYS

let planes = [
    {nombre: "Bronce", precioBase: 25000},
    {nombre: "Plata", precioBase: 30000},
    {nombre: "Oro", precioBase: 50000}
];

let carrito = [];

// FUNCIONES

function menu() {
    return parseInt(prompt("Selecciona una opción:\n1. Comprar Plan Bronce\n2. Comprar Plan Plata\n3. Comprar Plan Oro\n4. Ver Carrito\n0. Salir"));
}

function seleccionarMeses(plan) {
    let meses = parseInt(prompt("¿Cuántos meses deseas adquirir el plan " + plan.nombre + " (1, 2 o 3)"));
    if (meses >= 1 && meses <= 3) {
        let precioFinal = calcularPrecio(plan, meses);
        let descuento = "";

        // Verificar si aplica descuento y agregar el mensaje correspondiente
        if (meses === 2) {
            descuento = " (incluye 5% de descuento)";
        } else if (meses === 3) {
            descuento = " (incluye 15% de descuento)";
        }

        // Confirmar el plan
        let confirmacion = parseInt(prompt("Has seleccionado el Plan " + plan.nombre + " por " + meses +  " mes(es). El total a pagar es de " + precioFinal + descuento + ".\n1. Confirmar y agregar al carrito\n2. Cancelar\n3. Volver al menú"));
        while (confirmacion !== 1 && confirmacion !== 2 && confirmacion !== 3) {
            alert("Opción inválida. Por favor, elige 1, 2 o 3.");
            confirmacion = parseInt(prompt("Has seleccionado el Plan " + plan.nombre + " por " + meses +  " mes(es). El total a pagar es de " + precioFinal + descuento + ".\n1. Confirmar y agregar al carrito\n2. Cancelar\n3. Volver al menú"));
        }

        if (confirmacion === 1) {
            carrito.push({ plan: plan.nombre, meses: meses, precio: precioFinal });
            alert("El plan ha sido agregado al carrito.");
        } else if (confirmacion === 2) {
            alert("El plan no fue agregado al carrito.");
        }
        // Si la opción es 3, vuelve al menu
    } else {
        alert("Número de meses no válido. Debe ser 1, 2 o 3.");
    }
}

// Función el precio según meses y descuentos
function calcularPrecio(plan, meses) {
    if (meses === 2) {
        return plan.precioBase * 2 * 0.95; // Descuento del 5% para 2 meses
    } else if (meses === 3) {
        return plan.precioBase * 3 * 0.85; // Descuento del 15% para 3 meses
    } else {
        return plan.precioBase; // Precio base para 1 mes
    }
}

// Función para mostrar el contenido del carrito
function mostrarCarrito() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
    } else {
        let contenido = "Contenido del carrito:\n";
        carrito.forEach(el => {
            contenido += "Plan: " + el.plan + ", Meses: " + el.meses  + ", Precio: " + el.precio + "\n";
        });
        alert(contenido);
    }
}

// INICIO DEL PROGRAMA
let opcion = menu();

while (opcion !== 0) {
    switch (opcion) {
        case 1: // Plan Bronce
            seleccionarMeses(planes[opcion - 1]);
            break;

        case 2: // Plan Plata
            seleccionarMeses(planes[opcion - 1]);
            break;

        case 3: // Plan Oro
            seleccionarMeses(planes[opcion - 1]);
            break;

        case 4: // Ver Carrito
            mostrarCarrito();
            break;

        default:
            alert("Opción no válida.");
    }
    opcion = menu(); // Volver a mostrar el menú
}

alert("Gracias por tu compra.");