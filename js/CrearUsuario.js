import { supabase } from './supabase.js';

async function CrearUsuario() 
{
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();
    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value;
    const confirmar_password = document.getElementById("confirmar_password").value;
    if (!nombre || !apellido || !email || !usuario || !password || !confirmar_password) {
        alert("Por favor, complete todos los campos.");
        return;
    }
    if (password !== confirmar_password) {
        alert("Las contraseñas no coinciden.")
        return;
    }

    const {data, error} = await supabase.auth.signUp({
        email: email,
        password: password
    }); 

    if (error) {
        alert("Error al crear el usuario: " + error.message);
        return;
    }

    const {error: errorInsert} = await supabase
        .from("usuario")
        .insert([
            {
                id_usuario: data.user.id,
                nombre_usuario: nombre,
                apellido_usuario: apellido,
                email: email,
                usuario: usuario,
            }
        ]);

    if (errorInsert) {
        alert("Error al guardar datos adicionales: " + errorInsert.message);
        return;
    }

    alert("Usuario creado con éxito. Revisa tu correo para confirmar la cuenta.");
    window.location.href = "../../Login.html"
}

document.getElementById("CrearUsuario").addEventListener("click", CrearUsuario);