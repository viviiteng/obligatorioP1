const sistema = new Sistema();
sistema.precargarDatos();
//OCULTAR TODAS LAS PESTANAS
function ocultarSecciones() {
    let secciones = document.getElementsByTagName("section")
    for (let i = 0; i < secciones.length; i++) {
        secciones[i].style.display = "none"
    }
}


function ocultarBarraSegunTipoUsuario(esCliente){
    let uls = document.getElementsByTagName("ul")
    if(esCliente===true){
        uls[1].style.display = "block"
        uls[0].style.display = "none"
    }else if(esCliente===false){
        uls[0].style.display = "block"
        uls[1].style.display = "none"
    }else{
        console.log("uls", uls)
        for (let i = 0; i < uls.length; i++) {
            uls[i].style.display = "none"
        }
    }
}

function inicioSegunTipoUsuario(esCliente){
    
    document.querySelector("#seccionAdministrarDestinos").style.display = "block"
    ocultarBarraSegunTipoUsuario(esCliente)
    tabla=""
    let uls = document.getElementsByTagName("ul")
    if(esCliente===true){
        //tabla de Cliente
    }else if(esCliente===false){
        //tabla dinamica de admin
    }
}


function mostrarSeccionInicioSesion() {
    ocultarSecciones()
    ocultarBarraSegunTipoUsuario()
    document.querySelector("#seccionIniciarSesion").style.display = "block"
}
mostrarSeccionInicioSesion()


function mostrarSeccion() {
    
    let idBtn = this.getAttribute("id")
    let idSeccion = idBtn.charAt(3).toLowerCase() + idBtn.substring(4)
    
    let secciones = document.getElementsByTagName("section")
    for (let i = 0; i < secciones.length; i++) {
        let idExtraidoHTML = secciones[i].getAttribute("id")
        
        if ( idExtraidoHTML === idSeccion) {
            ocultarSecciones()
            document.querySelector("#"+idSeccion).style.display = "block"
        }
        console.log("idExtraidoHTML",idExtraidoHTML)
        console.log("idSeccion",idSeccion)
        console.log("coinciden",idExtraidoHTML === idSeccion)

    }

}

let botones = document.querySelectorAll(".boton")
for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", mostrarSeccion)

}


//REGISTRO DE USUARIO//

document.querySelector("#btnRegistrarNuevoUsuario").addEventListener("click", registrarNuevoUsuario)

function esUsuarioUnico(nombreUsuario) {

    for (let i = 0; i < sistema.usuarios.length; i++) {
        if (nombreUsuario === sistema.usuarios[i].usuario) {
            return i //ya existe un usuario igual
        }
    }
    return true

}
    
function registrarNuevoUsuario() {
    let nombreIngresado = document.querySelector("#txtNombreIngresado").value;
    let apellidoIngresado = document.querySelector("#txtApellidoIngresado").value;
    let usuarioIngresado = document.querySelector("#txtUsuarioIngresado").value;
    let passwordIngresada = document.querySelector("#txtPasswordIngresada").value;
    let passwordIngresadaConfirmacion = document.querySelector("#txtPassIngresada2").value;
    let tarjetaIngresada = document.querySelector("#nmbTarjetaIngresada").value;
    let cvcIngresado = document.querySelector("#nmbCvcIngresado").value;
    let mensaje=``

    let validacionFormato = validarRegistroDeUsuario(nombreIngresado, apellidoIngresado, usuarioIngresado, passwordIngresada, passwordIngresadaConfirmacion, tarjetaIngresada, cvcIngresado)
    let usuarioEncontrado = esUsuarioUnico(usuarioIngresado)

    if (validacionFormato) {

        if (usuarioEncontrado) {
            let nuevoUsuario = new Usuario(usuarioIngresado, passwordIngresada, "cliente", nombreIngresado, apellidoIngresado, passwordIngresadaConfirmacion, tarjetaIngresada, cvcIngresado)
            sistema.usuarios.push(nuevoUsuario)
            mostrarSeccionInicioSesion()
        } else {
            mensaje = `Usuario existente, intente de nuevo`

        }

    } else {
        mensaje = `Formato incorrecto, intente de nuevo`
    }

    document.querySelector("#pMensajeRegistro").innerHTML = mensaje

}
//INICIO DE SESION//
document.querySelector("#btnIniciarSesion").addEventListener("click", validarInicioDeSesion)

function esPasswordDeUsuarioIngresado(usuario,pass) {

    for (let i = 0; i < sistema.usuarios.length; i++) {
        if (pass === sistema.usuarios[i].password) {
            return false //ya existe un usuario igual
        }
    }
    return true

}
    let esCliente
function validarInicioDeSesion() {
    let usuarioIngresado = document.querySelector("#txtUsuarioSesion").value;
    let passwordIngresada = document.querySelector("#txtPasswordSesion").value;
    let posicionUsario =esUsuarioUnico(usuarioIngresado)
    let mensaje=``
    if (posicionUsario!==true) {
        
        if(sistema.usuarios[posicionUsario].password === passwordIngresada){
            if(sistema.usuarios[posicionUsario].tipoUsuario==="administrador"){
                alert("success as Admin")
                esCliente=false
                inicioSegunTipoUsuario(esCliente)
            }else{
                alert("success as Cliente")
                esCliente=true
                inicioSegunTipoUsuario(esCliente)
            } 
        }else{
            mensaje="Contraseña incorrecta"
        }

    }else{
        mensaje="Usuario incorrecto"
    }

    document.querySelector("#pMensajeIniciarSesion").innerHTML=mensaje
    
}





// document.querySelector("#btnQuieroRegistrarme").addEventListener("click", mostrarSeccion)