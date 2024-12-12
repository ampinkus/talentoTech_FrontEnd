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

// Cargar las cantidades al iniciar la página solo si hay datos en localStorage
document.addEventListener("DOMContentLoaded", () => {
  // Detectar si la página fue refrescada
  const navigationEntries = performance.getEntriesByType("navigation");
  const wasReloaded = navigationEntries.some(
    (entry) => entry.type === "reload"
  );

  if (wasReloaded) {
    // La página fue refrescada
    cargarCantidades();
  } else {
    // Primera carga de la página
    localStorage.clear();
  }
});

/* // Función para actualizar la cantidad en localStorage
function actualizarCantidad(id) {
  const cantidad = document.getElementById(id).value;
  localStorage.setItem(id, cantidad);
  alert(`Cantidad de ${id} actualizada a ${cantidad}`);
}

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

// Cargar las cantidades al iniciar la página solo si hay datos en localStorage
document.addEventListener("DOMContentLoaded", () => {
  // Detectar si la página fue refrescada
  const navigationEntries = performance.getEntriesByType("navigation");
  const wasReloaded =
    navigationEntries.length > 0 && navigationEntries[0].type === "reload";

  if (wasReloaded) {
    // La página fue refrescada
    cargarCantidades();
  } else {
    // Primera carga de la página
    localStorage.clear();
  }
});

 */
