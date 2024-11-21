import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItinerarioService } from 'src/app/servicios/itinerario/itinerario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-empresa-servicio-itinerario',
  templateUrl: './empresa-servicio-itinerario.component.html',
  styleUrls: ['./empresa-servicio-itinerario.component.css']
})
export class EmpresaServicioItinerarioComponent implements OnInit{

  modificar=false;
  titulo_boton='Registrar'
  claseBoton: string = 'btn btn-lg btn-success mt-3 text-white ';

 

  data_itinerario:any={
    id_detalle_ruta_itinerario:0,
    origen:'',
    destino:'',
    corredor:'',
    itinerario:'',
    frecuencia:'',
    id_empresa_servicio:0,
  }

  listaItinerarios:any=[];

  constructor(private itinerarioService:ItinerarioService,private router:Router,private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.ListarRutasItinerarios()

  }
 
  convertirAMayusculas(valor: string): string {
    return valor.toUpperCase();
  }

  ListarRutasItinerarios(){
    const params=this.activatedRoute.snapshot.params
    this.itinerarioService.listarItinerarioPorEmpresa(params['id']).subscribe(
      res=>{
        this.listaItinerarios=res
        console.log(this.listaItinerarios)
      },
      err=>{
        console.error(err)
        this.listaItinerarios=[]
      }
    )
  }
 
  GuardarRutaItinerario(){
    const params=this.activatedRoute.snapshot.params
    this.data_itinerario.id_empresa_servicio=params['id']
    this.itinerarioService.CrearItinerario(this.data_itinerario).subscribe(
      res=>{
        console.log(res)
        this.limpiarFormulario()
        this.ListarRutasItinerarios()
      },
      err=>{
        console.error(err)
      }
    )
    
  }

  MostrarDatos(){
    const params=this.activatedRoute.snapshot.params
    this.data_itinerario.id_empresa_servicio=params['id']
    console.log(this.data_itinerario)
  }

  validarFormularioItinerario( ) {
    // Realiza la validación de los campos aquí
    if (!this.data_itinerario.origen) {
      alert('Por favor, ingrese origen de ruta');
      return;
    }
    if (!this.data_itinerario.destino) {
      alert('Por favor, ingrese el destino de ruta');
      return;
    }
    if (!this.data_itinerario.itinerario) {
      alert('Por favor, ingrese el itinerario');
      return;
    }
    if (!this.data_itinerario.frecuencia) {
      alert('Por favor, ingrese la frecuencia');
      return;
    }

    // Si llega hasta aquí, significa que todos los campos están validados correctamente
    // Puedes ejecutar la acción deseada aquí
    if(this.modificar){
      this.ModificarItinerario()
    }else{
      this.GuardarRutaItinerario()
    }
    
  
  }  

  ObtenerDetalleItinerario(id_itinerario:number){
    this.itinerarioService.ObtenerDetalleItinerario(id_itinerario).subscribe(
      res=>{
          this.data_itinerario=res
          this.data_itinerario=this.data_itinerario[0]
          console.log(this.data_itinerario)
          this.modificar=true;
          this.titulo_boton='Modificar'
          this.claseBoton = 'btn btn-lg btn-warning mt-3 text-white ';
      },
      err=>{
          console.error(err)
      }
    )
  }

//MODIFICAR DATOS DE ITINERARIO
ModificarItinerario(){
  this.itinerarioService.ModificarItinerario(this.data_itinerario.id_detalle_ruta_itinerario,this.data_itinerario).subscribe(
    res=>{
      console.log(res)
      this.limpiarFormulario()
      this.ListarRutasItinerarios()
    },
    err=>{
      console.log(err)
    }
  )
}
//eliminar itinerario
EliminarItinerario(id:number){
  Swal.fire({
    title: 'seguro?',
    text: "eliminacion definitiva!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'si, eliminar!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.itinerarioService.EliminarItinerario(id).subscribe(
   
        res=>{
          let mensaje:any=res
          console.log(mensaje.text)
          if(mensaje.text=='error'){
            Swal.fire('No es posible eliminar un itinerario que se encuentra actualmente en uso')
          }else{      
            this.ListarRutasItinerarios()
            Swal.fire(
              'Eliminado!',
              'El itinerario ha sido eliminado.',
              'success'
            )
          }
        },
        err=>{
          alert('no se puede eliminar un itirnerario que esta en uso')
          console.error(err)
        }
      )
    }
  })
}
// EliminarItinerario(id:number){
//   this.itinerarioService.EliminarItinerario(id).subscribe(
//     res=>{
      
//       let mensaje:any=res
//       console.log(mensaje.text)
//       if(mensaje.text=='error'){
//         alert('No es posible eliminar una ruta que se encuentra actualmente en uso')
//       }else{
//         this.limpiarFormulario()
//         this.ListarRutasItinerarios()
//       }

      
//     },
//     err=>{
//       alert('no se puede eliminar un itirnerario que esta en uso')
//       console.error(err)
     
//     }
//   )
  
// }

//LIMPIAR DATOS
limpiarFormulario() {
  this.data_itinerario.id_detalle_ruta_itinerario=0;
  this.data_itinerario.origen ='';
  this.data_itinerario.destino = '';
  this.data_itinerario.itinerario = '';
  this.data_itinerario.frecuencia = '';

  this.modificar=false;
  this.titulo_boton='Guardar'
  this.claseBoton = 'btn btn-lg btn-success mt-3 text-white ';
}
  volver(){
    const params=this.activatedRoute.snapshot.params
    this.router.navigate(['principal/empresas/servicio/detalle/',params['id']])
  }
}
