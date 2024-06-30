let perfil = JSON.parse(localStorage.getItem("usuario"));
let sesion = localStorage.getItem("sesionIniciada");

const datosPerfil = () => {
  sesion != null && perfil != null
    ? (document.getElementById("usuario2").innerHTML = perfil.usuario)
    : (window.location.href = "index.html");
};
datosPerfil();
const cerrarSesion = () => {
  localStorage.removeItem("sesionIniciada");
  window.location.href = "index.html";
};
