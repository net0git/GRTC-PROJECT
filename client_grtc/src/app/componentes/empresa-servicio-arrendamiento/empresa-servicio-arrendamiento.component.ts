import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpresaServicioService } from 'src/app/servicios/empresaServicio/empresa-servicio.service';
import { ArrendamientoService } from 'src/app/servicios/arrendamiento/arrendamiento.service';
import { UbicacionService } from 'src/app/servicios/ubicacion/ubicacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresa-servicio-arrendamiento',
  templateUrl: './empresa-servicio-arrendamiento.component.html',
  styleUrls: ['./empresa-servicio-arrendamiento.component.css']
})
export class EmpresaServicioArrendamientoComponent implements OnInit {

  modificar=false;
  titulo_boton='Registrar'
  claseBoton: string ='btn btn-lg btn-success mt-3 text-white ';

 data_contrato_arrendamineto:any={
    id_contrato:0,
    arrendador:'',
    dni:'',
    id_empresa_servicio:null,
    propiedad:'',
    direccion:'',
    departamento:'',
    provincia:'',
    distrito:'',
    fecha_inicio:null,
    fecha_fin:null
  }

  listaContratosArrendamiento:any=[];

  departamentos: string[] = []
  provincias: string[] = []
  distritosPorProvincia: string[] = []
// provincias: string[] = [
//   'ACOMAYO',
//   'ANTA',
//   'CALCA',
//   'CANAS',
//   'CANCHIS',
//   'CHUMBIVILCAS',
//   'CUSCO',
//   'ESPINAR',
//   'LA CONVENCIÓN',
//   'PARURO',
//   'PAUCARTAMBO',
//   'QUISPICANCHI',
//   'URUBAMBA'
// ];
// distritosPorProvincia: { [key: string]: string[] } = {
//   'ACOMAYO': ['ACOMAYO', 'ACOPIA', 'MOSOC LLACTA','POMACANCHI','RONDOCAN','SANGARARÁ'],
//   'ANTA': ['ANTA', 'ANCAHUASI', 'CACHIMAYO', 'CHINCHAYPUJIO', 'HUAROCONDO', 'LIMATAMBO', 'MOLLEPATA', 'PUCYURA', 'ZURITE'],
//   'CALCA':['CALCA','COYA','LAMAY','LARES','PISAC','SAN SALVADOR','TARAY','YANATILE'],
//   'CANAS':['CHECCA','KUNTURKANKI','LANGUI','LAYO','PAMPAMARCA','QUEHUE','TÚPAC AMARU','YANAOCO'],
//   'CANCHIS':['CHECACUPE','COLQUEMARCA','COMBAPATA','COPORAQUE','LIVITACA','MARANGANI','SAN PABLO','SAN PEDRO','SANTA ANA','SICUANI','TINTA'],
//   'CHUMBIVILCAS':['CCAPACMARCA','CHAMACA','COLQUEMARCA','LIVITACA','LLUSCO','QUIÑOTA','SANTO TOMÁS','VELILLE'],
//   'CUSCO': ['CUSCO', 'CCORCA', 'POROY', 'SAN JERÓNIMO', 'SAN SEBASTIÁN', 'SANTIAGO', 'SAYLLA', 'WANCHAQ'],
//   'ESPINAR': ['ESPINAR', 'CONDOROMA', 'COPORAQUE', 'OCORURO', 'PALLPATA', 'PICHIGUA', 'SUYCKUTAMBO', 'ALTO PICHIGUA', 'SANTA ANA', 'OSEFINA', 'PALCA'],
//   'LA CONVENCIÓN': ['QUILLABAMBA', 'ECHARATE', 'SANTA ANA', 'VILCABAMBA', 'HUAYOPATA', 'MARANURA', 'OCOBAMBA', 'QUELLOUNO', 'KIMBIRI', 'SANTA TERESA', 'MOLLEPATA', 'LA CONVENCIÓN', 'AYNA', 'SANTA ISABEL', 'VILLA VIRGEN', 'VILLA KINTIARINA', 'MEGANTONI'],
//   'PARURO': ['PARURO', 'ACCHA', 'CCAPI', 'COLCHA', 'HUANOQUITE', 'OMACHA', 'PACCARITAMBO', 'PILLPINTO', 'YAURISQUE'],
//   'PAUCARTAMBO': ['PAUCARTAMBO', 'CAICAY', 'CHALLABAMBA', 'COLQUEPATA', 'HUANCARANI', 'KOSÑIPATA', 'PAUCARTAMBO', 'QUEHUE', 'TRES UNIDOS'],
//   'QUISPICANCHI': ['URCOS', 'ANDAHUAYLILLAS', 'CAMANTI', 'CCARHUAYO', 'CCATCA', 'CUSIPATA', 'HUARO', 'LUCRE', 'MARCAPATA', 'OCONGATE', 'OROPESA', 'QUIQUIJANA', 'URCOS'],
//   'URUBAMBA': ['URUBAMBA', 'CHINCHERO', 'HUAYLLABAMBA', 'MACHUPICCHU', 'MARAS', 'OLLANTAYTAMBO', 'YUCAY']
// };

constructor(private ubicacionService:UbicacionService,private arrendamientoService:ArrendamientoService,private empresaServicioService:EmpresaServicioService,private router:Router,private activatedRoute:ActivatedRoute){}
ngOnInit(): void {
  this.ListarContratos()
  this.ListaDepartamentos()
}

  //ubicacion------------------------------------------------------------------------------------------
  // lista de departamento
  ListaDepartamentos(){
    this.departamentos=this.ubicacionService.getDepartamentos()
  }
  onDepartamentoChange() {
    const departamentoSeleccionado = this.data_contrato_arrendamineto.departamento;

    this.provincias = this.ubicacionService.getProvinciasPorDepartamento(departamentoSeleccionado);

  }
  onProvinciaChange(){
    const ProvinciaSeleccionado = this.data_contrato_arrendamineto.provincia;
    console.log(ProvinciaSeleccionado)
    this.distritosPorProvincia = this.ubicacionService.getDistritosPorProvincia(ProvinciaSeleccionado);
    console.log(this.distritosPorProvincia)
  }
//----------------------------------------------------------------------------------------------------


 //convertir a mayusculas
 convertirAMayusculas(valor: string): string {
  return valor.toUpperCase();
} 

volver(){
  const params=this.activatedRoute.snapshot.params;
  this.router.navigate(['principal/empresas/servicio/detalle/',params['id']])
}

mostrarDatos(){
  const params=this.activatedRoute.snapshot.params
  this.data_contrato_arrendamineto.id_empresa_servicio=params['id']
  console.log(this.data_contrato_arrendamineto)
}

RegistrarContratoArrendamiento(){
  const params=this.activatedRoute.snapshot.params
  this.data_contrato_arrendamineto.id_empresa_servicio=params['id']
  this.arrendamientoService.CrearContratoArrendamiento(this.data_contrato_arrendamineto).subscribe(
    res=>{
      console.log(res)
      this.ListarContratos()
      this.limpiarFormulario() 
    },
    err=>{
      console.error(err)
    }
  )
}

ModificarContraroArrendamiento(){
  this.arrendamientoService.ModificarContratoArrendamiento(this.data_contrato_arrendamineto.id_contrato,this.data_contrato_arrendamineto).subscribe(
    res=>{
        console.log(res)
        this.limpiarFormulario()
        this.ListarContratos()
    },
    err=>{
        console.error(err)
    }
  )
  
}

ListarContratos(){
  const params=this.activatedRoute.snapshot.params
  this.arrendamientoService.obtenerContratroArrendamientoPorEmpresa(params['id']).subscribe(
    res=>{
        this.listaContratosArrendamiento=res
        // this.listaContratosArrendamiento.fecha_inicial=this.FechaConFormato(this.listaContratosArrendamiento.fecha_inicial)
        // this.listaContratosArrendamiento.fecha_final=this.FechaConFormato(this.listaContratosArrendamiento.fecha_final)
        console.log(this.listaContratosArrendamiento)
        
    },
    err=>{
      console.error(err)
      this.listaContratosArrendamiento=[]
    }
  )
}

ObtenerValoresArrendamiento(id_contrato:number){
  const contratoEncontrado = this.listaContratosArrendamiento.find((contrato: { id_contrato: number; }) => contrato.id_contrato === id_contrato);
  
  this.data_contrato_arrendamineto.id_contrato=contratoEncontrado.id_contrato
  this.data_contrato_arrendamineto.id_empresa_servicio=contratoEncontrado.id_empresa_servicio
  this.data_contrato_arrendamineto.arrendador=contratoEncontrado.arrendador
  this.data_contrato_arrendamineto.dni=contratoEncontrado.dni
  this.data_contrato_arrendamineto.propiedad=contratoEncontrado.propiedad
  this.data_contrato_arrendamineto.direccion=contratoEncontrado.direccion
  this.data_contrato_arrendamineto.departamento=contratoEncontrado.departamento
  this.data_contrato_arrendamineto.provincia=contratoEncontrado.provincia
  this.data_contrato_arrendamineto.distrito=contratoEncontrado.distrito
  this.data_contrato_arrendamineto.fecha_inicio=this.FechaConFormato(contratoEncontrado.fecha_inicio) 
  this.data_contrato_arrendamineto.fecha_fin=this.FechaConFormato(contratoEncontrado.fecha_fin)

  console.log(contratoEncontrado)
  this.modificar=true;
  this.titulo_boton='Modificar'
  this.claseBoton = 'btn btn-lg btn-warning mt-3 text-white ';
}


validarFormulario() {
  // Realiza la validación de los campos aquí
  // Realiza la validación de los campos aquí
  if (!this.data_contrato_arrendamineto.arrendador) {
    alert('Por favor, ingrese los datos del arrendador');
    return;
  }
  if (!this.data_contrato_arrendamineto.dni) {
    alert('Por favor, ingrese el DNI del arrendador');
    return;
  }
  if (!this.data_contrato_arrendamineto.direccion) {
    alert('Por favor, ingrese la direccion');
    return;
  }
  if (!this.data_contrato_arrendamineto.fecha_inicio) {
    alert('Por favor, ingrese la fecha de inicio');
    return;
  }
  if (!this.data_contrato_arrendamineto.fecha_fin) {
    alert('Por favor, ingrese la fecha final');
    return;
  }
  if (!this.data_contrato_arrendamineto.departamento) {
    alert('Por favor, ingrese departamento');
    return;
  }
  if (!this.data_contrato_arrendamineto.provincia) {
    alert('Por favor, ingrese provincia');
    return;
  }
  if (!this.data_contrato_arrendamineto.distrito) {
    alert('Por favor, ingrese distrito');
    return;
  }
  // Si llega hasta aquí, significa que todos los campos están validados correctamente
  // Puedes ejecutar la acción deseada aquí
  if(this.modificar){
    this.ModificarContraroArrendamiento();
  }else{
    this.RegistrarContratoArrendamiento();
  }
  

}  

//FUNCION QUE PERMITE DAR FORMATO A LA FECHA
FechaConFormato(fechaISO:string):string{
  // Función para convertir una fecha ISO a formato "mm-yyyy-dd"
    const fecha = new Date(fechaISO);
    const dia = fecha.getDate().toString().padStart(2, '0'); // Obtiene el día
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Obtiene el mes (agregamos 1 porque los meses en JavaScript comienzan en 0)
    const anio = fecha.getFullYear(); // Obtiene el año
    // Formatea la fecha en "yyyy-dd-mm"
    return `${anio}-${mes}-${dia}`;
}
//LIMPIAR DATOS
limpiarFormulario() {
  this.data_contrato_arrendamineto.id_contrato=0;
  this.data_contrato_arrendamineto.id_empresa_servicio =0;
  this.data_contrato_arrendamineto.arrendador = '';
  this.data_contrato_arrendamineto.dni = '';
  this.data_contrato_arrendamineto.propiedad = '';
  this.data_contrato_arrendamineto.direccion = '';
  this.data_contrato_arrendamineto.departamento = '';
  this.data_contrato_arrendamineto.provincia = '';
  this.data_contrato_arrendamineto.distrito = '';
  this.data_contrato_arrendamineto.fecha_inicio = null;
  this.data_contrato_arrendamineto.fecha_fin = null;
  
  this.modificar=false;
  this.titulo_boton='Guardar'
  this.claseBoton = 'btn btn-lg btn-success mt-3 text-white ';
}

EliminarContratoArrendamiento(id:number){
  this.arrendamientoService.EliminarContratoArrendamiento(id).subscribe(
    res=>{
      console.log(res)
      this.limpiarFormulario()
      this.ListarContratos()
    },
    err=>{
      console.error(err)
    }
  )
}

mensajeEliminarContratoArrendamiento(id_contrato:number){
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
        'Los datos del contrato de arrendamiento han sido eliminados.',
        'success'
      )
      this.EliminarContratoArrendamiento(id_contrato)

    }
  })
}

}
