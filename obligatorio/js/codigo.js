const sistema = new Sistema();
sistema.precargarDatos();

//INICIO DE SESION//
document.querySelector("#btnIniciarSesion").addEventListener("click", validarInicioDeSesion)

function validarInicioDeSesion(){
    let usuarioIngresado = document.querySelector("#txtUsuarioSesion").value;
    let passwordIngresada = document.querySelector("#txtPasswordSesion").value;


}

//REGISTRO DE USUARIO//

document.querySelector("#btnRegistrarNuevoUsuario").addEventListener("click", registrarNuevoUsuario)

function registrarNuevoUsuario(){
    let nombreIngresado = document.querySelector("#txtNombreIngresado").value;
    let apellidoIngresado = document.querySelector("#txtApellidoIngresado").value;
    let usuarioIngresado = document.querySelector("#txtUsuarioIngresado").value;
    let passwordIngresada = document.querySelector("#txtPasswordIngresada").value;
    let passwordIngresadaConfirmacion = document.querySelector("#txtPassIngresada2").value;
    let tarjetaIngresada = document.querySelector("#nmbTarjetaIngresada").value;
    let cvcIngresado = document.querySelector("#nmbCvcIngresado").value;

    let validacionFormato= validarRegistroDeUsuario(nombreIngresado,apellidoIngresado,usuarioIngresado,passwordIngresada,passwordIngresadaConfirmacion, tarjetaIngresada,cvcIngresado)
    
    if(validacionFormato){
        for(let i= 0; i<sistema.usuarios.length; i++){
            
            if(usuarioIngresado!==sistema.usuarios[i].usuario){
                let nuevoUsuario= new Usuario(nombreIngresado,apellidoIngresado,usuarioIngresado,passwordIngresada,passwordIngresadaConfirmacion, tarjetaIngresada,cvcIngresado)
                sistema.usuarios.push(nuevoUsuario)
                
            }else{
                alert("Usuario existente")
            }
            
        }
        
    }else{
        alert("Usuario invalido")
    }
    
    console.log(validacionFormato)
    console.log("usuario", sistema.usuarios)
}