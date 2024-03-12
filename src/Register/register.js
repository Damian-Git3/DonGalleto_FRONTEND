document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btnRegister").addEventListener("click", (e) => {
    e.preventDefault();
    registerUser();
  });
});

async function registerUser() {
  try {
    let usuario = document.getElementById("input_usuario").value;
    let contrasena = document.getElementById("input_contrasena").value;
    let contrasena2 = document.getElementById("input_contrasena2").value;

    document.getElementById("modificarMensaje").textContent = "";

    const val2 = validarFormato(contrasena);
    const val3 = sanitizar(usuario);
    const val4 = sanitizar(contrasena);
    const val1 = validarRegistro(contrasena, usuario, contrasena2);
    if (val1 && val2 && val3 && val4) {
      let respuesta = await registrarUsuario(usuario, contrasena);

      if (respuesta.success === true) {
        localStorage.setItem("token", respuesta.token);
        localStorage.setItem("admin", respuesta.admin);

        localStorage.setItem("usuario", respuesta.nombre);
        localStorage.setItem("id", respuesta.id);
        alertaSuccess(
          "Usuario registrado",
          "Inicia sesión con tus credenciales"
        );
        window.location.href = "../Usuario/usuario.html";
      } else {
        alertaError("Error", respuesta.message);
      }
    }
  } catch (error) {
    //alertaError('ERROR', error.message)
  }
}

function alertaError(titulo, mensaje) {
  Swal.fire({
    title: titulo,
    text: mensaje,
    icon: "error",
    confirmButtonText: "OK",
  });
}

function alertaSuccess(titulo, mensaje) {
  Swal.fire({
    title: titulo,
    text: mensaje,
    icon: "success",
    confirmButtonText: "OK",
  });
}

function validarRegistro(contrasena, usuario, confirmacionContrasena) {
  // Verificar que la contraseña no sea igual al usuario y que ambas contraseñas concuerdan
  if (contrasena === usuario) {
    document.getElementById("modificarMensaje").textContent =
      "La contraseña no puede ser igual al usuario.\n";
    return false;
  }

  if (contrasena !== confirmacionContrasena) {
    document.getElementById("modificarMensaje").textContent +=
      "Las contraseñas no coinciden.\n";
    return false;
  }
  return true;
}

function validarFormato(input) {
  const requerimiento = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^*_+-=:.¿¡?])[A-Za-z\d!@#$%^*_+-=:.¿¡?]{8,}$/;
  if (!requerimiento.test(input)) {
    document.getElementById("modificarMensaje").textContent +=
      "La constraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un caracter especial autorizado !@#$%^*_+-=:.¿¡?.\n";

    return false;
  }
  return true;
}
function sanitizar(input) {
  // Sanitizar la contraseña usando regex (por ejemplo, eliminar espacios en blanco)
  var espacios = /^\s+|\s+$/g;
  input = input.replace(espacios, "");

  const excluidos = /[^&'`";()\[\]{}<>|]/g;

  if (!excluidos.test(input)) {
    document.getElementById("modificarMensaje").textContent +=
      "La entrada contiene alguno de estos caracteres &'`.;()[]{}<>|''\n";
    return false;
  }
  return true;
}

export async function registrarUsuario(user, password) {
  const ipAddress = "127.0.0.1:3000";
  const url = `http://${ipAddress}/usuarios/registro`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        usuario: user,
        contrasena: password,
      }),
    });

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.log(error);
    throw new Error(`Error: ${error.message}`);
  }
}
