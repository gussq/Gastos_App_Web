import { supabase } from './supabase.js';

async function IniciarSesion() {
    const usuario = document.getElementById("usuario").value.trim()
    const password = document.getElementById("password").value.trim()

    if (!usuario || !password) {
        alert("Complete todos los campos")
        return;
    } 

    const { data: email, error} = await supabase
        .rpc('obtener_email_login', {p_usuario: usuario})
    
    console.log("Esto es lo que devuelve email:", email); 

    if (error || !email) {
        alert("Usuario o Contraseña Incorrecta");
        return;
    }

    const { error: errorLogin, data: dataLogin } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })

    if (errorLogin) {
        alert("Error al ingresar: " + errorLogin.message);
        return;
    }

    const { error: errorUpdate } = await supabase
        .from("usuario")
        .update({
            ult_inicio_sesion: new Date().toISOString()
        })
        .eq("id_usuario", dataLogin.user.id); 
    
    console.log("Inicio de sesion:", new Date().toISOString())

    if (errorUpdate) {
        alert("Error al grabar la ultima sesion: " + errorUpdate.message);
        return;
    }
    
    alert(`Inicio de Sesion correcto: ${usuario}, redirigiendo a la pagina principal`);
    window.location.href = "Gastos/Menu_Principal.html"

}

document.getElementById("IniciarSesion").addEventListener("click", IniciarSesion);