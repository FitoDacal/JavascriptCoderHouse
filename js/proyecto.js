/*

    OBJETOS

*/

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

/*

    FUNCIONES DE INTEFAZ

*/

function agregarBotones() {

    const divPlanes = document.querySelectorAll(".planes");

    divPlanes.forEach(meses => {

        meses.innerHTML += `
            <ul class="planes-meses">
                <li><button type="button"></button></li>
                <li><button type="button"></button></li>
                <li><button type="button"></button></li>
            </ul>`;
    });
}

function agregarMeses(planes) {

    const button = document.querySelectorAll(".planes-meses button");

    button.forEach((boton, index) => {

        const plan = planes[index];

        const precioFinal = plan.mostrarPrecioConTexto();

        plan.mes > 1 ? boton.innerText = `${plan.mes} meses: ${precioFinal}` : boton.innerText = `${plan.mes} mes: ${precioFinal}`;
    });
}

/*

    FUNCIONES DE CARRITO

*/

function verificarStock(plan) {

    return new Promise((resolve, reject) => {

        // Simulador

        setTimeout(() => {

            const stockDisponible = Math.random() > 0.2; // Simulador con un 80% de posibnilidades

            stockDisponible ? resolve(`Stock disponible para ${plan.nombre}`) : reject(`No hay stock disponible para ${plan.nombre}`);

        }, 1000);
    });
}

function agregarCarrito(planes) {

    const buttons = document.querySelectorAll(".planes-meses button");

    buttons.forEach((boton, index) => {

        const textoOriginal = boton.innerText;

        const plan = planes[index];

        boton.addEventListener("mouseover", () => boton.innerText = "Agregar al carrito");

        boton.addEventListener("mouseout", () => boton.innerText = textoOriginal);

        boton.addEventListener("click", () => {

            verificarStock(plan)

                .then(() => {
                    const precio = plan.calcularPrecio();

                    listaCarrito.push({ nombre: plan.nombre, mes: plan.mes, precio });

                    contador++;

                    botonCarrito.innerText = `Carrito (${contador})`;

                    guardarCarritoEnLocalStorage();

                    mostrarToast(`Se agregó ${plan.nombre} al carrito`, "#274690");
                })

                .catch((error) => mostrarToast(error, "#e74c3c"));
        });
    });
}

function mostrarToast(mensaje, color) {

    Toastify({
        text: mensaje,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        style: { background: color }
    }).showToast();
}

function verCarrito() {

    let carritoContenido = document.querySelector(".carrito-contenido");
    
    if (!carritoContenido) {

        const seccionCarrito = document.createElement("section");

        seccionCarrito.className = "contenedor-carrito-contenido";

        carritoContenido = document.createElement("div");

        carritoContenido.className = "carrito-contenido";

        seccionCarrito.appendChild(carritoContenido);

        document.querySelector("main").appendChild(seccionCarrito);
    }

    carritoContenido.innerHTML = "<h3>Carrito de Compras</h3>";

    let total = 0;

    const ul = document.createElement("ul");

    listaCarrito.forEach((item) => {

        const li = document.createElement("li");

        li.innerText = item.mes > 1 ? `${item.nombre} ${item.mes} meses: ${item.precio}$` : `${item.nombre} ${item.mes} mes: ${item.precio}$`;

        ul.appendChild(li);

        total += item.precio;
    });

    carritoContenido.appendChild(ul);

    const totalElement = document.createElement("p");

    totalElement.innerText = `Total: ${total}$`;

    carritoContenido.appendChild(totalElement);

    // Botones para finalizar y vaciar carrito
    crearBotonCarrito("Finalizar Compra", finalizarCompra, carritoContenido);

    crearBotonCarrito("Vaciar Carrito", vaciarCarrito, carritoContenido);
}

function crearBotonCarrito(texto, funcion, contenedor) {

    const button = document.createElement("button");

    button.innerText = texto;

    button.addEventListener("click", funcion);

    contenedor.appendChild(button);
}


/*

    FUNCIONES DE COMPRA

*/

function procesarCompra() {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            const exito = Math.random() > 0.1; // Simulamos un 90% de posibildades de compra

            exito ? resolve("Compra realizada con éxito") : reject("Hubo un problema al procesar la compra");

        }, 2000);
    });
}

function finalizarCompra() {

    if (listaCarrito.length > 0) {

        procesarCompra()

            .then((mensaje) => {

                Swal.fire({
                    title: 'Gracias por tu compra!',
                    text: mensaje,
                    icon: 'success',
                    confirmButtonText: 'Cerrar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        vaciarCarrito();
                    }
                })
            })

            .catch((error) => {

                Swal.fire({
                    title: 'Error en la compra',
                    text: error,
                    icon: 'error',
                    confirmButtonText: 'Cerrar'
                });
            });

    } else {

        Swal.fire({
            title: 'No hay productos en el carrito.',
            text: 'Debes agregar productos al carrito para proceder con la compra.',
            icon: 'warning',
            confirmButtonText: 'Cerrar'
        });
    }
}

function vaciarCarrito() {

    listaCarrito = [];

    contador = 0;

    botonCarrito.innerText = `Carrito (${contador})`;

    const carritoContenido = document.querySelector(".carrito-contenido");

    if (carritoContenido) {

        carritoContenido.innerHTML = "<h3>Carrito de Compras</h3>";

        Swal.fire({
            title: 'Carrito vacío',
            text: 'Se han eliminado los productos del carrito exitosamente.',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        });
    }

    localStorage.removeItem('carrito');

    localStorage.removeItem('contador');
}

/*

    FUNCIONES PARA LOCAL STORAGE

*/

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

/*

    FUNCION PARA OBTENER PLANES

*/

function obtenerPlanes() {

    return fetch('/productos.json')

        .then(response => 
            response.json())

        .then(data => {

            return data.map(plan => new Plan(plan.nombre, plan.precio, plan.mes));
        })

        .catch(error => {

            console.error('Error al cargar los planes:', error);

            return [];
        });
}

/*

    INICIO DEL PROGRAMA

*/

let listaCarrito = [];

let contador = 0;

//  Creamos el carrito

const main = document.querySelector("main");

const contenedorCarrito = document.createElement("div");

contenedorCarrito.innerHTML = `<button type="button">Carrito (0)</button>`;

main.append(contenedorCarrito);

contenedorCarrito.className = "contenedor-carrito"

// Llamar el boton del carrito

const botonCarrito = contenedorCarrito.querySelector("button");

botonCarrito.addEventListener("click", verCarrito);

obtenerPlanes()

    .then (planes => {

    cargarCarritoDesdeLocalStorage();

    agregarBotones();

    agregarMeses(planes);

    agregarCarrito(planes);
});