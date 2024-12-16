// Función para resetear el localStorage y restablecer el stock inicial
function resetearStock() {
  const productosIniciales = [
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

  // Guardar el arreglo en localStorage
  localStorage.setItem("productos", JSON.stringify(productosIniciales));
  localStorage.clear();
  alert("El stock ha sido restablecido a su valor inicial de 10 unidades.");
  window.location.reload();
}
