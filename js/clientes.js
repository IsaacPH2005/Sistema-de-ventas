let modal = document.getElementById("staticBackdrop3");
let instanciaModal2 = new bootstrap.Modal(modal);
let clientes =
  localStorage.getItem("clientes") != null
    ? JSON.parse(localStorage.getItem("clientes"))
    : [];
let posicion = null;
const abrirModal = () => {
  instanciaModal2.show();
};
const vaciar3 = () => {
  document.getElementById("nombreClienteModal").value = "";
  document.getElementById("apellidoClienteModal").value = "";
  document.getElementById("identificacionClienteModal").value = "";
};

const mostrar3 = (param) => {
  document.getElementById("staticBackdropLabel3").innerText =
    "✏ Editar un registro";
  document.getElementById("botonGuardar2");
  document.getElementById("botonEditar2");
  instanciaModal2.show();
  document.getElementById("nombreClienteModal").value = clientes[param].nombre;
  document.getElementById("apellidoClienteModal").value =
    clientes[param].apellido;
  document.getElementById("identificacionClienteModal").value =
    clientes[param].identificacion;
  posicion = param;
};

const editarCliente = () => {
  let nombre = document.getElementById("nombreClienteModal").value;
  let apellido = document.getElementById("apellidoClienteModal").value;
  let identificacion = document.getElementById(
    "identificacionClienteModal"
  ).value;
  if (nombre != "" && apellido != "" && identificacion != "") {
    clientes[posicion].nombre = nombre;
    clientes[posicion].apellido = apellido;
    clientes[posicion].identificacion = identificacion;

    localStorage.setItem("clientes", JSON.stringify(clientes));
    listarClientes();
    vaciar3();
    instanciaModal2.hide();
    Swal.fire({
      title: "Bien!",
      text: "Registro modificado exitosamente",
      icon: "success",
      confirmButtonText: "Cerrar",
    });
  } else {
    Swal.fire({
      title: "Error!",
      text: "No puede guardar informacion vacía",
      icon: "error",
      confirmButtonText: "Cerrar",
    });
  }
};

function listarClientes() {
  let tabla = document.querySelector("#tablaClientes tbody");
  let texto = "";
  if (clientes.length > 0) {
    clientes.forEach((item, indice) => {
      texto += `<tr>
         <td>${indice + 1}</td>
            <td>${item.nombre}</td>
            <td>${item.apellido}</td>
            <td>${item.identificacion}</td>
             <td><span class="badge bg-${item.estado ? "success" : "danger"}">${
        item.estado ? "Activo" : "Inactivo"
      }</span></td>
            <td>
                <div class="btn-group col-12">
                  <button type="button" class="btn btn-warning btn-sm" onclick="mostrar3(${indice})"><i class="fas fa-edit"></i></button> 
                  <button type="button" class="btn btn-${
                    item.estado ? "danger" : "success"
                  } btn-sm" onclick="estado(${indice})">${
        item.estado
          ? '<i class="fas fa-times"></i>'
          : '<i class="fas fa-check"></i>'
      }</button>
                </div>
            </td>
        </tr>`;
    });
  } else {
    texto += `<tr>
                    <td colspan="6" class="text-center"><span class="badge bg-danger"><i class="fas fa-times me-2"></i>Ningun registro encontrado</span></td>        
             </tr>`;
  }

  tabla.innerHTML = texto;
}
listarClientes();

const estado = (param) => {
  Swal.fire({
    title: "¿Esta seguro?",
    text: "Está a punto de modificar el estado del registro!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, modificar",
    cancelButtonText: "No, cancelar",
  }).then(function (result) {
    if (result.isConfirmed) {
      clientes[param].estado = !clientes[param].estado;
      listarClientes();
      localStorage.setItem("clientes", JSON.stringify(clientes));
    }
  });
};

const eliminar = (param) => {
  Swal.fire({
    title: "¿Esta seguro?",
    text: "Está a punto eliminar el registro!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar",
    cancelButtonText: "No, cancelar",
  }).then(function (result) {
    if (result.isConfirmed) {
      clientes.splice(param, 1);
      listarClientes();
      //Si el tamaño del arreglo carrito es mayor a 0, actualiza en el localStorage
      if (clientes.length > 0) {
        localStorage.setItem("clientes", JSON.stringify(clientes));
      } else {
        //Si el tamaño del arreglo carrito es menor o igual a 0, elimina la llave del localStorage
        localStorage.removeItem("clientes");
      }
      Swal.fire({
        title: "Bien!",
        text: "Registro eliminado exitosamente",
        icon: "success",
        confirmButtonText: "Cerrar",
      });
    }
  });
};
