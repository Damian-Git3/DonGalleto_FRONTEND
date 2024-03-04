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

export async function registrarUsuario(user, password) {
    const ipAddress = "127.0.0.1:3000";
    const url = `http://${ipAddress}/usuarios/register`;

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
        return responseData;
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
}