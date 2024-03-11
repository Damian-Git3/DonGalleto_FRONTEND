document.addEventListener("DOMContentLoaded", function () {
  const admin = localStorage.getItem("admin");
  console.log(admin);
  if (admin == 2) {
    document.getElementById(
      "jumbo-titulo"
    ).innerHTML = `Bienvenido administrador ${localStorage.getItem("usuario")}`;
    document.getElementById(
      "jumbo-mensaje"
    ).textContent = `Usted puede realizar acciones globales (por el momento eso solo le permite ver la lista de usuarios)`;
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

  $("#modificarForm form").on("submit", function (e) {
    e.preventDefault(); // Prevenir el envío del formulario por defecto

    // Obtener los valores de los campos
    var usuario = $("#modificarNombre").val();
    var contrasena = $("#modificarContrasena").val();
    var confirmacionContrasena = $("#modificarContrasena2").val();

    const ok = validarContrasena(contrasena,usuario, confirmacionContrasena)
    if(!ok){
      return
    }

    // Preparar los datos para la petición
    var data = {
      id: id,
      contrasena: contrasena,
    };

    const ipAddress = "127.0.0.1:3000";

    // Realizar la petición AJAX
    $.ajax({
      url: `http://${ipAddress}/usuarios/actualizar`, // Asegúrate de reemplazar esto con la URL correcta
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      success: function (response) {
        // Manejar la respuesta exitosa
        console.log(response);
        alertaSuccess("Modificación exitosa");
      },
      error: function (error) {
        // Manejar el error
        console.error(error);
        alertaError("Error al modificar");
      },
    });
  });
});

function cerrar_sesion() {
  //borrar datos de sesion
  localStorage.removeItem("token");
  localStorage.removeItem("admin");
  localStorage.removeItem("id");
  window.location.href = "../login/login.html";
}

function eliminar_usuario() {
  //borrar datos de sesion
  // Realizar la petición AJAX
  const ipAddress = "127.0.0.1:3000";

  var data = {
    id: localStorage.getItem("id"),
  };
  $.ajax({
    url: `http://${ipAddress}/usuarios/eliminar`, // Asegúrate de reemplazar esto con la URL correcta
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json",
    success: function (response) {
      // Manejar la respuesta exitosa
      console.log(response);
      alertaSuccess("Eliminación exitosa");

      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      localStorage.removeItem("id");
      window.location.href = "../login/login.html";
    },
    error: function (error) {
      // Manejar el error
      console.error(error);
      alertaError("Error al eliminar");
    },
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

function validarContrasena(contrasena,usuario, confirmacionContrasena){
  // Sanitizar la contraseña usando regex (por ejemplo, eliminar espacios en blanco)
  var regex = /^\s+|\s+$/g;
  contrasena = contrasena.replace(regex, "");
  confirmacionContrasena = confirmacionContrasena.replace(regex, "");

  var regex = /[`"'();,[\]{}<>&]/g;

  //verificar formato de contraseña
  const requerimiento =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

  // Retorna true si la contraseña cumple con el formato, false en caso contrario
  if (!requerimiento.test(contrasena)) {
    alertaError(
      "Formato incorrecto",
      "La constraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un caracter especial autorizado."
    );
    return false;
  }

  if (regex.test(entradaUsuario)) {
    alertaError(
      "Datos incorrectos",
      "La entrada contiene caracteres no permitidos: ''`'&;,(){}<>[]"
    );
    return false;
  } 

  // Verificar que la contraseña no sea igual al usuario y que ambas contraseñas concuerdan
  if (contrasena === usuario || contrasena !== confirmacionContrasena) {
    alertaError(
      "Contraseña no permitida",
      "La contraseña no puede ser igual al usuario y debe coincidir con la confirmación."
    );
    return false;
  }
  return true
}