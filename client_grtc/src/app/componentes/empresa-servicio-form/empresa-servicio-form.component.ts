import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { PersonaService } from 'src/app/servicios/persona/persona.service';
import { EmpresaService } from 'src/app/servicios/empresa/empresa.service';
import { EmpresaServicioService } from 'src/app/servicios/empresaServicio/empresa-servicio.service';
import { UbicacionService } from 'src/app/servicios/ubicacion/ubicacion.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-empresa-servicio-form',
  templateUrl: './empresa-servicio-form.component.html',
  styleUrls: ['./empresa-servicio-form.component.css']
})
export class EmpresaServicioFormComponent implements OnInit {

  

  titulo='Creacion de Empresa por Servicio'
  titulo_boton='CREAR'
  modificar=false;//esta variable nos indicara si el estado de la ventana sera de creacion de usuario o modificacion, todo esto en funcion a la url que llegue a activiar la ventana
  claseBoton: string = 'btn btn-lg btn-success mt-3 text-white ';

  //datos de empresa
  data_empresa:any={
    id_empresa:0,
    razon_social:'',
    ruc:'',
    direccion:'',
    correo:'',
    telefono:'',
    distrito:'',
    provincia:'',
    departamento:'',
    id_representante_legal:null,
    nota:''
  }

  //datos de la empresa por sevicio
  data_empresa_servicio:any={
    id_empresa_servicio:0,
    id_tipo_servicio:0,
    id_empresa:null,
    fecha_inicial:null,
    fecha_final:null,
    expediente:null,
  }

  //datos de persona
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

   departamentos:string[]=[]
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
  

  data_return_id_persona:any=[];//almacena el id_persona creado por la base de datos de manera temporal, este proceso se realiza mendiante la funcion crearRepresentanteLegal()
  data_return_id_empresa:any=[];//almacena el id_empresa creado por la base de datos de manera temporal, este proceso se realiza mendiante la funcion crearEmpresa()
   
  constructor(private ubicacionService:UbicacionService,private activatedRoute:ActivatedRoute,private empresaServicioService:EmpresaServicioService ,private empresaService:EmpresaService,private personaService:PersonaService,private router:Router){}
  ngOnInit(): void {
    const params=this.activatedRoute.snapshot.params;
    if(params['id']){
      this.titulo='Modificar Empresa'
      this.titulo_boton='MODIFICAR'
      this.modificar=true;
      this.claseBoton = 'btn btn-lg btn-warning mt-3 text-white ';
      this.empresaServicioService.ObtenerEmpresaServicio(params['id']).subscribe(
        res=>{
          this.data_empresa_servicio=res
          this.data_empresa_servicio=this.data_empresa_servicio[0]
          this.data_empresa_servicio.fecha_inicial=this.FechaConFormato(this.data_empresa_servicio.fecha_inicial)
          this.ObtenerDatosEmpresa(this.data_empresa_servicio.id_empresa);
          
          console.log(this.data_empresa_servicio)
        },
        err=>{
          console.error(err)
        }
      )
      
  }
 
  }

  //ubicacion------------------------------------------------------------------------------------------
  // lista de departamento
  ListaDepartamentos(){
    this.departamentos=this.ubicacionService.getDepartamentos()
  }
  onDepartamentoChange() {
    const departamentoSeleccionado = this.data_empresa.departamento;
    console.log(departamentoSeleccionado)
    this.provincias = this.ubicacionService.getProvinciasPorDepartamento(departamentoSeleccionado);
    console.log(this.provincias)
  }
  onProvinciaChange(){
    const ProvinciaSeleccionado = this.data_empresa.provincia;
    console.log(ProvinciaSeleccionado)
    this.distritosPorProvincia = this.ubicacionService.getDistritosPorProvincia(ProvinciaSeleccionado);
    console.log(this.distritosPorProvincia)
  }
//----------------------------------------------------------------------------------------------------

  FechaConFormato(fechaISO:string):string{
    // Función para convertir una fecha ISO a formato "mm-yyyy-dd"
      const fecha = new Date(fechaISO);
      const dia = fecha.getDate().toString().padStart(2, '0'); //Obtiene el día
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); //Obtiene el mes (agregamos 1 porque los meses en JavaScript comienzan en 0)
      const anio = fecha.getFullYear(); //Obtiene el año
    //Formatea la fecha en "yyyy-dd-mm"
      return `${anio}-${mes}-${dia}`;
    }
  
//---------------VALIDAR FORMULARIO ----------------------
validarFormulario() {
  // Realiza la validación de los campos aquí
  if (this.data_empresa_servicio.id_tipo_servicio == 0) {
    alert('Por favor, selecciona un Tipo de servicio.');
    document.getElementById("tipo_empresa_servicio")?.focus();
    return;
  }
  if (!this.data_empresa.ruc) {
    alert('Por favor, ingresa el RUC de la Empresa.');
    document.getElementById("ruc_empresa")?.focus();
    return;
  }

  if (!this.data_empresa.razon_social) {
    alert('Por favor, ingresa la Razón Social de la Empresa.');
    document.getElementById("nombre_empresa")?.focus();
    return;
  }

  if (!this.data_empresa.direccion) {
    alert('Por favor, ingresa la Dirección de la Empresa.');
    document.getElementById("direccion_empresa")?.focus();
    return;
  }

  if (!this.data_empresa.departamento) {
    alert('Por favor, selecciona el Departamento de la Empresa.');
    document.getElementById("departamento_empresa")?.focus();
    return;
  }

  if (!this.data_empresa.provincia) {
    alert('Por favor, selecciona la Provincia de la Empresa.');
    document.getElementById("provincia_empresa")?.focus();
    return;
  }

  if (!this.data_empresa.distrito) {
    alert('Por favor, selecciona el Distrito de la Empresa.');
    document.getElementById("distrito_empresa")?.focus();
    return;
  }

  if (!this.data_empresa_servicio.fecha_inicial) {
    alert('Por favor, ingrese la fecha de activacion de la empresa');
    document.getElementById("fecha_empresa")?.focus();
    return;
  }

  if (!this.data_empresa_servicio.expediente) {
    alert('Por favor, ingresa el dato del expediente.');
    document.getElementById("expediente_empresa")?.focus();
    return;
  }

  if (!this.data_persona.nombres) {
    alert('Por favor, ingresa los Nombres del Representante Legal.');
    document.getElementById("nombre_representante")?.focus();
    return;
  }

  if (!this.data_persona.ap_paterno) {
    alert('Por favor, ingresa el Apellido Paterno del Representante Legal.');
    document.getElementById("ap_paterno")?.focus();
    return;
  }

  if (!this.data_persona.ap_materno) {
    alert('Por favor, ingresa el Apellido Materno del Representante Legal.');
    document.getElementById("ap_materno")?.focus();
    return;
  }

  if (!this.data_persona.tipo_doc) {
    alert('Por favor, selecciona el Tipo de Documento de Identidad del Representante Legal.');
    document.getElementById("tipo_doc")?.focus();
    return;
  }

  if (!this.data_persona.documento) {
    alert('Por favor, ingresa el Documento de Identidad del Representante Legal.');
    document.getElementById("documento_id")?.focus();
    return;
  }

  // Si llega hasta aquí, significa que todos los campos están validados correctamente
  // Puedes ejecutar la acción deseada aquí
  if(this.modificar){
    // alert('modificar')
    // this.modificarRepresentante();
    // this.ModificarEmpresa();
    // this.ModificarInfraestructura();
    // this.MensajeDeModificado()
    // this.volerInfraestructuraDetalle();
    this.ModificarDatosFormulario();
     this.MensajeDeModificado()
  }else{
    // alert('datos verificados')
    //this.mostrarDatos()
    console.log(this.data_empresa_servicio.id_tipo_servicio)//this.data_empresa_servicio.id_tipo_servicio
    console.log(this.data_empresa.ruc)
    this.GuardarDatosFormulario();
  }
  

}    

  //////************CODIGO DE PRUEBA PARA EJECUTAR EN ORDEN *******************/
//1.-GUARDAR REPRESENTANTE
async GuardarRepresentanteLegal() {
  try {
    const res = await this.personaService.CrearPersona(this.data_persona).toPromise();
    this.data_return_id_persona = res;
    this.data_persona.id_persona = this.data_return_id_persona.id_persona;
    console.log(this.data_persona );
  } catch (err) {
    console.error('Error en GuardarRepresentanteLegal:', err);
  }
}
//2.-GUARDAR EMPRESA
async GuardarEmpresa() {
  try {
    this.data_empresa.id_representante_legal = this.data_persona.id_persona;
    const res = await this.empresaService.crearEmpresa(this.data_empresa).toPromise();
    this.data_return_id_empresa = res;
    this.data_empresa.id_empresa = this.data_return_id_empresa.id_empresa;
    // Llamamos a mostardatosempresa después de completar la llamada a crearEmpresa
    console.log(this.data_empresa);

    console.log('Función GuardarEmpresa completada con éxito, id_empresa: '+ this.data_empresa.id_empresa);
  } catch (err) {
    console.error('Error en GuardarEmpresa:', err);
  }
}  

//3.-GUARDAR EN T_EMPRESA_SERVICIO
async GuardarEmpresaServicio() {
  try {
    this.data_empresa_servicio.id_empresa = this.data_empresa.id_empresa;
    const fechaInicial = new Date(this.data_empresa_servicio.fecha_inicial);

    // Agregar 10 años a la fecha
    fechaInicial.setFullYear(fechaInicial.getFullYear() + 10);
    // Agregar 1 día
    fechaInicial.setDate(fechaInicial.getDate() + 1);
    
    // Obtener el año, mes y día de la fecha final
    const anio = fechaInicial.getFullYear();
    const mes = (fechaInicial.getMonth() + 1).toString().padStart(2, '0'); // Agregar 1 al mes porque los meses comienzan en 0
    const dia = fechaInicial.getDate().toString().padStart(2, '0');
    
    // Formatear la fecha final como "yyyy-mm-dd"
    this.data_empresa_servicio.fecha_final = `${anio}-${mes}-${dia}`;
     const res = await this.empresaServicioService.CrearEmpresaServicio(this.data_empresa_servicio).toPromise(); 
    // Llamamos a mostardatosempresa después de completar la llamada a crearEmpresa
    console.log(this.data_empresa_servicio);
    this.MensajeDeGuardado();
    this.volver();
    console.log('Función GuardarEmpresaServicio completada con éxito');
  } catch (err) {
    console.error('Error en GuardarEmpresa:', err);
  }
}
//BUSCAR EMPRESA POR RUC
BuscarEmpresa(){
  this.empresaService.obtenerEmpresaPorRuc(this.data_empresa.ruc).subscribe(
   res=>{   
       console.log(res)
       this.data_empresa=res;
       this.data_empresa=this.data_empresa[0];
       console.log(this.data_empresa);
       this.BuscarRepresentanteLegal();
   },
   err=>{
     console.error(err);
     Swal.fire('No existe registro de la empresa con ruc: '+this.data_empresa.ruc)
     this.LimpiarCampoEmpresa();
   }
  )
}

LimpiarCampoEmpresa(){
  // Restablecer los valores de los campos de entrada a su estado original
  this.data_empresa.razon_social = '';
  this.data_empresa.direccion = '';
  this.data_empresa.correo = '';
  this.data_empresa.telefono = '';
  this.data_empresa.departamento = '';
  this.data_empresa.provincia = '';
  this.data_empresa.distrito = '';
  
  // También puedes restablecer los valores de los campos de la representante legal
  this.data_persona.nombres = '';
  this.data_persona.ap_paterno = '';
  this.data_persona.ap_materno = '';
  this.data_persona.correo = '';
  this.data_persona.tipo_doc = '';
  this.data_persona.documento = '';
  this.data_persona.telefono = '';
}
BuscarRepresentanteLegal(){
  this.personaService.ObtenerPersona(this.data_empresa.id_representante_legal).subscribe(
    res=>{
   
        this.data_persona=res;
        this.data_persona=this.data_persona[0]
             
    },
    err=>{
     console.error(err)
    
    }
  )
} 
//**********************************************************************************/
//****EJECUTAR TODAS LAS FUNCIONDES EN ORDEN SECUENCIAL**** 
//__________________________FUNCION PRINCIPAL________________________________________
//GUARDAR DATOS:---------------------------------------------------------------------
//buscamos si existe la empresa registrada al tipo de servicio
async GuardarDatosFormulario(){
    this.empresaServicioService.BuscarEmpresaPorRuc_tipoServicio(this.data_empresa_servicio.id_tipo_servicio,this.data_empresa.ruc).subscribe(
      res=>{
        Swal.fire('La empresa y el tipo de servicio ya se encuentran registradas en el sistema, no se permite duplicados')
      },

      err=>{
        //buscamos si ya existe la empresa por ruc
        this.empresaService.obtenerEmpresaPorRuc(this.data_empresa.ruc).subscribe(
          async res=>{   
              console.log(res)
              this.data_empresa=res;
              this.data_empresa=this.data_empresa[0];
              this.BuscarRepresentanteLegal();
              await this.GuardarEmpresaServicio();  
          },
          async err=>{
            console.error(err);
              await this.GuardarRepresentanteLegal();
              await this.GuardarEmpresa();
              await this.GuardarEmpresaServicio();
          }
         )
      }
    )

}
//MODIFICAR DATOS:-------------------------------------------------------------------
ModificarDatosFormulario(){
  this.modificarRepresentante()
  this.modificarEmpresa();
  this.modificarEmpresaServicio();
}
//modificar datos representante
modificarRepresentante(){
  this.personaService.ModificarPersona(this.data_persona.id_persona,this.data_persona).subscribe(
    res=>{
      console.log(res);
    },
    err=>{
      console.error(err)
    }
  )
}
//modificar datos empresa
modificarEmpresa(){
  this.empresaService.modificarEmpresa(this.data_empresa.id_empresa,this.data_empresa).subscribe(
    res=>{
      console.log(res);
    },
    err=>{
      console.error(err)
    }
  )
}
//modificar datos empresa servicio
modificarEmpresaServicio(){
  
  this.data_empresa_servicio.id_empresa = this.data_empresa.id_empresa;
  const fechaInicial = new Date(this.data_empresa_servicio.fecha_inicial);

  // Agregar 10 años a la fecha
  fechaInicial.setFullYear(fechaInicial.getFullYear() + 10);
   // Agregar 1 día
   fechaInicial.setDate(fechaInicial.getDate() + 1);
  
  // Obtener el año, mes y día de la fecha final
  const anio = fechaInicial.getFullYear();
  const mes = (fechaInicial.getMonth() + 1).toString().padStart(2, '0'); // Agregar 1 al mes porque los meses comienzan en 0
  const dia = fechaInicial.getDate().toString().padStart(2, '0');
  
  // Formatear la fecha final como "yyyy-mm-dd"
  this.data_empresa_servicio.fecha_final = `${anio}-${mes}-${dia}`;
  this.empresaServicioService.ModificarEmpresaServicio(this.data_empresa_servicio.id_empresa_servicio,this.data_empresa_servicio).subscribe(
    res=>{
      console.log(res)
      this.MensajeDeModificado()
      this.volver();
    },
    err=>{
      console.error(err)
    }
  )
}
//___________________________________________________________________________________
//______________OBTENER LOS DATOS DE EMPRESA Y REPRESENTANTE LEGAL___________________
ObtenerDatosEmpresa(id:number){
    this.empresaService.obtenerEmpresa(id).subscribe(
      res=>{
        this.data_empresa=res;
        this.data_empresa=this.data_empresa[0]
        this.BuscarRepresentanteLegal();
        this.ListaDepartamentos()
          this.onDepartamentoChange()
          this.onProvinciaChange()
        console.log(this.data_empresa);
      },
      err=>{
        console.error(err)
      }
    )
}

//MENSAJES ANIMADOS
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
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Modificacion exitosa',
    showConfirmButton: false,
    timer: 1500
  })
}

//volver a la ventana de lista de empresas por sevivicio
volver(){
  if(this.modificar){
    this.router.navigate(['principal/empresas/servicio/detalle',this.data_empresa_servicio.id_empresa_servicio])
  }
  else{
    this.router.navigate(['principal/empresas/servicio'])
  }
}  
}
