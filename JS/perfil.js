const API_URL_PERFIL = 'http://localhost:8080/api/usuarios';

async function obtenerDatosServidor() {
    try {
        const token = localStorage.getItem('token');
        const usuarioId = localStorage.getItem('usuarioId');

        const respuesta = await fetch(API_URL_PERFIL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!respuesta.ok) throw new Error(`Error en el servidor: ${respuesta.status}`);

        const usuarios = await respuesta.json();
        const usuario = usuarios.find(u => u.id === Number(usuarioId));

        if (!usuario) throw new Error("Usuario no encontrado en la respuesta del servidor");

        if (usuario.nombre) document.getElementById('nombrePerfil').textContent = usuario.nombre;
        if (usuario.carrera) document.getElementById('carreraPerfil').textContent = usuario.carrera;
        if (usuario.sobreMi) document.getElementById('sobreMi').textContent = usuario.sobreMi;
        if (usuario.sobreCarrera) document.getElementById('sobreCarrera').textContent = usuario.sobreCarrera;

        if (usuario.avatarUrl) document.getElementById('fotoPerfil').src = usuario.avatarUrl;

    } catch (error) {
        console.error("No se pudo conectar con el backend, usando datos locales de respaldo:", error);

        const nombreGuardado = localStorage.getItem('nombreUsuario') || "Juan Perez";
        const carreraGuardada = localStorage.getItem('carreraUsuario') || "Software Developer";

        if (document.getElementById('nombrePerfil')) document.getElementById('nombrePerfil').textContent = nombreGuardado;
        if (document.getElementById('carreraPerfil')) document.getElementById('carreraPerfil').textContent = carreraGuardada;
    }
}


document.addEventListener("DOMContentLoaded", obtenerDatosServidor);