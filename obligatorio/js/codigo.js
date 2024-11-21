const sistema = new Sistema();
sistema.precargarDatos();
//FUNCION OCULTAR PESTANAS

function ocultarSecciones() {
    let secciones = document.getElementsByTagName("section")
    for (let i = 0; i < secciones.length; i++) {
        secciones[i].style.display = "none"
    }
}

function ocultarElementosSegunClase(claseOcultada, claseMostrada) {
    let elementosOcultos = document.querySelectorAll(`.${claseOcultada}`)
    let elementosMostrados = document.querySelectorAll(`.${claseMostrada}`)
    for (let i = 0; i < elementosOcultos.length; i++) {
        elementosOcultos[i].style.display = "none"
    }
    for (let i = 0; i < elementosMostrados.length; i++) {
        elementosMostrados[i].style.display = "block"
    }

}


function ocultarBarraSegunTipoUsuario(tipoUsuario) {
    let uls = document.getElementsByTagName("ul")
    if (tipoUsuario === "cliente") {
        uls[1].style.display = "block"
        uls[0].style.display = "none"
    } else if (tipoUsuario === "admin") {
        uls[0].style.display = "block"
        uls[1].style.display = "none"
    } else {
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

        if (idExtraidoHTML === idSeccion) {
            ocultarSecciones()
            document.querySelector("#" + idSeccion).style.display = "block"
        }
        //console.log("idExtraidoHTML", idExtraidoHTML)
        // console.log("idSeccion", idSeccion)
        //console.log("coinciden", idExtraidoHTML === idSeccion)
    }
}

let botones = document.querySelectorAll(".boton")
for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", mostrarSeccionSegunId)
}

function mostrarSeccionSegunData() {

    let idBtn = this.getAttribute("data-btn")
    let idSeccion = idBtn.charAt(3).toLowerCase() + idBtn.substring(4, idBtn.indexOf("-"))
    let secciones = document.getElementsByTagName("section")


    sistema.buscarPosicionDestinoPorID(idBtn.substring(idBtn.indexOf("-") + 1))
    sistema.buscarObjetoReservaPorID(Number(idBtn.substring(idBtn.indexOf("-") + 1)))
    for (let i = 0; i < secciones.length; i++) {
        let idExtraidoHTML = secciones[i].getAttribute("id")

        if (idExtraidoHTML === idSeccion) {
            ocultarSecciones()
            document.querySelector("#" + idSeccion).style.display = "block"
        }
        //console.log("idExtraidoHTMLDATA", idExtraidoHTML)
        //console.log("idSeccionDATA", idSeccion)
        //console.log("coincidenDATA", idExtraidoHTML === idSeccion)
        //console.log("************************")
    }


}

//CERRAR SESION
let botonesNav = document.querySelectorAll(".botonNavBar")
for (let i = 0; i < botonesNav.length; i++) {
    sistema.usuarioLogueado = null
    sistema.destinoEspecifico = null
    sistema.reservaEspecifica = null
    botonesNav[i].addEventListener("click", mostrarSeccionSegunData)
}

document.querySelector("#btnConfimarCerrarSesion").addEventListener("click", mostrarSeccionInicioSesion)
document.querySelector("#btnVolverAlInicio").addEventListener("click", inicioSegunTipoUsuario)

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
    let mensaje = ``

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
    let posicionUsario = esUsuarioUnico(usuarioIngresado)
    let mensaje = ``
    if (posicionUsario !== true) {

        if (sistema.usuarios[posicionUsario].password === passwordIngresada) {
            if (sistema.usuarios[posicionUsario].tipoUsuario === "admin") {
                alert("Inicio de sesión exitoso como administrador")
                sistema.usuarioLogueado = sistema.usuarios[posicionUsario]
                inicioSegunTipoUsuario()
            } else {
                alert("Inicio de sesión exitoso como cliente")
                sistema.usuarioLogueado = sistema.usuarios[posicionUsario]
                inicioSegunTipoUsuario()
            }
        } else {
            mensaje = "Contraseña incorrecta"
        }

    } else {
        mensaje = "Usuario incorrecto"
    }

    document.querySelector("#pMensajeIniciarSesion").innerHTML = mensaje
}

function inicioSegunTipoUsuario() {
    let tipoUsuario = sistema.usuarioLogueado.tipoUsuario
    ocultarSecciones()
    sistema.pausarDestinosPorCuposAgotados()
    document.querySelector("#seccionAdministrarDestinos").style.display = "block"
    ocultarBarraSegunTipoUsuario(tipoUsuario)

    let tabla = ""
    if (tipoUsuario === "cliente") {
        ocultarElementosSegunClase("admin", "cliente")
        for (let i = 0; i < sistema.destinos.length; i++) {
            if ((sistema.destinos[i].estado === "activo") && !(sistema.destinos[i].esOferta)) {
                tabla += `<tr>
                <td>
                    ${sistema.destinos[i].nombreDestino}
                </td>
                <td>${"US$"}${sistema.destinos[i].precio}</td>
                <td><img src=${sistema.destinos[i].imagen} alt="prueba"></td>
                <td>${sistema.destinos[i].descripcion}</td>
                <td>
                    <input type="button" value="Reservar" class="botonTabla"  data-btn="btnSeccionRealizarReservas-${sistema.destinos[i].id}" />
                </td>
                </tr>`
            }
        }

    } else if (tipoUsuario === "admin") {
        ocultarElementosSegunClase("cliente", "admin")
        let valueBoton
        for (let i = 0; i < sistema.destinos.length; i++) {
            if (sistema.destinos[i].estado === "activo") {
                valueBoton = "pausar"
            } else {
                valueBoton = "activar"
            }
            tabla += `<tr>
                <td>
                    ${sistema.destinos[i].nombreDestino}
                </td>
                <td>${"US$"}${sistema.destinos[i].precio}</td>
                <td><img src=${sistema.destinos[i].imagen} alt="prueba"></td>
                <td>${sistema.destinos[i].descripcion}</td>
                <td>
                    <input type="button" value="Editar" class="botonTabla btnEditar"  data-btn="btnSeccionEditarDestinos-${sistema.destinos[i].id}" />
                    <input type="button" value="Eliminar" class="botonTabla" data-btn="btnSeccionEliminarDestinos-${sistema.destinos[i].id}"/>
                    <input type="button" value="${valueBoton}" class="botonTabla" data-btn="btnSeccionConfirmarEstado-${sistema.destinos[i].id}"/>
                </td>
                </tr>`
        }
    }
    document.querySelector("#tbDestinos").innerHTML = tabla

    let botonesTabla = document.querySelectorAll(".botonTabla")
    for (let i = 0; i < botonesTabla.length; i++) {
        botonesTabla[i].addEventListener("click", mostrarSeccionSegunData)
    }


    let botonesEditar = document.querySelectorAll(".btnEditar")
    for (let i = 0; i < botonesEditar.length; i++) {
        botonesEditar[i].addEventListener("click", cargarDatosExistentesDestinos)
    }
}


//AGREGAR DESTINO

document.querySelector("#btnAgregarDestinoConfirmar").addEventListener("click", agregarNuevoDestino)

function agregarNuevoDestino() {

    let destinoIngresado = document.querySelector("#txtDestinoA").value
    let precio = document.querySelector("#nmbPrecioA").value
    let esOferta = document.querySelector("#cbOfertaA").checked
    let cantidadCupos = document.querySelector("#nmbAgregarCuposA").value
    let descripcion = document.querySelector("#txtDescripcionA").value
    let img = document.querySelector("#txtSubirIMGA").value

    if (validarNuevoDestino(destinoIngresado, precio, cantidadCupos, descripcion, img)) {
        sistema.cargarDestino(destinoIngresado, precio, img, "pausado", cantidadCupos, descripcion, esOferta)
        inicioSegunTipoUsuario()

    } else {
        document.querySelector("#pErrorSeccionAgregar").innerHTML = "Todos los espacios deben ser ingresados y los valores numericos deben ser mayor a 0"
    }

}

// EDITAR DESTINOS

function cargarDatosExistentesDestinos() {

    document.querySelector("#txtDestinoE").value = sistema.destinoEspecifico.nombreDestino
    document.querySelector("#nmbPrecioE").value = sistema.destinoEspecifico.precio
    document.querySelector("#cbOfertaE").checked = sistema.destinoEspecifico.esOferta
    document.querySelector("#nmbAgregarCuposE").value = sistema.destinoEspecifico.cuposDisponibles
    document.querySelector("#txtDescripcionE").value = sistema.destinoEspecifico.descripcion
    document.querySelector("#txtSubirIMGE").value = sistema.destinoEspecifico.imagen
}


document.querySelector("#btnEditarDestinoConfirmar").addEventListener("click", editarDestino)

function editarDestino() {
    let destinoIngresado = document.querySelector("#txtDestinoE").value
    let precio = document.querySelector("#nmbPrecioE").value
    let esOferta = document.querySelector("#cbOfertaE").checked
    let cantidadCupos = document.querySelector("#nmbAgregarCuposE").value
    let descripcion = document.querySelector("#txtDescripcionE").value
    let img = document.querySelector("#txtSubirIMGE").value

    console.log(destinoIngresado, precio, esOferta, cantidadCupos, descripcion, img)
    if (validarNuevoDestino(destinoIngresado, precio, cantidadCupos, descripcion, img)) {
        for (let i = 0; i < sistema.destinos.length; i++) {
            let destino = sistema.destinos[i]
            if (sistema.destinoEspecifico.id === destino.id) {
                destino.nombreDestino = destinoIngresado
                destino.precio = precio
                destino.imagen = img
                destino.cuposDisponibles = cantidadCupos
                destino.descripcion = descripcion
                destino.esOferta = esOferta
            }
            inicioSegunTipoUsuario()
        }

    } else {
        document.querySelector("#pErrorEditarDestinos").innerHTML = "Es obligatorio ingresar el nombre del destino y las secciones numericas no pueden ser menor a 0"
    }
}


//ELIMINAR DESTINO
document.querySelector("#btnConfimarEliminacionDestino").addEventListener("click", eliminarDestino)

function eliminarDestino() {
    let posicionDestino = sistema.buscarPosicionDestinoPorID(sistema.destinoEspecifico.id)
    sistema.destinos.splice(posicionDestino, 1)
    inicioSegunTipoUsuario()
}
document.querySelector("#btnVolverdDesdeConfirmacionEliminarDestino").addEventListener("click", inicioSegunTipoUsuario)


//ACTIVAR O PAUSAR DESTINO
document.querySelector("#btnConfimarEstado").addEventListener("click", cambiarEstadoDestino)

function cambiarEstadoDestino() {
    posicionDestino = sistema.buscarPosicionDestinoPorID(sistema.destinoEspecifico.id)
    if(sistema.destinos[posicionDestino].cuposDisponibles>0){
        if (sistema.destinoEspecifico.estado === "activo") {
            sistema.destinos[posicionDestino].estado = "pausado"
        } else {
            sistema.destinos[posicionDestino].estado = "activo"
        }
        inicioSegunTipoUsuario()
    }else{
        alert("Cupos agotados")
        inicioSegunTipoUsuario()
    }
}
document.querySelector("#btnVolverDesdeConfirmarEstado").addEventListener("click", inicioSegunTipoUsuario)


//CLIENTE-VER OFERTAS
let seccionOferta = document.querySelector("#seccionOfertas")
document.querySelector("#btnSeccionOfertas").addEventListener("click", mostrarSeccionOferta)
function mostrarSeccionOferta() {
    ocultarBarraSegunTipoUsuario(sistema.usuarioLogueado.tipoUsuario)

    let tabla = ""

    for (let i = 0; i < sistema.destinos.length; i++) {
        if ((sistema.destinos[i].estado === "activo") && (sistema.destinos[i].esOferta === true)) {
            tabla += `<tr>
            <td>
                ${sistema.destinos[i].nombreDestino}
            </td>
            <td>${"US$"}${sistema.destinos[i].precio}</td>
            <td><img src=${sistema.destinos[i].imagen} alt="prueba"></td>
            <td>${sistema.destinos[i].descripcion}</td>
            <td>
            <input type="button" value="Reservar" class="botonTablaOferta"  data-btn="btnSeccionRealizarReservas-${sistema.destinos[i].id}" />            
            </td>
            </tr>`

        }
    }

    document.querySelector("#tblOferta").innerHTML = tabla
    let botonesTabla = document.querySelectorAll(".botonTablaOferta")
    for (let i = 0; i < botonesTabla.length; i++) {
        botonesTabla[i].addEventListener("click", mostrarSeccionSegunData)
    }

    console.log("botonesTabla", botonesTabla)

}
document.querySelector("#btnVolverInicioDesdeOfertas").addEventListener("click", inicioSegunTipoUsuario)

//RESERVA
document.querySelector("#btnReservar").addEventListener("click", realizarReserva)

function realizarReserva() {
    let cantidadPersonas = Number(document.querySelector("#nmbPersonasReservas").value)
    let metodoPago = document.querySelector("#slcMetodoDePago").value
    let descripcion = document.querySelector("#txtDescripcionReserva").value
    let millasUsuario = sistema.usuarioLogueado.millas

    let precioPaquete = sistema.destinoEspecifico.precio
    let dineroGastado = precioPaquete * cantidadPersonas
    let mensaje = ""
    if (cantidadPersonas > 0 && descripcion !== "") {
        switch (metodoPago) {
            case "millas":
                dineroGastado = precioPaquete * cantidadPersonas - millasUsuario
                sistema.cargarReserva(sistema.usuarioLogueado.id, sistema.destinoEspecifico.id, cantidadPersonas, dineroGastado, millasUsuario, "pendiente", descripcion)
                inicioSegunTipoUsuario()
                break;
            case "tarjeta":
                sistema.cargarReserva(sistema.usuarioLogueado.id, sistema.destinoEspecifico.id, cantidadPersonas, dineroGastado, 0, "pendiente", descripcion)
                inicioSegunTipoUsuario()
                break;
            default:
                mensaje = `Seleccione un metodo de pago`
                break;
        }

    } else {
        mensaje = `Por favor complete la informacion requerida`
    }
    document.querySelector("#pMensajeReserva").innerHTML = mensaje
}


//LISTA DE RESERVAS PENDIENTES
document.querySelector("#btnSeccionReservasPendientes").addEventListener("click", mostrarReservasPendientes)
function mostrarReservasPendientes() {
    
    ocultarBarraSegunTipoUsuario(sistema.usuarioLogueado.tipoUsuario)
    let idUsuarioReservante
    let tabla = ""

    for (let i = 0; i < sistema.reservas.length; i++) {
        idUsuarioReservante = sistema.reservas[i].idUsuario
        idDestino = sistema.reservas[i].idDestino

        if (sistema.reservas[i].estadoReserva === "pendiente") {
            tabla += `
            <tr>
              <td>${sistema.buscarUsuarioPorId(idUsuarioReservante).usuario}</td>
              <td>${sistema.buscarObjetoDestinoPorID(idDestino).nombreDestino}</td>
              <td>${sistema.reservas[i].cantidadPersonas}</td>
              <td>${sistema.reservas[i].dineroGastado}</td>
              <td>${sistema.reservas[i].millasGastadas}</td>
              <td>${sistema.reservas[i].estadoReserva}</td>
              <td>${sistema.reservas[i].descripcion}</td>
              <td>
                <input type="button" value="Aprobar reserva" class="botonTabla" data-btn="btnSeccionProcesarReserva-${sistema.reservas[i].idReserva}"/>
              </td>
            </tr>
            `

        }
    }
    document.querySelector("#tbListaDeReservasPendientes").innerHTML = tabla

    let botonesTabla = document.querySelectorAll(".botonTabla")
    for (let i = 0; i < botonesTabla.length; i++) {
        botonesTabla[i].addEventListener("click", mostrarSeccionSegunData)
    }
}


//LISTA DE RESERVAS APROBADAS
document.querySelector("#btnSeccionListaDeReservasAprobadas").addEventListener("click", mostrarReservasAprobadas)
function mostrarReservasAprobadas() {
    ocultarBarraSegunTipoUsuario(sistema.usuarioLogueado.tipoUsuario)
    let idUsuarioReservante
    let tabla = ""

    for (let i = 0; i < sistema.reservas.length; i++) {
        idUsuarioReservante = sistema.reservas[i].idUsuario
        idDestino = sistema.reservas[i].idDestino

        if (sistema.reservas[i].estadoReserva === "aprobada") {
            tabla += `
            <tr>
              <td>${sistema.buscarUsuarioPorId(idUsuarioReservante).usuario}</td>
              <td>${sistema.buscarObjetoDestinoPorID(idDestino).nombreDestino}</td>
              <td>${sistema.reservas[i].cantidadPersonas}</td>
              <td>${sistema.reservas[i].dineroGastado}</td>
              <td>${sistema.reservas[i].millasGastadas}</td>
              <td>${sistema.reservas[i].estadoReserva}</td>
              <td>${sistema.reservas[i].descripcion}</td>
            </tr>
            `

        }
    }
    document.querySelector("#tbListaDeReservasAprobadas").innerHTML = tabla
}

//LISTA DE RESERVAS RECHAZADAS
document.querySelector("#btnSeccionListaDeReservasRechazadas").addEventListener("click", mostrarReservasRechazadas)
function mostrarReservasRechazadas() {
    ocultarBarraSegunTipoUsuario(sistema.usuarioLogueado.tipoUsuario)
    let idUsuarioReservante
    let tabla = ""

    for (let i = 0; i < sistema.reservas.length; i++) {
        idUsuarioReservante = sistema.reservas[i].idUsuario
        idDestino = sistema.reservas[i].idDestino

        if (sistema.reservas[i].estadoReserva === "rechazada") {
            tabla += `
            <tr>
              <td>${sistema.buscarUsuarioPorId(idUsuarioReservante).usuario}</td>
              <td>${sistema.buscarObjetoDestinoPorID(idDestino).nombreDestino}</td>
              <td>${sistema.reservas[i].cantidadPersonas}</td>
              <td>${sistema.reservas[i].dineroGastado}</td>
              <td>${sistema.reservas[i].millasGastadas}</td>
              <td>${sistema.reservas[i].estadoReserva}</td>
              <td>${sistema.reservas[i].descripcion}</td>
            </tr>
            `

        }
    }
    document.querySelector("#tbListaDeReservasRechazadas").innerHTML = tabla
}

//APROBAR RESERVA
document.querySelector("#btnProcesarReserva").addEventListener("click", procesarReserva)
function procesarReserva() {

    let precioPaquete = sistema.reservaEspecifica.dineroGastado + sistema.reservaEspecifica.millasGastadas
    let usuarioReservante = sistema.buscarUsuarioPorId(sistema.reservaEspecifica.idUsuario)
    let dineroDisponibleUsuario = usuarioReservante.saldo
    let millasDisponibleUsuario = usuarioReservante.millas
    let idReserva = sistema.reservaEspecifica.idReserva
    let conMillas = ""

    if (sistema.reservaEspecifica.millasGastadas === 0) {
        conMillas = "false"
    } else {
        conMillas = "true"
    }

    let contadorReservasRepetidas = 0
    for (let i = 0; i < sistema.reservas.length; i++) {
        if (sistema.reservas[i].estadoReserva === "aprobada" &&
            sistema.reservas[i].idDestino === sistema.reservaEspecifica.idDestino &&
            sistema.reservas[i].idUsuario === sistema.reservaEspecifica.idUsuario){
            contadorReservasRepetidas++
        }
        console.log(`sistema.reservas[i].estado`,sistema.reservas[i].estadoReserva)
        console.log(`sistema.reservas[i].estado === "aprobada"`,sistema.reservas[i].estadoReserva === "aprobada")
        
        console.log("sistema.reservas[i].idDestino", sistema.reservas[i].idDestino)
        console.log("sistema.reservaEspecifica.idDestino", sistema.reservaEspecifica.idDestino)
        console.log("sistema.reservas[i].idDestino === sistema.reservaEspecifica.idDestino",sistema.reservas[i].idDestino === sistema.reservaEspecifica.idDestino)

        console.log(`sistema.reservas[i].idUsuario`,sistema.reservas[i].idUsuario)
        console.log("sistema.reservaEspecifica.idUsuario",sistema.reservaEspecifica.idUsuario)
        console.log(`sistema.reservas[i].idUsuario === sistema.reservaEspecifica.idUsuario`,sistema.reservas[i].idUsuario === sistema.reservaEspecifica.idUsuario)

    }

    if(sistema.reservaEspecifica.cantidadPersonas <= sistema.buscarObjetoDestinoPorID(sistema.reservaEspecifica.idDestino).cuposDisponibles){
        if (contadorReservasRepetidas === 0) {
            switch (conMillas) {
                case "false":

                    if (dineroDisponibleUsuario >= precioPaquete) {
                        usuarioReservante.saldo = dineroDisponibleUsuario - precioPaquete
                        sistema.buscarObjetoReservaPorID(idReserva).estadoReserva = "aprobada"
                        sistema.buscarObjetoDestinoPorID(sistema.reservaEspecifica.idDestino).cuposDisponibles -= sistema.reservaEspecifica.cantidadPersonas
                        alert("Reserva realizada exitosamente #S")
                        inicioSegunTipoUsuario()
                    } else {
                        alert("Saldo insuficiente")
                        sistema.buscarObjetoReservaPorID(idReserva).estadoReserva = "rechazada"
                        inicioSegunTipoUsuario()
                    }
                    break;
                case "true":
                    if (dineroDisponibleUsuario >= precioPaquete) {
                        usuarioReservante.saldo = dineroDisponibleUsuario - sistema.reservaEspecifica.dineroGastado
                        usuarioReservante.millas = millasDisponibleUsuario - sistema.reservaEspecifica.millasGastadas
                        usuarioReservante.millas += sistema.reservaEspecifica.dineroGastado / 100
                        sistema.buscarObjetoReservaPorID(idReserva).estadoReserva = "aprobada"
                        sistema.buscarObjetoDestinoPorID(sistema.reservaEspecifica.idDestino).cuposDisponibles -= sistema.reservaEspecifica.cantidadPersonas
                        alert("Reserva realizada exitosamente #M")
                        inicioSegunTipoUsuario()
                    } else {
                        alert("Saldo insuficiente")
                        sistema.buscarObjetoReservaPorID(idReserva).estadoReserva = "rechazada"
                        inicioSegunTipoUsuario()
                    }
                    break;
            }
            } else {
                alert("Peticion de reserva repetida")
                sistema.buscarObjetoReservaPorID(idReserva).estadoReserva = "rechazada"
                inicioSegunTipoUsuario()
        
            
        }
    }else{
        alert("Cupos insuficientes")
        sistema.buscarObjetoReservaPorID(idReserva).estadoReserva = "rechazada"
        inicioSegunTipoUsuario()
    }
}


document.querySelector("#btnVolverdDesdeProcesarReserva").addEventListener("click", inicioSegunTipoUsuario)


//Estadistica

document.querySelector("#btnSeccionEstadistica").addEventListener("click", mostrarEstadistica)

function mostrarEstadistica() {
    let totalGanancia = 0
    let fila = ""

    for (let i = 0; i < sistema.destinos.length; i++) {
        const destino = sistema.destinos[i]
        let personasReservadas = 0
        let gananciasDestino = 0

        for (let j = 0; j < sistema.reservas.length; j++) {
            const reserva = sistema.reservas[j]
            if (reserva.idDestino === destino.id && reserva.estadoReserva === "aprobada") {
                personasReservadas += reserva.cantidadPersonas
                gananciasDestino += reserva.dineroGastado
            }
        }

        if (personasReservadas > 0) {
            fila += `
                <tr>
                    <td>${destino.nombreDestino}</td>
                    <td>${personasReservadas} personas</td>
                    <td>$${gananciasDestino}</td>
                </tr>
            `
        }

        totalGanancia += gananciasDestino
    }
    document.querySelector("#tblEstadistica").innerHTML = fila
    document.querySelector("#totalGanancias").textContent = `Total de ganancias: $${totalGanancia}`
}

//LISTA RESERVAS EN ESPERA (CLIENTE)

document.querySelector("#btnSeccionListadoDeReservas").addEventListener("click", mostrarlistaDeReservasEnEspera)
function mostrarlistaDeReservasEnEspera() {
    ocultarBarraSegunTipoUsuario(sistema.usuarioLogueado.tipoUsuario)
    let idDestino
    let tabla = ""
    
    for (let i = 0; i < sistema.reservas.length; i++) {
        
        if (sistema.reservas[i].idUsuario===sistema.usuarioLogueado.id) {
            idDestino = sistema.reservas[i].idDestino

            console.log(sistema.buscarObjetoDestinoPorID(idDestino).nombreDestino)
            tabla += `
            
            <tr>
              <td>${sistema.buscarObjetoDestinoPorID(idDestino).nombreDestino}</td>
              <td>${sistema.reservas[i].dineroGastado}</td>
              <td>${sistema.reservas[i].millasGastadas}</td>
              <td>${sistema.reservas[i].cantidadPersonas}</td>
              <td>${sistema.reservas[i].estadoReserva}</td>
              <td> 
                   <input type="button" value="Cancelar" class="botonTablaReservasEnEspera" id="btnSeccionConfirmarCancelarReserva-${sistema.reservas[i].idReserva}" data-btn="btnSeccionConfirmarCancelarReserva-${sistema.reservas[i].idReserva}"/>
              </td>
              
            </tr>
            `
            

        }
    } 
    document.querySelector("#tbListadoReservasCliente").innerHTML = tabla
    deshabilitarBoton()

    let botonesDeCancelar = document.querySelectorAll(".botonTablaReservasEnEspera")
    for (let i = 0; i < botonesDeCancelar.length; i++) {
        botonesDeCancelar[i].addEventListener("click", mostrarSeccionSegunData)
    }
}
function deshabilitarBoton() {
    let botonesCancelar = document.querySelectorAll(".botonTablaReservasEnEspera");

    for (let j = 0; j < botonesCancelar.length; j++) {
        let boton = botonesCancelar[j]
        let idReserva = ""
        let idBoton = boton.getAttribute("id")
        console.log("idBoton",idBoton)
        for (let k = 0; k < idBoton.length; k++) {
            if (idBoton[k] >= "0" && idBoton[k] <= "9") {
                idReserva += idBoton[k]
            }
        }
        idReserva = Number(idReserva)
        console.log("idReserva",idReserva)
        
        if ((sistema.buscarObjetoReservaPorID(idReserva).estadoReserva === "aprobada" || sistema.buscarObjetoReservaPorID(idReserva).estadoReserva === "rechazada")) {
            boton.setAttribute("disabled", "true")
        }
    }
}

//CANCELAR RESERVA-CLIENTE

document.querySelector("#btnConfirmarCancelarReserva").addEventListener("click", borrarReserva)

function borrarReserva(){
    let posicionReserva = sistema.buscarObjetoReservaPorID(sistema.reservaEspecifica.idReserva).idReserva-1
    sistema.reservas.splice(posicionReserva,1)
    console.log("sistema.reservas",sistema.reservas)
    inicioSegunTipoUsuario()
}

//CONSULTAR SALDO
document.querySelector("#btnSeccionConsultarSaldo").addEventListener("click", consultarSaldo)

function consultarSaldo(){
    document.querySelector("#pSaldoDinero").innerHTML=`US$: ${sistema.usuarioLogueado.saldo}`
    document.querySelector("#pSaldoMillas").innerHTML=`Millas: ${sistema.usuarioLogueado.millas}`
}