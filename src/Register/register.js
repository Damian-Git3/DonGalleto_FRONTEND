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

    
    const val1 = validarFormatoUsuario(usuario);
    const val2 = validarFormatoContrasena(contrasena);
    const val3 = validarRegistro(contrasena, usuario, contrasena2);

    if (val1 && val2 && val3) {
      let respuesta = await registrarUsuario(
        sanitizar(usuario),
        sanitizar(contrasena)
      );

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
  
  if (
    contrasena.length < 1 ||
    usuario.length < 1 ||
    confirmacionContrasena.length < 1
  ) {
    document.getElementById("modificarMensaje").textContent =
      "No deje ningun campo vacio.\n";
    return false;
  }

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

function validarFormatoContrasena(input) {
  const caracteresEspecialesRegex = /[!@#$%^&*_=+\-]/;
  const contieneLetras = /[a-zA-Z]/.test(input);
  const contieneNumeros = /\d/.test(input);
  const caracteresPermitidos = /^[a-zA-Z0-9!@#$%^&*_\-+=]+$/;

  if (!caracteresEspecialesRegex.test(input)) {
    document.getElementById("modificarMensaje").textContent +=
      "La constraseña debe contener al menos un caracter especial autorizado '!', '@', '#', '$', '%', '^', '&', '*', '_', '-', '+', '='\n";
    return false;
  }

  if (!contieneLetras) {
    document.getElementById("modificarMensaje").textContent +=
      "La constraseña debe contener mayúsculas y minúsculas.\n";

    return false;
  }
  if (!contieneNumeros) {
    document.getElementById("modificarMensaje").textContent +=
      "La constraseña debe contener números.\n";

    return false;
  }

  if (input.length < 8) {
    document.getElementById("modificarMensaje").textContent +=
      "La constraseña debe contener al menos 8 caracteres.\n";

    return false;
  }

  if (!caracteresPermitidos.test(input)) {
    document.getElementById("modificarMensaje").textContent +=
      "La entrada no debe contener espacios o caracteres especiales que no sean \n'!', '@', '#', '$', '%', '^', '&', '*', '_', '-', '+', '='";
    return false;
  }

  return true;
}
function validarFormatoUsuario(input) {
  const caracteresPermitidos = /^[a-zA-Z0-9]+$/;

  if (!caracteresPermitidos.test(input)) {
    document.getElementById("modificarMensaje").textContent +=
      "El usuario solo debe tener letras y números\n";
    return false;
  }

  return true;
}
function sanitizar(input) {
  // Definir expresión regular para caracteres permitidos
  const caracteresPermitidos = /[a-zA-Z0-9!@#$%^&*_\-+=]+/g;
  // Filtrar la entrada para conservar solo los caracteres permitidos
  const entradaSanitizada = input.match(caracteresPermitidos);
  // Unir los caracteres filtrados para formar la nueva entrada sanitizada
  return entradaSanitizada.join("");
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
