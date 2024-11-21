import { Component, OnInit } from '@angular/core';
import { VehiculoService } from 'src/app/servicios/vehiculo/vehiculo.service';
import { DatosCompartidosService } from 'src/app/servicios/datoslogin/datos-compartidos.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reportes-vehiculos-por-empresa',
  templateUrl: './reportes-vehiculos-por-empresa.component.html',
  styleUrls: ['./reportes-vehiculos-por-empresa.component.css']
})
export class ReportesVehiculosPorEmpresaComponent implements OnInit{

  listaVehiculosPorEmpresa:any=[]//lista de todas las empresas con sus respectivos vehiculos
  listaTemp:any=[]//lista temporal para recuperar la lista de todas las empresas con sus respectivos vehiculos

  disableInvitado='display: block';// variale css que ayudara a ocultar ciertos pedazos de codigo html 

  constructor(private datosCompartidosService:DatosCompartidosService,private vehiculoService:VehiculoService){}


ngOnInit(): void {
  this.listarVehiculosPorEmpresas();
  if(this.datosCompartidosService.credentials.rol=='INVITADO'){
    this.disableInvitado='display: none'; 
  }
}

listarVehiculosPorEmpresas(){
  this.vehiculoService.ListarTotalVehiculosEmpresa().subscribe(
    res=>{
      this.listaVehiculosPorEmpresa=res
      this.listaTemp=res
      console.log(this.listaTemp)
    },
    err=>{
      console.error(err)
    }
  )
}

  buscarEnListaEmpresas(event: any){
    const textoBusqueda = event.target.value.toLowerCase();
    let objetosFiltrados:any=[]
      
    // Filtrar los objetos según el texto de búsqueda
    objetosFiltrados = this.listaTemp.filter((objeto: 
      { nombre_empresa: string;
        ruc:string;
        tipo_servicio:string;
        itinerario:string;
        fecha_inicial:string;
        fecha_final:string;
        anio_fabricacion:string;
        placa_vehiculo:string;
        
       }) => {
      const empresa = objeto.nombre_empresa.toLowerCase();
      const ruc = objeto.ruc.toLowerCase();
      const tipo_servicio = objeto.tipo_servicio.toLowerCase();
      const itinerario = objeto.itinerario.toLowerCase();
      const fecha_inicial = objeto.fecha_inicial.toLowerCase();
      const fecha_final = objeto.fecha_final.toLowerCase();
      const anio_fabricacion = objeto.anio_fabricacion
      const placa = objeto.placa_vehiculo.toLowerCase();
  
     
      return empresa.includes(textoBusqueda)|| ruc.includes(textoBusqueda)|| tipo_servicio.includes(textoBusqueda)||itinerario.includes(textoBusqueda)|| fecha_inicial.includes(textoBusqueda)||fecha_final.includes(textoBusqueda)||anio_fabricacion.includes(textoBusqueda)|| placa.includes(textoBusqueda);
    });
    
    this.listaVehiculosPorEmpresa=objetosFiltrados
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
}
