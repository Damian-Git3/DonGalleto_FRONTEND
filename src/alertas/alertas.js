const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

export function alertaError(titulo, mensaje) {

    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: 'error',
        confirmButtonText: 'OK'
    });
}

export function alertaSuccess(titulo, mensaje) {

    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: 'success',
        confirmButtonText: 'OK'
    });
}

export function alertaInfo(titulo, mensaje) {
    
        Swal.fire({
            title: titulo,
            text: mensaje,
            icon: 'info',
            confirmButtonText: 'OK'
        });
}
    
export function alertaWarning(titulo, mensaje) {
    
        Swal.fire({
            title: titulo,
            text: mensaje,
            icon: 'warning',
            confirmButtonText: 'OK'
        });
}

export function alertaToastSuccess(titulo, mensaje) {
    Toast.fire({
        icon: "success",
        title: titulo,
        text: mensaje
    });
}

export function alertaToastError(titulo, mensaje) {
    Toast.fire({
        icon: "error",
        title: "Signed in successfully"
    });
}

export function alertaToastInfo(titulo, mensaje) {
    Toast.fire({
        icon: "info",
        title: titulo,
        text: mensaje
    });
}

export function alertaToastWarning(titulo, mensaje) {
    Toast.fire({
        icon: "warning",
        title: titulo,
        text: mensaje
    });
}