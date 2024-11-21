import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { MarcaModeloService } from 'src/app/servicios/marcaModelo/marca-modelo.service';
import { VehiculoService } from 'src/app/servicios/vehiculo/vehiculo.service';
import { EmpresaServicioService } from 'src/app/servicios/empresaServicio/empresa-servicio.service';
import { PersonaService } from 'src/app/servicios/persona/persona.service';
import { EmpresaService } from 'src/app/servicios/empresa/empresa.service';
import { ResolucionService } from 'src/app/servicios/resolucion/resolucion.service';
import { ItinerarioService } from 'src/app/servicios/itinerario/itinerario.service';
import { ArrendamientoService } from 'src/app/servicios/arrendamiento/arrendamiento.service';
import { HistorialvehicularService } from 'src/app/servicios/historialvehicular/historialvehicular.service';
import { ConductorService } from 'src/app/servicios/conductor/conductor.service';
import Swal from 'sweetalert2';
import { UbicacionService } from 'src/app/servicios/ubicacion/ubicacion.service';
// import { valueOrDefault } from 'chart.js/dist/helpers/helpers.core';

@Component({
  selector: 'app-empresa-servicio-form-principal',
  templateUrl: './empresa-servicio-form-principal.component.html',
  styleUrls: ['./empresa-servicio-form-principal.component.css']
})
export class EmpresaServicioFormPrincipalComponent implements OnInit {
titulo='datos de empresa'

registrationFormUssuario!: FormGroup;
currentStep: number = 1;

pdfUrl: SafeResourceUrl | null =null;


desableArrendamiento=false
///ARREGLOS COMPLEMENTARIOS

departamentos:string[]=[]

provincias: string[] = []

distritosPorProvincia: string[]=[]

//para arrendamiento
provinciasArrendamiento: string[] = []

distritosPorProvinciaArrendamiento: string[]=[]
// provincias: string[] = [

// // provincias del cusco
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
//   //distritos del Cusco
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



  constructor(private ubicacionService:UbicacionService,private historialvehicularService:HistorialvehicularService,private conductorService:ConductorService,private arrendamientoService:ArrendamientoService,private itinerarioService:ItinerarioService,private resolucionService:ResolucionService,private empresaService:EmpresaService,private personaService:PersonaService,private empresaServicioService:EmpresaServicioService,private vehiculoService:VehiculoService,private marcaModeloService:MarcaModeloService,private router:Router,private formBuilder: FormBuilder,private sanitizer: DomSanitizer ){}

  ngOnInit(): void {
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`assets/documentos/error/error_carga2.pdf`);
    this.obtenerListaMarca()
    this.ListaDepartamentos()
  }
//ubicacion------------------------------------------------------------------------------------------
  // ubicacion de datos de la empresa
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

  //ubicacion de datos de infraestructura

  onDepartamentoArrendamientoChange() {
    const departamentoSeleccionado = this.data_contrato_arrendamineto.departamento;
    this.provinciasArrendamiento = this.ubicacionService.getProvinciasPorDepartamento(departamentoSeleccionado);
  }
  onProvinciaArrendamientoChange(){
    const ProvinciaSeleccionado = this.data_contrato_arrendamineto.provincia;
    this.distritosPorProvinciaArrendamiento = this.ubicacionService.getDistritosPorProvincia(ProvinciaSeleccionado);
  }


//----------------------------------------------------------------------------------------------------
 //convertir a mayusculas
 convertirAMayusculas(valor: string): string {
  return valor.toUpperCase();
} 

// Convertir a minúsculas
convertirAMinusculas(valor: string): string {
  return valor.toLowerCase();
}
// const currentStep: number = 1;
  progressValue=((1 ) / 7) * 100;

  nextStep(): void {
    this.currentStep++;
     // Actualizar la barra de progreso
     this.progressValue = ((this.currentStep ) / 7) * 100; // 3 es el número total de pasos
  }

  // Método para regresar al paso anterior
  prevStep(): void {
    this.currentStep--;
    this.progressValue = ((this.currentStep ) / 7) * 100; // 3 es el número total de pasos
  }


//buscar empresa por RUC y tipo de servicio, ademas podemos encontrar al representante legal
BuscarEmpresa(){
  if(this.data_empresa_servicio.id_tipo_servicio==0){
    alert('por favor, seleccione el tipo de servicio')
  }
  else{
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

                        this.data_return_id_empresa=this.data_empresa.id_empresa
  
                        this.desabilitarFormEmpresa=true
                        this.deshabilitarCampoTipoEmpresa=true
                        this.deshabilitarCampoRuc=true
                        this.empresaEnonctrada=true
                        this.deshabilitarCampoExp_fecha=false
                        this.BuscarRepresentanteLegal()
                    },
                    async err=>{
                        this.desabilitarFormEmpresa=false
                        this.deshabilitarCampoTipoEmpresa=true
                        this.deshabilitarCampoRuc=true
                        this.deshabilitarCampoExp_fecha=false
                        this.empresaEnonctrada=false
                        
                    }
                  )
                }
              )
  }
} 

BuscarRepresentanteLegal(){
  this.personaService.ObtenerPersona(this.data_empresa.id_representante_legal).subscribe(
    res=>{
   
        this.data_representante_legal=res;
        this.data_representante_legal=this.data_representante_legal[0]
        this.deshabilitarRepresentante=true
             
    },
    err=>{
     console.error(err)
    
    }
  )
}


  // paso 1: REGISTRO DE DATOS DE LA EMPRESA============================================================================================================================================
         //restricciones
          desabilitarFormEmpresa=true
          deshabilitarCampoTipoEmpresa=false
          deshabilitarCampoRuc=false 
          deshabilitarCampoExp_fecha=true

          deshabilitarPasoUno=true

          empresaEnonctrada=false;
        //DATOS DE LA EMPRESA: 
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

                // //VALIDAR DATOS DEL FORMULARIO
                // VALIDAR DATOS DEL FORMULARIO

           validarDatosFormularioEmpresa() {
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

                  this.nextStep()
                  // Aquí puedes agregar más validaciones para otros campos del formulario
                
                  
                  // Llama a tu función mostrarDatosVehiculo() o realiza cualquier acción deseada
                }
  // paso 2: REGISTRO DE REPRESENTANTE LEGAR============================================================================================================================================
        //restricciones
        deshabilitarRepresentante=false
          
        //datos de persona
        data_representante_legal:any={
          id_persona:0,
          nombres:'',
          ap_paterno:'',
          ap_materno:'',
          tipo_doc:'',
          documento:'',
          telefono:'',
          correo:''
        };

        validarDatosFormularioRepresentanteLegal() {
          // Realiza la validación de los campos aquí
             if (!this.data_representante_legal.nombres) {
               alert('Por favor, ingrese el nombre del representante');
             
               return;
             }
             if (!this.data_representante_legal.ap_paterno) {
               alert('Por favor, el apellido paterno del representante');
            
               return;
             }

             if (!this.data_representante_legal.ap_materno) {
               alert('Por favor, ingrese el apellido materno del representante');
              
               return;
             }

             if (this.data_representante_legal.tipo_doc==0) {
               alert('Por favor, seleccione el tipo de documento');
               return;
             }

             if (!this.data_representante_legal.documento) {
               alert('Por favor, por favor digite su documento');
              
               return;
             }


         this.nextStep()
    
       }

  // paso 3: REGISTRO DE RESOLUCION============================================================================================================================================
          //variables
          //objeto
          //datos de resolucion
              resolucion:any={
                id_resolucion:0,
                nro_resolucion:null,
                anio_resolucion:null,
                fecha_resolucion:null,
                nombre_resolucion:'',
                tomo_resolucion:null,
                documento:null,
                descripcion:null,
              }  
          //EVENTO INMEDIATO QUE REGISTRA EL DOCUMENTO QUE SUBIMOS 
                onFileSelected(event:any) {
                  const selectedFile = event.target.files[0];
                  if (selectedFile) {
                    this.convertToBase64(selectedFile);
                    //this. mostrarDocumento();
                    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(selectedFile));
                  }  
                }
          // CONVERTIR A BASE64 Y ALMACENAR EL CODIGO EN LA PROPIEDAD RESOLUCION.DOCUMENTO
                convertToBase64(file: File): void {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    const base64String = reader.result as string;
                    // Almacena la cadena en base64 en la propiedad documento del objeto resolucion
                    this.resolucion.documento = base64String.split(',')[1];
                  };
                  reader.readAsDataURL(file);
                }   
          //VALIDAR FORMULARIO RESOLUCION

          validarFormularioResolucion( ) {
            // Realiza la validación de los campos aquí
            if (!this.resolucion.documento) {
              alert('Por favor, seleccione documento asociado a la resolucion');
              return;
            }  
           
            if (!this.resolucion.nombre_resolucion) {
              alert('Por favor, ingrese el nombre de la resolucion');
              return;
            }
            if (!this.resolucion.nro_resolucion) {
              alert('Por favor, ingrese el numero de resolucion');
              return;
            }
            if (!this.resolucion.anio_resolucion) {
              alert('Por favor, ingrese el año de resolucion');
              return;
            }
            if (!this.resolucion.tomo_resolucion) {
              alert('Por favor, ingrese el tomo');
              return;
            }
            if (!this.resolucion.fecha_resolucion) {
              alert('Por favor, ingrese la fecha de la resolucion');
              return;
            }     
            if (!this.resolucion.descripcion) {
              alert('Por favor, ingrese la descripcion');
              return;
            } 

         
              this.nextStep()
              
          }  
    
  // paso 4: REGISTRO DE ITINERARIO ===========================================================================================================================================  
          //variables
                modificarItineario=false
                titulo_boton_itinerario='registrar itinerario'
                claseBoton_itinerario: string = 'btn btn-lg btn-success mt-3 text-white ';
                indexItinerario=0
          //objeto
                //datos itinerario
                data_itinerario:any={
                id_detalle_ruta_itinerario:0,
                origen:'',
                destino:'',
                corredor:'',
                itinerario:'',
                frecuencia:'',
                id_empresa_servicio:0,
                }
          //lista de itinerarios
                listaItinerarios:any=[];//almacenara todos los itinerarios correspondientes a la empresa

          //VALIDAR DATOS DEL FORMULARIO
          validarFormularioItinerario( ) {
            // Realiza la validación de los campos aquí
            if(this.data_empresa_servicio.id_tipo_servicio==2){
                 
                  if (!this.data_itinerario.itinerario) {
                    alert('Por favor, ingrese el itinerario');
                    return;
                  }
                 
                  // Si llega hasta aquí, significa que todos los campos están validados correctamente
                  // Puedes ejecutar la acción deseada aquí
                  if(this.modificarItineario){
                    this.ModificarItinerario()
                  }else{
                    this.IngresarItinerario()
                  }
             }
             else{
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
                  if(this.modificarItineario){
                    this.ModificarItinerario()
                  }else{
                    this.IngresarItinerario()
                  }
             }
           
            
          
          }  
          //INGRESAR DATOS AL ARREGLO LISTA DE ITITNERARIO
              IngresarItinerario(){
                const newData={
                  
                  origen:this.data_itinerario.origen,
                  destino:this.data_itinerario.destino,
                  corredor:this.data_itinerario.corredor,
                  itinerario:this.data_itinerario.itinerario,
                  frecuencia:this.data_itinerario.frecuencia,
                  
                }

                this.listaItinerarios.push(newData)
                console.log(this.listaItinerarios)
                this.LimpiarDatosItitneario()
              }
          //LIMPIAR DATOS DEL FORMULARIO
              LimpiarDatosItitneario(){
                  this.data_itinerario.id_detalle_ruta_itinerario=0;
                  this.data_itinerario.origen ='';
                  this.data_itinerario.destino = '';
                  this.data_itinerario.itinerario = '';
                  this.data_itinerario.frecuencia = '';
                  this.modificarItineario=false;
                  this.titulo_boton_itinerario='Guardar'
                  this.claseBoton_itinerario = 'btn btn-lg btn-success mt-3 text-white ';
                }
          //ELIMINAR ITINERARIO 
              EliminarItinerario(index_itinerario:number){
                this.listaItinerarios.splice(index_itinerario,1)
                
              }

          //OBTENER DATOS DEL ITINERARIO DE ACUERDO AL INDICE DEL ARREGLO QUE LO GUARDA
              ObtenerDetalleItinerario(index_itinerario:number){

                 this.data_itinerario.origen =this.listaItinerarios[index_itinerario].origen
                 this.data_itinerario.destino =this.listaItinerarios[index_itinerario].destino  
                 this.data_itinerario.itinerario =this.listaItinerarios[index_itinerario].itinerario
                 this.data_itinerario.frecuencia =this.listaItinerarios[index_itinerario].frecuencia
                 this.modificarItineario=true;
                 this.titulo_boton_itinerario='Modificar'
                 this.claseBoton_itinerario = 'btn btn-lg btn-warning mt-3 text-white ';
                 this.indexItinerario=index_itinerario
              }

          //MODIFICAR ITINERARIO
              ModificarItinerario(){
                const newData={
                        
                        origen:this.data_itinerario.origen,
                        destino:this.data_itinerario.destino,
                        corredor:this.data_itinerario.corredor,
                        itinerario:this.data_itinerario.itinerario,
                        frecuencia:this.data_itinerario.frecuencia,
                        
                      }
                this.listaItinerarios[this.indexItinerario]=newData
                this.LimpiarDatosItitneario()
              }
          //autorizacion al siguiente paso
          SiguientePaso_itinerario(){
            if(this.data_empresa_servicio.id_tipo_servicio==2){
              this.desableArrendamiento=true
              this.nextStep()
            }else{            
              if(this.listaItinerarios.length>0){
                this.nextStep()
                
              }
              else{
                alert('por favor ingrese ruta(s) de la empresa')
              }
            }
          }
          
  // paso 5: REGISTRO DE ARRENDAMIENTO ======================================================================================================================================================  
          //variables
                modificarArrendamiento=false;
                titulo_boton_arrendamiento='Registrar Arrendamiento'
                claseBoton_arrendamiento: string ='btn btn-lg btn-success mt-3 text-white ';
                indexArreinda=0
          //datos del objeto 
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
           //lista de itinerarios
                 listaContratosArrendamiento:any=[];
    
          //VALIDAR DATOS DEL FORMULARIO
                  validarFormularioArrendamiento( ) {
                    // Realiza la validación de los campos aquí
                    if (!this.data_contrato_arrendamineto.arrendador) {
                      alert('Por favor, ingrese los datos del arrendador');
                      return;
                    }
                    if (!this.data_contrato_arrendamineto.dni) {
                      alert('Por favor, ingrese el DNI del arrendador');
                      return;
                    }
                    if (!this.data_contrato_arrendamineto.propiedad) {
                      alert('Por favor, ingrese el nombre de la propiedad');
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
                    if(this.modificarArrendamiento){
                        this.ModificarArrendamiento()
                    }else{
                      this.ingresarArrendamiento()
                    }
 
                  } 
       
          //INGRESAR DATOS AL ARREGLO LISTA DE ARRENDAMIENTO
                ingresarArrendamiento(){
                  const newData={
                  
                    arrendador:this.data_contrato_arrendamineto.arrendador,
                    dni:this.data_contrato_arrendamineto.dni,
                    propiedad:this.data_contrato_arrendamineto.propiedad,
                    direccion:this.data_contrato_arrendamineto.direccion,
                    fecha_inicio:this.data_contrato_arrendamineto.fecha_inicio,
                    fecha_fin:this.data_contrato_arrendamineto.fecha_fin,
                    departamento:this.data_contrato_arrendamineto.departamento,
                    provincia:this.data_contrato_arrendamineto.provincia,
                    distrito:this.data_contrato_arrendamineto.distrito,
                    id_empresa_servicio:null,
                    
                  }
  
                  this.listaContratosArrendamiento.push(newData)
                  
                  this.LimpiarDatosArrendamiento()
                }        
              
          //LIMPIAR DATOS DEL FORMULARIO
                LimpiarDatosArrendamiento(){
                
                  this.data_contrato_arrendamineto.id_contrato=0;
                  this.data_contrato_arrendamineto.id_empresa_servicio =null;
                  this.data_contrato_arrendamineto.arrendador = '';
                  this.data_contrato_arrendamineto.dni = '';
                  this.data_contrato_arrendamineto.propiedad = '';
                  this.data_contrato_arrendamineto.direccion = '';
                  this.data_contrato_arrendamineto.fecha_inicio = null;
                  this.data_contrato_arrendamineto.fecha_fin = null;
                  this.data_contrato_arrendamineto.departamento='',
                  this.data_contrato_arrendamineto.provincia='',
                  this.data_contrato_arrendamineto.distrito='',
                  
                  this.modificarArrendamiento=false;
                  this.titulo_boton_arrendamiento='Guardar'
                  this.claseBoton_arrendamiento = 'btn btn-lg btn-success mt-3 text-white ';
                }
            
          //ELIMINAR ARRENDAMIENTO 
                EliminarArrienda(index_arrendamiento:number){
                  this.listaContratosArrendamiento.splice(index_arrendamiento,1)
                }

          //OBTENER DATOS DEL ARRENDAMIENTO DE ACUERDO AL INDICE DEL ARREGLO QUE LO GUARDA
                  ObtenerValoresArrendamiento(index_arrendamiento:number){
                    this.data_contrato_arrendamineto.arrendador =this.listaContratosArrendamiento[index_arrendamiento].arrendador
                    this.data_contrato_arrendamineto.dni =this.listaContratosArrendamiento[index_arrendamiento].dni
                    this.data_contrato_arrendamineto.propiedad =this.listaContratosArrendamiento[index_arrendamiento].propiedad
                    this.data_contrato_arrendamineto.direccion =this.listaContratosArrendamiento[index_arrendamiento].direccion
                    this.data_contrato_arrendamineto.fecha_inicio =this.listaContratosArrendamiento[index_arrendamiento].fecha_inicio
                    this.data_contrato_arrendamineto.fecha_fin=this.listaContratosArrendamiento[index_arrendamiento].fecha_fin
                    this.data_contrato_arrendamineto.departamento=this.listaContratosArrendamiento[index_arrendamiento].departamento
                    this.data_contrato_arrendamineto.provincia=this.listaContratosArrendamiento[index_arrendamiento].provincia
                    this.data_contrato_arrendamineto.distrito=this.listaContratosArrendamiento[index_arrendamiento].distrito
                    
                    this.modificarArrendamiento=true;
                    this.titulo_boton_arrendamiento='Modificar'
                    this.claseBoton_arrendamiento = 'btn btn-lg btn-warning mt-3 text-white ';
                    this.indexArreinda=index_arrendamiento
                  }

          //MODIFICAR ARRENDAMIENTO
                  ModificarArrendamiento(){
                    const newData={
                        
                        arrendador:this.data_contrato_arrendamineto.arrendador,
                        dni:this.data_contrato_arrendamineto.dni,
                        propiedad:this.data_contrato_arrendamineto.propiedad,
                        direccion:this.data_contrato_arrendamineto.direccion,
                        fecha_inicio:this.data_contrato_arrendamineto.fecha_inicio,
                        fecha_fin:this.data_contrato_arrendamineto.fecha_fin,
                        departamento:this.data_contrato_arrendamineto.departamento,
                        provincia:this.data_contrato_arrendamineto.provincia,
                        distrito:this.data_contrato_arrendamineto.distrito,
                        id_empresa_servicio:null,
                    }
                      this.listaContratosArrendamiento[this.indexArreinda]=newData
                      this.LimpiarDatosArrendamiento()
                  }
          //pasar al siguiente paso
                  SiguientePaso_arrendamiento(){
                    if(this.data_empresa_servicio.id_tipo_servicio==2){
                          this.nextStep()
                    }else{
                        if(this.listaContratosArrendamiento.length>0){
                          this.nextStep()
                        }
                        else{
                          alert('por favor ingrese por los menos un contrato de arrendamiento')
                        }
                    }
                   
                  }
 // paso 6: REGISTRO DE CONDUCTORES ======================================================================================================================================================  
          //variables
             modificarConductor=false;
             titulo_boton_conductor='Registrar'
             claseBotonConductor: string = 'btn btn-lg btn-success mt-3 text-white ';
             indexConductor=0
          //datos de objeto 
              data_conductor:any={
                nombres:'',
                ap_paterno:'',
                ap_materno:'',
                tipo_doc:'',
                documento:'',
                telefono:'',
                correo:'',
                nro_licencia:null,
                categoria:'',
              }
        
          //lista de itinerarios
                 listaConductores:any=[];

          //VALIDAR DATOS DEL FORMULARIO
                  validarFormularioConductor( ) {
                        // Realiza la validación de los campos aquí
                        if (!this.data_conductor.nombres) {
                          alert('Por favor, ingrese Nombre(s).');
                          return;
                        }
                        if (!this.data_conductor.ap_paterno) {
                          alert('Por favor, ingrese apellido paterno');
                          return;
                        }
                        if (!this.data_conductor.ap_materno) {
                          alert('Por favor,ingrese apellino materno');
                          return;
                        }
                        if (this.data_conductor.tipo_doc==0) {
                          alert('Por favor, seleccione el tipo de documento');
                          return;
                        }
                        if (!this.data_conductor.documento) {
                          alert('Por favor, seleccione el tipo de documento');
                          return;
                        }
                        if (!this.data_conductor.nro_licencia) {
                          alert('Por favor, ingrese la licencia');
                          return;
                        }
                        if (!this.data_conductor.categoria) {
                          alert('Por favor, la categoria');
                          return;
                        }

                        // Si llega hasta aquí, significa que todos los campos están validados correctamente
                        // Puedes ejecutar la acción deseada aquí
                        if(this.modificarConductor){
                          this.ModificarConductor()
                        }else{
                          this.ingresarConductor()
                        }
                        
                      
                      }  
                  
      
          //INGRESAR DATOS AL ARREGLO LISTA DE CONDUCTORES
                ingresarConductor(){
                  const newData={
                  
                    nombres: this.data_conductor.nombres,
                    ap_paterno:this.data_conductor.ap_paterno,
                    ap_materno:this.data_conductor.ap_materno ,
                    tipo_doc:this.data_conductor.tipo_doc,
                    documento:this.data_conductor.documento,
                    telefono:this.data_conductor.telefono,
                    correo:this.data_conductor.correo,
                    nro_licencia:this.data_conductor.nro_licencia,
                    categoria:this.data_conductor.categoria,
                  }

                  this.listaConductores.push(newData)
                  
                  this.LimpiarFormularioConductor()
                }        
              
            //LIMPIAR DATOS DEL FORMULARIO
                  LimpiarFormularioConductor(){
                  
                        this.data_conductor.nombres = '';
                        this.data_conductor.ap_paterno = '';
                        this.data_conductor.ap_materno = '';
                        this.data_conductor.correo = '';
                        this.data_conductor.tipo_doc = '';
                        this.data_conductor.documento = '';
                        this.data_conductor.telefono = '';
                        this.data_conductor.nro_licencia = '';
                        this.data_conductor.categoria='';

                        this.modificarConductor=false;
                        this.titulo_boton_conductor='Guardar'
                        this.claseBotonConductor= 'btn btn-lg btn-success mt-3 text-white ';
                  }
            
          //ELIMINAR CONDUCTOR 
                EliminarConductor(index_conductor:number){
                  this.listaConductores.splice(index_conductor,1)
                }

          //OBTENER DATOS DEL CONDUCTOR
                   ObtenerDatosConductor(index_conductor:number){
                   
                    this.data_conductor.nombres=this.listaConductores[index_conductor].nombres,
                    this.data_conductor.ap_paterno=this.listaConductores[index_conductor].ap_paterno,
                    this.data_conductor.ap_materno=this.listaConductores[index_conductor].ap_materno,
                    this.data_conductor.tipo_doc=this.listaConductores[index_conductor].tipo_doc,
                    this.data_conductor.documento=this.listaConductores[index_conductor].documento,
                    this.data_conductor.telefono=this.listaConductores[index_conductor].telefono,
                    this.data_conductor.correo=this.listaConductores[index_conductor].correo,
                    this.data_conductor.nro_licencia=this.listaConductores[index_conductor].nro_licencia,
                    this.data_conductor.id_conductor=this.listaConductores[index_conductor].id_conductor,
                    this.data_conductor.categoria=this.listaConductores[index_conductor].categoria,
                   
                  
                    this.modificarConductor=true;
                    this.titulo_boton_conductor='Modificar'
                    this.claseBotonConductor = 'btn btn-lg btn-warning mt-3 text-white ';
                  }

          //MODIFICAR CONDUCTOR
                  ModificarConductor(){
                    const newData={
                  
                      nombres: this.data_conductor.nombres,
                      ap_paterno:this.data_conductor.ap_paterno,
                      ap_materno:this.data_conductor.ap_materno ,
                      tipo_doc:this.data_conductor.tipo_doc,
                      documento:this.data_conductor.documento,
                      telefono:this.data_conductor.telefono,
                      correo:this.data_conductor.correo,
                      nro_licencia:this.data_conductor.nro_licencia,
                      categoria:this.data_conductor.categoria,
                    }
                    this.listaConductores[this.indexConductor]=newData
                      this.LimpiarFormularioConductor()
                  }
                        
          //PASAR AL SIGUIENTE PASO
                  SiguientePaso_conductor(){
                    if(this.listaConductores.length>0){
                      this.nextStep()
                    }
                    else{
                      alert('por favor, ingrese por lo menos un conductor')
                    }
                  }
//data del vehiculo
               
// paso 7: REGISTRO DE VEHICULOS ======================================================================================================================================================  
          //variables
              modificarVehiculo=false;
              titulo_boton_vehiculo='Registrar'
              claseBotonVehiculo: string = 'btn btn-lg btn-success mt-3 text-white ';
              vehiculoEnontrado=false;//almacena la condicion booleana de un vehiculo encontrado cuando se realiza la busqueda por placa
              deshabilitarfromVehiculo=true
              deshabilitarplaca=false
              
              lista_marca:any=[]//lista recuperada de marcas de vehiculos
              lista_modelo:any=[]//lista recuperada de modelos de vehiculos
              lista_vehiculos:any=[]//almacenara la lista de vehiculos pertenecientes a la empresa de servicio

              marcaSeleccionada: string=''; // Asegúrate de que el tipo de datos sea adecuado para tu id de marca
              modeloSeleccionado: string=''; // Asegúrate de que el tipo de datos sea adecuado para tu id de marca
              itinerarioSelecionado: number=0;

             
              deshabilitarbuscadorVehiculo=false
              deshabilitarRenovacion=true
              condicionTemp=''

              index_vehiculo=0

              
          //datos de objeto 
              data_vehiculo:any={
                      id_empresa_servicio:null,
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
                      id_detalle_ruta_itinerario:'',
                      id_resolucion:0,
                      estado:'',
                      
              }; 
          //limitar longitud de la fecha
              limitarLongitud(event: any) {
                const input = event.target;
                if (input.value.length > 4) {
                    input.value = input.value.slice(0, 4);
                }
              }
          //LISTA DE MARCA
              obtenerListaMarca(){
                this.marcaModeloService.ListarMarcas().subscribe(
                  res=>{
                      this.lista_marca=res
                  },
                  err=>{
                      console.error(err)
                  } 
                )
              }
                
              //marca selecionada
              onMarcaSeleccionada() {
  
                      console.log(this.marcaSeleccionada)
                      if(this.marcaSeleccionada==''){
                        this.modeloSeleccionado=''
                        this.marcaSeleccionada=''
                      }
                      else{
                         this.FiltarModelosPorNombreMarca(this.marcaSeleccionada)
                        this.FiltrarNombreMarca(this.marcaSeleccionada)
                      }
                      
                    }
              
                    FiltarModelosPorNombreMarca(nombre_marca: string){
                    // this.lista_modelo  = this.lista_modelo_aux.filter((lista_modelo: { id_marca: number; }) => lista_modelo.id_marca == id);
                    this.marcaModeloService.listarModelosPorNombreMarca(nombre_marca).subscribe(
                      res=>{
                          this.lista_modelo=res
                      },
                      err=>{
                          console.error(err)
                      }
                    )
                    console.log('estas es la lista'+this.lista_modelo)
                }
                FiltrarNombreMarca(nombreMarca:string){

                  let auxMarca:any=[];
                  auxMarca = this.lista_marca.filter((lista_marca: { nombre_marca: string; }) => lista_marca.nombre_marca == nombreMarca);
                  auxMarca=auxMarca[0]
                  this.data_vehiculo.marca=auxMarca.nombre_marca;
                  console.log(auxMarca)
                }
                onModeloSeleccionada() {
                  console.log(this.modeloSeleccionado)
                  this.obtenerNombreModelo(this.modeloSeleccionado)
                 
                }
                obtenerNombreModelo(nombre_modelo:string){
                
                  this.marcaModeloService.BuscarModeloPorNombre(nombre_modelo).subscribe(
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
              
          //VALIDAR DATOS DEL FORMULARIO
                  validarDatosFormularioVehiculo() {
                    if (this.data_vehiculo.placa=='') {
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
                  
                    if (this.data_vehiculo.marca=='') {
                      alert('Por favor, ingrese la marca.');
                      return;
                    }
                  
                    if (this.data_vehiculo.modelo=='') {
                      alert('Por favor, ingrese el modelo.');
                      return;
                    }
                  
                    if (!this.data_vehiculo.color) {
                      alert('Por favor, ingrese los colores del vehiculo.');
                      return;
                    }
                  
                    if (this.data_vehiculo.id_detalle_ruta_itinerario=='-1') {
                      alert('Por favor, ingrese el itinerario');
                      return;
                    }
                  
                    if (!this.data_vehiculo.id_resolucion) {
                      alert('Por favor, ingrese la resolucion');
                      return;
                    }
                  

                  if(this.modificarVehiculo){
                    this.modificar_Vehiculo();
                  }
                  else{
                    this.IngresarVehiculo()
                    console.log(this.data_vehiculo.id_detalle_ruta_itinerario)
                  }
                    
                  
                  }
          
          //INGRESAR DATOS AL ARREGLO LISTA DE VEHICULOS
                  IngresarVehiculo(){
                      const newData={
                    
                        id_empresa_servicio:this.data_vehiculo.id_empresa_servicio,
                        placa:this.data_vehiculo.placa,
                        categoria:this.data_vehiculo.categoria,
                        anio_fabricacion:this.data_vehiculo.anio_fabricacion,
                        peso:this.data_vehiculo.peso,
                        carga:this.data_vehiculo.carga,
                        serie:this.data_vehiculo.serie,
                        nro_asientos:this.data_vehiculo.nro_asientos,
                        nro_chasis:this.data_vehiculo.nro_chasis,
                        color:this.data_vehiculo.color,
                        carroceria:this.data_vehiculo.carroceria,
                        modalidad:this.data_vehiculo.modalidad,
                        nro_part_reg:this.data_vehiculo.nro_part_reg, 
                        marca:this.data_vehiculo.marca,
                        modelo:this.data_vehiculo.modelo,
                        id_detalle_ruta_itinerario:this.data_vehiculo.id_detalle_ruta_itinerario,
                        id_resolucion:this.data_vehiculo.id_resolucion,
                        estado:this.data_vehiculo.estado,

                      }
    
                      this.lista_vehiculos.push(newData)
                      console.log('vehiculo ingresado: '+newData)
                      
                      this.limpiarCamposVehiculo()
                  }
          
          //BUSCADOR DE VEHICULO POR PLACA===========================================
                  buscarVehiculoPorPlaca(placa:string){
                    if(placa!=''){
                      this.vehiculoService.ObtenerVehiculoPorPlaca(placa).subscribe(
                        res=>{
                          this.data_vehiculo=res
                          
                          
                          console.log(this.data_vehiculo)
                          if(this.data_vehiculo[0].id_empresa_servicio==null){
                            this.data_vehiculo=this.data_vehiculo[0]
                            this.data_vehiculo.estado=''
                            this.data_vehiculo.id_resolucion=1
                            this.data_vehiculo.id_detalle_ruta_itinerario=''
                            
                            this.marcaSeleccionada = this.data_vehiculo.marca; // Puedes restablecer la marca seleccionada a su valor inicial si es necesario
                          
                            this.onMarcaSeleccionada()
                            this.modeloSeleccionado = this.data_vehiculo.modelo; // Puedes restablecer el modelo seleccionado a su valor inicial si es necesario
        

                            // this.obtenerNombreModelo(this.data_vehiculo.modelo)

                            this.modificarVehiculo=true
                            this.vehiculoEnontrado=true
                            this.deshabilitarfromVehiculo=false
                            this.deshabilitarplaca=true 
                          }
                    
                          else{
                           let  vehiculoEncontrado = this.lista_vehiculos.filter((listaVehiculos: { placa: string; }) => listaVehiculos.placa == placa);
                            if(vehiculoEncontrado.length>0){
                              Swal.fire('el vehiculo ya se encuentra registrada en la empresa')
                               this.limpiarCamposVehiculo()
                              }
                            else{
                              
                              this.empresaServicioService.ObtenerEmpresaPorPlaca(this.data_vehiculo[0].placa).subscribe(
                                res=>{
                                  // this.limpiarCampos()
                                    let empresaTemp:any=[]
                                    empresaTemp=res
                                    console.log(empresaTemp[0].razon_social)
                                    Swal.fire('el vehiculo pertenece a otra empresa: '+empresaTemp[0].razon_social)  
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
                              this.deshabilitarfromVehiculo=false
                              this.deshabilitarplaca=true
                            }
                            else{
                              this.limpiarCamposVehiculo()
                              this.deshabilitarfromVehiculo=true
                            }
                          })
                          this.modificarVehiculo=false
                          this.vehiculoEnontrado=false
                        }
                      )
                    }
                    else{
                      Swal.fire('el campo placa esta vacio')
                    }

                    
                  }
          //LIMPIAR DATOS DEL FORMULARIO
                  limpiarCamposVehiculo(){

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
                    this.data_vehiculo.id_detalle_ruta_itinerario='';
                    this.data_vehiculo.id_resolucion=0;
                    this.data_vehiculo.estado='';
                    this.data_vehiculo.id_empresa_servicio='';
                  
                    this.marcaSeleccionada = ''; // Puedes restablecer la marca seleccionada a su valor inicial si es necesario
                    this.modeloSeleccionado = ''; // Puedes restablecer el modelo seleccionado a su valor inicial si es necesario
                  
                    this.modificarVehiculo=false;
                    this.titulo_boton_vehiculo='Registrar'
                    this.claseBotonVehiculo= 'btn btn-lg btn-success mt-3 text-white ';
                    
                    this.deshabilitarfromVehiculo=true
                    this.deshabilitarbuscadorVehiculo=false
                    this.deshabilitarplaca=false
                    this.deshabilitarRenovacion=true
                  
                  }  
            
          //ELIMINAR VEHICULO 
                  EliminarVehiculo(index_vehiculo:number){
                    this.lista_vehiculos.splice(index_vehiculo,1)
                  }

          //OBTENER DATOS DEL VEHICULO
                obtenerValoresPorIdVehiculo(index_vehiculo:number){
                  
                  this.data_vehiculo.placa=this.lista_vehiculos[index_vehiculo].placa;
                    this.data_vehiculo.categoria=this.lista_vehiculos[index_vehiculo].categoria;
                    this.data_vehiculo.anio_fabricacion=this.lista_vehiculos[index_vehiculo].anio_fabricacion;
                    this.data_vehiculo.peso=this.lista_vehiculos[index_vehiculo].peso;
                    this.data_vehiculo.carga=this.lista_vehiculos[index_vehiculo].carga;
                    this.data_vehiculo.serie=this.lista_vehiculos[index_vehiculo].serie;
                    this.data_vehiculo.nro_asientos=this.lista_vehiculos[index_vehiculo].nro_asientos;
                    this.data_vehiculo.nro_chasis=this.lista_vehiculos[index_vehiculo].nro_chasis;
                    this.data_vehiculo.color=this.lista_vehiculos[index_vehiculo].color;
                    this.data_vehiculo.carroceria=this.lista_vehiculos[index_vehiculo].carroceria;
                    this.data_vehiculo.modalidad=this.lista_vehiculos[index_vehiculo].modalidad;
                    this.data_vehiculo.nro_part_reg=this.lista_vehiculos[index_vehiculo].nro_part_reg;
                    this.data_vehiculo.marca=this.lista_vehiculos[index_vehiculo].marca;
                    this.data_vehiculo.modelo=this.lista_vehiculos[index_vehiculo].modelo;
                    this.data_vehiculo.id_detalle_ruta_itinerario=this.lista_vehiculos[index_vehiculo].id_detalle_ruta_itinerario;
                    this.data_vehiculo.id_resolucion=1;
                    this.data_vehiculo.estado=this.lista_vehiculos[index_vehiculo].estado;
                    this.data_vehiculo.id_empresa_servicio=this.lista_vehiculos[index_vehiculo].id_empresa_servicio
                  
                    this.marcaSeleccionada = this.lista_vehiculos[index_vehiculo].marca; // Puedes restablecer la marca seleccionada a su valor inicial si es necesario
                    this.modeloSeleccionado = this.lista_vehiculos[index_vehiculo].modelo; // Puedes restablecer el modelo seleccionado a su valor inicial si es necesario

                    this.modificarVehiculo=true;
                    this.titulo_boton_vehiculo='Modificar'
                    this.claseBotonVehiculo = 'btn btn-lg btn-warning mt-3 text-white ';

                    this.condicionTemp=this.data_vehiculo.estado
                    this.deshabilitarfromVehiculo=false 
              
                    this.deshabilitarbuscadorVehiculo=true
                    this.deshabilitarplaca=true
                    this.deshabilitarRenovacion=false;

                    console.log(this.data_vehiculo)

                    this.index_vehiculo=index_vehiculo
                  
               }

          //MODIFICAR VEHICULO
               modificar_Vehiculo(){
                    const newData={
                        placa:this.data_vehiculo.placa,
                        categoria:this.data_vehiculo.categoria,
                        anio_fabricacion:this.data_vehiculo.anio_fabricacion,
                        peso:this.data_vehiculo.peso,
                        carga:this.data_vehiculo.carga,
                        serie:this.data_vehiculo.serie,
                        nro_asientos:this.data_vehiculo.nro_asientos,
                        nro_chasis:this.data_vehiculo.nro_chasis,
                        color:this.data_vehiculo.color,
                        carroceria:this.data_vehiculo.carroceria,
                        modalidad:this.data_vehiculo.modalidad,
                        nro_part_reg:this.data_vehiculo.nro_part_reg, 
                        marca:this.data_vehiculo.marca,
                        modelo:this.data_vehiculo.modelo,
                        id_detalle_ruta_itinerario:this.data_vehiculo.id_detalle_ruta_itinerario,
                        id_resolucion:this.data_vehiculo.id_resolucion,
                        estado:this.data_vehiculo.estado,    
                        id_empresa_servicio:this.data_vehiculo.id_empresa_servicio
                    }
                    this.lista_vehiculos[this.index_vehiculo]=newData
                      this.limpiarCamposVehiculo()
               }
     



//PROCESO DE GUARDADO DE EMPRESA POR TIPO SE SERVICIO*********************************************************************************************************************************************************************
//variables generales
                  data_return_id_persona_representante_legal:number=0;//almacena el id_persona creado por la base de datos de manera temporal, este proceso se realiza mendiante la funcion crearRepresentanteLegal()
                  data_return_id_empresa:number=0;//almacena el id_empresa creado por la base de datos de manera temporal, este proceso se realiza mendiante la funcion crearEmpresa()     
                  data_return_id_resolucion:number=0;//almacena el id_resolucion creado por la base de datos de manera temporal
                  data_return_id_empresa_servicio:number=0;//almacena el id_empresa_servicio creado por la base de datos de manera temporal

                  lista_id_itinerario:any=[]; //almacenara de forma temporal los id_itinerario correspondientes a la empresa por servicio
                  lista_id_arrendamiento:any=[];//almacenara de forma temporal los id_arrendamiento correspondiente a la empresa por servicio 

                  lista_id_conductores:any=[]//almacenara de forma tempral los id_persona correspondietes a registro de los conductores
// 1) guardar representate legal -(recuperar id_persona)
                    async GuardarRepresentanteLegal() {
                      try {
                        const res = await this.personaService.CrearPersona(this.data_representante_legal).toPromise();
                        //recupera el id_persona que se usara para vincular al representante legal
                        let datos_res_persona:any = res;
                        this.data_return_id_persona_representante_legal=datos_res_persona.id_persona
                        console.log('Función GuardarRepresentanteLegal completada con éxito');
                      } catch (err) {
                        console.error('Error en GuardarRepresentanteLegal:', err);
                      }
                    }

// 2) guardar empresa -(recuperar id_persona)
                  async GuardarEmpresa() {
                   
                    try {
                      this.data_empresa.id_representante_legal = this.data_return_id_persona_representante_legal;
                      const res = await this.empresaService.crearEmpresa(this.data_empresa).toPromise();
                      //recupera el id_empresa que se usara para vincular al representante legal 
                        let datos_res_empresa:any = res;
                        this.data_return_id_empresa=datos_res_empresa.id_empresa
                      console.log('Función GuardarEmpresa completada con éxito');
                    } catch (err) {
                      console.error('Error en GuardarEmpresa:', err);
                    }
                  }

// 3) guardar empresa_servicio  -(recuperar id_empresa_servicio)
                async GuardarEmpresaServicio() {
                  try {
                    this.data_empresa_servicio.id_empresa = this.data_return_id_empresa;
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
                    let data_res_empresa_servicio:any=res
                    this.data_return_id_empresa_servicio=data_res_empresa_servicio.id_empresa_servicio
                    console.log('Función GuardarEmpresaServicio completada con éxito');
                  } catch (err) {
                    console.error('Error en GuardarEmpresa:', err);
                  }
                }

// 4) guardar resolucion  -(recuperar id_resolucion)
              async GuardarResolucion() {
                try {
                  const res = await this.resolucionService.CrearResolucion(this.resolucion).toPromise();
                  //recupera el id_resolucion
                  let data_res_resolucion:any = res;
                  this.data_return_id_resolucion=data_res_resolucion.id_resolucion
                  console.log('Función GuardarResolucion completada con éxito');
                } catch (err) {
                  console.error('Error en GuardarResolucion:', err);
                }
              }

// 5) guardar resolucion dentro del historico de resoluciones de la empresa por servicio
              async GuardarResolucionesEmpresaServicio(){
                    let data_EmpresaServicioResoluciones:any={
                        id_empresa_servicio:this.data_return_id_empresa_servicio,
                        id_resolucion:this.data_return_id_resolucion,
                      }
                try {

                  const res=await this.empresaServicioService.CrearResolucion(data_EmpresaServicioResoluciones).toPromise();
                  console.log('Función GuardarResolucionEmpresa completada con éxito');
                } catch (err) {
                  console.error('Error en GuardarResolucion:', err);
                }
              }

// 6) guardar Itinerario
             async GuardarRutaItinerario(){
              try {
                for(let i=0;i<this.listaItinerarios.length;i++){
                  this.listaItinerarios[i].id_empresa_servicio=this.data_return_id_empresa_servicio
                  console.log('itinerario '+i+this.listaItinerarios[i])
                  const res=await this.itinerarioService.CrearItinerario( this.listaItinerarios[i]).toPromise();
                  let data_res_itinearios:any=res

                  console.log(data_res_itinearios.id_detalle_ruta_itinerario)
                  this.lista_id_itinerario.push(data_res_itinearios.id_detalle_ruta_itinerario)
                  }
                  console.log(this.lista_id_itinerario)
              } catch (err) {
                console.error('Error en GuardarResolucion:', err);
              }
                 
  
              }  

// 7) guardar arrendamiento 
              async GuardarArrendamiento(){
                            
                  for(let i=0;i<this.listaContratosArrendamiento.length;i++){
                        this.listaContratosArrendamiento[i].id_empresa_servicio=this.data_return_id_empresa_servicio
                        const res=await this.arrendamientoService.CrearContratoArrendamiento( this.listaContratosArrendamiento[i]).toPromise();
                        let data_res_arriendas:any=res
                        this.lista_id_arrendamiento.push(data_res_arriendas.id_contrato)
                  }
                  console.log(this.lista_id_arrendamiento)
              } 

// 8) guardar conductores
              async GuardarConductores(){
              

                    for(let i=0;i<this.listaConductores.length;i++){
                      const dataPersonaConductorTemp={
                            nombres:this.listaConductores[i].nombres,
                            ap_paterno:this.listaConductores[i].ap_paterno,
                            ap_materno:this.listaConductores[i].ap_materno,
                            tipo_doc:this.listaConductores[i].tipo_doc,
                            documento:this.listaConductores[i].documento,
                            telefono:this.listaConductores[i].telefono,
                            correo:this.listaConductores[i].correo   
                            }
                              const res = await this.personaService.CrearPersona(dataPersonaConductorTemp).toPromise();
                              let data_res_persona:any=res;


                            const dataConductor={
                                  id_persona:data_res_persona.id_persona,
                                  nro_licencia:this.listaConductores[i].nro_licencia,
                                  categoria:this.listaConductores[i].categoria,
                                  id_empresa_servicio:this.data_return_id_empresa_servicio, 
                            }

                              const resIdConductor = await this.conductorService.GuardarConductor(dataConductor).toPromise();
                              let data_res_conductor:any=resIdConductor

                              this.lista_id_conductores.push(data_res_conductor.id_conductor)
                      
                    }
              }
  
  // 9) Guardar Vehiculos y tambien el historial vehicular
              async GuardarVehiculo() {
                for(let i=0;i<this.lista_vehiculos.length;i++){
                  this.lista_vehiculos[i].id_empresa_servicio=this.data_return_id_empresa_servicio;
                  this.lista_vehiculos[i].id_resolucion=this.data_return_id_resolucion
                     //recuperamos el index de id_detalle_ruta_itineario antes de se cambiado----------------------
                     let ruta_temp=this.listaItinerarios[this.lista_vehiculos[i].id_detalle_ruta_itinerario].itinerario
                     //---------------------------------------------------------------------------------------------
                  this.lista_vehiculos[i].id_detalle_ruta_itinerario=this.lista_id_itinerario[this.lista_vehiculos[i].id_detalle_ruta_itinerario]
                  

                        try {
                          const res = await this.vehiculoService.CrearVehiculo(this.lista_vehiculos[i]).toPromise();
                          console.log(res);
                         
                          await this.GuardarHistorialVehicular(this.lista_vehiculos[i], ruta_temp);
                        
                        } catch (err) {
                          console.error(err);
                        }
                   }
              }
              
              async GuardarHistorialVehicular(datos_vehiculo:any, ruta_temp:string){
                        console.log(datos_vehiculo)
                        const data_historial_vehicular:any={
                          placa:datos_vehiculo.placa,
                          condicion:datos_vehiculo.estado,
                          nombre_resolucion:this.resolucion.nombre_resolucion,
                          fecha_resolucion:this.resolucion.fecha_resolucion,
                          ruta:ruta_temp,
                          id_empresa_servicio:this.data_return_id_empresa_servicio
                        }
                        
                        this.historialvehicularService.crearHistorialVehicular(data_historial_vehicular).subscribe(
                          res=>{
                            console.log(res);
                           
                          },
                          err=>{
                            console.error(err);
                          }
                        )
              }
    
              
//MOSTRAR DATOS FINALES PARA INGRESAR A LA BASE DE DATOS
  //metodo para guardar todos los elementos de la empresa por servicio 
      async GuardarDatos() {
       if(this.empresaEnonctrada){

            // 3. Guardar Empresa Servicio
            await this.GuardarEmpresaServicio();

            // 4. Guardar Resolucion
            await this.GuardarResolucion()

            //5. guardar resolucion en historial empresa
            await this.GuardarResolucionesEmpresaServicio()

            //6. guardar itinerarios
            await this.GuardarRutaItinerario()

             //7. guardar contrato de arrendamiento  si el tipo de servio es 2 no ejecutar el contenido de if
                if(this.data_empresa_servicio.id_tipo_servicio !==2){ 
                  await this.GuardarArrendamiento()
                }
            //8. guardar conductores
            await this. GuardarConductores()

            //9. guardar vehiculos
            await this.GuardarVehiculo()

            //10. ingresar a la pagina de empresa detalle
                  this.ingresarPaginaEmpresaDetalle()
       }
       else{
            // 1. Guardar Representante Legal
            await this.GuardarRepresentanteLegal();

            // 2. Guardar Empresa
            await this.GuardarEmpresa();

            // 3. Guardar Empresa Servicio
            await this.GuardarEmpresaServicio();

            // 4. Guardar resolucion
            await this.GuardarResolucion()

            //5. guardar resolucion en historial empresa
            await this.GuardarResolucionesEmpresaServicio()

            //6. guardar itinerario
            await this.GuardarRutaItinerario()

            //7. guardar contrato de arrendamiento  si el tipo de servio es 2 no ejecutar el contenido de if
            if(this.data_empresa_servicio.id_tipo_servicio !==2){ 
              await this.GuardarArrendamiento()
            }

            //8. guardar conductor
            await this.GuardarConductores()

            //9. guardar vehiculos
            await this.GuardarVehiculo()

            //10. ingresar a la pagina de empresa detalle
            this.ingresarPaginaEmpresaDetalle()
       }
    
      }  
//VOLVER A LA PAGINA PRINCIPAL
volver(){
  this.router.navigate(['principal/empresas/servicio'])
}
//INGRESAR A LA PAGINA DE EMPRESA DETALLE

ingresarPaginaEmpresaDetalle(){
  this.router.navigate(['principal/empresas/servicio/detalle/',this.data_return_id_empresa_servicio]) 
}

//MENSAJES ANIMADOS


}                


