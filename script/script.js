function actualizarCantidad(producto) {
  const cantidad = document.getElementById(producto).value;
  if (cantidad !== "") {
    localStorage.setItem(producto, cantidad);
    alert(`Se actualizó la cantidad de ${producto} a ${cantidad}`);
  } else {
    alert("Por favor, ingresa una cantidad válida.");
  }
}
