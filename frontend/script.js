document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM cargado");

    const loginForm = document.getElementById("login-form");
    const message = document.getElementById("message");
    const loginButton = document.getElementById("login-button");

    if (!loginForm) {
        console.error("Error: No se encontró el formulario con id='login-form'");
        return;
    }

    // Verificar si el usuario ya está autenticado
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        window.location.href = "bienvenida.html";
        return;
    }

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // Validaciones
        if (!email || !password) {
            showMessage("Por favor, ingresa tu correo y contraseña.", "error");
            return;
        }

        if (!validateEmail(email)) {
            showMessage("Por favor, ingresa un correo válido.", "error");
            return;
        }

        if (password.length < 6) {
            showMessage("La contraseña debe tener al menos 6 caracteres.", "error");
            return;
        }

        // Deshabilitar botón y mostrar loading
        loginButton.disabled = true;
        loginButton.textContent = "Cargando...";

        // Simular respuesta del servidor con setTimeout
        setTimeout(() => {
            const validUser = "usuario@example.com";
            const validPassword = "123456";

            if (email === validUser && password === validPassword) {
                localStorage.setItem("user", email);
                showMessage("Inicio de sesión exitoso. Cargando...", "success");

                setTimeout(() => {
                    window.location.href = "bienvenida.html";
                }, 1500);
            } else {
                showMessage("Usuario o contraseña incorrectos.", "error");
            }

            // Habilitar botón nuevamente
            loginButton.disabled = false;
            loginButton.textContent = "Iniciar Sesión";
        }, 2000); // Simula un retraso de 2 segundos
    });

    // Función para mostrar mensajes de error o éxito
    function showMessage(msg, type) {
        message.textContent = msg;
        message.className = type; // Agrega una clase CSS (error o success)
    }

    // Función para validar formato de correo electrónico
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});