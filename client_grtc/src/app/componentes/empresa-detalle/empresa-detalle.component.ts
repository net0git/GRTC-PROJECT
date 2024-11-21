import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router , ActivatedRoute} from '@angular/router';
import { EmpresaServicioService } from '../../servicios/empresaServicio/empresa-servicio.service'
import { VehiculoService } from 'src/app/servicios/vehiculo/vehiculo.service';
import { HistorialvehicularService } from 'src/app/servicios/historialvehicular/historialvehicular.service';
import { ResolucionService } from 'src/app/servicios/resolucion/resolucion.service';
import { HttpClient } from '@angular/common/http';
import { ConductorService } from 'src/app/servicios/conductor/conductor.service';
import { PersonaService } from 'src/app/servicios/persona/persona.service';
import { ArrendamientoService } from 'src/app/servicios/arrendamiento/arrendamiento.service';
import { ItinerarioService } from 'src/app/servicios/itinerario/itinerario.service';
import { TucService } from 'src/app/servicios/tuc/tuc.service';
import { DatospdfService } from 'src/app/servicios/datospdf/datospdf.service';
import { DatosCompartidosService } from 'src/app/servicios/datoslogin/datos-compartidos.service';


import Swal from 'sweetalert2';

import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { formatDate } from '@angular/common';


declare var bootstrap: any;

@Component({
  selector: 'app-empresa-detalle',
  templateUrl: './empresa-detalle.component.html',
  styleUrls: ['./empresa-detalle.component.css']
})
export class EmpresaDetalleComponent implements OnInit{

private myModal: any;
empresa_servicio:any=[];
empresa_detalle:any=[];//id_empresa_servicio, razon_social, ruc, direccion, correo, telefono, dis, pro, dep, representante_legal

resolucion_empresa:any=[];
resoluciones_vehiculos:any=[];

resoluciones_empresa_servicio:any=[]; //datos de la resolucion que pertenece a la empresa
listaConductores:any=[];//lista de conducotres que se registraron con la empresa por servicio
listaContratosArrendamiento:any=[];//lista de todos los contratos de arrendamiento de la empresa
listaItinerarios:any=[];//lista de itinerario de rutas

lista_vehiculos:any=[]//almacenara la lista de vehiculos pertenecientes a la empresa de servicio
vehiculo_detalle:any=[]//almacenara el detalle del vehiculo que deseamos visualizar, en este caso lo usaremos para ver junto con el tuc
lista_historial_vehicular:any=[]//almacenara la lista de historial vehicular correspondiente a la empresa

ultimaResolucionAutorizacion:string='-'//ultima resolucion de autorizacion

disableDetalleEmpresa=false
estiloItinearioEminiar='pointer-events: auto;'

disableInvitadoResolucion='display: flex; justify-content: flex-end';// variale css que ayudara a ocultar ciertos pedazos de codigo html 
disableInvitado='';// variale css que ayudara a ocultar ciertos pedazos de codigo html 
disableInvitadoTitle='display:none'

data_tuc:any={
  id_tuc:0, 
  nro_tuc:null, 
  nro_impresion:null, 
  fecha_exp:null, 
  condicion:null, 
  placa:null, 
  fecha_ven:null, 
  razon_social:null, 
  nro_part_reg:null, 
  nombre_resolucion:null, 
  marca:null, 
  anio_fabricacion:null, 
  color:null, 
  nro_chasis:null, 
  nro_asientos:null, 
  peso:null, 
  carga:null, 
  ruta:null, 
  modalidad:null,
  copia:null,
}

data_historial_vehicular:any={
  id_historial:0,
  nombre_resolucion:null,
  placa:null,
  condicion:null,
  ruta:null,
  id_empresa_servicio:null
}
//ruta prefinida para pdfURL  
  pdfUrl: SafeResourceUrl | null =null;
  
//datos del collapse para la tabla de vehiculos----------------------------------------
  isExpanded: boolean[] = [];

  toggleCollapse(index: number) {
    // Cambiar el estado de la fila en el índice dado
    console.log(index)
    this.isExpanded[index] = !this.isExpanded[index];
  }
//--------------------------------------------------------------------------------------
  openModal() {
    this.myModal = new bootstrap.Modal(document.getElementById('exampleModalCenter'));
    this.myModal.show();
  }

  closeModal() {
    // Ocultar el modal utilizando la instancia almacenada
    this.myModal.hide();
  }
constructor(private datosCompartidosService:DatosCompartidosService,private datospdfService:DatospdfService,private tucService:TucService,private itinerarioService:ItinerarioService,private arrendamientoService:ArrendamientoService,private personaService:PersonaService,private conductorService:ConductorService,private http:HttpClient, private sanitizer: DomSanitizer,private resolucionService:ResolucionService,private historialvehicularService:HistorialvehicularService,private router:Router, private empresaServicioService:EmpresaServicioService, private activatedRoute:ActivatedRoute, private vehiculoService:VehiculoService){ } 

ngOnInit(): void {
  this.detalleEmpresa();
  this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`assets/documentos/error/error_carga2.pdf`);
  this.MostrarListaConductores()
  this.ListarContratos()
  this.ListarRutasItinerarios()
  this.ListarVehiculosEmpresaServicio()
  this.listarHistorialVehicular()

    if(this.datosCompartidosService.credentials.rol=='INVITADO'){
      this.disableInvitado='display: none'; 
      this.disableInvitadoResolucion='display: none'; 
      this.estiloItinearioEminiar='display: none';
      this.disableInvitadoTitle='display: flex; justify-content: flex-start'
    }
}


// GENERAR PDF
generatePDFreporte() {
  // Obtener la fecha y hora actual
const fechaHoraActual = new Date();

// Obtener la fecha actual (en formato YYYY-MM-DD)
const fechaActual = fechaHoraActual.toISOString().split('T')[0];

// Obtener la hora actual (en formato HH:MM:SS)
const horaActual = fechaHoraActual.toTimeString().split(' ')[0];

  const doc = new jsPDF();




  // **************************************************************************************

  // const tableDataVehiculos = [
  //   ['N', 'PLACA', 'AÑO', 'MODELO', 'MARCA', 'CTG', 'DOCUMENTO'],
  //   [1, 'ABC123', 2020, 'Sedán', 'Toyota', 'Vehículo Privado', 'Documento 1'],
  //   [2, 'XYZ789', 2019, 'Camioneta', 'Ford', 'Vehículo Comercial', 'Documento 2'],
  //   [3, 'LMN456', 2022, 'Compacto', 'Honda', 'Vehículo Privado', 'Documento 3'],
  //   [4, 'DEF789', 2018, 'SUV', 'Chevrolet', 'Vehículo Privado', 'Documento 4'],
  //   [5, 'GHI123', 2021, 'Hatchback', 'Volkswagen', 'Vehículo Comercial', 'Documento 5'],
  //   [6, 'JKL456', 2017, 'Pickup', 'Dodge', 'Vehículo Comercial', 'Documento 6'],
  //   [7, 'MNO789', 2016, 'Sedán', 'Hyundai', 'Vehículo Privado', 'Documento 7'],
  //   [8, 'PQR123', 2023, 'Hatchback', 'Kia', 'Vehículo Privado', 'Documento 8'],
  //   [9, 'STU456', 2021, 'SUV', 'Mazda', 'Vehículo Privado', 'Documento 9'],
  //   [10, 'VWX789', 2020, 'Camioneta', 'Nissan', 'Vehículo Comercial', 'Documento 10'],
  //   [11, 'YZA123', 2019, 'Compacto', 'Subaru', 'Vehículo Privado', 'Documento 11'],
  //   [12, 'BCB456', 2022, 'Hatchback', 'Ford', 'Vehículo Privado', 'Documento 12'],
  //   [13, 'CDE789', 2018, 'Sedán', 'Honda', 'Vehículo Comercial', 'Documento 13'],
  //   [14, 'EFG123', 2017, 'SUV', 'Toyota', 'Vehículo Privado', 'Documento 14'],
  //   [15, 'HIJ456', 2021, 'Pickup', 'Chevrolet', 'Vehículo Comercial', 'Documento 15'],
  //   [16, 'KLM789', 2016, 'Camioneta', 'Volkswagen', 'Vehículo Privado', 'Documento 16'],
  //   [17, 'NOP123', 2020, 'Compacto', 'Ford', 'Vehículo Privado', 'Documento 17'],
  //   [18, 'PQR456', 2019, 'Sedán', 'Hyundai', 'Vehículo Privado', 'Documento 18'],
  //   [19, 'STU789', 2018, 'Hatchback', 'Mazda', 'Vehículo Comercial', 'Documento 19'],
  //   [20, 'UVW123', 2022, 'SUV', 'Nissan', 'Vehículo Privado', 'Documento 20'],
  //   [21, 'XYZ456', 2017, 'Camioneta', 'Subaru', 'Vehículo Comercial', 'Documento 21'],
  //   [22, 'BCD789', 2021, 'Compacto', 'Ford', 'Vehículo Privado', 'Documento 22'],
  //   [23, 'DEF123', 2020, 'Sedán', 'Honda', 'Vehículo Comercial', 'Documento 23'],
  //   [24, 'EFG456', 2019, 'SUV', 'Toyota', 'Vehículo Privado', 'Documento 24'],
  //   [25, 'HIJ789', 2022, 'Hatchback', 'Chevrolet', 'Vehículo Comercial', 'Documento 25']
  // ];

   // Datos de la tabla
   const tableDataVehiculos = [
    ['N', 'PLACA', 'AÑO','MODELO','MARCA','CTG','DOCUMENTO'],

  ];

  for (let i = 0; i < this.lista_vehiculos.length; i++) {
    const vehiculo = this.lista_vehiculos[i];
    const fila = [
      i + 1, // Número de fila
      vehiculo.placa,
      vehiculo.anio_fabricacion,
      vehiculo.modelo,
      vehiculo.marca,
      vehiculo.categoria,
      vehiculo.nombre_resolucion,
    ];
    tableDataVehiculos.push(fila);
  }

  console.log(tableDataVehiculos)
  // *****************************************************************************
// Agregar una imagen a tu PDF

// Posición y tamaño de la imagen en el PDF


let imgData=this.datospdfService.imgEncabezado
doc.addImage(imgData, 'JPEG', 10, 10, 190, 20);//(x,y,ancho,alto)
doc.line(10, 35, 200, 35);
// Establece el tamaño de fuente más pequeño
doc.setFontSize(11); // Cambia el valor a tu tamaño de fuente deseado
//textos subtitulos
 const text1 = 'RAZON SOCIAL :';
 const text2 = 'RUC :';
 const text3 = 'DIRECCION :';
 const text4 = 'TELEFONO :';
 const text5 = 'REPRESENTANTE :';
 const text6 = 'VIGENTE HASTA :';
 const text7 = 'DOC. AUTORIZA :';
//textos constenido
 const contenido1=this.empresa_detalle.razon_social;
 const contenido2=this.empresa_detalle.ruc;
 const contenido3=this.empresa_detalle.direccion;
 const contenido4=this.empresa_detalle.telefono || '-';
 const contenido5=this.empresa_detalle.representante_legal;
 const contenido6=formatDate(this.empresa_detalle.fecha_final, 'dd/MM/yyyy', 'en-US');
 let contenido7='-';

 for (let i = 0; i < this.resoluciones_empresa_servicio.length; i++) {
   const fecha_resolucion=formatDate(this.resoluciones_empresa_servicio[i].fecha_resolucion, 'dd/MM/yyyy', 'en-US') ;
   if(formatDate(this.empresa_detalle.fecha_inicial, 'dd/MM/yyyy', 'en-US')===fecha_resolucion){
    //console.log(contenido6)
    contenido7=this.resoluciones_empresa_servicio[i].nombre_resolucion
    //console.log(this.resoluciones_empresa_servicio[i].nombre_resolucion)
   }
    
   console.log(this.empresa_detalle)

}
 const x = 14; // Posición horizontal
 const y = 40; // Posición vertical
 const rectWidth = 42; // Ancho del rectángulo basado en el texto
//  const rectWidth = doc.getStringUnitWidth(text) * 12; // Ancho del rectángulo basado en el texto
 const rectHeight = 8; // Altura del rectángulo


 //SUBTITULOS DATOS
//RAZON SOCIAL
    // Establece el color de fondo del rectángulo a gris
    doc.setFillColor(140, 140, 140); // Gris en RGB
    doc.rect(x, y, rectWidth, rectHeight, 'F'); //  'F' indica que se debe rellenar
    doc.setTextColor(255, 255, 255); // Blanco en RGB
    doc.text(text1, x + 2, y + rectHeight - 2); 
//RUC
    // Establece el color de fondo del rectángulo a gris
    doc.setFillColor(140, 140, 140); // Gris en RGB
    doc.rect(x, y+10, rectWidth, rectHeight, 'F'); //  'F' indica que se debe rellenar
    doc.setTextColor(255, 255, 255); // Blanco en RGB
    doc.text(text2, x + 2, y +10 + rectHeight - 2); 
//DIRECCION 
    // Establece el color de fondo del rectángulo a gris
    doc.setFillColor(140, 140, 140); // Gris en RGB
    doc.rect(x, y+20, rectWidth, rectHeight, 'F'); //  'F' indica que se debe rellenar
    doc.setTextColor(255, 255, 255); // Blanco en RGB
    doc.text(text3, x + 2, y +20 + rectHeight - 2); 
//TELEFONOS
    // Establece el color de fondo del rectángulo a gris
    doc.setFillColor(140, 140, 140); // Gris en RGB
    doc.rect(x, y+30, rectWidth, rectHeight, 'F'); //  'F' indica que se debe rellenar
    doc.setTextColor(255, 255, 255); // Blanco en RGB
    doc.text(text4, x + 2, y +30 + rectHeight - 2); 
//REPRESENTANTE LEGAL
    // Establece el color de fondo del rectángulo a gris
    doc.setFillColor(140, 140, 140); // Gris en RGB
    doc.rect(x, y+40, rectWidth, rectHeight, 'F'); //  'F' indica que se debe rellenar
    doc.setTextColor(255, 255, 255); // Blanco en RGB
    doc.text(text5, x + 2, y +40 + rectHeight - 2); 
//VEGENCIA HASTA
    // Establece el color de fondo del rectángulo a gris
    doc.setFillColor(140, 140, 140); // Gris en RGB
    doc.rect(x, y+50, rectWidth, rectHeight, 'F'); //  'F' indica que se debe rellenar
    doc.setTextColor(255, 255, 255); // Blanco en RGB
    doc.text(text6, x + 2, y +50 + rectHeight - 2); 
//DOCUMENTO QUE LO AUTORIZA
    // Establece el color de fondo del rectángulo a gris
    doc.setFillColor(140, 140, 140); // Gris en RGB
    doc.rect(x, y+60, rectWidth, rectHeight, 'F'); //  'F' indica que se debe rellenar
    doc.setTextColor(255, 255, 255); // Blanco en RGB
    doc.text(text7, x + 2, y +60 + rectHeight - 2); 

//  doc.setFillColor(192, 192, 192); // Gris en RGB
//  doc.rect(x, y, rectWidth, rectHeight, 'F'); 
//   // Establece el color del texto a blanco
//   doc.setTextColor(255, 255, 255); // Blanco en RGB
//  doc.text(text2, x + 2, y + rectHeight - 2); 

 //CONTENIDO DATOS
 doc.setTextColor(0, 0, 0); // Blanco en RGB
//RAZON SOCIAL 
 // Dibuja el rectángulo para ruc
  doc.rect(x+45, y, rectWidth+95, rectHeight);
  doc.text(contenido1, x + 47, y + rectHeight - 2);
//RUC
  doc.rect(x+45, y+10, rectWidth+95, rectHeight);
  doc.text(contenido2, x + 47, y+10 + rectHeight - 2);
//DIRECCION
  doc.rect(x+45, y+20, rectWidth+95, rectHeight);
  doc.text(contenido3, x + 47, y+20 + rectHeight - 2);
//TELEFONOS
  doc.rect(x+45, y+30, rectWidth+95, rectHeight);
  doc.text(contenido4, x + 47, y+30 + rectHeight - 2);
//REPRESENTANTE
  doc.rect(x+45, y+40, rectWidth+95, rectHeight);
  doc.text(contenido5, x + 47, y+40 + rectHeight - 2);
//VIGENTE
  doc.rect(x+45, y+50, rectWidth+95, rectHeight);
  doc.text(contenido6, x + 47, y+50 + rectHeight - 2);
////VIGENTE
  doc.rect(x+45, y+60, rectWidth+95, rectHeight);
  doc.text(contenido7, x + 47, y+60 + rectHeight - 2);
 
  // Otro contenido
 doc.setFontSize(10)
 doc.text(fechaActual+' '+horaActual+' '+this.datosCompartidosService.credentials.nombre_usuario, 10, 10);

///VEHICULOS ASOCIADOS A LA EMPRESA
  let currentY = 113;
  console.log(currentY)
  // Función para verificar si es necesario agregar una nueva página
  // const addNewPageIfNecessary = () => {
  //   // Comprueba si la posición vertical actual (currentY) supera el total de la página
  //   if (currentY > doc.internal.pageSize.height-20) {
  //     // Agrega una nueva página al documento
  //     doc.addPage();
  //     // Restablece la posición vertical al principio de la página
  //     currentY = 10;
  //   }
  // };
  const tableStyles = {
    tableLineColor: [192, 192, 192], // Gris
    lineWidth: 0.1, // Grosor de las líneas de la tabla
  };
  
  // Encabezado de la tabla y datos de la tabla
autoTable(doc, {
  head: [tableDataVehiculos[0]],
  body: tableDataVehiculos.slice(1),
  startY: currentY,
  columnStyles: {
    0: { cellWidth: 8 },
    1: { cellWidth: 20 },
    2: { cellWidth: 12 },
    3: { cellWidth: 25 },
    4: { cellWidth: 30 },
    5: { cellWidth: 15 },
    6: { cellWidth: 72 },
  },
  styles: tableStyles,
  
},


);

// Incrementa la posición vertical según sea necesario
// currentY += tableDataVehiculos.length * 50; // Usamos la cantidad de filas para calcular la posición vertical

  // // Encabezado de la tabla
  // autoTable(doc, {
  //   head: [tableDataVehiculos[0]],
  //   startY: currentY,
  //   columnStyles: {
  //     // Establece el ancho de cada celda en el encabezado según los valores en headerCellWidths
  //     0: { cellWidth: 10 },
  //     1: { cellWidth: 22 },
  //     2: { cellWidth: 18 },
  //     3: { cellWidth: 25 },
  //     4: { cellWidth: 25 },
  //     5: { cellWidth: 20 },
  //     6: { cellWidth: 62 },
  //   },
    
  // });
  // currentY += 10; // Altura del encabezado

  // Datos de la tabla (sin el encabezado)
//   for (let i = 1; i < tableDataVehiculos.length; i++) {

//       addNewPageIfNecessary();

//       autoTable(doc, {
//         body: [tableDataVehiculos[i]],
//         startY: currentY,
//         columnStyles: {
//           // Establece el ancho de cada columna según los valores en columnWidths
//           0: { cellWidth: 10 },
//           1: { cellWidth: 22 },
//           2: { cellWidth: 18 },
//           3: { cellWidth: 25 },
//           4: { cellWidth: 25 },
//           5: { cellWidth: 20 },
//           6: { cellWidth: 62 },
//         },
//       });
//       currentY += 10; // Altura de cada fila      
//  }

for(let i=1;i<=doc.internal.pages.length-1;i++){
  doc.setPage(i); // Cambiar a la página con el índice deseado
  // doc.addImage(imgData, 'JPEG', 10, 10, 190, 20);//(x,y,ancho,alto)
  doc.line(10, doc.internal.pageSize.height - 14, 200, doc.internal.pageSize.height - 14);
  // Realiza operaciones en la página actual, como agregar contenido adicional o modificarla
  doc.text('página ' + i +' de '+ (doc.internal.pages.length-1), 170, doc.internal.pageSize.height - 10);
}
  // Genera una representación en Blob del PDF
  const blob = doc.output('blob');
  this.pdfUrl=  this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));

  // Crea una URL para la representación en Blob
  //const url = URL.createObjectURL(blob);

  // Abre el PDF en una nueva pestaña
 // window.open(url, '_blank');

  // No es necesario guardar el PDF con save en este caso
}

UltimaResolucionAutorizacion(){

 console.log(this.resoluciones_empresa_servicio.length)
  for (let i = 0; i < this.resoluciones_empresa_servicio.length; i++) {

    let fecha_resolucion=formatDate(this.resoluciones_empresa_servicio[i].fecha_resolucion, 'dd/MM/yyyy', 'en-US') ;
    if(formatDate(this.empresa_detalle.fecha_inicial, 'dd/MM/yyyy', 'en-US')===fecha_resolucion){
     //console.log(contenido6)
     this.ultimaResolucionAutorizacion=this.resoluciones_empresa_servicio[i].nombre_resolucion
     console.log(this.resoluciones_empresa_servicio[i].nombre_resolucion)
    }
  
  }
}

listarHistorialVehicular(){
  const params=this.activatedRoute.snapshot.params
  this.historialvehicularService.obtenerHistorialVehicularPorEmpresa(params['id']).subscribe(
    res=>{
        this.lista_historial_vehicular=res
        console.log(this.lista_historial_vehicular)
    },
    err=>{
        console.error(err)
    }
  )
}

MostrarDetalleTUC(id_vehiculo:number){
  //NECESITAMOS LOS DATOS DE LA TUC
  this.vehiculo_detalle = this.lista_vehiculos.filter((detalle: { id_vehiculo: number; }) => detalle.id_vehiculo == id_vehiculo);
  this.vehiculo_detalle=this.vehiculo_detalle[0]
  if(this.vehiculo_detalle.id_tuc!=null){
    // console.log(this.vehiculo_detalle.id_tuc)
    this.tucService.obtenerDetalleTuc(this.vehiculo_detalle.id_tuc).subscribe(
      res=>{
            this.data_tuc=res;
            this.data_tuc=this.data_tuc[0]
            console.log(this.data_tuc)
            this.openModal()
      },
      err=>{
            console.error(err)
      }
    )
  }
  else{
    this.AlertaMensajeTuc()
  }

}

ListarVehiculosEmpresaServicio(){
  const params=this.activatedRoute.snapshot.params
  this.vehiculoService.ListarVehiculosEmpresa(params['id']).subscribe(
    res=>{
        this.lista_vehiculos=res;
        console.log(this.lista_vehiculos)
    },
    err=>{
        console.error(err);
    }
  )
}

ObtenerResolucionesEmpresaServicio(id:number){
  this.empresaServicioService.ObtenerResolucionesEmpresaServicio(id).subscribe(
    res=>{
        this.resoluciones_empresa_servicio=res;
        console.log(this.resoluciones_empresa_servicio)    
      
        this.UltimaResolucionAutorizacion();
          this.MostrarUltimaResolucionAutorizacion();
    },
    err=>{
        console.error(err)
    }
  )
}

detalleEmpresa(){
  const params=this.activatedRoute.snapshot.params
  this.empresaServicioService.ObtenerEmpresaServicioDetalle(params['id']).subscribe(
    res=>{
        this.empresa_detalle=res;
        console.log(this.empresa_detalle[0])
        this.empresa_detalle=this.empresa_detalle[0]
        this.ObtenerResolucionesEmpresaServicio(this.empresa_detalle.id_empresa_servicio);
        
        console.log('tipo servicio: '+this.empresa_detalle.tipo_servicio)
        if(this.empresa_detalle.id_tipo_servicio==2){
          this.disableDetalleEmpresa=true
          this.estiloItinearioEminiar='pointer-events: none;'
        }
    },
    err=>{
        console.error(err)
    }
  )
} 

//mostrar la lista de conductores
 MostrarListaConductores(){
  const params=this.activatedRoute.snapshot.params
  this.empresaServicioService.ObtenerListaConductores(params['id']).subscribe(
    res=>{
        this.listaConductores=res;
        this.listaConductores.sort((a: { nombres: string; }, b: { nombres: string; }) => {
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
    },
    err=>{
        console.error(err);
    }
  )
}


//DAR DE BAJA UN VEHICULO  ******************************************************************************************************
DarBajaVehiculo(id_vehiculo:number){
// Crear un string HTML
// let htmltemp = '<select id="mySelect">';
// for (const resolucion of this.resoluciones_empresa_servicio) {
//   htmltemp += `<option value="${resolucion.nombre_resolucion}">${resolucion.nombre_resolucion}</option>`;
// }
// htmltemp += '</select>';

// htmltemp+=` <div style='margin-top: 10px;'>
// <input type="checkbox" id="myCheckbox">
// <label class="form-check-label" for="flexCheckDefault">Otra Resolución</label>
// </div> 
// <input type='text' id='resolucion_referencia' name='resolucion_referencia' placeholder='Resolucion de referencia'>`

let htmltemp = ` <select id="mySelect" style='width: 80%;'> ` ;
for (const resolucion of this.resoluciones_empresa_servicio) {
  htmltemp += `<option value="${resolucion.nombre_resolucion}">${resolucion.nombre_resolucion}</option>`;
}
htmltemp += '</select>';

htmltemp += ` <div style='margin-top: 20px; text-align: left; padding-left:45px' >

  <label class="form-check-label" for="flexCheckDefault" >Otra Resolución:</label>
  </div> 
  <input type='text' id='resolucion_referencia' name='resolucion_referencia' placeholder='Resolucion de referencia' style='width: 80%;'> 
`

;





  console.log(htmltemp)
    let datosVehiculo:any={
        estado:null,
        id_empresa_servicio:null,
        id_resolucion:null,
        id_tuc:null,
        id_detalle_ruta_itinerario:null
    }
    Swal.fire({
      title: 'estas seguro?',
      text: "si da de baja el vehiculo se desvinculara de la empresa!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si, dar de baja!'
    }).then(async ( result) => {
      if (result.isConfirmed) {
        const { value: formValues } = await Swal.fire({
          title: 'Bajo que Resolucion se dara de baja el Vehiculo',
          html: htmltemp, 
          focusConfirm: false,
          preConfirm: () => {
    
            return [
              (<HTMLSelectElement>document.getElementById('mySelect')).value,
              (<HTMLSelectElement>document.getElementById('resolucion_referencia')).value,
            ];
          }
        });
        
        if (formValues) {
          // Swal.fire(JSON.stringify(formValues));
          // alert(formValues[0])
           this.vehiculoService.DarBaja(id_vehiculo,datosVehiculo).subscribe(
          res=>{
            console.log(res)   
            Swal.fire(
              'Baja!',
              'El vehiculo se ha dado de baja.',
              'success'
             )
             this.GuardarEnHistrorialVehicular(id_vehiculo,formValues[0],formValues[1] )
             this.ListarVehiculosEmpresaServicio() 

          },
          err=>{
            console.error(err) 
          }
        )
        }
        // const { value: formValues } = await Swal.fire({
        //   title: 'Multiple inputs',
        //   html:
        //     '<input id="swal-input1" class="swal2-input">' +
        //     '<input id="swal-input2" class="swal2-input">',
        //   focusConfirm: false,
        //   preConfirm: () => {
            
        //       return[(<HTMLInputElement>document.getElementById('swal-input1')).value,
        //     (<HTMLInputElement>document.getElementById('swal-input2')).value]
            
        //   }
        // })
        
        // if (formValues) {
        //   Swal.fire(JSON.stringify(formValues))
        // }
        // this.vehiculoService.DarBaja(id_vehiculo,datosVehiculo).subscribe(
        //   res=>{
        //     console.log(res)   
        //     Swal.fire(
        //       'Baja!',
        //       'El vehiculo se ha dado de baja.',
        //       'success'
        //      )
        //      this.GuardarEnHistrorialVehicular(id_vehiculo)
        //      this.ListarVehiculosEmpresaServicio()
        //      this.listarHistorialVehicular()
        //   },
        //   err=>{
        //     console.error(err) 
        //   }
        // )
      }
    })
}

//*****************************************************************************************************************************
//Direccion para la pagina de modificar empresa por servicio
 ModificarEmpresa(){
  const params=this.activatedRoute.snapshot.params
  this.router.navigate(['principal/empresas/servicio/modificar/',params['id']])  
}
 //***************************************MANEJO DE ARCHIVOS PDF*********************************************************************************/
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
  
  showDocumentoPdf(documento:string) {

    if(documento!=''){
      
      const pdfBlob = this.base64ToPdfBlob(documento);

      this.pdfUrl=  this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(pdfBlob));

    }
    else{
      
      this.pdfUrl= this.sanitizer.bypassSecurityTrustResourceUrl(`assets/documentos/error/error_carga2.pdf`);
    
    }
  }


//*****************************************************************************************************************************************************/
 
//========eliminar conductor=================================================
async  EliminarDatosConductor(id_persona:number,id_conductor:number){
  await this.eliminarConductor(id_conductor)
  await this.eliminarPersonaConductor(id_persona)
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


//========================================================================================================================================

//eliminar arrendamiento
EliminarContratoArrendamiento(id:number){
  this.arrendamientoService.EliminarContratoArrendamiento(id).subscribe(
    res=>{
      console.log(res)
      this.ListarContratos()
    },
    err=>{
      console.error(err)
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


//==================================================================================================
MostrarUltimaResolucionAutorizacion(){
  console.log(this.ultimaResolucionAutorizacion)
   const resolucionEncontrada = this.resoluciones_empresa_servicio.find((resolucion:any) => resolucion.nombre_resolucion === this.ultimaResolucionAutorizacion);
  this.showDocumentoPdf(resolucionEncontrada.documento)
}
IngresarResolucion(id:number){
  //principal/empresas/servicio/crear/resolucion/id_e}
//console.log('principal/empresas/servicio/crear/resolucion/'+id)
   this.router.navigate(['principal/empresas/servicio/crear/resolucion/'+id])
}
ListarContratos(){
  const params=this.activatedRoute.snapshot.params
  this.arrendamientoService.obtenerContratroArrendamientoPorEmpresa(params['id']).subscribe(
    res=>{
        this.listaContratosArrendamiento=res
        console.log(this.listaContratosArrendamiento)
        
    },
    err=>{
      console.error(err)
      this.listaContratosArrendamiento=[]
    }
  )
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
//CREACION DE TUC**********************************************************************************************************
InsertarIdTucEnVehiculo(id_vehiculo:number,body:any){
  this.vehiculoService.ModificarTuc(id_vehiculo,body).subscribe(
    res=>{
        console.log(res)
        this.ListarVehiculosEmpresaServicio()

    },
    err=>{
        console.error(err)
    }
  )
}

 BuscarVehiculoPorId(id_vehiculo:number){
  let auxVehiculo:any=[]
  auxVehiculo = this.lista_vehiculos.filter((vehiculo: { id_vehiculo: number; }) => vehiculo.id_vehiculo == id_vehiculo);
  auxVehiculo=auxVehiculo[0]
   console.log(auxVehiculo)

      this.data_tuc.fecha_exp=auxVehiculo.fecha_inicial, 
      this.data_tuc.condicion=auxVehiculo.estado, 
      this.data_tuc.placa=auxVehiculo.placa, 
      this.data_tuc.fecha_ven=auxVehiculo.fecha_final, 
      this.data_tuc.razon_social=auxVehiculo.razon_social, 
      this.data_tuc.nro_part_reg=auxVehiculo.nro_part_reg, 
      this.data_tuc.nombre_resolucion=auxVehiculo.nombre_resolucion, 
      this.data_tuc.marca=auxVehiculo.marca, 
      this.data_tuc.anio_fabricacion=auxVehiculo.anio_fabricacion, 
      this.data_tuc.color=auxVehiculo.color, 
      this.data_tuc.nro_chasis=auxVehiculo.nro_chasis, 
      this.data_tuc.nro_asientos=auxVehiculo.nro_asientos, 
      this.data_tuc.peso=auxVehiculo.peso, 
      this.data_tuc.carga=auxVehiculo.carga, 
      this.data_tuc.ruta=auxVehiculo.itinerario, 
      this.data_tuc.modalidad=auxVehiculo.modalidad,
      this.data_tuc.id_tuc=auxVehiculo.id_tuc
   
}

//crear tuc
InsertarTUCbd(id_vehiculo:number){

  this.tucService.crearTuc(this.data_tuc).subscribe(
    res=>{
        let aux:any=[]
        aux=res
        this.data_tuc.id_tuc=aux.id_tuc
        console.log(aux.id_tuc)
        this.InsertarIdTucEnVehiculo(id_vehiculo,aux)
        this.MensajeModificacionProceso()
        
    },    
    err=>{
        console.error(err)
    }
  )
}


async AlertaCreacionTuc(id_vehiculo:number) {

  this.BuscarVehiculoPorId(id_vehiculo)

  if(this.data_tuc.id_tuc==null){
        const { value: formValues } = await Swal.fire({
          title: 'Generar TUC',
          html:
            '<input id="swal-input1" class="swal2-input"  placeholder="N° de impresion">' +
            '<input id="swal-input2" class="swal2-input" placeholder="N° de TUC">',
          focusConfirm: false,
          preConfirm: () => {
            return[(<HTMLInputElement>document.getElementById('swal-input1')).value,
            (<HTMLInputElement>document.getElementById('swal-input2')).value]
            
          }
        });

          // Swal.fire(JSON.stringify(formValues));
          if(formValues[0]==''||formValues[1]==''){
            Swal.fire(
              'Campos icompletos, intente de nuevo'
            )
          }
          else{

            //PROCEDIMIENTO DE CREACION DE TUC
            console.log(formValues[0]+'  '+formValues[1]+' '+id_vehiculo)
            this.data_tuc.nro_impresion=formValues[0]
            this.data_tuc.nro_tuc=formValues[1]
            this.InsertarTUCbd(id_vehiculo)
        
          }
  }
  else{
    Swal.fire({
      title: 'Ya existe una TUC asignado a este vehiculo',
      text: "Deseas generar una nueva TUC para la placa: " +this.data_tuc.placa,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Generar TUC!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { value: formValues } = await Swal.fire({
          title: 'Generar TUC',
          html:
            '<input id="swal-input1" class="swal2-input"  placeholder="N° de impresion">' +
            '<input id="swal-input2" class="swal2-input" placeholder="N° de TUC">',
          focusConfirm: false,
          preConfirm: () => {
            return[(<HTMLInputElement>document.getElementById('swal-input1')).value,
            (<HTMLInputElement>document.getElementById('swal-input2')).value]
            
          }
        });

          // Swal.fire(JSON.stringify(formValues));
          if(formValues[0]==''||formValues[1]==''){
            Swal.fire(
              'Campos icompletos, intente de nuevo'
            )
          }
          else{

            //PROCEDIMIENTO DE CREACION DE TUC
            console.log(formValues[0]+'  '+formValues[1]+' '+id_vehiculo)
            this.data_tuc.nro_impresion=formValues[0]
            this.data_tuc.nro_tuc=formValues[1]
            this.InsertarTUCbd(id_vehiculo)
        
          }
        
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
           
            
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Creacion en Progresa'
        })
      }
    })
  }
}
//********************************************************************************************************************

//MENSAJE DE RECORDATORIO DE REGISTRO DE TUC**************************************
AlertaMensajeTuc(){
  Swal.fire('No existe N° de TUC asignado')
}
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
//
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

 //mensaje de modificacion en proceso 
 MensajeModificacionProceso(){
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'success',
    title: 'Modificacion en proceso'
  })
}
//***************************************************************************/

//REGISTRO EN HISTORIAL=======================================================/
GuardarEnHistrorialVehicular(id_vehiculo:number, resolucion:string, resolucion_resferencial:string){
  const params=this.activatedRoute.snapshot.params
  // Obtén una referencia al elemento select por su ID 
  // let id_resolucion = (<HTMLInputElement>document.getElementById('resolucion')).value;
  // let id_itinerario = (<HTMLInputElement>document.getElementById('itinerario')).value;

   let datosVehiculo=this.lista_vehiculos.filter((vehiculo: { id_vehiculo: number; }) => vehiculo.id_vehiculo ==id_vehiculo)[0];
  //  let nombre_resolucion = this.resoluciones_empresa_servicio.filter((resolucion: { id_resolucion: number; }) => resolucion.id_resolucion ==parseInt(id_resolucion))[0].nombre_resolucion;

  
   this.data_historial_vehicular.placa=datosVehiculo.placa
   this.data_historial_vehicular.condicion='BAJA'
   if(resolucion_resferencial==''||resolucion_resferencial==null){
    this.data_historial_vehicular.nombre_resolucion=resolucion
   }else{
    this.data_historial_vehicular.nombre_resolucion=resolucion_resferencial
   }
   this.data_historial_vehicular.ruta=datosVehiculo.itinerario
   this.data_historial_vehicular.id_empresa_servicio=params['id']
  //  console.log(this.data_historial_vehicular)
  // this.data_historial_vehicular.id_empresa_servicio=params['id']
  // console.log(nombre_resolucion,this.data_historial_vehicular.condicion, this.data_historial_vehicular.placa)
  // console.log(this.data_historial_vehicular)
  this.historialvehicularService.crearHistorialVehicular(this.data_historial_vehicular).subscribe(
    res=>{
      console.log(res);
      this.listarHistorialVehicular()
    },
    err=>{
      console.error(err);
    }
  )
}
//SALVAR LAS MODIFICACIONES DEL TUC MODAL*************************************
salvarCopiasTuc(){
  
  this.tucService.modificarTucModal(this.data_tuc.id_tuc, this.data_tuc).subscribe(
    res=>{
        console.log(res)
    },
    err=>{
        console.error(err)
    }
  )

}
//****************************************************************************/
//============================================================================/
//REDIRECCIONES
ModificarResolucion(id_e:number,id_r:number){
  this.router.navigate(['principal/empresas/servicio/modificar/resolucion/'+id_e+'/'+id_r])
}

RegistrarConductor(id:number){
  this.router.navigate(['principal/empresas/servicio/registrar/conductor/',id])
}

RegistrarContratoArrendamiento(id:number){
  this.router.navigate(['principal/empresas/servicio/registrar/arrendamiento/',id])
}

RegistrarItinerario(id:number){
  this.router.navigate(['principal/empresas/servicio/registrar/itinerario/',id])
}

RegistrarVehiculo(id:number){
  this.router.navigate(['principal/empresas/servicio/registrar/vehiculo/',id])
}

// RegistrarTUC(id:number){
//   this.router.navigate(['principal/empresas/servicio/registrar/tuc/'+id])
// }
volver(){
  this.router.navigate(['principal/empresas/servicio'])
}


}
