let proveedores = localStorage.getItem('proveedores') != null ? JSON.parse(localStorage.getItem('proveedores')) : [];
const guardar = () => {
    let nombre = document.getElementById('nombreAgrega').value;
    let apellido = document.getElementById('apellidoAgregar').value;
    let identificacion = document.getElementById('identificacionAgregar').value;
    let contacto = document.getElementById('contactoAgregar').value;
    if (nombre != "" && apellido != "" && identificacion != "" && contacto != "") {
        let objeto = {
            nombre,
            apellido,
            identificacion,
            contacto,
            estado: true,
        }
        proveedores.push(objeto);
        localStorage.setItem('proveedores', JSON.stringify(proveedores));
        successConfirmation('Registro guardado exitosamente', 'proveedores-lista.html');
    } else {
        danger('No puede guardar informacion vacía');
    }
}