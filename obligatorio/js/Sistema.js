class Sistema {
    constructor() {
        this.usuarios=[];
        this.reservas=[];
        this.destinos=[];
    }

    precargarDatos(){
        const admin1= new Usuario(("Agustin", "321", "administrador", null, null, null, null, null));
        
        this.usuarios.push(admin1)

        console.log("precarga", this.usuarios)
    }

    
}

// const admin2= new Usuario(("Viviana", "123", "administrador", null, null, null, null, null));
//         const cliente1= new Usuario(("Juan12", "12345", "cliente", "Juan", "Gonzalez", "12345", 5223450370829605, 52));