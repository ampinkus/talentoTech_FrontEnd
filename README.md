# talentoTech_FrontEnd
Repositorio para el curso de Front End de Talento tech  
Proyecto de p�gina para 3Mar, empresa que se dedica servicioos y comercializaci�n de sistemas de back up

## Objetivo del Proyecto
El objetivo del proyecto 3Mar es presentar la empresa 3Mar, sus servicios y proporcionar una plataforma para gestionar la compra de productos de respaldo de datos. Los usuarios pueden visualizar productos, agregar cantidades al carrito, realizar compras y gestionar el stock de productos. El sistema permite un proceso de compra intuitivo con funciones para actualizar cantidades, eliminar productos del carrito y realizar el Check Out con control de inventario.

## Estructura del Proyecto

### Archivos HTML
1. **index.html**
   - **Descripci�n**: P�gina principal del proyecto.
   - **Componentes**: 
     * Barra de Navegaci�n con enlaces a otras secciones (Nosotros, Contacto, Clientes, Servicios, Compras, Carrito).
     * Secci�n Principal que muestra informaci�n general sobre la empresa y los productos de respaldo con im�genes y descripciones.
     * Opci�n **"Stock Inicial"** en la barra de navegaci�n para reiniciar el stock y borrar el localStorage.

2. **compras.html**
   - **Descripci�n**: P�gina donde se muestran las tarjetas de productos disponibles.
   - **Componentes**: 
     * Tarjetas de Productos con la siguiente informaci�n: 
       - Imagen del producto.
       - Nombre y precio del producto.
       - Stock disponible.
       - Campo de cantidad para seleccionar unidades a agregar al carrito.
       - Bot�n **"Actualizar"** para a�adir la cantidad seleccionada al carrito.
     * Mensaje informativo que muestra el tipo de cambio de d�lares a pesos argentinos:
       - **Texto**: "Todos los precios en d�lares al cambio del d�a Banco Naci�n. Al d�a de hoy 1 U$D = AR$ [valor del cambio]."

3. **carrito.html**
   - **Descripci�n**: P�gina que muestra los productos agregados al carrito.
   - **Componentes**: 
     * Tabla del Carrito con columnas: 
       - **Art�culo**: Nombre del producto.
       - **Cantidad**: Cantidad seleccionada.
       - **Costo Unitario**: Precio por unidad.
       - **Costo Total**: Precio total por cantidad seleccionada.
       - **Eliminar**: Bot�n para eliminar el producto del carrito.
     * **Costo Total General** que muestra la suma de todos los productos en el carrito.
     * Bot�n **"Check Out"** para finalizar la compra y actualizar el stock.
     * Modal de agradecimiento que se muestra al realizar el Check Out.

4. **about.html**
   - **Descripci�n**: P�gina de informaci�n sobre la empresa.
   - **Componentes**:
     * Secci�n **"Quienes somos"** que describe la experiencia de 3Mar en el mercado de respaldo y archivado de datos.
     * Secci�n **"Donde estamos"** que incluye un mapa de Google Maps con la ubicaci�n de la empresa.
     * Barra de Navegaci�n para acceder a otras secciones del sitio.

5. **clientes.html**
   - **Descripci�n**: P�gina que muestra algunos de los clientes de 3Mar.
   - **Componentes**:
     * Imagen representativa con una lista de clientes.
     * Barra de Navegaci�n para acceder a otras secciones del sitio.

6. **contacto.html**
   - **Descripci�n**: P�gina con un formulario de contacto.
   - **Componentes**:
     * Formulario de Contacto con campos para:
       - **Nombre**
       - **Apellido**
       - **Email**
       - **Mensaje**
     * Botones para enviar o limpiar el formulario.
     * Barra de Navegaci�n para acceder a otras secciones del sitio.

7. **servicios.html**
   - **Descripci�n**: P�gina que detalla los servicios ofrecidos por 3Mar.
   - **Componentes**:
     * Tarjetas de Servicios con descripciones de los servicios de soporte t�cnico y mantenimiento de unidades de cinta magn�tica.
     * Barra de Navegaci�n para acceder a otras secciones del sitio.

---

### Archivos JavaScript
1. **index.js**
   - **Descripci�n**: Script para resetear el `localStorage` y restablecer el stock inicial de productos.
   - **Funciones**: 
     * **resetearStock()**:
       - **Descripci�n**: 
         - Restablece el stock de todos los productos a su valor inicial de 10 unidades.
         - Guarda el arreglo inicial de productos en `localStorage`.
         - Limpia el `localStorage` y recarga la p�gina.
       - **Acciones**: 
         - Guarda el arreglo inicial de productos en `localStorage`.
         - Borra todo el `localStorage`.
         - Muestra una alerta indicando que el stock se ha restablecido.
         - Recarga la p�gina.

2. **carrito.js**
   - **Descripci�n**: Script principal para gestionar el carrito y las compras.
   - **Funciones**: 
     * **formatearMoneda(numero)**:
       - **Par�metro**: `numero` (n�mero a formatear).
       - **Descripci�n**: Formatea un n�mero a formato de moneda ($XXXXX).
       - **Retorna**: El n�mero formateado como una cadena de texto.

     * **cargarCarrito()**:
       - **Descripci�n**: Carga los productos almacenados en el carrito y los muestra en una tabla. Tambi�n actualiza el estado del bot�n Check Out.

     * **realizarCheckOut()**:
       - **Descripci�n**: Descuenta del stock las cantidades compradas, guarda el stock actualizado en `localStorage` y muestra un modal de agradecimiento.

     * **mostrarMensajeGracias()**:
       - **Descripci�n**: Muestra el modal de agradecimiento tras realizar el Check Out.

     * **borrarCantidades()**:
       - **Descripci�n**: Borra todas las cantidades almacenadas en el carrito.

     * **eliminarArticulo(id)**:
       - **Par�metro**: `id` (ID del producto a eliminar).
       - **Descripci�n**: Elimina un art�culo espec�fico del carrito y actualiza la vista.

3. **compras.js**
   - **Descripci�n**: Script para gestionar la p�gina de compras y las tarjetas de productos.
   - **Funciones**: 
     * **generarTarjetas()**:
       - **Descripci�n**: Genera din�micamente las tarjetas de productos en la p�gina de compras. Deshabilita el bot�n **Actualizar** si el stock es 0.

     * **actualizarCantidad(id)**:
       - **Par�metro**: `id` (ID del producto a actualizar).
       - **Descripci�n**: Permite agregar una cantidad seleccionada al carrito y la guarda en `localStorage`.

     * **borrarCantidades()**:
       - **Descripci�n**: Borra todas las cantidades seleccionadas sin modificar el stock actual.

     * **obtenerTipoCambio()**:
       - **Descripci�n**: Obtiene el tipo de cambio de USD a ARS desde la API de Fixer.

     * **mostrarPreciosEnPesos()**:
       - **Descripci�n**: Muestra los precios de los productos convertidos a pesos argentinos (ARS) utilizando el tipo de cambio obtenido.

---

## Funcionamiento General del Proyecto
1. **P�gina de Compras (`compras.html`)**:
   - Los usuarios seleccionan una cantidad de producto y la agregan al carrito usando el bot�n **Actualizar**.
   - El stock se actualiza despu�s del Check Out.
   - Se muestra el tipo de cambio actual de d�lares a pesos argentinos al final de la p�gina, obtenido de la API de Fixer.

2. **P�gina del Carrito (`carrito.html`)**:
   - Muestra los productos agregados al carrito con sus cantidades y costos.
   - Permite eliminar productos individuales o borrar todas las cantidades.
   - El bot�n **Check Out** finaliza la compra y actualiza el stock disponible.

3. **Reinicio de Stock**:
   - Desde la opci�n **"Stock Inicial"** en la barra de navegaci�n de `index.html`, los usuarios pueden reiniciar el stock y borrar el `localStorage`.

---

## Notas
- **Persistencia de Datos**: El proyecto utiliza `localStorage` para mantener el estado del carrito y el stock de los productos.
- **Modal de Agradecimiento**: Se muestra despu�s de realizar una compra exitosa.
- **Bot�n Check Out**: Est� desactivado si el carrito est� vac�o para evitar compras sin productos seleccionados.
- **API de Fixer**: Se utiliza para obtener el tipo de cambio actual de USD a ARS.

## Instalaci�n
- Actualmente se encuentra el proyecto en Github: https://github.com/ampinkus/talentoTech_FrontEnd
- La demo se puede ver en Netifly: https://alfredo-3mar.netlify.app/
- Se puede instalar de forma local con un servidor Apache o similar