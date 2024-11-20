
function invertirTexto(texto) {
    let textoInvertido = ""
    for (let i = texto.length - 1; i >= 0; i--) {
        textoInvertido += texto.charAt(i)
    }
    return textoInvertido
}

function eliminarCaracter(texto, caracter) {
    let textoSinCaracter = ""
    for (let i = 0; i < texto.length; i++) {
        if (texto.charAt(i) !== caracter) {
            textoSinCaracter += texto.charAt(i)
        }
    }
    return textoSinCaracter
}

function intercambiarCaracter(texto, caracterViejo, caracterNuevo) {
    let textoCaracterNuevo = ""
    for (let i = 0; i < texto.length; i++) {
        if (texto.charAt(i) === caracterViejo) {
            textoCaracterNuevo += caracterNuevo
        } else {
            textoCaracterNuevo += texto.charAt(i)
        }
    }
    return textoCaracterNuevo
}

function contarCaracter(textoIngresado, caracter) {
    let contador = 0

    for (let i = 0; i < textoIngresado.length; i++) {
        if (textoIngresado.charAt(i) === caracter) {
            contador++
        }
    }
    return contador
}


function validarAlgoritmoLuhn(nroTarjeta) {
    let ultimoDigitoIngresado = Number(nroTarjeta.charAt(nroTarjeta.length - 1))
    let ultimoDigitoObtenido;

    let contador = 0;
    let sumaAcumulada = 0
    let numeroActual;
    for (let i = nroTarjeta.length - 2; i >= 0; i--) {
        numeroActual = Number(nroTarjeta.charAt(i))
        if (contador % 2 === 0) {
            sumaAcumulada += obtenerDigito(numeroActual)
        } else {
            sumaAcumulada += numeroActual
        }
        contador++
    }

    ultimoDigitoObtenido = obtenerDigitoVerificador(sumaAcumulada)

    return ultimoDigitoIngresado === ultimoDigitoObtenido
}



function obtenerDigito(numero) {
    let duplicado = numero * 2;
    if (duplicado > 9) {
        duplicado = 1 + (duplicado % 10)
    }
    return duplicado
}

function obtenerDigitoVerificador(numero) {
    return (numero * 9) % 10
}

function validarNumerico(numero) {
    return !isNaN(Number(numero))
}



function validarRegistroDeUsuario(nombre, apellido, usuario, contraseña1, contraseña2, tarjetaIngresada, cvc) {

    let contadorMayus = 0
    let contadorMinus = 0
    let contadorNumero = 0


    for (let i = 0; i < contraseña1.length; i++) {

        if (contraseña1.charCodeAt(i) > 64 && contraseña1.charCodeAt(i) < 91) {
            contadorMayus++
        } else if (contraseña1.charCodeAt(i) > 96 && contraseña1.charCodeAt(i) < 123) {
            contadorMinus++
        } else if (contraseña1.charCodeAt(i) > 47 && contraseña1.charCodeAt(i) < 58) {
            contadorNumero++
        }
    }
    console.log("Mas de 5 Caracteres", contraseña1.length >= 5)
    console.log("1 mayus", contadorMayus > 0)
    console.log("1 minus", contadorMinus > 0)
    console.log("1 num", contadorNumero > 0)


    return contraseña1.length >= 5 && contadorMayus > 0 && contadorMinus > 0 && contadorNumero > 0 && validarNumerico(tarjetaIngresada) && validarNumerico(cvc) &&
        nombre !== "" && usuario !== "" && apellido !== "" && contraseña1 === contraseña2 && tarjetaIngresada.length === 16 && validarAlgoritmoLuhn(tarjetaIngresada) && cvc.length === 3
}

function validarNuevoDestino(destino, precio, cupos, descripcion, img) {
    return destino !== "" && descripcion !== "" && validarNumerico(precio) && img !== "" && validarNumerico(cupos) && precio >= 0 && precio !== "" && cupos >= 0 && cupos !== "";
}









