// Arreglo de productos con el stock inicial
let productos = [
  {
    id: "LTO-9",
    nombre: "LTO-9",
    precio: 1000,
    stock: 10,
    imagen: "/images/LTO 9.jpg",
    stockInicial: 10,
  },
  {
    id: "LTO-8",
    nombre: "LTO-8",
    precio: 900,
    stock: 10,
    imagen: "/images/LTO 8.jpg",
    stockInicial: 10,
  },
  {
    id: "LTO-7",
    nombre: "LTO-7",
    precio: 800,
    stock: 10,
    imagen: "/images/LTO 7.jpg",
    stockInicial: 10,
  },
  {
    id: "LTO-6",
    nombre: "LTO-6",
    precio: 700,
    stock: 10,
    imagen: "/images/LTO 6.jpg",
    stockInicial: 10,
  },
  {
    id: "LTO-5",
    nombre: "LTO-5",
    precio: 600,
    stock: 10,
    imagen: "/images/LTO 5.jpg",
    stockInicial: 10,
  },
  {
    id: "Cartucho de Limpieza",
    nombre: "Cartucho de Limpieza",
    precio: 500,
    stock: 10,
    imagen: "/images/cartucho limpieza.jpg",
    stockInicial: 10,
  },
];

// Función para generar las tarjetas de productos
function generarTarjetas() {
  const contenedor = document.querySelector(".row");
  contenedor.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevas tarjetas

  productos.forEach((producto) => {
    const cantidadGuardada = localStorage.getItem(producto.id) || "";

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
  });
}

// Función para actualizar la cantidad en el carrito sin reducir el stock permanentemente
function actualizarCantidad(id) {
  const input = document.getElementById(`input-${id}`);
  const cantidad = parseInt(input.value, 10);

  const producto = productos.find((p) => p.id === id);

  if (isNaN(cantidad) || cantidad <= 0) {
    alert("Por favor, ingrese una cantidad válida.");
    return;
  }

  if (cantidad > producto.stockInicial) {
    alert(
      `La cantidad ingresada supera el stock disponible (${producto.stockInicial}).`
    );
    // Restablecer el campo de cantidad a su estado inicial
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

// Función para borrar todas las cantidades y restaurar el stock original
function borrarCantidades() {
  productos.forEach((producto) => {
    // Restaurar el stock al valor inicial
    producto.stock = producto.stockInicial;

    // Actualizar el stock en la página
    const stockElement = document.getElementById(`stock-${producto.id}`);
    if (stockElement) {
      stockElement.textContent = producto.stock;
    }

    // Limpiar el campo de cantidad
    const input = document.getElementById(`input-${producto.id}`);
    if (input) {
      input.value = "";
      input.placeholder = "Cantidad";
    }

    // Eliminar del localStorage
    localStorage.removeItem(producto.id);
  });
}

// Cargar las tarjetas cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", generarTarjetas);
