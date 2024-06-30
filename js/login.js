/* 
    !En resumen, este código verifica si existe un item en el almacenamiento local llamado "usuario". Si existe, se parsea el valor asociado a esa clave como un objeto JSON y se asigna a la variable perfil. Si no existe, se asigna un objeto vacío {} a la variable perfil.
*/
let perfil =
  localStorage.getItem("usuario") != null
    ? JSON.parse(localStorage.getItem("usuario"))
    : {};
console.log(perfil.password);
const validar = () => {
  let email = document.getElementById("email").value;
  let password = document.getElementById("pass").value;
  if (email != "" && password != "") {
    if (email === perfil.email && password === perfil.password) {
      localStorage.setItem("sesionIniciada", "SI");
      success("Sesion iniciada correctamente");
      window.location.href = "dashboard.html";
    } else {
      danger("Email o password no validos");
    }
  } else {
    danger("No puede enviar datos vacios");
  }
};

const crearUsuario = () => {
  let email = document.getElementById("newEmail").value;
  let usuario = document.getElementById("newUsuario").value;
  let password = document.getElementById("newPassword").value;
  if (email != "" && usuario != "" && password != "") {
    let objeto = {
      nombre: usuario,
      apellido: "",
      usuario,
      email,
      password,
    };
    /* 
        *Aqui creamos nuestro nombre clave usuario, JSON.stringify() convierte un onjeto JS en una cadena de texto JSON.
        !Esto pero almacenar estrusturas de datos complejas en el localStorage
    */
    localStorage.setItem("usuario", JSON.stringify(objeto));
    localStorage.setItem("sesionIniciada", "SI");
    successConfirmation("Sesion iniciada correctamente", "ver-perfil.html");
  } else {
    danger("No puede enviar datos vacios");
  }
};
