class Usuario {
    constructor(usuario, password, tipoUsuario, nombre, apellido, confirmaContraseña, numeroTarjeta,cvc) {
        this.usuario=usuario;
        this.password=password;
        this.tipoUsuario=tipoUsuario;
        this.nombre=nombre;
        this.apellido=apellido;
        this.confirmaContraseña=confirmaContraseña;
        this.numeroTarjeta=numeroTarjeta;
        this.cvc=cvc;
        this.saldo=15000
    }
    cambiarSaldo(saldoNuevo){
        this.saldo = saldoNuevo;
    }
}