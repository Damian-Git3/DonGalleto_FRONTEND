
async function login() {
    try {
        let usuario = document.getElementById("input_usuario").value;
        let contrasena = document.getElementById("input_contrasena").value;

        let respuesta = await validarUsuario(usuario, contrasena);

        if (respuesta.success === true) {

            localStorage.setItem('token', respuesta.token);
            localStorage.setItem('admin', respuesta.admin);
            localStorage.setItem('usuario', respuesta.nombre);
            localStorage.setItem('id', respuesta.id);
            alertaSuccess('CORRECTO', 'BIENVENIDO')
            window.location.href = "./../Usuario/usuario.html";
        } else{
            alertaError('Error', respuesta.message)
            
        }
    } catch (error) {
        alertaError('ERROR', error.message)
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

export async function validarUsuario(user, password) {
    const ipAddress = "127.0.0.1:3000";
    
    // Definir la URL de la solicitud
    const url = `http://${ipAddress}/usuarios/login`;

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.responseType = "json";
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhr.onload = function () {
            console.log(xhr);
            if (xhr.status === 200) {
                const responseData = xhr.response;
                resolve(responseData); // Resuelve la promesa con los datos de la respuesta
            } else {                
                reject(xhr.response); // Rechaza la promesa con los datos de la respuesta
            }
        };

        xhr.onerror = function () {
            reject(new Error("Error de red")); // Rechaza la promesa en caso de error de red
        };
        
        const usuario = JSON.stringify({
            usuario: user,
            contrasena: password    
        });

        xhr.send(usuario);
    });
}

