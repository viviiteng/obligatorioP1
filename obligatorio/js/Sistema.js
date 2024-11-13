class Sistema {
    constructor() {
        this.usuarios=[];
        this.reservas=[];
        this.destinos=[];
    }

    precargarDatos(){
        const admin1= new Usuario("Agustin", "Agu123", "administrador", null, null, null, null, null);
        const admin2= new Usuario("Viviana", "Vivi123", "administrador", null, null, null, null, null);
        const cliente1= new Usuario("Juan12", "Ju1234", "cliente", "Juan", "Gonzalez", "12345", 5223450370829605, 123);
        this.usuarios.push(admin1,admin2,cliente1)

        const destino1= new Destinos()
        const destino2= new Destinos()
        const destino3= new Destinos()
        this.destinos.push(destino1,destino2,destino3)
    }

    
}
