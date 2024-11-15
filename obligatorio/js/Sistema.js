class Sistema {
    constructor() {
        this.usuarios=[];
        this.reservas=[];
        this.destinos=[];
    }

    precargarDatos(){
        const admin1= new Usuario(1,"Agustin", "Agu123", "administrador", null, null, null, null, null);
        const admin2= new Usuario(2,"Viviana", "Vivi123", "administrador", null, null, null, null, null);
        const admin3= new Usuario(3,"Joaquin", "Joa123", "administrador", null, null, null, null, null);
        const admin4= new Usuario(4,"Sofia", "Sofi123", "administrador", null, null, null, null, null);
        const admin5= new Usuario(5,"Andrea", "And123", "administrador", null, null, null, null, null);

        const cliente1= new Usuario(6,"Juan12", "Ju1234", "cliente", "Juan", "Gonzalez", "12345", 5223450370829605, 123);
        //Falta agregar 4 clientes mas para 
        this.usuarios.push(admin1,admin2,admin3,admin4,admin5,cliente1)

        const destino1= new Destinos("DEST_ID_1","Nueva York",1000,"../img/NuevaYork.jpeg","activo",10,"Hola como estas",true)
        const destino2= new Destinos("DEST_ID_2","Paris",2000,"../img/Paris.jpeg","pausado",10,"Hola como estas",false)
        const destino3= new Destinos("DEST_ID_3","Rio de Janeiro",250,"../img/Rio.jpeg","activo",10,"Hola como estas",true)
        const destino4= new Destinos("DEST_ID_4","Montevideo",200,"../img/Montevideo.jpeg","activo",10,"Hola como estas",true)
        const destino5= new Destinos("DEST_ID_5","Buenos Aires",200,"../img/BuenosAires.jpeg","activo",10,"Hola como estas",true)
        const destino6= new Destinos('DEST_ID_6',"Egipto",2500,"../img/Egipto.jpeg","pausado",10,"Hola como estas",false)
        const destino7= new Destinos("DEST_ID_7","Roma",2100,"../img/Roma.jpeg","activo",10,"Hola como estas",false)
        const destino8= new Destinos("DEST_ID_8","Tokyo",3000,"../img/Tokyo.jpeg","activo",10,"Hola como estas",false)
        const destino9= new Destinos("DEST_ID_9","China",2800,"../img/China.jpeg","activo",10,"Hola como estas",false)
        const destino10= new Destinos("DEST_ID_10","Barcelona",2600,"../img/Barcelona.jpeg","activo",10,"Hola como estas",false)
        this.destinos.push(destino1,destino2,destino3,destino4,destino5,destino6,destino7,destino8,destino9,destino10)
    }

   
}
