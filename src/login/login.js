export async function validarUsuario(user, password) {
    const ipAddress = "127.0.0.1:3000";
    // const ipAddress = "192.168.152.217:3000";
    // const ipAddress = "192.168.152.165:8080";
    // const ipAddress = "192.168.152.227:8080";
     
    // Definir la URL de la solicitud
    const url = `http://${ipAddress}/usuarios/login`;
    // const url = `http://${ipAddress}/login`;
    // const url = `http://${ipAddress}/oferteca_web/api/login/validarCliente`;
    // const url = `http://${ipAddress}/api/login`;

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
