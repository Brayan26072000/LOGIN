const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // Permite comunicación entre frontend y backend
app.use(express.json()); // Permite leer JSON en las peticiones
app.use(express.static("frontend")); // Permite acceder a los archivos en /frontend

// Usuarios de prueba (para simular la autenticación)
const users = [
    { email: "usuario@example.com", password: "123456" }
];

// Ruta para login
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        return res.json({ success: true, message: "Inicio de sesión exitoso", user: email });
    } else {
        return res.status(401).json({ success: false, message: "Usuario o contraseña incorrectos" });
    }
});

// Servidor corriendo en el puerto 5000
app.listen(5000, () => {
    console.log("Servidor backend corriendo en http://localhost:5000");
});
