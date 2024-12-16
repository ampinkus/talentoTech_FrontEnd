// Recuperar el arreglo de productos desde localStorage o inicializar con valores por defecto
let productos = JSON.parse(localStorage.getItem("productos")) || [
  {
    id: "LTO-9",
    nombre: "LTO-9",
    precio: 100,
    stock: 10,
    imagen: "/images/LTO 9.jpg",
    stockInicial: 10,
  },
  {
    id: "LTO-8",
    nombre: "LTO-8",
    precio: 90,
    stock: 10,
    imagen: "/images/LTO 8.jpg",
    stockInicial: 10,
  },
  {
    id: "LTO-7",
    nombre: "LTO-7",
    precio: 80,
    stock: 10,
    imagen: "/images/LTO 7.jpg",
    stockInicial: 10,
  },
  {
    id: "LTO-6",
    nombre: "LTO-6",
    precio: 70,
    stock: 10,
    imagen: "/images/LTO 6.jpg",
    stockInicial: 10,
  },
  {
    id: "LTO-5",
    nombre: "LTO-5",
    precio: 60,
    stock: 10,
    imagen: "/images/LTO 5.jpg",
    stockInicial: 10,
  },
  {
    id: "Cartucho de Limpieza",
    nombre: "Cartucho de Limpieza",
    precio: 50,
    stock: 10,
    imagen: "/images/cartucho limpieza.jpg",
    stockInicial: 10,
  },
];

/**
 * Función para generar las tarjetas de productos y mostrarlas en el contenedor.
 * Si el stock de un producto es 0, deshabilita el botón "Actualizar".
 */
function generarTarjetas() {
  const contenedor = document.querySelector(".row");
  contenedor.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevas tarjetas

  productos.forEach((producto) => {
    // Recuperar cantidad guardada en el localStorage para el producto actual
    const cantidadGuardada = localStorage.getItem(producto.id) || "";

    // Crear la estructura HTML para una tarjeta de producto
    const tarjeta = document.createElement("div");
    tarjeta.className = "col";
    tarjeta.innerHTML = `
      <div class="card h-100">
        <div class="image-frame">
          <img src="${producto.imagen}" alt="${producto.nombre}" class="card-img-top" />
        </div>
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p><strong>Precio:</strong> $${producto.precio}</p>
          <p><strong>Stock:</strong> <span id="stock-${producto.id}">${producto.stock}</span></p>
          <div class="quantity-section d-flex align-items-center gap-2">
            <input type="number" id="input-${producto.id}" class="form-control" min="0" max="${producto.stock}" placeholder="Cantidad" value="${cantidadGuardada}" />
            <button class="btn btn-primary" id="btn-${producto.id}" onclick="actualizarCantidad('${producto.id}')">Actualizar</button>
          </div>
        </div>
      </div>
    `;

    contenedor.appendChild(tarjeta);

    // Deshabilitar el botón "Actualizar" si el stock es 0
    if (producto.stock === 0) {
      document.getElementById(`btn-${producto.id}`).disabled = true;
    }
  });
}

/**
 * Función para actualizar la cantidad de un producto en el carrito.
 * @param {string} id - El identificador del producto.
 */
function actualizarCantidad(id) {
  const input = document.getElementById(`input-${id}`);
  const cantidad = parseInt(input.value, 10);
  const producto = productos.find((p) => p.id === id);

  // Validar que la cantidad sea un número válido y mayor a 0
  if (isNaN(cantidad) || cantidad <= 0) {
    alert("Por favor, ingrese una cantidad válida.");
    return;
  }

  // Verificar si la cantidad ingresada no supera el stock disponible
  if (cantidad > producto.stock) {
    alert(
      `La cantidad ingresada supera el stock disponible (${producto.stock}).`
    );
    input.value = "";
    input.placeholder = "Cantidad";
    localStorage.removeItem(id);
    return;
  }

  // Guardar la cantidad en localStorage
  localStorage.setItem(id, cantidad);
  alert(
    `Se han añadido ${cantidad} unidades de ${producto.nombre} al carrito.`
  );
}

/**
 * Función para borrar todas las cantidades del carrito sin modificar el stock actual.
 * Elimina todas las cantidades del localStorage y resetea los campos de entrada.
 */
function borrarCantidades() {
  productos.forEach((producto) => {
    // Limpiar el campo de cantidad
    const input = document.getElementById(`input-${producto.id}`);
    if (input) {
      input.value = "";
      input.placeholder = "Cantidad";
    }

    // Eliminar del localStorage la cantidad del producto
    localStorage.removeItem(producto.id);
  });

  alert("Todas las cantidades han sido borradas del carrito.");
}

// Cargar las tarjetas cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", generarTarjetas);

// API Key de Fixer (reemplázala con tu clave)
const API_KEY = "7d9cd433310bc9d77f97f5e3ff66e2ad"; // Mi API

// URL de la API de Fixer para obtener la tasa de cambio de USD a ARS
const fixerAPIURL = `https://data.fixer.io/api/latest?access_key=${API_KEY}&symbols=USD,ARS`;

/**
 * Función para obtener el tipo de cambio de USD a ARS desde la API de Fixer.
 */
async function obtenerTipoCambio() {
  try {
    const response = await fetch(fixerAPIURL);
    const data = await response.json();

    if (data.success) {
      const tasaUSD = data.rates.USD;
      const tasaARS = data.rates.ARS;
      const tipoCambio = (tasaARS / tasaUSD).toFixed(2);

      // Mostrar el tipo de cambio en el elemento correspondiente
      document.getElementById("valor-tipo-cambio").textContent = tipoCambio;

      console.log(`Tipo de cambio actual: 1 USD = ${tipoCambio} ARS`);
      return tipoCambio;
    } else {
      console.error("Error al obtener el tipo de cambio:", data.error);
      document.getElementById("valor-tipo-cambio").textContent = "Error";
      return null;
    }
  } catch (error) {
    console.error("Error al conectar con la API de Fixer:", error);
    document.getElementById("valor-tipo-cambio").textContent = "Error";
    return null;
  }
}

// Llamar a la función para obtener el tipo de cambio al cargar la página
document.addEventListener("DOMContentLoaded", obtenerTipoCambio);
