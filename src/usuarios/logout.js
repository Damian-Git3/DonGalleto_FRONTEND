// Configuración del tiempo de inactividad en milisegundos (5 minutos en este caso)
const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutos
let logoutTimer;

function resetLogoutTimer() {
  clearTimeout(logoutTimer);
  logoutTimer = setTimeout(logout, INACTIVITY_TIMEOUT);
}

function logout() {
  localStorage.clear();
  window.location.href = "../login/login.html";
}

// Reiniciar el temporizador de cierre de sesión en eventos de actividad
document.addEventListener("click", resetLogoutTimer);
document.addEventListener("mousemove", resetLogoutTimer);
document.addEventListener("keypress", resetLogoutTimer);

// Iniciar el temporizador al cargar la página
resetLogoutTimer();
