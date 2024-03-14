import { validarUsuario } from "../src/login/login.js";
import { alertaSuccess } from "../src/alertas/alertas.js";
import { alertaToastSuccess } from "../src/alertas/alertas.js";

// Llama a la función al cargar la página
document.addEventListener('DOMContentLoaded', async function () { 
    cargarLogin();        
});

async function cargarInicio() {
    try {
        const navbar = await fetch('../src/navbar/navbar.html');
        const navbarHTML = await navbar.text();
        const usuarioModule = await fetch('../src/usuarios/usuario.html');
        const usuarioHTML = await usuarioModule.text();

        const mainContainer = document.getElementById('mainContainer');

        document.getElementById('loginContainer').remove();
        // Inserta el contenido de navbarHTML justo antes del mainContainer
        mainContainer.insertAdjacentHTML('afterbegin', navbarHTML);
        mainContainer.insertAdjacentHTML('beforeend', usuarioHTML);

        alertaToastSuccess("CORRECTO", "FUNCIONANDO");

    } catch (error) {
        console.error('Error al cargar el contenido HTML:', error);
    }
    
}

async function cargarLogin() {
    try {
        const response = await fetch('../src/login/login.html');
        const contenidoHTML = await response.text();

        document.getElementById('mainContainer').innerHTML = contenidoHTML;
        document.getElementById('btnLogin').onclick = cargarInicio;

        alertaToastSuccess("CORRECTO", "FUNCIONANDO");

    } catch (error) {
        console.error('Error al cargar el contenido HTML:', error);
    }
}
