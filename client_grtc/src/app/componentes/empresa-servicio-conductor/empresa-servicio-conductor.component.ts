import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from 'src/app/servicios/persona/persona.service';
import { ConductorService } from 'src/app/servicios/conductor/conductor.service';
import { EmpresaServicioService } from 'src/app/servicios/empresaServicio/empresa-servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresa-servicio-conductor',
  templateUrl: './empresa-servicio-conductor.component.html',
  styleUrls: ['./empresa-servicio-conductor.component.css']
})
export class EmpresaServicioConductorComponent implements OnInit{

  modificar=false;
  titulo_boton='Registrar'
  claseBoton: string = 'btn btn-lg btn-success mt-3 text-white ';

  data_persona:any={
    id_persona:0,
    nombres:'',
    ap_paterno:'',
    ap_materno:'',
    tipo_doc:'',
    documento:'',
    telefono:'',
    correo:''
  };

  data_conductor:any={
    id_conductor:0,
    id_persona:0,
    nro_licencia:null,
    categoria:'',
    id_empresa_servicio:0,
  }
  
  //ingresaremos el objeto conductor en la medida que lo necesitemos y sera mostrado por listaConductores
  objeto_conductor:any={
    id_persona:0,
    id_conductor:0,
    nombres:'',
    ap_paterno:'',
    ap_materno:'',
    tipo_doc:'',
    documento:'',
    telefono:'',
    correo:'',
    nro_licencia:null,
  }

  data_id_persona:any=[]//almacena de manera temporal el id del ingreso de los datos de persona

  listaConductores:any=[];

  constructor(private empresaServicioService:EmpresaServicioService,private conductorService:ConductorService,private personaService:PersonaService,private router:Router,private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.MostrarListaConductores()
    
  }
   //convertir a mayusculas
 convertirAMayusculas(valor: string): string {
  return valor.toUpperCase();
} 

  validarFormulario() {
    // Realiza la validación de los campos aquí
    if (!this.data_persona.nombres) {
      alert('Por favor, ingrese Nombre(s).');
      return;
    }
    if (!this.data_persona.ap_paterno) {
      alert('Por favor, ingrese apellido paterno');
      return;
    }
    if (!this.data_persona.ap_materno) {
      alert('Por favor,ingrese apellino materno');
      return;
    }
    if (this.data_persona.tipo_doc==0) {
      alert('Por favor, seleccione el tipo de documento');
      return;
    }
    if (!this.data_persona.documento) {
      alert('Por favor, seleccione el tipo de documento');
      return;
    }
    if (!this.data_conductor.nro_licencia) {
      alert('Por favor, ingrese la licencia');
      return;
    }

    // Si llega hasta aquí, significa que todos los campos están validados correctamente
    // Puedes ejecutar la acción deseada aquí
    if(this.modificar){
      this.ModificarDatosConductor()
    }else{
      this.registrarPersona()
    }
    
  
  }  

  registrarPersona(){
    this.personaService.CrearPersona(this.data_persona).subscribe(
      res=>{
        this.data_id_persona=res
        this.data_persona.id_persona=this.data_id_persona.id_persona
        console.log(this.data_persona)
        console.log(this.data_persona.id_persona)
        this.registrarConductor(this.data_persona.id_persona)
      },
      err=>{
        console.error(err)
      }
      
    )
  }

  registrarConductor(id_persona:number){
        const params=this.activatedRoute.snapshot.params
        this.data_conductor.id_persona=id_persona
        this.data_conductor.id_empresa_servicio=params['id']

        this.conductorService.GuardarConductor(this.data_conductor).subscribe(
          res=>{
            console.log(res)
            this.limpiarFormulario()
            this.MostrarListaConductores()
          },
          err=>{
            console.error(err)
            this.limpiarFormulario()
          }
        )
        
  }

//========eliminar conductor=================================================
async  EliminarDatosConductor(id_persona:number,id_conductor:number){
   await this.eliminarConductor(id_conductor)
   await this.eliminarPersonaConductor(id_persona)
    this.limpiarFormulario()
  }

 async eliminarConductor(id_conductor:number){
     this.conductorService.EliminarConductor(id_conductor).subscribe(
      res=>{
          console.log(res)
          this.MostrarListaConductores();
      },
      err=>{
          console.error(err)
          this.MostrarListaConductores();
      }
     )      
  }
 async eliminarPersonaConductor(id_persona:number){
    this.personaService.EliminarPersona(id_persona).subscribe(
      res=>{
        console.log(res)
      },
      err=>{
        console.error(err)
      }
    )
  }
//=================================================================

obtenerValoresPorIdConductor(idConductor: number) {
  const conductorEncontrado = this.listaConductores.find((conductor: { id_conductor: number; }) => conductor.id_conductor === idConductor);

  console.log(conductorEncontrado)
  this.data_persona.id_persona=conductorEncontrado.id_persona,
  this.data_persona.nombres=conductorEncontrado.nombres,
  this.data_persona.ap_paterno=conductorEncontrado.ap_paterno,
  this.data_persona.ap_materno=conductorEncontrado.ap_materno,
  this.data_persona.tipo_doc=conductorEncontrado.tipo_doc,
  this.data_persona.documento=conductorEncontrado.documento,
  this.data_persona.telefono=conductorEncontrado.telefono,
  this.data_persona.correo=conductorEncontrado.correo
  this.data_conductor.nro_licencia=conductorEncontrado.nro_licencia
  this.data_conductor.id_conductor=conductorEncontrado.id_conductor
  this.data_conductor.categoria=conductorEncontrado.categoria
 

  this.modificar=true;
  this.titulo_boton='Modificar'
  this.claseBoton = 'btn btn-lg btn-warning mt-3 text-white ';

}
//MODIFICAR DATOS DE CONDUCTORES
async ModificarDatosConductor() {
  await this.ModificarPersona();
  await this.ModificarConductor();
  await this.MostrarListaConductores();
  this.limpiarFormulario();
}

async ModificarPersona() {
  try {
    console.log(this.data_persona);
    console.log(this.data_conductor);

    const res = await this.personaService.ModificarPersona(this.data_persona.id_persona, this.data_persona).toPromise();
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

async ModificarConductor(){
  try{
    delete this.data_conductor.id_empresa_servicio;
    delete this.data_conductor.id_persona;
    const res = await this.conductorService.ModificarConductor(this.data_conductor.id_conductor, this.data_conductor).toPromise();
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

async MostrarListaConductores() {
  console.log('zona de lista');
  const params = this.activatedRoute.snapshot.params;
  this.empresaServicioService.ObtenerListaConductores(params['id']).subscribe(

  )

  try {
    const res = await this.empresaServicioService.ObtenerListaConductores(params['id']).toPromise();
    this.listaConductores = res;
    this.listaConductores.sort((a: { nombres: string }, b: { nombres: string }) => {
      const nombreA = a.nombres.toUpperCase();
      const nombreB = b.nombres.toUpperCase();

      if (nombreA < nombreB) {
        return -1;
      }
      if (nombreA > nombreB) {
        return 1;
      }
      return 0;
    });
    console.log(this.listaConductores);
  } catch (err) {
    console.error(err);
  }
}

//=================================================================
  

  limpiarFormulario() {
    this.data_persona.nombres = '';
    this.data_persona.ap_paterno = '';
    this.data_persona.ap_materno = '';
    this.data_persona.correo = '';
    this.data_persona.tipo_doc = '';
    this.data_persona.documento = '';
    this.data_persona.telefono = '';
    this.data_conductor.nro_licencia = '';
    this.data_conductor.categoria='';

    this.modificar=false;
    this.titulo_boton='Guardar'
    this.claseBoton = 'btn btn-lg btn-success mt-3 text-white ';
    
  }

 
  volver(){
    const params=this.activatedRoute.snapshot.params
    this.router.navigate(['principal/empresas/servicio/detalle/',params['id']])
  }

  //mensajes de eliminacion
  mensajeEliminarConductor(id_persona:number,id_conductor:number){
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
        Swal.fire(
          'Eliminado!',
          'El conductor ha sido eliminado.',
          'success'  
        )
        this.EliminarDatosConductor(id_persona,id_conductor)

      }
    })
  }
  
}
