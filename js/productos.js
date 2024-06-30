let modal = document.getElementById('staticBackdrop');
let instanciaModal = new bootstrap.Modal(modal);
let productos = localStorage.getItem('productos') != null ? JSON.parse(localStorage.getItem('productos')) : [];
let posicion = null;
const listar = () =>{
    let tabla = document.querySelector('#tablaProductos tbody');
    let filas = "";
    if(productos.length > 0){
        productos.forEach((item, indice) => {
            filas += `<tr>
                            <td>${indice + 1}</td>
                            <td>${item.nombre}</td>
                            <td>${item.codigo}</td>
                            <td>${item.marca}</td>
                            <td>${item.categoria}</td>
                            <td>${item.cantidad}</td>
                            <td>${item.precio_compra}</td>
                            <td>${item.precio_venta}</td>
                            <td>${item.unidad_medida}</td>
                            <td><span class="badge bg-${item.estado ? 'success' : 'danger'}">${item.estado ? 'Activo' : 'Inactivo'}</span></td>
                            <td class="text-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-warning btn-sm" onclick="mostrar(${indice})">✏</button>
                                    <button type="button" class="btn btn-${item.estado ? 'danger' : 'success'} btn-sm" onclick="estado(${indice})">${item.estado ? '<i class="fas fa-times"></i>' : '<i class="fas fa-check"></i>'}</button>
                                </div>
                            </td>
                        </tr>`
        });
    }else{
        filas += `<tr>
                    <td colspan="11" class="text-center"><span class="badge bg-danger"><i class="fas fa-times me-2"></i>Ningun registro encontrado</span></td>        
                </tr>`;
    }
    tabla.innerHTML = filas;
}
listar();
const cerrarModal = () => {
    instanciaModal.hide();
}

const estado = param => {
    Swal.fire({
        title: "¿Esta seguro?",
        text: "Está a punto de modificar el estado del registro!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, modificar",
        cancelButtonText: "No, cancelar"
    }).then(function (result) {
        if (result.isConfirmed) {
            productos[param].estado = !productos[param].estado;
            listar();
            localStorage.setItem('productos', JSON.stringify(productos));
        }
    });
}
const mostrar = param => {
    document.getElementById('nombreModal').value = productos[param].nombre;
    document.getElementById('codigoModal').value = productos[param].codigo;
    document.getElementById('marcaModal').value = productos[param].marca;
    document.getElementById('categoriaModal').value = productos[param].categoria;
    document.getElementById('unidad_medidaModal').value = productos[param].unidad_medida;
    document.getElementById('precio_compraModal').value = productos[param].precio_compra;
    document.getElementById('precio_ventaModal').value = productos[param].precio_venta;
    posicion = param;
    instanciaModal.show();
}
const editar = () => {
    let nombre = document.getElementById('nombreModal').value;
    let codigo = document.getElementById('codigoModal').value;
    let marca = document.getElementById('marcaModal').value;
    let categoria = document.getElementById('categoriaModal').value;
    let unidad_medida = document.getElementById('unidad_medidaModal').value;
    let precio_compra = document.getElementById('precio_compraModal').value;
    let precio_venta = document.getElementById('precio_ventaModal').value;
    if (nombre != "" && codigo != "" && marca != "" && categoria != "" && unidad_medida != "" && precio_compra != "" && precio_venta != "") {
        precio_compra = parseFloat(precio_compra);
        precio_venta = parseFloat(precio_venta);
        productos[posicion].nombre = nombre;
        productos[posicion].codigo = codigo;
        productos[posicion].marca = marca;
        productos[posicion].categoria = categoria;
        productos[posicion].unidad_medida = unidad_medida;
        productos[posicion].precio_compra = precio_compra;
        productos[posicion].precio_venta = precio_venta;
        localStorage.setItem('productos', JSON.stringify(productos));
        listar();
        cerrarModal();
        success('Registro modificado exitosamente');
    } else {
        danger('No puede enviar datos vacios.');
    }
}