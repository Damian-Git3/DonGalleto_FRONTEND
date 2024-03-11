document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btnRegister').addEventListener('click', e => {
        e.preventDefault();
        registerUser();
    });
});

async function getCSRFToken() {
    const ipAddress = "127.0.0.1:3000";
    const url = `http://${ipAddress}/csrf-token`;

    const response = await fetch(url);

    const data = await response.json();
    return data.csrfToken;
}

getCSRFToken().then(csrfToken => {
    localStorage.setItem('csrfToken', csrfToken);
});

async function registerUser() {
    try {
        let usuario = document.getElementById("input_usuario").value;
        let contrasena = document.getElementById("input_contrasena").value;

        let respuesta = await registrarUsuario(usuario, contrasena);

        if (respuesta.success === true) {
            localStorage.setItem('token', respuesta.token);
            localStorage.setItem('admin', respuesta.admin);
            
            localStorage.setItem('usuario', respuesta.nombre);
            localStorage.setItem('id', respuesta.id);
            alertaSuccess('Usuario registrado', 'Inicia sesión con tus credenciales')

        } else {

            window.location.href = "../Usuario/usuario.html";
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


export async function registrarUsuario(user, password) {
    const ipAddress = "127.0.0.1:3000";
    const url = `http://${ipAddress}/usuarios/registro`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify({
                usuario: user,
                contrasena: password,
            }),
        });

        const responseData = await response.json();
        console.log(responseData)
        return responseData;
    } catch (error) {
        console.log(error)
        throw new Error(`Error: ${error.message}`);
    }
}