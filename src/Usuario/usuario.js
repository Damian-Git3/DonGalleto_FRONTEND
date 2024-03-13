let usuarios = [];

function regresarUsuarios() {
  // Seleccionar el elemento con id "verUsuarios" y remover la clase "d-none"
  document.getElementById("verUsuarios").classList.remove("d-none");

  // Seleccionar el elemento con id "formEditarUsuario" y remover la clase "d-flex"
  document.getElementById("formEditarUsuario").classList.remove("d-flex");

  // Seleccionar los elementos con los ids especificados y añadir la clase "d-none"
  const ids = ["eliminarForm", "cerrarSesionForm", "modificarForm", "bienvenida", "formEditarUsuario"];
  ids.forEach(id => {
    document.getElementById(id).classList.add("d-none");
  });
}

function actualizarUsuario() {
  document.getElementById("modificarMensaje").textContent = "";

  Swal.fire({
    title: "¿Está seguro que desea cambiar sus datos?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, cambiar",
  }).then((result) => {
    if (result.isConfirmed) {


      // Obtener los valores de los campos
      let usuario = document.getElementById("modificarUsuario").value;
      let contrasena = document.getElementById("modificarContrasena").value;
      let confirmacionContrasena = document.getElementById(
        "modificarConfirmacionContrasena"
      ).value;

      const form1 = validarRegistro(
        contrasena,
        usuario,
        confirmacionContrasena
      );
      const form2 = validarFormato(contrasena);
      const form3 = sanitizar(contrasena);
      const form4 = sanitizar(usuario);
      if (form1 && form2 && form3 && form4) {
        // Preparar los datos para la petición
        let data = {
          id: localStorage.getItem("id"),
          usuario: localStorage.getItem("usuario"),
          nuevo_usuario: usuario,
          contrasena: contrasena,
        };

        peticion_actualizar(data);
      }
    }
  });
}

function cerrar_sesion() {
  //borrar datos de sesion
  localStorage.clear();
  window.location.href = "../login/login.html";
}

function peticionEliminar() {
  const ipAddress = "127.0.0.1:3000";

  let data = {
    id: localStorage.getItem("id"),
  };
  fetch(`http://${ipAddress}/usuarios/eliminar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al eliminar");
      }
      console.log(response);
      return response.json();
    })
    .then((response) => {
      console.log(response);
      alertaSuccess("Eliminación exitosa");
      cerrar_sesion();
    })
    .catch((error) => {
      console.error(error);
      alertaError("Error al eliminar");
    });
}

function formEditarUsuario(idUsuario) {
  console.log("ID USUARIO RECIBIDO", idUsuario);
  console.log("ARREGLO DE USUARIOS", usuarios);
  console.log("USUARIO SELECCIONADO", usuarios[idUsuario]);
  idUsuarioModificar = usuarios[idUsuario].id_usuario;

  // Reemplaza jQuery con JavaScript nativo para establecer el valor de los elementos
  document.getElementById('inputIdUsuario').value = usuarios[idUsuario].id_usuario;
  document.getElementById('inputUsuario').value = usuarios[idUsuario].nom_usuario;
  document.getElementById('selectRol').value = usuarios[idUsuario].rol;

  // Reemplaza jQuery con JavaScript nativo para manipular las clases de los elementos
  document.getElementById('formEditarUsuario').classList.remove('d-none');;
  

  // Reemplaza jQuery con JavaScript nativo para añadir la clase "d-none" a múltiples elementos
  const ids = ['eliminarForm', 'cerrarSesionForm', 'modificarForm', 'bienvenida', 'verUsuarios',];
  ids.forEach(id => {
    document.getElementById(id).classList.add('d-none');
  });
}

function eliminar_usuario() {
  Swal.fire({
    title: "¿Está seguro que desea eliminar su cuenta?",
    text: "No podrá recuperar su cuenta una vez eliminada",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
  }).then((result) => {
    if (result.isConfirmed) {
      peticionEliminar();
    }
  });
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
    document.getElementById("modificarMensaje").textContent = "La contraseña no puede ser igual al usuario.\n";
    return false;
  }

  if (contrasena !== confirmacionContrasena) {
    document.getElementById("modificarMensaje").textContent += "Las contraseñas no coinciden.\n";
    return false;
  }
  return true;
}

function validarFormato(input) {
  const requerimiento =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^*_+-=:.¿¡?]).{8,}$/;
  if (!requerimiento.test(input)) {
    document.getElementById("modificarMensaje").textContent += "La constraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un caracter especial autorizado !@#$%^*_+-=:.¿¡?.\n"

    return false;
  }
  return true;
}

function sanitizar(input) {
  // Sanitizar la contraseña usando regex (por ejemplo, eliminar espacios en blanco)
  let espacios = /^\s+|\s+$/g;
  input = input.replace(espacios, "");

  const excluidos = /[^&'`";()\[\]{}<>|]/g;

  if (!excluidos.test(input)) {
    document.getElementById("modificarMensaje").textContent += "La entrada contiene alguno de estos caracteres &'`.;()[]{}<>|''\n";
    return false;
  }
  return true;
}

function peticion_actualizar(data) {
  const ipAddress = "127.0.0.1:3000"; // Asegúrate de que esta es la dirección IP correcta

  fetch(`http://${ipAddress}/usuarios/modificar`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al modificar");
      }
      return response.json();
    })
    .then((response) => {
      console.log(response);
      alertaSuccess("Modificación exitosa");
      cerrar_sesion();
    })
    .catch((error) => {
      console.error(error);
      alertaError("Error al modificar");
    });
}

function mandarUsuarioEditado() {
  const ipAddress = "127.0.0.1:3000";

  // Definir la URL de la solicitud
  const url = `http://${ipAddress}/Usuarios/editar`;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.setRequestHeader("x-access-token", localStorage.getItem("token"));

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
      usuario: $("#inputUsuario").val(),
      contrasena: $("#inputContrasenia").val(),
      rol: $("#selectRol").val(),
      id_usuario: $("#inputIdUsuario").val(),
      idUsuarioModificador: localStorage.getItem("id")
    });

    xhr.send(usuario);
  });
}

async function solicitarUsuarios() {
  const ipAddress = "127.0.0.1:3000";

  fetch(`http://${ipAddress}/usuarios/lista`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({}),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
      }
      return response.json();
    })
    .then((response) => {
      //generar el contenido de tbody de la tabla
      let contenido = "";

      usuarios = response.data;

      response.data.forEach((usuario, index) => {
        contenido += `<tr>
        <td>${usuario.nom_usuario}</td>
        <td>${usuario.estatus == 1 ? "Activo" : "Eliminado"}</td>
        <td>${usuario.rol_usuario == 1 ? "Usuario" : "Administrador"}</td>`;

        const admin = localStorage.getItem("admin");

        if (admin == 2) {
          contenido += `
              <td>
                <button onclick="formEditarUsuario(${index})" class="btn btn-warning">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
              </td>
            </tr>`;
        }
      });

      document.getElementById("usuarios").innerHTML = contenido;
    })
    .catch((error) => {
      console.error(error);
      alertaError("Error al obtener los usuarios");
    });
}


document.addEventListener("DOMContentLoaded", function () {
  const admin = localStorage.getItem("admin");

  if (admin == 2) {
    document.getElementById(
      "jumbo-titulo"
    ).innerHTML = `Bienvenido administrador ${localStorage.getItem("usuario")}`;
    document.getElementById(
      "jumbo-mensaje"
    ).textContent = `Usted puede realizar acciones globales (por el momento eso solo le permite ver la lista de usuarios)`;

    //llamar a la api para obtener la lista de usuarios
    solicitarUsuarios();
  } else {
    document.getElementById(
      "jumbo-titulo"
    ).innerHTML = `Bienvenido usuario ${localStorage.getItem("usuario")}`;
    document.getElementById(
      "jumbo-mensaje"
    ).textContent = `Usted puede realizar acciones sobre su propia cuenta.`;
    //borrar el elemento del dom
    document.getElementById("admin-options").remove();
  }
});

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('bienvenidaVista').addEventListener('click', function () {
    document.getElementById('bienvenida').classList.remove('d-none');
    document.querySelectorAll('#eliminarForm, #cerrarSesionForm, #modificarForm, #verUsuarios').forEach(function (element) {
      element.classList.add('d-none');
    });
  });

  document.getElementById('usuariosVista').addEventListener('click', function () {
    document.getElementById('verUsuarios').classList.remove('d-none');
    document.querySelectorAll('#eliminarForm, #cerrarSesionForm, #modificarForm, #bienvenida, #formEditarUsuario').forEach(function (element) {
      element.classList.add('d-none');
    });
  });

  document.getElementById('modificar').addEventListener('click', function () {
    document.getElementById('modificarForm').classList.remove('d-none');
    document.querySelectorAll('#eliminarForm, #cerrarSesionForm, #verUsuarios, #bienvenida, #formEditarUsuario').forEach(function (element) {
      element.classList.add('d-none');
    });
  });

  document.getElementById('eliminar').addEventListener('click', function () {
    document.getElementById('eliminarForm').classList.remove('d-none');
    document.querySelectorAll('#modificarForm, #cerrarSesionForm, #verUsuarios, #bienvenida, #formEditarUsuario').forEach(function (element) {
      element.classList.add('d-none');
    });
  });

  // document.getElementById('editar-usuario').addEventListener('click', function () {
  //   document.getElementById('eliminarForm').classList.remove('d-none');
  //   document.querySelectorAll('#modificarForm, #cerrarSesionForm, #verUsuarios, #bienvenida, #formEditarUsuario').forEach(function (element) {
  //     element.classList.add('d-none');
  //   });
  // });

  document.getElementById('cerrarSesion').addEventListener('click', function () {
    document.getElementById('cerrarSesionForm').classList.remove('d-none');
    document.querySelectorAll('#modificarForm, #eliminarForm, #verUsuarios, #bienvenida, #formEditarUsuario').forEach(function (element) {
      element.classList.add('d-none');
    });
  });
});