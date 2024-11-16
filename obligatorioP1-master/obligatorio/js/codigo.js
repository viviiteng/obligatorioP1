const sistema = new Sistema();
sistema.precargarDatos();
//FUNCION OCULTAR PESTANAS
function ocultarSecciones() {
    let secciones = document.getElementsByTagName("section")
    for (let i = 0; i < secciones.length; i++) {
        secciones[i].style.display = "none"
    }
}

function ocultarElementosSegunClase(claseOcultada,claseMostrada) {
    let elementosOcultos = document.querySelectorAll(`.${claseOcultada}`)
    let elementosMostrados = document.querySelectorAll(`.${claseMostrada}`)
    for (let i = 0; i < elementosOcultos.length; i++) {
        elementosOcultos[i].style.display = "none"
    }
    for (let i = 0; i < elementosMostrados.length; i++) {
        elementosMostrados[i].style.display = "block"
    }

}


function ocultarBarraSegunTipoUsuario(tipoUsuario){
    let uls = document.getElementsByTagName("ul")
    if(tipoUsuario==="cliente"){
        uls[1].style.display = "block"
        uls[0].style.display = "none"
    }else if(tipoUsuario==="admin"){
        uls[0].style.display = "block"
        uls[1].style.display = "none"
    }else{
        for (let i = 0; i < uls.length; i++) {
            uls[i].style.display = "none"
        }
    }
}


//FUNCION Mostrar
function mostrarSeccionInicioSesion() {
    ocultarSecciones()
    ocultarBarraSegunTipoUsuario()
    document.querySelector("#seccionIniciarSesion").style.display = "block"
}
mostrarSeccionInicioSesion()


function mostrarSeccionSegunId() {
    
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
    botones[i].addEventListener("click", mostrarSeccionSegunId)    
}

function mostrarSeccionSegunData() {
    
    let idBtn = this.getAttribute("data-btnTabla")
    let idSeccion = idBtn.charAt(3).toLowerCase() + idBtn.substring(4,idBtn.indexOf("-"))    
    let secciones = document.getElementsByTagName("section")

    sistema.buscarDestinoPorID(idBtn.substring(idBtn.indexOf("-")+1))
    for (let i = 0; i < secciones.length; i++) {
        let idExtraidoHTML = secciones[i].getAttribute("id")
        
        if ( idExtraidoHTML === idSeccion) {
            ocultarSecciones()
            document.querySelector("#"+idSeccion).style.display = "block"           
        }
        console.log("idExtraidoHTMLDATA",idExtraidoHTML)
        console.log("idSeccionDATA",idSeccion)
        console.log("coincidenDATA",idExtraidoHTML === idSeccion)
    }
    // console.log("prueba", idBtn.substring(idBtn.indexOf("-")+1))
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
            sistema.cargarUsuario(usuarioIngresado, passwordIngresada, "cliente", nombreIngresado, apellidoIngresado, passwordIngresadaConfirmacion, tarjetaIngresada, cvcIngresado)
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

function validarInicioDeSesion() {
    let usuarioIngresado = document.querySelector("#txtUsuarioSesion").value;
    let passwordIngresada = document.querySelector("#txtPasswordSesion").value;
    let posicionUsario =esUsuarioUnico(usuarioIngresado)
    let mensaje=``
    if (posicionUsario!==true) {
        
        if(sistema.usuarios[posicionUsario].password === passwordIngresada){
            if(sistema.usuarios[posicionUsario].tipoUsuario==="admin"){
                alert("Inicio de sesión exitoso como administrador")
                sistema.usuarioLogueado=sistema.usuarios[posicionUsario]
                inicioSegunTipoUsuario(sistema.usuarioLogueado.tipoUsuario)
            }else{
                alert("Inicio de sesión exitoso como cliente")
                sistema.usuarioLogueado=sistema.usuarios[posicionUsario]
                inicioSegunTipoUsuario(sistema.usuarioLogueado.tipoUsuario)
            } 
        }else{
            mensaje="Contraseña incorrecta"
        }

    }else{
        mensaje="Usuario incorrecto"
    }

    document.querySelector("#pMensajeIniciarSesion").innerHTML=mensaje
}

function inicioSegunTipoUsuario(tipoUsuario){
    ocultarSecciones()
    document.querySelector("#seccionAdministrarDestinos").style.display = "block"
    ocultarBarraSegunTipoUsuario(tipoUsuario)

    let tabla=""
    if(tipoUsuario==="cliente"){
        ocultarElementosSegunClase("admin","cliente")
        for(let i=0; i<sistema.destinos.length; i++){
            if ((sistema.destinos[i].estado==="activo") && !(sistema.destinos[i].esOferta)){
                tabla+=`<tr>
                <td>
                    ${sistema.destinos[i].nombreDestino}
                </td>
                <td>${"US$"}${sistema.destinos[i].precio}</td>
                <td><img src=${sistema.destinos[i].imagen} alt="prueba"></td>
                <td>${sistema.destinos[i].descripcion}</td>
                <td>
                    <input type="button" value="Reservar" class="botonTabla"  data-btnTabla="btnSeccionRealizarReservas-${sistema.destinos[i].id}" />
                </td>
                </tr>`
            }
        }
        
    }else if(tipoUsuario==="admin"){
        ocultarElementosSegunClase("cliente","admin")
        for(let i=0; i<sistema.destinos.length; i++){
            tabla+=`<tr>
                <td>
                    ${sistema.destinos[i].nombreDestino}
                </td>
                <td>${"US$"}${sistema.destinos[i].precio}</td>
                <td><img src=${sistema.destinos[i].imagen} alt="prueba"></td>
                <td>${sistema.destinos[i].descripcion}</td>
                <td>
                    <input type="button" value="Editar" class="botonTabla"  data-btnTabla="btnSeccionEditarDestinos-${sistema.destinos[i].id}" />
                    <input type="button" value="Eliminar" class="botonTabla" data-btnTabla="btnEliminar-${sistema.destinos[i].id}"/>
                    <select class="botonTabla" name="${sistema.destinos[i].id}" data-btnTabla="slcEstado-${sistema.destinos[i].id}">
                    <option value="activo">Activado</option>
                    <option value="pausado">Pausado</option>
                    </select>
                </td>
                </tr>`
        }
    }
    document.querySelector("#tbDestinos").innerHTML=tabla

    let botonesTabla = document.querySelectorAll(".botonTabla")
        for (let i = 0; i < botonesTabla.length; i++) {
            botonesTabla[i].addEventListener("click", mostrarSeccionSegunData)            
        }
}

//AGREGAR DESTINO

document.querySelector("#btnAgregarDestinoConfirmar").addEventListener("click", agregarNuevoDestino)

function agregarNuevoDestino() {

    let destinoIngresado = document.querySelector("#txtDestinoA").value
    let precio = document.querySelector("#nmbPrecioA").value
    let esOferta = document.querySelector("#cbOfertaA").checked
    let descuento = document.querySelector("#nmbDescuentoA").value
    let cantidadCupos = document.querySelector("#nmbAgregarCuposA").value
    let descripcion = document.querySelector("#txtDescripcionA").value
    let img = document.querySelector("#txtSubirIMGA").value
        
    if (validarNuevoDestino(destinoIngresado,precio,descuento,cantidadCupos,descripcion,img)) {
        sistema.cargarDestino(destinoIngresado,precio,img,"pausado",cantidadCupos,descripcion,esOferta)
        inicioSegunTipoUsuario(tipoUsuario)
        
    }

}
    
document.querySelector("#cbOfertaA").addEventListener("click", mostrarCampoDescuento)

function mostrarCampoDescuento(){
    let esOferta = document.querySelector("#cbOfertaA").checked
    if(esOferta){
        document.querySelector("#nmbDescuentoA").removeAttribute("disabled")
    }else if(!esOferta){
        document.querySelector("#nmbDescuentoA").setAttribute("disabled","true")
    }
    console.log("esOferta", esOferta)
}   

// EDITAR DESTINOS


document.querySelector("#btnEditarDestinoConfirmar").addEventListener("click", editarDestino)

function editarDestino() {

    let destinoIngresado = document.querySelector("#txtDestinoE").value
    let precio = document.querySelector("#nmbPrecioE").value
    let esOferta = document.querySelector("#cbOfertaE").checked
    let descuento = document.querySelector("#nmbDescuentoE").value
    let cantidadCupos = document.querySelector("#nmbAgregarCuposE").value
    let descripcion = document.querySelector("#txtDescripcionE").value
    let img = document.querySelector("#txtSubirIMGE").value
        
    if (validarNuevoDestino(destinoIngresado,precio,descuento,cantidadCupos,descripcion,img)) {
        for (let i = 0; i < sistema.destinos.length; i++) {
            let destino= sistema.destinos[i]
            if(sistema.destinoEspecifico.id===destino.id){
                destino.nombreDestino=destinoIngresado
                destino.precio=precio
                destino.imagen=img
                destino.cuposDisponibles=cantidadCupos
                destino.descripcion=descripcion
                destino.esOferta=esOferta
            }   
        }
    inicioSegunTipoUsuario(tipoUsuario)
       
    }
    console.log("destinoespecifico",sistema.destinoEspecifico)
    console.log("arrayDestino")

}



//CLIENTE-VER OFERTAS
let seccionOferta=document.querySelector("#seccionOfertas")
document.querySelector("#btnSeccionOfertas").addEventListener("click",mostrarSeccionOferta)
function mostrarSeccionOferta(){
    ocultarBarraSegunTipoUsuario(sistema.usuarioLogueado.tipoUsuario)
    
    tabla=""
    
    for(let i=0; i<sistema.destinos.length; i++){
        if ((sistema.destinos[i].estado==="activo") && (sistema.destinos[i].esOferta===true)){
            tabla+=`<tr>
            <td>
                ${sistema.destinos[i].nombreDestino}
            </td>
            <td>${"US$"}${sistema.destinos[i].precio}</td>
            <td><img src=${sistema.destinos[i].imagen} alt="prueba"></td>
            <td>${sistema.destinos[i].descripcion}</td>
            <td>
                <input type="button" value="Reservar" class="botonTabla"  data-btnTabla="btnSeccionRealizarReservas-${sistema.destinos[i].id}" />
            </td>
            </tr>`
        }
    }

    document.querySelector("#tblOferta").innerHTML=tabla
}

document.querySelector("#btnVolverInicioDesdeOfertas").addEventListener("click",volverAPaginaInicial)

function volverAPaginaInicial(){
    inicioSegunTipoUsuario(sistema.usuarioLogueado.tipoUsuario)
}
