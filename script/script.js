// Arreglo de productos con los precios
const productos = [
  { id: "LTO-9", precio: 1000 },
  { id: "LTO-8", precio: 900 },
  { id: "LTO-7", precio: 800 },
  { id: "LTO-6", precio: 700 },
  { id: "LTO-5", precio: 600 },
  { id: "Cartucho de Limpieza", precio: 500 },
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
        <td>${producto.id}</td>
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

  // Mostrar el costo total general
  costoTotalElement.textContent = formatearMoneda(costoTotalGeneral);
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
