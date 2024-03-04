
import { validarUsuario } from '../src/login/login.js'

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btnIngresar').addEventListener('click', e => {
        e.preventDefault();
        iniciarSesion();
    });
});

function alertaError(titulo, mensaje) {

    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: 'error',
        confirmButtonText: 'OK'
    });
}

function alertaSuccess(titulo, mensaje) {

    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: 'success',
        confirmButtonText: 'OK'
    });
}

async function iniciarSesion() {
    try {
        let usuario = document.getElementById("input_usuario").value;
        let contrasena = document.getElementById("input_contrasena").value;

        let respuesta = await validarUsuario(usuario, contrasena);
        if (respuesta.success === true) {
            alertaSuccess('CORRECTO', 'BIENVENIDO')
        }
    } catch (error) {
        alertaError('ERROR', error.message)
    }
}