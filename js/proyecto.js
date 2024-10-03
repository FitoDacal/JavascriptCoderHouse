// OBJETOS

class Plan {
    constructor(nombre, precio, mes) {
        this.nombre = nombre;
        this.precio = precio;
        this.mes = mes;
    }

    calcularPrecio() {
        if (this.mes === 2) {

            return this.precio * this.mes * 0.95; // 5% de descuento

        } else if (this.mes === 3) {

            return this.precio * this.mes * 0.85; // 15% descuento

        } else {

            return this.precio * this.mes; // sin descuento
        }
    }

    mostrarPrecioConTexto() {

        const precio = this.calcularPrecio();

        if (this.mes === 2) {

            return `${precio}$ (5% OFF)`; 
        } else if (this.mes === 3) {

            return `${precio}$ (15% OFF)`;
        } else {

            return `${precio}$`; 
        }
    }
}

// FUNCIONES

const divPlanes = document.querySelectorAll(".planes");

function agregarBotones(divs) {

    for (const meses of divs) {

        meses.innerHTML += `<ul class="planes-meses">
            <li><button type="button"></button></li>
            <li><button type="button"></button></li>
            <li><button type="button"></button></li>
        </ul>`;
    }
}




function agregarMeses(planes) {

    const button = document.querySelectorAll(".planes-meses button");

    button.forEach((boton, index) => {

        const plan = planes[index];

        const precioFinal = plan.mostrarPrecioConTexto();

        plan.mes > 1 ? boton.innerText = `${plan.mes} meses: ${precioFinal}` : boton.innerText = `${plan.mes} mes: ${precioFinal}`;
    });
}

//  Creamos el carrito

const main = document.querySelector("main");

const contenedorCarrito = document.createElement("div");

contenedorCarrito.innerHTML = `<button type="button">Carrito (0)</button>`;

main.append(contenedorCarrito);

contenedorCarrito.className = "contenedor-carrito"

// Llamar el boton del carrito

const botonCarrito = contenedorCarrito.querySelector("button");

let listaCarrito = [];

let contador = 0;





function agregarCarrito(planes) {

    const buttons = document.querySelectorAll(".planes-meses button");

    buttons.forEach((boton, index) => {
        const textoOriginal = boton.innerText;

        boton.addEventListener("mouseover", () => {
            boton.innerText = "Agregar al carrito";
        });

        boton.addEventListener("mouseout", () => {
            boton.innerText = textoOriginal;
        });

        boton.addEventListener("click", () => {

            const plan = planes[index];

            const precio = plan.calcularPrecio();

            listaCarrito.push({
                nombre: plan.nombre,
                mes: plan.mes,
                precio: precio
            });
            
            contador++;
            
            botonCarrito.innerText = `Carrito (${contador})`;
            
            guardarCarritoEnLocalStorage();
            
        });
    });
}




function verCarrito() {
    // Verificar si el carrito ya existe
    let carritoContenido = document.querySelector(".carrito-contenido");
    
    if (!carritoContenido) {
        const seccionCarrito = document.createElement("section");
        seccionCarrito.className = "contenedor-carrito-contenido"
        
        carritoContenido = document.createElement("div");
        carritoContenido.className = "carrito-contenido";
        
        seccionCarrito.appendChild(carritoContenido);
        
        const main = document.querySelector("main");
        main.appendChild(seccionCarrito);
    }
    
    // Vaciar el contenido actual para evitar duplicados
    carritoContenido.innerHTML = "<h3>Carrito de Compras</h3>";

    let total = 0;
    const ul = document.createElement("ul");
    
    listaCarrito.forEach((item) => {
        const li = document.createElement("li");
        item.mes > 1 ? li.innerText = `${item.nombre} ${item.mes} meses: ${item.precio}$` : li.innerText = `${item.nombre} ${item.mes} mes: ${item.precio}$`
        ul.appendChild(li);

        total += item.precio;
    });
    
    carritoContenido.appendChild(ul);
    
    // Mostrar total
    const totalElement = document.createElement("p");
    totalElement.innerText = `Total: ${total}$`;
    carritoContenido.appendChild(totalElement);
    
    // Agregar botones para finalizar compra y vaciar carrito
    const finalizarCompraButton = document.createElement("button");
    finalizarCompraButton.innerText = "Finalizar Compra";
    finalizarCompraButton.addEventListener("click", finalizarCompra);
    carritoContenido.appendChild(finalizarCompraButton);
    
    const vaciarCarritoButton = document.createElement("button");
    vaciarCarritoButton.innerText = "Vaciar Carrito";
    vaciarCarritoButton.addEventListener("click", vaciarCarrito);
    carritoContenido.appendChild(vaciarCarritoButton);
}

// Asociar el botón del carrito con la función verCarrito
botonCarrito.addEventListener("click", verCarrito);




function finalizarCompra() {
    if (listaCarrito.length > 0) {

        const carritoContenido = document.querySelector(".carrito-contenido");
        
        // Limpiar el contenido del carrito
        carritoContenido.innerHTML = "<h3>Carrito de Compras</h3>";

        // mensaje de agradecimiento
        const mensajeCompra = document.createElement("p");
        mensajeCompra.innerText = "¡Gracias por tu compra!";
        carritoContenido.appendChild(mensajeCompra);

        // boton para cerrar el mensaje
        const botonCerrar = document.createElement("button");
        botonCerrar.innerText = "Cerrar";
        carritoContenido.appendChild(botonCerrar);

        // Evento para cerrar el mensaje
        botonCerrar.addEventListener("click", () => {
            vaciarCarrito();
        });
    } else {

        const carritoContenido = document.querySelector(".carrito-contenido");
        carritoContenido.innerHTML = "<h3>Carrito de Compras</h3>";

        const mensajeVacio = document.createElement("p");
        mensajeVacio.innerText = "Tu carrito está vacío.";

        carritoContenido.appendChild(mensajeVacio);
    }
}



function vaciarCarrito() {
    listaCarrito = [];
    contador = 0;
    botonCarrito.innerText = `Carrito (${contador})`;
    const carritoContenido = document.querySelector(".carrito-contenido");
    if (carritoContenido) {
        carritoContenido.innerHTML = "<h3>Carrito de Compras</h3>";
    }
    
    // Limpiar storage
    localStorage.removeItem('carrito');
    localStorage.removeItem('contador');
}



function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(listaCarrito));
    localStorage.setItem('contador', contador);
}



function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    const contadorGuardado = localStorage.getItem('contador');

    if (carritoGuardado) {
        listaCarrito = JSON.parse(carritoGuardado);
    }

    if (contadorGuardado) {
        contador = parseInt(contadorGuardado);
        botonCarrito.innerText = `Carrito (${contador})`;
    }
}

// INICIO DEL PROGRAMA

cargarCarritoDesdeLocalStorage();

const planes = [
    new Plan("Plan bronce I", 30000, 1),
    new Plan("Plan bronce II", 30000, 2),
    new Plan("Plan bronce III", 30000, 3),
    new Plan("Plan plata I", 45000, 1),
    new Plan("Plan plata II", 45000, 2),
    new Plan("Plan plata III", 45000, 3),
    new Plan("Plan oro I", 50000, 1),
    new Plan("Plan oro II", 50000, 2),
    new Plan("Plan oro III", 50000, 3),
]

agregarBotones(divPlanes);

agregarMeses(planes);

agregarCarrito(planes);




// // ARRAYS

// let planes = [
//     { nombre: "Bronce", precioBase: 25000 },
//     { nombre: "Plata", precioBase: 30000 },
//     { nombre: "Oro", precioBase: 50000 }
// ];

// let carrito = [];

// // FUNCIONES

// let div = document.getElementsByClassName("planes-meses")

// function menu() {
//     return parseInt(prompt("Selecciona una opción:\n1. Comprar Plan Bronce\n2. Comprar Plan Plata\n3. Comprar Plan Oro\n4. Ver Carrito\n5. Ver plan más caro\n6. Ver plan más barato\n0. Salir"));
// }

// function seleccionarMeses(plan) {
//     let meses = parseInt(prompt("¿Cuántos meses deseas adquirir el plan " + plan.nombre + " (1, 2 o 3)"));
//     if (meses >= 1 && meses <= 3) {
//         let precioFinal = calcularPrecio(plan, meses);
//         let descuento = "";

//         // Verificar si aplica descuento y agregar el mensaje correspondiente
//         if (meses === 2) {
//             descuento = " (incluye 5% de descuento)";
//         } else if (meses === 3) {
//             descuento = " (incluye 15% de descuento)";
//         }

//         // Confirmar el plan
//         let confirmacion = parseInt(prompt("Has seleccionado el Plan " + plan.nombre + " por " + meses + " mes(es). El total a pagar es de " + precioFinal + descuento + ".\n1. Confirmar y agregar al carrito\n2. Cancelar\n3. Volver al menú"));
//         while (confirmacion !== 1 && confirmacion !== 2 && confirmacion !== 3) {
//             alert("Opción inválida. Por favor, elige 1, 2 o 3.");
//             confirmacion = parseInt(prompt("Has seleccionado el Plan " + plan.nombre + " por " + meses + " mes(es). El total a pagar es de " + precioFinal + descuento + ".\n1. Confirmar y agregar al carrito\n2. Cancelar\n3. Volver al menú"));
//         }

//         if (confirmacion === 1) {
//             carrito.push({ plan: plan.nombre, meses: meses, precio: precioFinal });
//             alert("El plan ha sido agregado al carrito.");
//         } else if (confirmacion === 2) {
//             alert("El plan no fue agregado al carrito.");
//         }
//         // Si la opción es 3, vuelve al menu
//     } else {
//         alert("Número de meses no válido. Debe ser 1, 2 o 3.");
//     }
// }

// // Función el precio según meses y descuentos
// function calcularPrecio(plan, meses) {
//     if (meses === 2) {
//         return plan.precioBase * 2 * 0.95; // Descuento del 5% para 2 meses
//     } else if (meses === 3) {
//         return plan.precioBase * 3 * 0.85; // Descuento del 15% para 3 meses
//     } else {
//         return plan.precioBase; // Precio base para 1 mes
//     }
// }

// // Función para mostrar el contenido del carrito
// function mostrarCarrito() {
//     if (carrito.length === 0) {
//         alert("El carrito está vacío.");
//     } else {
//         let contenido = "Contenido del carrito:\n";
//         carrito.forEach(el => {
//             contenido += "Plan: " + el.plan + ", Meses: " + el.meses + ", Precio: " + el.precio + "\n";
//         });
//         alert(contenido);
//     }
// }

// // Función para mostrar el plan más barato
// function mostrarPlanMasBarato() {
//     let planMasBarato = planes.find(plan => plan.precioBase === Math.min(...planes.map(p => p.precioBase)));
//     alert("El plan más barato es: " + planMasBarato.nombre + " con un precio de: " + planMasBarato.precioBase + "$");
// }

// // Función para mostrar el plan más caro
// function mostrarPlanMasCaro() {
//     let planMasCaro = planes.find(plan => plan.precioBase === Math.max(...planes.map(p => p.precioBase)));
//     alert("El plan más caro es: " + planMasCaro.nombre + " con un precio de: " + planMasCaro.precioBase + "$");
// }

// // INICIO DEL PROGRAMA
// let opcion = menu();

// while (opcion !== 0) {
//     switch (opcion) {
//         case 1: // Plan Bronce
//             seleccionarMeses(planes[opcion - 1]);
//             break;

//         case 2: // Plan Plata
//             seleccionarMeses(planes[opcion - 1]);
//             break;

//         case 3: // Plan Oro
//             seleccionarMeses(planes[opcion - 1]);
//             break;

//         case 4: // Ver Carrito
//             mostrarCarrito();
//             break;

//         case 5: // Mostrar plan mas caro
//             mostrarPlanMasCaro();
//             break;

//         case 6: // Mostrar plan mas barato
//             mostrarPlanMasBarato();
//             break;

//         default:
//             alert("Opción no válida.");
//     }
//     opcion = menu(); // Volver a mostrar el menú
// }

// alert("Gracias por tu compra.");