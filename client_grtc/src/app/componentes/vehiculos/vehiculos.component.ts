import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosCompartidosService } from 'src/app/servicios/datoslogin/datos-compartidos.service';
import { VehiculoService } from 'src/app/servicios/vehiculo/vehiculo.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit{

constructor(private datosCompartidosService:DatosCompartidosService,private vehiculoService:VehiculoService,private router:Router,private activatedRoute:ActivatedRoute){}

listaVehiculos:any=[]; listaAxuVehiculos:any=[]
listaMarcas:any=[]; listaAuxMarcas:any=[]
listaModelos:any=[]; listaAuxModelos:any=[]

disableInvitado='';// variale css que ayudara a ocultar ciertos pedazos de codigo html 

hiddenMensajeModelo=true

deshabilitarModelo=true

auxMarca:any=[] //almacena los datos de obtenidos de hacer click en la lista de marcas

data_marca:any={
  id_marca:0,
  nombre_marca:''
}

data_modelo:any={
  id_modelo:0,
  nombre_modelo:'',
  id_marca:0
}

ngOnInit(): void {
  this.listarVehiculos()
  this.listarMarcas()
  this.listarModelos()
    if(this.datosCompartidosService.credentials.rol=='INVITADO'){
      this.disableInvitado='display: none'; 
    }
}

listarVehiculos(){
  this.vehiculoService.ListarVehiculos().subscribe(
    res=>{
        this.listaVehiculos=res;
        this.listaAxuVehiculos=res;
        console.log(this.listaVehiculos)
    },
    err=>{
        console.error(err)
    }
  )
}
listarMarcas(){
  this.vehiculoService.ListarMarca().subscribe(
    res=>{
         this.listaMarcas=res;
         this.listaAuxMarcas=res
    },
    err=>{
         console.error(err);
    }
  )
}
listarModelos(){
  this.vehiculoService.ListarModelos().subscribe(
    res=>{
     
      this.listaAuxModelos=res
    },
    err=>{  
      console.error(err)
    }
  )
}

//INGRESO DE MARCA
ingresarMarca(){
  //marcaForm
  let marcaTex = (<HTMLInputElement>document.getElementById('marcaForm')).value;
  console.log(marcaTex)
  if(marcaTex==''){
    alert('por favor ingrese marca')
  }
  else{
    // alert('la marca es: '+nombre_marca)
   // consultar si ya existe la marca
    let auxMarca:any=[]
    auxMarca = this.listaMarcas.filter((marca: { nombre_marca: string; }) => {
      // Convierte ambos valores a minúsculas antes de la comparación
      const nombreMarcaEnMinusculas = marca.nombre_marca.toLowerCase();
      const nombreMarcaDataEnMinusculas = marcaTex.toLowerCase();
      return nombreMarcaEnMinusculas === nombreMarcaDataEnMinusculas;
    });
    if(auxMarca.length>0){
      console.log(auxMarca)
      alert('la marca existe ya existe en el regitro')
    }
    else{
      this.data_marca.nombre_marca=marcaTex
       this.vehiculoService.ingresarMarca(this.data_marca).subscribe(
      res=>{
          console.log(res)
          
          this.mensajeGuardado()
          this.data_marca.id_marca=0
          this.data_marca.nombre_marca=''
          // Obtén el elemento de entrada por su ID
            const inputMarca = <HTMLInputElement>document.getElementById("marcaForm");

            // Limpia el campo estableciendo su valor en una cadena vacía
            inputMarca.value = "";
            this.listarMarcas()
      },
      err=>{
          console.error(err)
      }
       )
    }
  }
  
}
//INGRESO DE MODELO
ingresarModelo(){

  // console.log(this.data_modelo.nombre_modelo)
  let modeloTex = (<HTMLInputElement>document.getElementById('modeloForm')).value;
 if(modeloTex==''){
    alert('ingrese modelo')
 }
 else{
  this.data_modelo.id_marca=this.data_marca.id_marca
  this.data_modelo.nombre_modelo=modeloTex
  console.log(this.data_modelo)
  this.vehiculoService.ingresarModelo(this.data_modelo).subscribe(
    res=>{
      console.log(res)
      console.log(this.data_marca.nombre_marca)
      this.mensajeGuardado()
      // this.listaAuxModelos.push(this.data_modelo)
      // console.log(this.listaAuxModelos)
      this.obtenerModeloPoridMarca(this.data_marca.id_marca,this.data_marca.nombre_marca)
      // Obtén el elemento de entrada por su ID
      const inputModelo = <HTMLInputElement>document.getElementById("modeloForm");

      // Limpia el campo estableciendo su valor en una cadena vacía
      inputModelo.value = "";
     
    },
    err=>{
      console.error(err)
    }
 )
 }  
}
//OBTENER MODELO DEL VEHICULO POR MARCA
obtenerModeloPoridMarca(id_marca:number,nombre_marca:string){
  this.vehiculoService.ObtenerListaModeloPorId(id_marca).subscribe(
    res=>{
      
      this.data_marca.nombre_marca=nombre_marca
      this.data_marca.id_marca=id_marca
      this.listaModelos=res
      this.hiddenMensajeModelo=true
      this.deshabilitarModelo=false
    },
    err=>{
      this.data_marca.nombre_marca=nombre_marca
      this.data_marca.id_marca=id_marca
      this.listaModelos=[]
      this.deshabilitarModelo=false
      this.hiddenMensajeModelo=false
    }
  )
  // //modificar para obtener los datos de la base de datos de esa forma todos estaran enterados de las actualizaciones
  // let MarcaTem:any=[]
  // MarcaTem= this.listaMarcas.filter((marca: { nombre_marca: string; }) => marca.nombre_marca == nombre_marca);

  // this.data_marca=MarcaTem
  // this.data_marca=this.data_marca[0] 

  // let auxModelo:any=[]
  // auxModelo = this.listaAuxModelos.filter((modelo: { id_marca: number; }) => modelo.id_marca == MarcaTem[0].id_marca);

  //si la cantidad de modelos es mayor a 1 mostrar lista

  
}

//BUSCADORES DE DATOS EN LAS TABLAS:------------------------------------
buscarEnListaVehiculos(event: any) {
  let objetosFiltrados

  const textoBusqueda = event.target.value.toLowerCase();
  
  if(textoBusqueda==''){
    this.listaVehiculos=this.listaAxuVehiculos
  }
  else{
  // Filtrar los objetos según el texto de búsqueda
  objetosFiltrados = this.listaAxuVehiculos.filter((objeto: 
    { razon_social: string;
      anio_fabricacion: string; 
      placa: string;
      marca: string;
      modelo: string;
      categoria: string;
     }) => {
    const empresa = objeto.razon_social.toLowerCase();
    const anio_fabricacion = objeto.anio_fabricacion.toLowerCase();
    const placa = objeto.placa.toLowerCase();
    const marca = objeto.marca.toLowerCase();
    const modelo = objeto.modelo.toLowerCase();
    const categoria = objeto.categoria.toLowerCase();
    
    return empresa.includes(textoBusqueda) || anio_fabricacion.includes(textoBusqueda)|| placa.includes(textoBusqueda)|| marca.includes(textoBusqueda) ||modelo.includes(textoBusqueda) || categoria.includes(textoBusqueda);
  });
  this.listaVehiculos=objetosFiltrados
  }

  
}
buscarEnListaMarcas(event: any) {
  let objetosFiltrados
  const textoBusqueda = event.target.value.toLowerCase();
  if(textoBusqueda==''){
    this.listaMarcas=this.listaAuxMarcas
    this.listaModelos=[]
   
  }
  else{
    // Filtrar los objetos según el texto de búsqueda
    objetosFiltrados = this.listaAuxMarcas.filter((objeto: 
    { nombre_marca: string;}) => {
    const nombre_marca = objeto.nombre_marca.toLowerCase();
    return  nombre_marca.includes(textoBusqueda);
  });
  this.listaMarcas=objetosFiltrados
  this.listaModelos=[]
  this.deshabilitarModelo=true
  }

}
volver(){
  this.router.navigate(['/principal'])
}
//MENSAJES ANIMADOS
mensajeGuardado(){
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Registro exitoso',
    showConfirmButton: false,
    timer: 1500
  })
}


}
