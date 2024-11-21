import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { InfraestructuraService } from 'src/app/servicios/infraestructura/infraestructura.service';
import { EmpresaService } from 'src/app/servicios/empresa/empresa.service';
import { ResolucionService } from 'src/app/servicios/resolucion/resolucion.service';
import { DatosCompartidosService } from 'src/app/servicios/datoslogin/datos-compartidos.service';


@Component({
  selector: 'app-infraestructura-detalle',
  templateUrl: './infraestructura-detalle.component.html',
  styleUrls: ['./infraestructura-detalle.component.css']
})
export class InfraestructuraDetalleComponent implements OnInit{
  @Output() datoEnviadoResolucionForm = new EventEmitter<number>();

  infraestructura_detalle:any=[]; //datos de la infraestructura
  empresa_detalle:any=[]; //datos de la empresa correspondiente
  resoluciones_infraestructura:any=[]; //datos de la resolucion que pertenece a la infraestructura
  certificados_infraestructura:any=[]; //datos de la resolucion que pertenece a la infraestructura

  //ruta prefinida para pdfURL  
  pdfUrl: SafeResourceUrl | null =null;
  
  disableInvitado='display: block';// variale css que ayudara a ocultar ciertos pedazos de codigo html 
  disableInvitadoTitle='display:none'
  

  constructor(private datosCompartidosService:DatosCompartidosService,private resolucionService:ResolucionService,private sanitizer: DomSanitizer,private empresaService:EmpresaService,private infraestructuraService:InfraestructuraService,private activatedRoute:ActivatedRoute,private router:Router){
    console.log('start_constructor')
  }
  ngOnInit(): void {
    console.log('start')
    this.obtenerInfraestructura();
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`assets/documentos/error/error_carga2.pdf`);
          if(this.datosCompartidosService.credentials.rol=='INVITADO'){
            this.disableInvitado='display: none';
            this.disableInvitadoTitle='display: flex; justify-content: flex-start'
          }

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
//  mostrarDocumento(base64:string){
//   const pdfBlob = this.base64ToPdfBlob(base64);
//   console.log(pdfBlob)
//  this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(pdfBlob));
//  }

  showDocumentoPdf(documento:string) {
   
    if(documento!=''){
     
      const pdfBlob = this.base64ToPdfBlob(documento);
      this.pdfUrl=  this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(pdfBlob));
    
    }
    else{
      
      this.pdfUrl= this.sanitizer.bypassSecurityTrustResourceUrl(`assets/documentos/error/error_carga2.pdf`);
    
    }
  }
  obtenerResoluciones(id:number){
        this.infraestructuraService.obtenerInfraestructraResoluciones(id).subscribe(
          res=>{
                this.resoluciones_infraestructura=res
              //  this.resoluciones_infraestructura=this.resoluciones_infraestructura
                //console.log(this.resoluciones_infraestructura)
                 this.MostrarUltimaResolucion()
          },
          err=>{
                console.error(err)
          }
        )
   }
  obtenerCertificados(id:number){
      this.infraestructuraService.obtenerInfraestructuraCertificados(id).subscribe(
        res=>{
            this.certificados_infraestructura=res
            //console.log(this.certificados_infraestructura)
        },
        err=>{
            console.log(err)
        }
      )
  }
  MostrarUltimaResolucion(){
      const UltimaResolucion=this.resoluciones_infraestructura[this.resoluciones_infraestructura.length-1]
      // console.log(UltimaResolucion)
      this.showDocumentoPdf(UltimaResolucion.documento)
      // this.documentoBase64URL= this.sanitizer.bypassSecurityTrustResourceUrl(`data:application/pdf;base64,${UltimaResolucion.documento}`);
  }
  MostrarUltimoCertificado(){
    const UltimoCertificado=this.certificados_infraestructura[this.certificados_infraestructura.length-1]
    this.showDocumentoPdf(UltimoCertificado.documento)
  }
  obtenerInfraestructura(){
    const params=this.activatedRoute.snapshot.params;
    this.infraestructuraService.obtenerInfraestructura(params['id']).subscribe(
      res=>{
        this.infraestructura_detalle=res
        this.infraestructura_detalle=this.infraestructura_detalle[0]
        this.obtenerResoluciones(this.infraestructura_detalle.id_infraestructura)
        this.obtenerCertificados(this.infraestructura_detalle.id_infraestructura)
        console.log(this.infraestructura_detalle)
        
      },
      err=>{
        console.error(err)
      }
    ) 
  }
  
  
  

  //enviar el dato del id_infraestructura a resolucionFro
  RegistrarCertificado(id_i:number){
    this.router.navigate(['principal/empresas/infraestructura/detalle/crear/certificado/',id_i])
  }
  //enviar el dato de id_infraestructura y id_resolucion a infraestructura_certificado_from para su modificacion
  ModificarCertificado(id_i:number,id_c:number){
    console.log('id_i:', id_i);
    console.log('id_r:', id_c);
    this.router.navigate(['principal/empresas/infraestructura/detalle/modificar/certificado/',id_i,id_c])
  }

  volver(){
    this.router.navigate(['principal/empresas/infraestructura'])
  }

  ModificarInfraestructura(id:number){
    this.router.navigate(['principal/empresas/infraestructura/modificar/',id])
  }

  IngresarResolucion(id:number){
    this.router.navigate(['principal/empresas/infraestructura/detalle/crear/resolucion/',id])
  }

  ModificarResolucion(id_i:number, id_r:number){
    this.router.navigate(['principal/empresas/infraestructura/detalle/modificar/resolucion/',id_i,id_r])
  }
 
}
