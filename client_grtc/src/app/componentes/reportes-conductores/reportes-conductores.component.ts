import { Component, OnInit } from '@angular/core';
import { ConductorService } from 'src/app/servicios/conductor/conductor.service';
import { DatosCompartidosService } from 'src/app/servicios/datoslogin/datos-compartidos.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reportes-conductores',
  templateUrl: './reportes-conductores.component.html',
  styleUrls: ['./reportes-conductores.component.css']
})
export class ReportesConductoresComponent implements OnInit {

  listaConductores:any=[]//lista de todos los conductores 
  listaTemp:any=[]//lista temporal que guardara a todos los conductores de lista conductores
 
  disableInvitado='';// variale css que ayudara a ocultar ciertos pedazos de codigo html 

constructor(private datosCompartidosService:DatosCompartidosService,private conductorService:ConductorService){}
 

  ngOnInit(): void {
    this.listarConductores();
    if(this.datosCompartidosService.credentials.rol=='INVITADO'){
      this.disableInvitado='display: none'; 
    }
  }

  listarConductores(){
    this.conductorService.listarTotalConductores().subscribe(
      res=>{
          this.listaConductores=res
          this.listaTemp=res
          console.log(this.listaConductores)
      },
      err=>{
          console.error(err)
      }
    )
  }
  

  ExporToExcel():void{
    //import * as XLSX from 'xlsx';
    // Obtenemos una referencia al elemento que contiene la tabla que deseamos exportar a Excel
    let element = document.getElementById('excel-table');
  
    // Convertimos la tabla en una hoja de trabajo (WorkSheet) de Excel utilizando la función table_to_sheet
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
  
    // Creamos una nueva hoja de trabajo (WorkBook) de Excel
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
  
    // Agregamos la hoja de trabajo que creamos anteriormente al libro de trabajo
    // La hoja de trabajo se llama 'Sheet1', pero puedes personalizar este nombre
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    // Utilizamos la función writeFile para guardar el libro de trabajo como un archivo Excel
    // this.fileNameExcel debe ser una variable que contiene el nombre que deseas darle al archivo
    XLSX.writeFile(wb, 'reporte.xlsx');
  
  }

  
  
  buscarEnListaConductores(event: any){

    const textoBusqueda = event.target.value.toLowerCase();
    let objetosFiltrados:any=[]
      
    // Filtrar los objetos según el texto de búsqueda
    objetosFiltrados = this.listaTemp.filter((objeto: 
      { nombre_conductor: string;
        apellido_paterno: string;
        apellido_materno: string;
        nombre_empresa: string;
        nro_licencia: string;
        numero_documento: string;
        telefono: string;
        correo:string;

        
       }) => {
      const nombre_conductor = objeto.nombre_conductor.toLowerCase();
      const apellido_paterno = objeto.apellido_paterno.toLowerCase();
      const apellido_materno = objeto.apellido_materno.toLowerCase();
      const nombre_empresa = objeto.nombre_empresa.toLowerCase();
      const nro_licencia = objeto.nro_licencia.toLowerCase();
      const numero_documento = objeto.numero_documento.toLowerCase();
      const telefono = objeto.telefono.toLowerCase();
      const correo = objeto.correo.toLowerCase();

      return nombre_conductor.includes(textoBusqueda)||apellido_paterno.includes(textoBusqueda)||apellido_materno.includes(textoBusqueda)||nombre_empresa.includes(textoBusqueda)||nro_licencia.includes(textoBusqueda)||numero_documento.includes(textoBusqueda)||telefono.includes(textoBusqueda)||correo.includes(textoBusqueda);
    });
    
    this.listaConductores=objetosFiltrados
  }
}
