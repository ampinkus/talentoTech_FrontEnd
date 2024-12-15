// Obtener el arreglo de productos del localStorage o inicializar con valores por defecto
let productos = JSON.parse(localStorage.getItem("productos")) || [
  { id: "LTO-9", nombre: "LTO-9", precio: 1000, stock: 10 },
  { id: "LTO-8", nombre: "LTO-8", precio: 900, stock: 10 },
  { id: "LTO-7", nombre: "LTO-7", precio: 800, stock: 10 },
  { id: "LTO-6", nombre: "LTO-6", precio: 700, stock: 10 },
  { id: "LTO-5", nombre: "LTO-5", precio: 600, stock: 10 },
  {
    id: "Cartucho de Limpieza",
    nombre: "Cartucho de Limpieza",
    precio: 500,
    stock: 10,
  },
];

// Función para formatear números a formato de moneda
function formatearMoneda(numero) {
  return `$${numero.toLocaleString("es-ES")}`;
}

// Función para cargar los artículos en el carrito
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

  costoTotalElement.textContent = formatearMoneda(costoTotalGeneral);
}

// Función para realizar el Check Out
function realizarCheckOut() {
  productos.forEach((producto) => {
    const cantidad = parseInt(localStorage.getItem(producto.id), 10);

    if (cantidad && cantidad > 0) {
      // Descontar del stock la cantidad comprada
      producto.stock -= cantidad;
      if (producto.stock < 0) producto.stock = 0; // Asegurar que el stock no sea negativo

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

// Función para mostrar el modal de agradecimiento
function mostrarMensajeGracias() {
  const modalGracias = new bootstrap.Modal(
    document.getElementById("modalGracias")
  );
  modalGracias.show();
}

// Función para borrar todas las cantidades del carrito
function borrarCantidades() {
  productos.forEach((producto) => {
    localStorage.removeItem(producto.id);
  });

  cargarCarrito();
}

// Función para eliminar un artículo del carrito
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
