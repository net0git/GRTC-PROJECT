import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ResolucionService } from 'src/app/servicios/resolucion/resolucion.service';
import { EmpresaServicioService } from 'src/app/servicios/empresaServicio/empresa-servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresa-servicio-resolucion-form',
  templateUrl: './empresa-servicio-resolucion-form.component.html',
  styleUrls: ['./empresa-servicio-resolucion-form.component.css']
})
export class EmpresaServicioResolucionFormComponent implements OnInit{

  pdfUrl: SafeResourceUrl | null =null;

  titulo='REGISTRAR RESOLUCION'
  titulo_boton='Guardar'
  modificar=false;//esta variable nos indicara si el estado de la ventana sera de creacion de usuario o modificacion, todo esto en funcion a la url que llegue a activiar la ventana


  resolucion:any={
    id_resolucion:0,
    nro_resolucion:null,
    anio_resolucion:null,
    fecha_resolucion:null,
    nombre_resolucion:null,
    tomo_resolucion:null,
    documento:null,
    descripcion:null,
  }

  data_EmpresaServicioResoluciones:any={
    id_empresa_servicio:0,
    id_resolucion:0,
  }
  data_return_id_resolucion:any=[];//almacena el id_resolucion creado por la base de datos de manera temporal

  constructor(private empresaServicioService:EmpresaServicioService,private resolucionService:ResolucionService,private activatedRoute:ActivatedRoute, private router:Router,private sanitizer: DomSanitizer ){}

ngOnInit(): void {
  const params=this.activatedRoute.snapshot.params;
    if(params['id_r']){
        this.titulo='MODIFICAR RESOLUCION'
        this.titulo_boton='MODIFICAR'
        this.modificar=true;
        console.log(params['id_r'])
        this.resolucionService.ObtenerResolucion(params['id_r']).subscribe(
          res=>{
            this.resolucion=res
            this.resolucion=this.resolucion[0]
            this.resolucion.fecha_resolucion=this.FechaConFormato(this.resolucion.fecha_resolucion)
            console.log(this.resolucion)
             this. mostrarDocumento();
          },
          err=>{
            console.error(err)
          }
        )
    }
    else{
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`assets/documentos/error/error_carga2.pdf`);
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

//==========CONVERTIR DE BASE64 A PDF PARA MOSTRARSE EN EL VISUALIZADOR DE DEL NAVEGADOR===================== 
  // convertir de base64 a pdf
  // Paso 1: Decodificar el string Base64
  base64ToBytes(base64:string) {
    const binaryString = atob(base64);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
  
    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
  
    return bytes;
  }
  
  // Paso 2: Crear un objeto Blob para un PDF
  base64ToPdfBlob(base64:string) {
    const bytes = this.base64ToBytes(base64);
    return new Blob([bytes], { type: "application/pdf" });
  }
  
  // Ejemplo de uso
  //para hacegurar un correcto respaldo del documento realizamos una previsualizacion del archivo en base64 que guardaremos en la base de datos
   mostrarDocumento(){
    const pdfBlob = this.base64ToPdfBlob(this.resolucion.documento);
    console.log(pdfBlob)
   this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(pdfBlob));
  
   }
  //====================================================================================================


//1.-VALIDAR INGRESOS
isFormValid(): boolean {
  // Verifica la existencia de los campos requeridos
  return (
    this.resolucion.nombre_resolucion !== '' &&
    this.resolucion.nro_resolucion !== '' &&
    this.resolucion.anio_resolucion !== '' &&
    this.resolucion.tomo_resolucion !== null &&
    this.resolucion.fecha_resolucion !== null 
  
  );
}

//2.-GUARDAR VALORES DE RESOLUCION
async GuardarResolucion() {
  console.log(this.resolucion)
  try {
    const res = await this.resolucionService.CrearResolucion(this.resolucion).toPromise();
    this.data_return_id_resolucion = res;
    this.resolucion.id_resolucion = this.data_return_id_resolucion.id_resolucion;

    console.log('Función GuardarResolucion completada con éxito');
  } catch (err) {
    console.error('Error en GuardarResolucion:', err);
  }
}

//3.-GUARDAR RESOLUCION DENTRO DEL HISTORIAL DE LA EMPRESA SERVICIO
async GuardarResolucionesEmpresaServicio(){
    
    try {
      const params=this.activatedRoute.snapshot.params;

      this.data_EmpresaServicioResoluciones.id_resolucion=this.resolucion.id_resolucion;
      this.data_EmpresaServicioResoluciones.id_empresa_servicio=params['id_e'];
      const res=await this.empresaServicioService.CrearResolucion(this.data_EmpresaServicioResoluciones).toPromise();
      console.log(this.data_EmpresaServicioResoluciones) 
      console.log('Función GuardarResolucionEmpresa completada con éxito');
    } catch (err) {
      console.error('Error en GuardarResolucion:', err);
    }
}

//4.-EJECUTAR EN ORDEN 
ejecutarEnOrden(): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await this.GuardarResolucion();
      await this.GuardarResolucionesEmpresaServicio();
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

//5.-VALIDAMOS QUE LOS DATOS ESTEN CARGADOS
IngresarDatosBD() {
  if (this.isFormValid()) {
    this.MensajeDeGuardado();
    this.ejecutarEnOrden()
    
      .then(() => {
        
        this.volver();    
      })
      .catch((error) => {
        console.error(error);
        // Manejar el error aquí si es necesario.
      });
      
  } else {
    alert('Por favor, ingrese todos los datos');
  }
}


//MODIFICAR DATOS DE RESOLUCION 
async ModificarResolucion() {
  if (this.isFormValid()) {
    // console.log('estamos dentro de modificar')
    // console.log(this.resolucion)
    this.resolucionService.ModificarResolucion(this.resolucion.id_resolucion,this.resolucion).subscribe(
      res=>{
        this.MensajeDeModificado();
        this.volver();
        
        console.log(res);
      },
      err=>{
        console.error(err);
      }
    )    
  } else {
    alert('Por favor, ingrese todos los datos');
  }
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
    title: 'Modificacion Exitosa',
    showConfirmButton: false,
    timer: 1500
  })
}
volver(){

  const params=this.activatedRoute.snapshot.params
  this.router.navigate(['principal/empresas/servicio/detalle/',params['id_e']])
}
}
