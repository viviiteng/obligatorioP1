class Sistema {
    constructor() {
        this.usuarios=[];
        this.reservas=[];
        this.destinos=[];
        this.idUsuario=11
        this.idDestino=11;  
        this.idReserva=6
        this.destinoEspecifico=null
        this.usuarioLogueado=null
    }

    precargarDatos(){
        const admin1= new Usuario(1,"Agustin", "Agu123", "admin", null, null, null, null, null);
        const admin2= new Usuario(2,"Viviana", "Vivi123", "admin", null, null, null, null, null);
        const admin3= new Usuario(3,"Joaquin", "Joa123", "admin", null, null, null, null, null);
        const admin4= new Usuario(4,"Sofia", "Sofi123", "admin", null, null, null, null, null);
        const admin5= new Usuario(5,"Andrea", "And123", "admin", null, null, null, null, null);

        const cliente1= new Usuario(6,"Juan12", "Ju1234", "cliente", "Juan", "Gonzalez", "Ju1234", 5223450370829605, 123);
        const cliente2= new Usuario(7,"Julio", "Julio123", "cliente", "Julio", "Sanchez", "Julio123", 5223450370829605, 123);
        const cliente3= new Usuario(8,"Juli", "Juli123", "cliente", "Julieta", "Gonzalez", "Juli123", 5223450370829605, 123);
        const cliente4= new Usuario(9,"Sofi", "Sofi123", "cliente", "Sofia", "Salvado", "Sofi123", 5223450370829605, 123);
        const cliente5= new Usuario(10,"Santiago", "Sant234", "cliente", "Santiago", "Pereira", "Sant234", 5223450370829605, 123);

        
        this.usuarios.push(admin1,admin2,admin3,admin4,admin5,cliente1,cliente2,cliente3,cliente4,cliente5)
        this.buscarUsuarioPorId(6).cambiarMillas(1000);
        this.buscarUsuarioPorId(7).cambiarMillas(2000);      
        this.buscarUsuarioPorId(8).cambiarMillas(3000);
        const destino1= new Destinos("DEST_ID_1","Nueva York",1000,"img/NuevaYork.jpeg","activo",10,"La ciudad que nunca duerme, llena de posibilidades.",true)
        const destino2= new Destinos("DEST_ID_2","Paris",2000,"img/Paris.jpeg","pausado",10,"Romance y arte en la mágica Ciudad de la Luz.",false)
        const destino3= new Destinos("DEST_ID_3","Rio de Janeiro",250,"img/Rio.jpeg","activo",10,"Playas, samba y el vibrante Carnaval carioca.",true)
        const destino4= new Destinos("DEST_ID_4","Montevideo",200,"img/Montevideo.jpeg","activo",10,"Encanto histórico y cultural junto al Río de la Plata.",true)
        const destino5= new Destinos("DEST_ID_5","Buenos Aires",200,"img/BuenosAires.jpeg","activo",10,"Tango, cultura y gastronomía en la capital argentina.",true)
        const destino6= new Destinos('DEST_ID_6',"Egipto",2500,"img/Egipto.jpeg","pausado",10,"Fascinantes pirámides y misterios del Antiguo Egipto",false)
        const destino7= new Destinos("DEST_ID_7","Roma",2100,"img/Roma.jpeg","activo",10,"Historia viva en cada rincón de la Ciudad Eterna.",false)
        const destino8= new Destinos("DEST_ID_8","Tokyo",3000,"img/Tokyo.jpeg","activo",10,"Innovación y tradición en el corazón de Japón.",false)
        const destino9= new Destinos("DEST_ID_9","China",2800,"img/China.jpeg","activo",10,"Cultura milenaria y maravillas como la Gran Muralla.",false)
        const destino10= new Destinos("DEST_ID_10","Barcelona",2600,"img/Barcelona.jpeg","activo",10,"Arte, arquitectura y playas en la joya catalana.",false)
        this.destinos.push(destino1,destino2,destino3,destino4,destino5,destino6,destino7,destino8,destino9,destino10)
    }
    cargarUsuario(usuario, password, tipoUsuario, nombre, apellido, confirmaContraseña, numeroTarjeta,cvc){
        this.usuarios.push(new Usuario(this.idUsuario, usuario, password, tipoUsuario, nombre, apellido, confirmaContraseña, numeroTarjeta,cvc))
        this.idUsuario++
    }
    cargarDestino(nombreDestino,precio,img,estado,cupos,descripcion,esOferta){
        this.destinos.push(new Destinos (`DEST_ID_${this.idDestino}`,nombreDestino,precio,img,estado,cupos,descripcion,esOferta))
        this.idDestino++    
    }

    cargarReserva(idUsuario,idDestino,cantidadPersonas,dineroGastado,millasGastadas,estadoReserva,descripcion){
        this.reservas.push(new Reservas(this.idReserva, idUsuario,idDestino,cantidadPersonas,dineroGastado,millasGastadas,estadoReserva,descripcion))
        this.idReserva++
    }
    buscarDestinoPorID(idDestino){

        for (let i = 0; i < this.destinos.length; i++) {
            if (idDestino===this.destinos[i].id) {
                this.destinoEspecifico = this.destinos[i]
                return i
            }
        }
        console.log("idDestino",this.destinoEspecifico)

    }

    buscarUsuarioPorId(idUsuario) {
        for (let i = 0; i < this.usuarios.length; i++) {
            if (idUsuario===this.usuarios[i].id) {
                return this.usuarios[i]
            }
        }
    }
    
}
