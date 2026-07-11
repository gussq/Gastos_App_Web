import { supabase } from './supabase.js';

async function SolicitarResetPassword() {
    const email = document.getElementById("email").value.trim();

    if (!email) {
        alert("Ingresa tu correo electrónico");
        return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://gussqporyectos.online/Gastos/Link/Reiniciar_Pass.html"
    });

    if (error) {
        alert("Error: " + error.message);
        return;
    }

    alert("Revisa tu correo, te enviamos un link para restablecer tu contraseña.");
}

async function EstablecerNuevaPassword() {

    const password_nuevo = document.getElementById("password_nuevo").value.trim();
    const password_confirmacion = document.getElementById("password_confirmacion").value.trim();

    if (!password_nuevo || !password_confirmacion) {
        alert("Completa ambos campos");
        return;
    }
    if (password_nuevo !== password_confirmacion) {
        alert("Las contraseñas no coinciden");
        return;
    }

    const { error } = await supabase.auth.updateUser({
        password: password_nuevo
    });

    if (error) {
        alert("Error al actualizar la contraseña: " + error.message);
        return;
    }

    alert("Contraseña actualizada con éxito. Ya puedes iniciar sesión.");
    window.location.replace("../../login.html");
}

async function MostrarDatosUsuario(){
    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
            .from("usuario")
            .select("usuario")  
            .eq("id_usuario", user.id)
            .single();

    if (error) {
        console.error("Error al traer datos:", error.message);
        return;
    }

    document.getElementById("correoUsuario").textContent = user.email;
    document.getElementById("nombreUsuario").textContent = data.usuario;
}
document.getElementById("SolicitarResetPassword").addEventListener("click", SolicitarResetPassword);
MostrarDatosUsuario();
document.getElementById("EstablecerNuevaPassword").addEventListener("click", EstablecerNuevaPassword);
