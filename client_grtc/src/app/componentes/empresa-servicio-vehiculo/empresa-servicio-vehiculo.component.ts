import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VehiculoService } from 'src/app/servicios/vehiculo/vehiculo.service';
import { ItinerarioService } from 'src/app/servicios/itinerario/itinerario.service';
import { EmpresaServicioService } from 'src/app/servicios/empresaServicio/empresa-servicio.service';
import { HistorialvehicularService } from 'src/app/servicios/historialvehicular/historialvehicular.service';
import { MarcaModeloService } from 'src/app/servicios/marcaModelo/marca-modelo.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-empresa-servicio-vehiculo',
  templateUrl: './empresa-servicio-vehiculo.component.html',
  styleUrls: ['./empresa-servicio-vehiculo.component.css']
})
export class EmpresaServicioVehiculoComponent implements OnInit{
  modificar=false;
  titulo_boton='Registrar'
  claseBoton: string = 'btn btn-lg btn-success mt-3 text-white ';

  vehiculoEnontrado=false;//almacena la condicion booleana de un vehiculo encontrado cuando se realiza la busqueda por placa

  deshabilitarfrom=true
  deshabilitarbuscador=false
  deshabilitarplaca=false
  deshabilitarRenovacion=true

  data_vehiculo:any={
    id_vehiculo:0,
    placa:'',
    categoria:'',
    anio_fabricacion:'',
    peso:'',
    carga:'',
    serie:'',
    nro_asientos:'',
    nro_chasis:'',
    color:'',
    carroceria:'',
    modalidad:'',
    nro_part_reg:'', 
    marca:'',
    modelo:'',
    id_detalle_ruta_itinerario:0,
    id_tuc:null,
    id_resolucion:0,
    id_empresa_servicio:null,
    estado:'',
  };

  data_historial_vehicular:any={
    id_historial:0,
    nombre_resolucion:null,
    fecha_resolucion:null,
    placa:null,
    condicion:null,
    ruta:null,
    id_empresa_servicio:null
  }

  lista_marca:any=[]//lista recuperada de marcas de vehiculos
  lista_modelo:any=[]//lista recuperada de modelos de vehiculos
  lista_modelo_aux:any=[]

  lista_vehiculos:any=[]//almacenara la lista de vehiculos pertenecientes a la empresa de servicio

  marcaSeleccionada: number=0; // Asegúrate de que el tipo de datos sea adecuado para tu id de marca
  modeloSeleccionado: number=0; // Asegúrate de que el tipo de datos sea adecuado para tu id de marca

  lista_itinerario:any=[]//lista de itinerarios correspondientes a la empresa por servicio
  lista_resoluciones:any=[]//lista de todas las resoluciones correspondientes a la empresa en cuestion 

  condicionTemp:string=''//almacena el valor recuperado de condicion del vehiculo que se busca con doble clik, esto con el fin de comparar y evaluar si es necesario su ingreso en el historial

constructor(private marcaModelo: MarcaModeloService,private historialvehicularService:HistorialvehicularService,private empresaServicioService:EmpresaServicioService ,private itinerarioService:ItinerarioService ,private vehiculoService:VehiculoService,private router:Router,private activatedRoute:ActivatedRoute){

}

ngOnInit(): void {
  
   this.ObtenerListaItinerario();
   this.ObtenerListaResoluciones();
   this.ListarVehiculosEmpresaServicio();

   const params=this.activatedRoute.snapshot.params
   this.data_vehiculo.id_empresa_servicio=params['id']

}

 //convertir a mayusculas
 convertirAMayusculas(valor: string): string {
  return valor.toUpperCase();
} 

async ListarVehiculosEmpresaServicio(){
  const params=this.activatedRoute.snapshot.params
  this.vehiculoService.ListarVehiculosEmpresa(params['id']).subscribe(
    res=>{
        this.lista_vehiculos=res;

    },
    err=>{
        console.error(err);
    }
  )
}

limitarLongitud(event: any) {
  const input = event.target;
  if (input.value.length > 4) {
      input.value = input.value.slice(0, 4);
  }
}
onMarcaSeleccionada() {
  
  console.log(this.marcaSeleccionada)
  if(this.marcaSeleccionada==0){
    this.modeloSeleccionado=0
    this.marcaSeleccionada=0
  }
  else{
    this.FiltarModelosPorIdMarca(this.marcaSeleccionada)
    this.FiltrarNombreMarca(this.marcaSeleccionada)
  }
  
}



onModeloSeleccionada() {
  console.log(this.modeloSeleccionado)
  this.obtenerNombreModeloPorId(this.modeloSeleccionado)
 
}

FiltarModelosPorIdMarca(id_marca: number){
    // this.lista_modelo  = this.lista_modelo_aux.filter((lista_modelo: { id_marca: number; }) => lista_modelo.id_marca == id);
    this.marcaModelo.listarModelosPorIdMarca(id_marca).subscribe(
      res=>{
          this.lista_modelo=res
      },
      err=>{
          console.error(err)
      }
    )
    console.log('estas es la lista'+this.lista_modelo)
}
FiltrarNombreMarca(id:number){
  let auxMarca:any=[];
  auxMarca = this.lista_marca.filter((lista_marca: { id_marca: number; }) => lista_marca.id_marca == id);
  auxMarca=auxMarca[0]
   this.data_vehiculo.marca=auxMarca.nombre_marca;
   console.log(auxMarca)
}
obtenerNombreModeloPorId(id_modelo:number){
  
    this.marcaModelo.BuscarModeloPorIdModelo(id_modelo).subscribe(
      res=>{
        let auxModelo:any=res
        console.log(auxModelo[0])
        this.data_vehiculo.modelo=auxModelo[0].nombre_modelo

      },
      err=>{
        console.error(err)
      }
    )
   
   
   
 }

obtenerListaMarca(){
  this.marcaModelo.ListarMarcas().subscribe(
    res=>{
        this.lista_marca=res
    },
    err=>{
        console.error(err)
    } 
  )
}

ObtenerListaItinerario(){
  
  const params=this.activatedRoute.snapshot.params
  this.itinerarioService.listarItinerarioPorEmpresa(params['id']).subscribe(
    res=>{
        this.lista_itinerario=res 
        console.log(this.lista_itinerario)
        
    },
    err=>{
        console.error(err)
    }
  )


}

ObtenerListaResoluciones(){
 
  const params=this.activatedRoute.snapshot.params
  this.empresaServicioService.ListaResoluciones(params['id']).subscribe(
    res=>{
        this.lista_resoluciones=res
        console.log(this.lista_resoluciones)
    },
    err=>{
        console.error(err)
    }
  )
}

volver(){
    const params=this.activatedRoute.snapshot.params
    this.router.navigate(['principal/empresas/servicio/detalle/',params['id']])
  }
mostrarDatosVehiculo(){
  const params=this.activatedRoute.snapshot.params
  this.data_vehiculo.id_empresa_servicio=params['id']
  console.log(this.data_vehiculo)
}
//guardar vehiculo
// Función para validar los datos del formulario
validarDatosFormulario() {
  if (!this.data_vehiculo.placa) {
    alert('Por favor, ingrese la placa.');
    return;
  }

  if (!this.data_vehiculo.anio_fabricacion) {
    alert('Por favor, ingrese el año de fabricación.');
    return;
  }

  if (!this.data_vehiculo.nro_part_reg) {
    alert('Por favor, ingrese el número de partida registral.');
    return;
  }

  if (this.data_vehiculo.estado==0) {
    alert('Por favor, seleccione una condición.');
    return;
  }

  if (!this.data_vehiculo.peso) {
    alert('Por favor, ingrese el peso.');
    return;
  }

  if (!this.data_vehiculo.carga) {
    alert('Por favor, ingrese la carga.');
    return;
  }

  if (!this.data_vehiculo.carroceria) {
    alert('Por favor, ingrese el tipo de carrocería.');
    return;
  }

  if (!this.data_vehiculo.categoria) {
    alert('Por favor, seleccione una categoría.');
    return;
  }

  if (!this.data_vehiculo.nro_chasis) {
    alert('Por favor, ingrese el número de chasis.');
    return;
  }

  if (!this.data_vehiculo.nro_asientos) {
    alert('Por favor, ingrese el número de asientos.');
    return;
  }

  if (!this.data_vehiculo.serie) {
    alert('Por favor, ingrese la serie.');
    return;
  }

  if (this.data_vehiculo.modalidad==0) {
    alert('Por favor, ingrese la modalidad.');
    return;
  }

  if (this.data_vehiculo.marca==0) {
    alert('Por favor, ingrese la marca.');
    return;
  }

  if (this.data_vehiculo.modelo==0) {
    alert('Por favor, ingrese el modelo.');
    return;
  }

  if (!this.data_vehiculo.color) {
    alert('Por favor, ingrese los colores del vehiculo.');
    return;
  }

  if (!this.data_vehiculo.id_detalle_ruta_itinerario) {
    alert('Por favor, ingrese el itinerario');
    return;
  }

  if (!this.data_vehiculo.id_resolucion) {
    alert('Por favor, ingrese la resolucion');
    return;
  }

  // Aquí puedes agregar más validaciones para otros campos del formulario

  // Si llegas aquí, los datos son válidos, puedes realizar otras acciones
 if(this.modificar){
  this.ModificarVehiculo();
 }
 else{
  this.GuardarVehiculo();
 //console.log(this.data_vehiculo)
 }
  
  // Llama a tu función mostrarDatosVehiculo() o realiza cualquier acción deseada
}

async GuardarVehiculo() {
  console.log(this.data_vehiculo);

  try {
    const res = await this.vehiculoService.CrearVehiculo(this.data_vehiculo).toPromise();
    console.log(res);

    await this.GuardarEnHistrorialVehicular();
    this.MensajeDeGuardado();
    await this.ListarVehiculosEmpresaServicio();
    
   
  } catch (err) {
    console.error(err);
  }
}

// GuardarVehiculo(){
//   console.log(this.data_vehiculo)
//   this.vehiculoService.CrearVehiculo(this.data_vehiculo).subscribe(
//     res=>{
//         console.log(res);
//         this.GuardarEnHistrorialVehicular();
//         this.MensajeDeGuardado();
//         this.ListarVehiculosEmpresaServicio();
//         this.limpiarCampos();
//     },
//     err=>{
//       console.error(err)
//     }
//   )
// }
limpiarCampos(){

  this.data_vehiculo.placa='';
  this.data_vehiculo.categoria='';
  this.data_vehiculo.anio_fabricacion='';
  this.data_vehiculo.peso='';
  this.data_vehiculo.carga='';
  this.data_vehiculo.serie='';
  this.data_vehiculo.nro_asientos='';
  this.data_vehiculo.nro_chasis='';
  this.data_vehiculo.color='';
  this.data_vehiculo.carroceria='';
  this.data_vehiculo.modalidad='';
  this.data_vehiculo.nro_part_reg='';
  this.data_vehiculo.marca='';
  this.data_vehiculo.modelo='';
  this.data_vehiculo.id_detalle_ruta_itinerario=0;
  this.data_vehiculo.id_resolucion=0;
  this.data_vehiculo.estado='';

  this.marcaSeleccionada = 0; // Puedes restablecer la marca seleccionada a su valor inicial si es necesario
  this.modeloSeleccionado = 0; // Puedes restablecer el modelo seleccionado a su valor inicial si es necesario

  this.modificar=false;
  this.titulo_boton='Registrar'
  this.claseBoton= 'btn btn-lg btn-success mt-3 text-white ';
  console.log('limpieza')
  this.deshabilitarfrom=true
  this.deshabilitarbuscador=false
  this.deshabilitarplaca=false
  this.deshabilitarRenovacion=true

}
//**********************************MODIFICAR VEHICULO***************************************
//obtener valores con doble click
obtenerValoresPorIdVehiculo(id_vehiculo:number){
  this.vehiculoService.ObtenerVehiculoPorId(id_vehiculo).subscribe(
    res=>{
      this.data_vehiculo=res;
      this.data_vehiculo=this.data_vehiculo[0]
     
      this.obtenerMarcaPorNombre(this.data_vehiculo.marca,this.data_vehiculo.modelo)

      this.modificar=true;
      this.titulo_boton='Modificar'
      this.claseBoton= 'btn btn-lg btn-warning mt-3 text-white ';
      this.condicionTemp=this.data_vehiculo.estado
      this.deshabilitarfrom=false 

      this.deshabilitarbuscador=true
      this.deshabilitarplaca=true
      this.deshabilitarRenovacion=false;
    },
    err=>{
      console.error(err);
    }
  )
}

obtenerMarcaPorNombre(nombre_marca:string, nombre_modelo:string){
  this.obtenerListaMarca();
  
  this.marcaModelo.BuscarMarcaPorNombre(nombre_marca).subscribe(
    res=>{
      let aux:any=[]
      aux=res
      aux=aux[0]
      console.log(aux.id_marca)
      this.marcaSeleccionada=aux.id_marca 
      this.obtenerModeloPorNombre(nombre_modelo,aux.id_marca)
    }, 
    err=>{
      console.error(err)
    }
  )
}
obtenerModeloPorNombre(nombre_modelo:string, id_marca:number){
  this.FiltarModelosPorIdMarca(id_marca)
  this.marcaModelo.BuscarModeloPorNombre(nombre_modelo).subscribe(
    res=>{
      let aux:any=[]
      aux=res
      aux=aux[0]
      this.modeloSeleccionado=aux.id_modelo
    },
    err=>{
      console.error(err)
    }
  )
}
//REGISTRAR EN HISTORIAL
async GuardarEnHistrorialVehicular(){
  const params=this.activatedRoute.snapshot.params
  // Obtén una referencia al elemento select por su ID 
  let id_resolucion = (<HTMLInputElement>document.getElementById('resolucion')).value;
  let id_itinerario = (<HTMLInputElement>document.getElementById('itinerario')).value;

  let placa = (<HTMLInputElement>document.getElementById('placa')).value;

  let ruta=this.lista_itinerario.filter((itinerario: { id_detalle_ruta_itinerario: number; }) => itinerario.id_detalle_ruta_itinerario == parseInt(id_itinerario))[0].itinerario;
  let nombre_resolucion = this.lista_resoluciones.filter((resolucion: { id_resolucion: number; }) => resolucion.id_resolucion == parseInt(id_resolucion));

  this.data_historial_vehicular.placa=placa
  this.data_historial_vehicular.condicion=this.data_vehiculo.estado
  this.data_historial_vehicular.nombre_resolucion=nombre_resolucion[0].nombre_resolucion
  this.data_historial_vehicular.fecha_resolucion=nombre_resolucion[0].fecha_resolucion
  this.data_historial_vehicular.ruta=ruta
  this.data_historial_vehicular.id_empresa_servicio=params['id']
  // console.log(nombre_resolucion,this.data_historial_vehicular.condicion, this.data_historial_vehicular.placa)
   console.log(this.data_historial_vehicular)
   console.log(this.data_vehiculo)
  this.historialvehicularService.crearHistorialVehicular(this.data_historial_vehicular).subscribe(
    res=>{
      console.log(res);
      this.limpiarCampos();
    },
    err=>{
      console.error(err);
    }
  )
}
//modificar valores y devolver todo por defecto
ModificarVehiculo(){
  // if(this.condicionTemp!=this.data_vehiculo.estado){
  //   //this.GuardarEnHistrorialVehicular()
  //   alert('datos diferentes, entran al historial')
  // }
  this.vehiculoService.ModificarVehiculo(this.data_vehiculo.id_vehiculo,this.data_vehiculo).subscribe(
    res=>{
        console.log(res)
        this.MensajeDeModificado()
        if(this.condicionTemp!=this.data_vehiculo.estado){
          this.GuardarEnHistrorialVehicular()
          this.ListarVehiculosEmpresaServicio();
          this.limpiarCampos()
        }
        else{
          this.ListarVehiculosEmpresaServicio();
          this.limpiarCampos()
        }
    },
    err=>{
        console.error(err)
    }
  )
}
//BUSCADOR DE VEHICULO POR PLACA===========================================
buscarVehiculoPorPlaca(placa:string){
  const params=this.activatedRoute.snapshot.params
  if(placa!=''){
    this.vehiculoService.ObtenerVehiculoPorPlaca(placa).subscribe(
      res=>{
        this.data_vehiculo=res
        
        
        console.log(this.data_vehiculo)
        if(this.data_vehiculo[0].id_empresa_servicio==null){
          this.data_vehiculo=this.data_vehiculo[0]
          this.obtenerMarcaPorNombre(this.data_vehiculo.marca,this.data_vehiculo.modelo)
          this.data_vehiculo.id_empresa_servicio=params['id']
          this.data_vehiculo.estado=''
          this.data_vehiculo.id_resolucion=0
          this.data_vehiculo.id_detalle_ruta_itinerario=0
          this.modificar=true
          this.vehiculoEnontrado=true
          this.deshabilitarfrom=false
          
        }
  
        else{
          if(this.data_vehiculo[0].id_empresa_servicio==params['id']){
            Swal.fire('el vehiculo ya se encuentra registrada en la empresa')
            this.limpiarCampos()
            }
          else{
            
             this.empresaServicioService.ObtenerEmpresaPorPlaca(this.data_vehiculo[0].placa).subscribe(
              res=>{
                // this.limpiarCampos()
                  let empresaTemp:any=[]
                  empresaTemp=res
                  console.log(empresaTemp[0].razon_social)
                  Swal.fire('el vehiculo pertenece a otra empresa'+empresaTemp[0].razon_social)  
              },
              err=>{
                  console.error(err)
              }
             )
  
            
          }
        }
      
        },
       
      err=>{
        console.error(err); 
        Swal.fire({
          title: 'No existe vehiculo registrado con la placa: '+placa,
          text: "Desea habilitar formulario para registrar el vehiculo?",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'si, habilitar formulario '
        }).then((result) => {
          if (result.isConfirmed) {
            this.deshabilitarfrom=false
            this.deshabilitarplaca=true
          }
          else{
            this.limpiarCampos()
            this.deshabilitarfrom=true
          }
        })
        this.modificar=false
        this.vehiculoEnontrado=false
      }
    )
  }
  else{
    Swal.fire('el campo placa esta vacio')
  }

  
}
//======================================================================
controllerNull(event: any){
  if(this.data_vehiculo.placa==''){
    this.limpiarCampos()
    this.deshabilitarfrom=true
  }
} 
//*********************************************************************/

//------------------------------------------------------------------------
//ANIMACION DE MENSAJES
 MensajeDeGuardado(){
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Registro exitoso',
    showConfirmButton: false,
    timer: 1500
  })
}
MensajeDeModificado(){
  if(this.vehiculoEnontrado){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Registro exitoso',
      showConfirmButton: false,
      timer: 1500
    })
  }
  else{
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Modificacion exitosa',
      showConfirmButton: false,
      timer: 1500
    })
  }
}
}
