
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
    
            alertaSuccess('CORRECTO', 'BIENVENIDO')
            window.location.href = './src/login/login.html';
}