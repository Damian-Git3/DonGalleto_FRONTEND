function validarUsuario(usuario, contrasena) {

    const ipAddress = "127.0.0.1:3000";
    // Crear un nuevo objeto XMLHttpRequest
    const xhr = new XMLHttpRequest();

    // Definir la URL de la solicitud
    const url = `http://${ipAddress}/usuarios/login`;

    // Configurar la solicitud
    xhr.open("POST", url, true);

    // Establecer el tipo de respuesta a JSON
    xhr.responseType = "json";

    // Configurar el encabezado para enviar datos en formato JSON
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    // Configurar el manejador de eventos para cuando la solicitud esté completa
    xhr.onload = function () {
        if (xhr.status === 200) {
            // La solicitud fue exitosa
            const responseData = xhr.response;
            // Procesar los datos de la respuesta aquí
            console.log(responseData);
        } else {
            // La solicitud falló
            console.error("La solicitud falló. Estado:", xhr.status);
        }
    };

    // Crear el objeto JSON con los datos del usuario y la contraseña
    const data = JSON.stringify({
        username: usuario,
        password: contrasena
    });

    // Enviar la solicitud con los datos del usuario y la contraseña
    xhr.send(data);
}

function iniciarSesion() {
    let usuario = document.getElementById("input_usuario").value;
    let contrasena = document.getElementById("input_contrasena").value;

    validarUsuario(usuario, contrasena);
}