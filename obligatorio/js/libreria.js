
function invertirTexto(texto){
    let textoInvertido = ""
    for(let i=texto.length-1;i>=0;i--){
        textoInvertido += texto.charAt(i)        
    }
    return textoInvertido
}

function eliminarCaracter (texto,caracter){
    let textoSinCaracter = ""
    for(let i=0;i<texto.length;i++){
        if(texto.charAt(i)!==caracter){
            textoSinCaracter += texto.charAt(i)
        }
    }
    return textoSinCaracter
}

function intercambiarCaracter (texto,caracterViejo,caracterNuevo){
    let textoCaracterNuevo=""
    for(let i=0;i<texto.length;i++){
        if(texto.charAt(i)===caracterViejo){
            textoCaracterNuevo+=caracterNuevo
        }else{
            textoCaracterNuevo+=texto.charAt(i)
        }
    }
    return textoCaracterNuevo
}

function verificarCedula(cedulaIngresada){
    
    let cedulaLimplia = eliminarCaracter(cedulaIngresada,".")
    cedulaLimplia = eliminarCaracter(cedulaLimplia,"-")
    let constante = "2987634"
    let numVerificadorIngresado = Number(cedulaLimplia.charAt(cedulaLimplia.length-1))
    
    let acumulado = 0
    if(cedulaLimplia.length<8){
        cedulaLimplia= "0"+ cedulaLimplia
    }
    for(let i=0;i<cedulaLimplia-1;i++){
        acumulado+=Number(cedulaLimplia.charAt(i))*Number(constante.charAt(i))
    }
    let numVerificadorCalculado = 10 - (acumulado%10)
    if(acumulado%10===0){
        numVerificadorCalculado=0
    }
    return numVerificadorCalculado===numVerificadorIngresado
    
}

function contarCaracter (textoIngresado,caracter){
    let contador = 0
   
    for(let i=0;i<textoIngresado.length;i++){
        if(textoIngresado.charAt(i)===caracter){
            contador++
        }
    }
    return contador
}

function contadorMultiplosEnIntervalo (numeroIngresado1,numeroIngresado2,referenciaMultiplo){
    contadorPares=0
    
    if(numeroIngresado1<numeroIngresado2){
        numero1=numeroIngresado1
        numero2=numeroIngresado2
    }else{
        numero2=numeroIngresado1
        numero1=numeroIngresado2 
    }
  
    for(let i=numero1; i<=numero2; i++){
        if(i%referenciaMultiplo===0){
            contadorPares++
        }
        
    }
    return contadorPares
}



function convertirTemperatura(fahrenheit,unidad){
    let resultado

    console.log(unidad)

    switch(unidad){
        case "-1":
            resultado=`Seleccione una unidad`
        break;
        case "C":
            resultado=`${((fahrenheit-32)/1.8).toFixed(2)}ºC`
        break;
        case "K":
            resultado=`${(((fahrenheit-32)*5/9)+273.15).toFixed(2)}ºK`
        break;
        case "Ra":
            resultado=`${(fahrenheit+459.67).toFixed(2)}ºRa`
        break;
        case "Re":
            resultado=`${((fahrenheit-32)/2.25).toFixed(2)}ºRe`
        break;
    }
    return resultado
}

function calcularPotencia (base,exponente){
    let resultado=base
    let exponenteCalculado
    
    if(exponente===0){
        resultado=1
    }else{
        if(exponente<0){
            exponenteCalculado=exponente*-1
        }else{
            exponenteCalculado=exponente
        }

        for(let i= 1; i<exponenteCalculado; i++){
            resultado*=base              
        }

        if(exponente<0){
            resultado=1/resultado    
        }    
    }
    
    return resultado
}

function calcularSueldoLiquido(sueldoNominal,hijosACargo){
    let sueldoLiquido
    let bps = sueldoNominal * 0.15
    let frl = sueldoNominal * 0.001
    let fonasa = sueldoNominal * 0.045

    if(hijosACargo){
        fonasa=sueldoNominal * 0.06
    }
    sueldoLiquido = sueldoNominal - bps - frl - fonasa
    return sueldoLiquido.toFixed(2)
}

function calcularIRPFaPagar(sueldoNominal){
    let franja1=39620
    let franja2=56600
    let franja3=84900
    let franja4=169800
    let franja5=283000
    let franja6=424500
    let franja7=650900
    let acumulado=0
    let tasa=0
    let franja=0
    let IRPFaPagar

   
    
    if(sueldoNominal>franja1){
        franja=franja1
        tasa=0.1
    }
    if(sueldoNominal>franja2){
        franja=franja2
        acumulado=(franja2-franja1)*tasa
        tasa=0.15
    }
    if(sueldoNominal>franja3){
        franja=franja3
        acumulado+=(franja3-franja2)*tasa
        tasa=0.24
    }
    if(sueldoNominal>franja4){
        franja=franja4
        acumulado+=(franja4-franja3)*tasa
        tasa=0.25
    }
    if(sueldoNominal>franja5){
        franja=franja5
        acumulado+=(franja5-franja4)*tasa
        tasa=0.27 
    }
    if(sueldoNominal>franja6){
        franja=franja6
        acumulado+=(franja6-franja5)*tasa
        tasa=0.31
    }
    if(sueldoNominal>franja7){
        franja=franja7
        acumulado+=(franja7-franja6)*tasa
        tasa=0.36
    }

    IRPFaPagar=(sueldoNominal-franja)*tasa + acumulado

    return IRPFaPagar
}

function validarNumerico(numero){
    return !isNaN(Number(numero))
}

function validarRegistroDeUsuario (nombre, apellido, usuario, contraseña1, contraseña2, tarjetaIngresada, cvc){
   
        return  validarNumerico(tarjetaIngresada) && validarNumerico(cvc) && nombre!=="" && usuario!=="" && apellido!=="" && contraseña1!=="" && contraseña1===contraseña2 && tarjetaIngresada.length === 16 && cvc.length === 3
}   

 





