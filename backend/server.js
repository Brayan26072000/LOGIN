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

    loginForm.addEventListener("submit", async (event) => {
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

        try {
            // Obtener datos desde database.json
            const response = await fetch("/backend/database.json");
            const users = await response.json();

            // Buscar usuario en database.json
            const validUser = users.find(user => user.email === email && user.password === password);

            if (validUser) {
                localStorage.setItem("user", email);
                showMessage("Inicio de sesión exitoso. Cargando...", "success");

                setTimeout(() => {
                    window.location.href = "bienvenida.html";
                }, 1500);
            } else {
                showMessage("Usuario o contraseña incorrectos.", "error");
            }
        } catch (error) {
            console.error("Error al obtener los datos:", error);
            showMessage("Error al conectar con el servidor.", "error");
        }

        // Habilitar botón nuevamente
        loginButton.disabled = false;
        loginButton.textContent = "Iniciar Sesión";
    });

    // Función para mostrar mensajes con animación y desaparición automática
    function showMessage(msg, type) {
        message.textContent = msg;
        message.className = type;

        setTimeout(() => {
            message.textContent = "";
            message.className = "";
        }, 3000);
    }

    // Función para validar formato de correo electrónico
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});