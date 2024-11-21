import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import {Router, ActivatedRoute } from '@angular/router';
import { CertificadoService } from 'src/app/servicios/certificado/certificado.service';
import { InfraestructuraService } from 'src/app/servicios/infraestructura/infraestructura.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-infraestructura-certificado-form',
  templateUrl: './infraestructura-certificado-form.component.html',
  styleUrls: ['./infraestructura-certificado-form.component.css']
})
export class InfraestructuraCertificadoFormComponent implements OnInit {

  pdfUrl: SafeResourceUrl | null =null;

  titulo='REGISTRAR CERTIFICADO'
  titulo_boton='Guardar'
  modificar=false;//esta variable nos indicara si el estado de la ventana sera de creacion de usuario o modificacion, todo esto en funcion a la url que llegue a activiar la ventana


  certificado:any={
    id_certificado:0,
    nro_certificado:null,
    anio_certificado:null,
    fecha_certificado:null,
    nombre_certificado:null,
    tomo_certificado:null,
    documento:null,
  }

  data_infraestructuraCertificados:any={
    id_infraestructura:0,
    id_certificado:0,
    
  }

  data_return_id_certificado:any=[];//almacena el id_certificado creado por la base de datos de manera temporal


  constructor(private infraestructuraService:InfraestructuraService ,private certificadoService:CertificadoService,private sanitizer: DomSanitizer ,private router:Router,private activatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    const params=this.activatedRoute.snapshot.params;
    if(params['id_c']){
      this.titulo='MODIFICAR CERTIFICADO'
      this.titulo_boton='MODIFICAR'
      this.modificar=true;
      console.log(params['id_c'])
      this.certificadoService.obtenerCertificado(params['id_c']).subscribe(
        res=>{
           this.certificado=res
           this.certificado=this.certificado[0]
           this.certificado.fecha_certificado=this.FechaConFormato(this.certificado.fecha_certificado)
           console.log(this.certificado)
           this.mostrarDocumento();
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

//CONVERTIR A MAYUSCULAS
 convertirAMayusculas(valor: string): string {
  return valor.toUpperCase();
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

  //EVENTO SELECCIONADOR DE DOCUMENTO
  onFileSelected(event:any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.convertToBase64(selectedFile);
      //this. mostrarDocumento();
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(selectedFile));
    }  
  }

  // CONVERTIR A BASE64 Y ALMACENAR EL CODIGO EN LA PROPIEDAD CERTIFICADO.DOCUMENTO
  convertToBase64(file: File): void {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const base64String = reader.result as string;
      // Almacena la cadena en base64 en la propiedad documento del objeto resolucion
      this.certificado.documento = base64String.split(',')[1];
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
    const pdfBlob = this.base64ToPdfBlob(this.certificado.documento);
    console.log(pdfBlob)
   this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(pdfBlob));
  
   }
  //====================================================================================================
  
  //1.-validar los campos de ingreso
  isFormValid(): boolean {
    // Verifica la existencia de los campos requeridos
    return (
      this.certificado.nombre_certificado !== '' &&
      this.certificado.nro_certificado !== '' &&
      this.certificado.anio_certificado !== '' &&
      this.certificado.tomo_certificado !== null &&
      this.certificado.fecha_certificado !== null
   
    );
  }

  //2.- GUARDAR VALORES DE CERTIFICADO
  async GuardarCertificado() {
    console.log(this.certificado)
    try {
      const res = await this.certificadoService.CrearCertificado(this.certificado).toPromise();
      this.data_return_id_certificado= res;
      this.certificado.id_certificado = this.data_return_id_certificado.id_certificado;
  
      console.log('Función GuardarCertificado completada con éxito');
    } catch (err) {
      console.error('Error en GuardarCertificado:', err);
    }
  }
  //3.- GUARDAR VALORES DE INFRAESTRUCTURA CERTIFICADOS
  async GuardarInfraestructuraCertificados(){
    try {
      const params=this.activatedRoute.snapshot.params;
      //data_infraestructuraResoluciones
      this.data_infraestructuraCertificados.id_certificado=this.certificado.id_certificado;
      this.data_infraestructuraCertificados.id_infraestructura=params['id_i'];
      const res=await  this.infraestructuraService.crearCertificadoInfraestructura(this.data_infraestructuraCertificados).toPromise();
      console.log(res)
      console.log('Función GuardarInfraestructuraCestificado completada con éxito');
      
      this.volver();
    } catch (err) {
      console.error('Error en GuardarInfraestructuraCertificado:', err);
    }
  }

  //4.-EJECUTAR EN ORDEN 
async ejecutarEnOrden() {
  try {
    await this.GuardarCertificado();
    await this.GuardarInfraestructuraCertificados();
    // this.mostrarDatos()
    // console.log(this.resolucion.documento)
    // Todas las funciones se han completado en orden.
  } catch (err) {
    console.error(err);
  }
}

//5.-validamos que los datos esten cargados, si lo estan se procede a guardar los datos
ingresarDatos(){
  if(this.isFormValid()){
    this.ejecutarEnOrden();
    //this.mostrarDatos()
    this.MensajeDeGuardado();
    // this.volver();
  }
  else{
    alert('por favor ingrese todos los datos')
  }
}

//MODIFICAR DATOS DE CERTIFICADO 
async ModificarCertificado() {
  if (this.isFormValid()) {
    console.log('estamos dentro de modificar')
    console.log(this.certificado)
    this.certificadoService.ModificarCertificado(this.certificado.id_certificado,this.certificado).subscribe(
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
    title: 'Modificacion exitosa',
    showConfirmButton: false,
    timer: 1500
  })
}
  volver(){
    const params=this.activatedRoute.snapshot.params
    this.router.navigate(['principal/empresas/infraestructura/detalle/',params['id_i']])
  }
}
