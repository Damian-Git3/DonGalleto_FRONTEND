import { registrarUsuario } from '../src/login/login.js'

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btnRegister').addEventListener('click', e => {
        e.preventDefault();
        registerUser();
    });
});

async function registerUser() {
    try {
        let usuario = document.getElementById("input_usuario").value;
        let contrasena = document.getElementById("input_contrasena").value;

        let respuesta = await registrarUsuario(usuario, contrasena);

        if (respuesta.success === true) {
            alertaSuccess('Usuario registrado', 'Inicia sesión con tus credenciales')
        } else{
            alertaError('Error', respuesta.message)
        }
    } catch (error) {
        //alertaError('ERROR', error.message)
    }
}

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