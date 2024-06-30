let clientes = localStorage.getItem('clientes') != null ? JSON.parse(localStorage.getItem('clientes')) : [];
function guardarCliente() {
    let nombre = document.getElementById("nombreCliente").value;
    let apellido = document.getElementById("apellidoCliente").value;
    let identificacion = document.getElementById("identificacionCliente").value;
  
    if (nombre != "" && apellido != "" && identificacion != "") {
      let objeto = {
        nombre,
        apellido,
        identificacion,
        estado: true
      };
      clientes.push(objeto);
      localStorage.setItem("clientes", JSON.stringify(clientes));
      successConfirmation('Registro guardado exitosamente', 'clientes-lista.html');
    } else {
      danger('No puede guardar informacion vacía');
    }
  }
  