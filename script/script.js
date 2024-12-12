// Función para actualizar la cantidad en localStorage
window.actualizarCantidad = function (id) {
  const cantidad = document.getElementById(id).value;
  localStorage.setItem(id, cantidad);
  alert(`Cantidad de ${id} actualizada a ${cantidad}`);
};

// Función para cargar las cantidades guardadas al cargar la página
function cargarCantidades() {
  const ids = [
    "LTO-9",
    "LTO-8",
    "LTO-7",
    "LTO-6",
    "LTO-5",
    "Cartucho de Limpieza",
  ];
  ids.forEach((id) => {
    const cantidadGuardada = localStorage.getItem(id);
    const input = document.getElementById(id);
    if (cantidadGuardada !== null && cantidadGuardada !== "") {
      input.value = cantidadGuardada;
    } else {
      input.value = "";
      input.placeholder = "Cantidad";
    }
  });
}

// Cargar las cantidades al iniciar la página
document.addEventListener("DOMContentLoaded", () => {
  cargarCantidades();
});

// Función para borrar todas las cantidades y restablecer los campos
function borrarCantidades() {
  const ids = [
    "LTO-9",
    "LTO-8",
    "LTO-7",
    "LTO-6",
    "LTO-5",
    "Cartucho de Limpieza",
  ];
  ids.forEach((id) => {
    localStorage.removeItem(id);
    const input = document.getElementById(id);
    input.value = "";
    input.placeholder = "Cantidad";
  });
}

// Función para cargar los artículos en el carrito
    function cargarCarrito() {
      const ids = ["LTO-9", "LTO-8", "LTO-7", "LTO-6", "LTO-5", "Cartucho de Limpieza"];
      const carritoBody = document.getElementById("carrito-body");
      carritoBody.innerHTML = "";

      ids.forEach((id) => {
        const cantidad = localStorage.getItem(id);
        if (cantidad && cantidad !== "0") {
          const row = document.createElement("tr");

          row.innerHTML = `
            <td>${id}</td>
            <td>${cantidad}</td>
            <td>
              <button class="btn btn-danger btn-sm" onclick="eliminarArticulo('${id}')">Eliminar</button>
            </td>
          `;

          carritoBody.appendChild(row);
        }
      });
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

