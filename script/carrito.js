// Obtener el arreglo de productos del localStorage o inicializar con valores por defecto
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
 * Función para formatear números a formato de moneda.
 * @param {number} numero - El número que se desea formatear.
 * @returns {string} - El número formateado como moneda en formato $XXX.XXX,XX.
 */
function formatearMoneda(numero) {
  return `$${numero.toLocaleString("es-ES")}`;
}

/**
 * Función para cargar los artículos en el carrito.
 * Recorre los productos en el localStorage y los muestra en una tabla.
 */
function cargarCarrito() {
  const carritoBody = document.getElementById("carrito-body");
  const costoTotalElement = document.getElementById("costo-total");
  carritoBody.innerHTML = "";

  let costoTotalGeneral = 0;

  productos.forEach((producto) => {
    const cantidad = parseInt(localStorage.getItem(producto.id), 10);

    if (cantidad && cantidad > 0) {
      const costoUnitario = producto.precio;
      const costoTotal = cantidad * costoUnitario;
      costoTotalGeneral += costoTotal;

      // Crear una fila para el producto en el carrito
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${producto.nombre}</td>
        <td>${cantidad}</td>
        <td>${formatearMoneda(costoUnitario)}</td>
        <td>${formatearMoneda(costoTotal)}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="eliminarArticulo('${
            producto.id
          }')">Eliminar</button>
        </td>
      `;

      carritoBody.appendChild(row);
    }
  });

  // Mostrar el costo total general del carrito
  costoTotalElement.textContent = formatearMoneda(costoTotalGeneral);
}

/**
 * Función para realizar el Check Out.
 * Descuenta del stock las cantidades compradas y actualiza el localStorage.
 */
function realizarCheckOut() {
  productos.forEach((producto) => {
    const cantidad = parseInt(localStorage.getItem(producto.id), 10);

    if (cantidad && cantidad > 0) {
      // Descontar del stock la cantidad comprada
      producto.stock -= cantidad;
      if (producto.stock < 0) producto.stock = 0; // Asegura que el stock no sea negativo

      // Eliminar el producto del carrito después del Check Out
      localStorage.removeItem(producto.id);
    }
  });

  // Guardar los productos actualizados en localStorage
  localStorage.setItem("productos", JSON.stringify(productos));

  // Mostrar el modal de agradecimiento
  mostrarMensajeGracias();

  // Recargar el carrito para reflejar los cambios
  cargarCarrito();
}

/**
 * Función para mostrar el modal de agradecimiento después del Check Out.
 */
function mostrarMensajeGracias() {
  const modalGracias = new bootstrap.Modal(
    document.getElementById("modalGracias")
  );
  modalGracias.show();
}

/**
 * Función para borrar todas las cantidades del carrito.
 * Elimina los productos del carrito y actualiza la vista.
 */
function borrarCantidades() {
  productos.forEach((producto) => {
    localStorage.removeItem(producto.id);
  });

  cargarCarrito();
}

/**
 * Función para eliminar un artículo específico del carrito.
 * @param {string} id - El ID del producto a eliminar.
 */
function eliminarArticulo(id) {
  if (
    confirm(
      `¿Está seguro de que desea eliminar el artículo "${id}" del carrito?`
    )
  ) {
    localStorage.removeItem(id);
    cargarCarrito();
    alert(`El artículo "${id}" ha sido eliminado del carrito.`);
  }
}

// Cargar el carrito al iniciar la página
document.addEventListener("DOMContentLoaded", cargarCarrito);
