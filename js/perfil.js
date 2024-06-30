const mostrar = () => {
  document.getElementById("nombrePerfil").value = perfil.nombre;
  document.getElementById("apellidoPerfil").value = perfil.apellido;
  document.getElementById("usuarioPerfil").value = perfil.usuario;
  document.getElementById("emailPerfil").value = perfil.email;
};
mostrar();

const guardar = () => {
  let nombre = document.getElementById("nombrePerfil").value;
  let apellido = document.getElementById("apellidoPerfil").value;
  let usuario = document.getElementById("usuarioPerfil").value;
  let email = document.getElementById("emailPerfil").value;
  if (nombre != "" && apellido != "" && usuario != "" && email != "") {
    perfil.nombre = nombre;
    perfil.apellido = apellido;
    perfil.usuario = usuario;
    perfil.email = email;
    guardarLocalstorage("usuario", perfil);
    document.getElementById("usuario2").innerHTML = perfil.usuario;
    success("Registro guardado exitosamente");
  } else {
    danger("No puede enviar espacios vacios");
  }
};

const guardarContraseña = () => {
  let passwordViejo = document.getElementById("password-1").value;
  let password = document.getElementById("password-2").value;
  let passwordConfirmar = document.getElementById("password-3").value;

  if (passwordViejo == perfil.password) {
    if (passwordConfirmar != "" && password != "") {
      if (passwordConfirmar == password) {
        perfil.password = password;

        guardarLocalstorage("usuario", perfil);
        vaciarPassword();
        success("La contraseña fue modificada con exito");
      } else {
        warning("La nueva contraseña y la confirmacion son diferentes");
      }
    } else {
      warning("No puede enviar datos vacios");
    }
  } else {
    danger("La contraseña actual es diferente.");
  }
};

const guardarLocalstorage = (clave, valor) => {
  localStorage.setItem(clave, JSON.stringify(valor));
};

const vaciarPassword = () => {
  document.getElementById("password-1").value = "";
  document.getElementById("password-3").value = "";
  document.getElementById("password-2").value = "";
};
