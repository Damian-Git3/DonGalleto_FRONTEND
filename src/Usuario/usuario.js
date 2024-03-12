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

$(document).ready(function () {
  $("#bienvenidaVista").click(function () {
    $("#bienvenida").removeClass("d-none");
    $(
      "#eliminarForm, #cerrarSesionForm, #modificarForm, #verUsuarios"
    ).addClass("d-none");
  });

  $("#usuariosVista").click(function () {
    $("#verUsuarios").removeClass("d-none");
    $("#eliminarForm, #cerrarSesionForm, #modificarForm,#bienvenida").addClass(
      "d-none"
    );
  });
  $("#modificar").click(function () {
    $("#modificarForm").removeClass("d-none");
    $("#eliminarForm, #cerrarSesionForm, #verUsuarios, #bienvenida").addClass(
      "d-none"
    );
  });

  $("#eliminar").click(function () {
    $("#eliminarForm").removeClass("d-none");
    $("#modificarForm, #cerrarSesionForm, #verUsuarios, #bienvenida").addClass(
      "d-none"
    );
  });

  $("#cerrarSesion").click(function () {
    $("#cerrarSesionForm").removeClass("d-none");
    $("#modificarForm, #eliminarForm, #verUsuarios, #bienvenida").addClass(
      "d-none"
    );
  });
});

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
      var usuario = document.getElementById("modificarUsuario").value;
      var contrasena = document.getElementById("modificarContrasena").value;
      var confirmacionContrasena = document.getElementById(
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
        var data = {
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
  localStorage.removeItem("token");
  localStorage.removeItem("admin");
  localStorage.removeItem("id");
  window.location.href = "../login/login.html";
}

function peticion_eliminar() {
  const ipAddress = "127.0.0.1:3000";

  var data = {
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
      peticion_eliminar();
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
    document.getElementById("modificarMensaje").textContent ="La contraseña no puede ser igual al usuario.\n";
    return false;
  }

  if (contrasena !== confirmacionContrasena) {
    document.getElementById("modificarMensaje").textContent +="Las contraseñas no coinciden.\n";
    return false;
  }
  return true;
}

function validarFormato(input) {
  const requerimiento =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^*_+-=:.¿¡?]).{8,}$/;
  if (!requerimiento.test(input)) {
    document.getElementById("modificarMensaje").textContent +="La constraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un caracter especial autorizado !@#$%^*_+-=:.¿¡?.\n"
    
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

function solicitarUsuarios() {
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
      response.data.forEach((usuario) => {
        contenido += `<tr>
        <td>${usuario.usuario}</td>
        <td>${usuario.estatus == 1 ? "Activo" : "Eliminado"}</td>
        <td>${usuario.rol == 1 ? "Usuario" : "Administrador"}</td>
      </tr>`;
      });
      document.getElementById("usuarios").innerHTML = contenido;
    })
    .catch((error) => {
      console.error(error);
      alertaError("Error al obtener los usuarios");
    });
}
