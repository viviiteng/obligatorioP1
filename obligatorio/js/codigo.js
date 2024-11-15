const sistema = new Sistema();
sistema.precargarDatos();
//OCULTAR TODAS LAS PESTANAS
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


function ocultarBarraSegunTipoUsuario(esCliente){
    let uls = document.getElementsByTagName("ul")
    if(esCliente===true){
        uls[1].style.display = "block"
        uls[0].style.display = "none"
    }else if(esCliente===false){
        uls[0].style.display = "block"
        uls[1].style.display = "none"
    }else{
        for (let i = 0; i < uls.length; i++) {
            uls[i].style.display = "none"
        }
    }
}



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

function inicioSegunTipoUsuario(esCliente){
    ocultarSecciones()
    document.querySelector("#seccionAdministrarDestinos").style.display = "block"
    ocultarBarraSegunTipoUsuario(esCliente)
    
    let tabla=""
    if(esCliente===true){
        ocultarElementosSegunClase("admin","cliente")
        for(let i=0; i<sistema.destinos.length; i++){
            if (sistema.destinos[i].estado==="activo") {
                tabla+=`<tr>
                        <td>
                            ${sistema.destinos[i].nombreDestino}
                        </td>
                        <td>${sistema.destinos[i].precio}</td>
                        <td><img src=${sistema.destinos[i].imagen} alt="prueba"></td>
                        <td>
                           <input type="button" value="Reservar" class="boton" data-btnTabla="btnReservar-${sistema.destinos[i].id} />
                        </td>
                        </tr>`
            }
        }
        
    }else if(esCliente===false){
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
    
    console.log("agregardestino",destinoIngresado,precio,checkOferta,descuento,cantidadCupos,descripcion,img)

    if ( validarNuevoDestino(destinoIngresado,precio,descuento,cantidadCupos,descripcion,img)) {
    
    }
    if(esOferta){
        document.querySelector("#cbOfertaA").removeAttribute("disable")
    }
    //if es oferta, mandar seccion oferta

    //pushear a sistema

    //numerico,obligatorio agregar todo

}
    
