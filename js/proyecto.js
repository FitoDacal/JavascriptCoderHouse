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


function agregarBotones() {

    const divPlanes = document.querySelectorAll(".planes");

    for (const meses of divPlanes) {

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
    
    // Agregar boton para finalizar compra

    const finalizarCompraButton = document.createElement("button");

    finalizarCompraButton.innerText = "Finalizar Compra";

    finalizarCompraButton.addEventListener("click", finalizarCompra);

    carritoContenido.appendChild(finalizarCompraButton);

    // Agregar boton para vaciar carrito
    
    const vaciarCarritoButton = document.createElement("button");

    vaciarCarritoButton.innerText = "Vaciar Carrito";

    vaciarCarritoButton.addEventListener("click", vaciarCarrito);

    carritoContenido.appendChild(vaciarCarritoButton);
}

// Asociar el botón del carrito con la función verCarrito
botonCarrito.addEventListener("click", verCarrito);




function finalizarCompra() {

    if (listaCarrito.length > 0) {

        Swal.fire ({
            title: 'Gracias por tu compra!',
            text: 'Tu compra se realizó exitosamente.',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        }); 

        vaciarCarrito();

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

// ARRAYS

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

// INICIO DEL PROGRAMA

cargarCarritoDesdeLocalStorage();

agregarBotones();

agregarMeses(planes);

agregarCarrito(planes);