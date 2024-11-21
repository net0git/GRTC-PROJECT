import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { InfraestructuraService } from 'src/app/servicios/infraestructura/infraestructura.service';
import { ResolucionService } from 'src/app/servicios/resolucion/resolucion.service';
import { UbicacionService } from 'src/app/servicios/ubicacion/ubicacion.service';

@Component({
  selector: 'app-infraestructura-form-principal',
  templateUrl: './infraestructura-form-principal.component.html',
  styleUrls: ['./infraestructura-form-principal.component.css']
})
export class InfraestructuraFormPrincipalComponent  implements OnInit{

  currentStep: number = 1;

  pdfUrl: SafeResourceUrl | null =null;

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

  constructor(private ubicacionService:UbicacionService ,private resolucionService:ResolucionService ,private infraestructuraService:InfraestructuraService,private sanitizer: DomSanitizer,private router:Router ){}
 ngOnInit(): void {
  this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`assets/documentos/error/error_carga2.pdf`);
  this.ListaDepartamentos();
 }


  // const currentStep: number = 1;
  progressValue=((1 ) / 3) * 100;

  nextStep(): void {
    this.currentStep++;
     // Actualizar la barra de progreso
     this.progressValue = ((this.currentStep ) / 3) * 100; // 3 es el número total de pasos
  }

  // Método para regresar al paso anterior
  prevStep(): void {
    this.currentStep--;
    this.progressValue = ((this.currentStep ) / 3) * 100; // 3 es el número total de pasos
  }

 //CONVERTIR A MAYUSCULAS
 convertirAMayusculas(valor: string): string {
  return valor.toUpperCase();
  } 
  
  //ubicacion------------------------------------------------------------------------------------------
  // lista de departamento
  ListaDepartamentos(){
    this.departamentos=this.ubicacionService.getDepartamentos()
  }
  onDepartamentoChange() {
    const departamentoSeleccionado = this.data_infraestructura.departamento;
    console.log(departamentoSeleccionado)
    this.provincias = this.ubicacionService.getProvinciasPorDepartamento(departamentoSeleccionado);
    console.log(this.provincias)
  }
  onProvinciaChange(){
    const ProvinciaSeleccionado = this.data_infraestructura.provincia;
    console.log(ProvinciaSeleccionado)
    this.distritosPorProvincia = this.ubicacionService.getDistritosPorProvincia(ProvinciaSeleccionado);
    console.log(this.distritosPorProvincia)
  }
//----------------------------------------------------------------------------------------------------


    // paso 1: REGISTRO DE DATOS PRINCIPALES DE INFRAESTRUCTURA============================================================================================================================================
         //restricciones
        
         //DATOS DE INFRAESTRUCTURA
              data_infraestructura:any={
                    id_infraestructura:0,
                    id_tipo_infraestructura:0,
                    fecha_act:null,
                    expediente:'',
                    mtc:false,
                    nombre_infraestructura:'',
                    direccion:'',
                    distrito:'',
                    provincia:'',
                    departamento:'',
                    empresa:'',
                    ruc_empresa:'',
                    representante:'',
                    dni_representante:''
               };

          // VALIDAR DATOS DEL FORMULARIO

          validarDatosFormularioInfraestructura() {
                  // Realiza la validación de los campos aquí
                     if (this.data_infraestructura.id_tipo_infraestructura == 0) {
                       alert('Por favor, selecciona un Tipo de Infraestructura.');
                       return;
                     }
                  
                     if (!this.data_infraestructura.nombre_infraestructura) {
                       alert('Por favor, ingrese el nombre o denominacion de la infraestructura.');
                       return;
                     }

                     if (!this.data_infraestructura.departamento) {
                       alert('Por favor, ingresa la Dirección de la Infraestructura.');
                       return;
                     }

                     if (!this.data_infraestructura.provincia) {
                       alert('Por favor, selecciona el provincia de la Infraestructura.');
                       return;
                     }

                     if (!this.data_infraestructura.distrito) {
                       alert('Por favor, selecciona la distrito de la Infraestructura.');
                       return;
                     }
                     if (!this.data_infraestructura.direccion) {
                      alert('Por favor, ingresa el dato del expediente.');
                      document.getElementById("expediente_empresa")?.focus();
                      return;
                    }
                     if (!this.data_infraestructura.fecha_act) {
                       alert('Por favor, ingrese la fecha de activacion de la empresa');
                       document.getElementById("fecha_empresa")?.focus();
                       return;
                     }

                     if (!this.data_infraestructura.expediente) {
                       alert('Por favor, ingresa el dato del expediente.');
                       return;
                     }

                 this.nextStep()
                 console.log(this.data_infraestructura)
                 // Aquí puedes agregar más validaciones para otros campos del formulario
               }

// paso 2: REGISTRO DE DATOS SEGUNDARIOS INFRAESTRUCTURA============================================================================================================================================

              // VALIDAR DATOS DEL FORMULARIO
                 validarDatosFormulariorRepresentante() {
                      // Realiza la validación de los campos aquí
                        if (!this.data_infraestructura.representante) {
                          alert('Por favor, ingrese los datos personales del representante.');
                          return;
                        }
                      
                        if (!this.data_infraestructura.dni_representante) {
                          alert('Por favor, ingrese el DNI del representante.');
                          return;
                        }

                       

                    this.nextStep()
                    console.log(this.data_infraestructura)
                    // Aquí puedes agregar más validaciones para otros campos del formulario
                  }


  // paso 3: REGISTRO DE RESOLUCION============================================================================================================================================
                    //variables
                    //objeto
                    //datos de resolucion
                    data_resolucion:any={
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
                          this.data_resolucion.documento = base64String.split(',')[1];
                        };
                        reader.readAsDataURL(file);
                      }   
                //VALIDAR FORMULARIO RESOLUCION

                        validarFormularioResolucion( ) {
                          // Realiza la validación de los campos aquí
                          if (!this.data_resolucion.documento) {
                            alert('Por favor, seleccione documento asociado a la resolucion');
                            return;
                          }  
                        
                          if (!this.data_resolucion.nombre_resolucion) {
                            alert('Por favor, ingrese el nombre de la resolucion');
                            return;
                          }
                          if (!this.data_resolucion.nro_resolucion) {
                            alert('Por favor, ingrese el numero de resolucion');
                            return;
                          }
                          if (!this.data_resolucion.anio_resolucion) {
                            alert('Por favor, ingrese el año de resolucion');
                            return;
                          }
                          if (!this.data_resolucion.tomo_resolucion) {
                            alert('Por favor, ingrese el tomo');
                            return;
                          }
                          if (!this.data_resolucion.fecha_resolucion) {
                            alert('Por favor, ingrese la fecha de la resolucion');
                            return;
                          }     
                          if (!this.data_resolucion.descripcion) {
                            alert('Por favor, ingrese la descripcion');
                            return;
                          } 
                              
                          this.ingresarDatos()
                        }  
//===============================================================================================================================================================================================================

//PROCESO DE GUARDADO DE EMPRESA POR TIPO SE SERVICIO*********************************************************************************************************************************************************************
    
     //variables generales
      data_return_id_resolucion:any=[];//almacena el id_resolucion creado por la base de datos de manera temporal
      data_return_id_infraestructura:any=[]//almacena el id_infraestructura creado por la base de datos de manera temporal 

      // 1) GUARDAR DATOS GENERALES DE INFRAESTRUCTURA
        async GuardarDatosInfraestructura() {
          try {
             const res = await this.infraestructuraService.crearInfraestructura (this.data_infraestructura).toPromise();
            //recupera el id_infraestructura 
             let datos_res_id_infraestrucutra:any = res;
             this.data_return_id_infraestructura=datos_res_id_infraestrucutra.id_infraestructura
             console.log('Función GuardarDatosInfraestructura completada con éxito');
          } catch (err) {
             console.error('Error en GuardarDatosInfraestructura:', err);
          }
        }

      // 2) GUARDAR DATOS DE RESOLUCION 
          async GuardarResolucion() {
            try {
              const res = await this.resolucionService.CrearResolucion(this.data_resolucion).toPromise();
              //recupera el id_resolucion
              let data_res_resolucion:any = res;
              this.data_return_id_resolucion=data_res_resolucion.id_resolucion
              console.log('Función GuardarResolucion completada con éxito');
              } catch (err) {
                console.error('Error en GuardarResolucion:', err);
              }
            }

      // 3) GUARDAR LA RESOLUCION ASOCIADO A LA INFRAESTRUCTURA
            async GuardarResolucionesInfraestructura(){
                  let data_infraestructuraResoluciones:any={
                      id_infraestructura: this.data_return_id_infraestructura,
                      id_resolucion:this.data_return_id_resolucion,
                      
                    }
              try {

                const res=await this.infraestructuraService.crearResolucionInfraestructura(data_infraestructuraResoluciones).toPromise();
                console.log('Función GuardarResolucionesInfraestructura completada con éxito');
                } catch (err) {
                  console.error('Error en GuardarResolucionesInfraestructura:', err);
                }
              }

//=============================================================================================================================================================================================================

async ingresarDatos(){
    // 1. Guardar Datos de infraestructura
    await this.GuardarDatosInfraestructura();

    // 2. Guardar Datos de resolucion
    await this.GuardarResolucion();

    // 3. Guardar resolucion dentro del registro de infraestructura
    await this.GuardarResolucionesInfraestructura();

    // 4. ingresar a la pagina de infraestructura detalle
    this.ingresarPaginaInfraestructuraDetalle()

  }
    
  //VOLVER A LA PAGINA PRINCIPAL
volver(){
  this.router.navigate(['principal/empresas/infraestructura'])
}
//INGRESAR A LA PAGINA DE EMPRESA DETALLE

ingresarPaginaInfraestructuraDetalle(){
  this.router.navigate(['/principal/empresas/infraestructura/detalle/',this.data_return_id_infraestructura]) 
}
}
