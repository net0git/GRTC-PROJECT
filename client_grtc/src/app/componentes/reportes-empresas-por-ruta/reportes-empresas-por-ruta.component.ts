import { Component, OnInit } from '@angular/core';
import { EmpresaServicioService } from 'src/app/servicios/empresaServicio/empresa-servicio.service';
import { ItinerarioService } from 'src/app/servicios/itinerario/itinerario.service';
import { DatosCompartidosService } from 'src/app/servicios/datoslogin/datos-compartidos.service';
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reportes-empresas-por-ruta',
  templateUrl: './reportes-empresas-por-ruta.component.html',
  styleUrls: ['./reportes-empresas-por-ruta.component.css']
})
export class ReportesEmpresasPorRutaComponent implements OnInit{
  chartSeries = [0];
  chartLabels = [""];
 
  chartDetails: ApexChart = {
   type: 'pie',
   toolbar: {
     show: true
   }
 };
 
 
  chartDataLabels: ApexDataLabels = {
   enabled: true
 
 };


  lista_empresas_por_ruta:any=[]
  empresaTem:any=[]//variable temporal que almacena la lista de empresa para restaurar lista de empresas


  listaRutasOrigen:any=[] //lista unica de todos los puntos de origen 
  valorSeleccionadoOrigen='' //variable que almacenara el valor del SelectOrigen

  listaRutasDestino:any=[] //lista unica de todos los puntos de destino 
  valorSeleccionadoDestino='' //variable que almacenara el valor del SelectDestino

  cantidadEmpresaPorRuta:any=[] //almacenara la informacion de cantidad de empresas por ruta

  disableInvitado='';// variale css que ayudara a ocultar ciertos pedazos de codigo html 

constructor(private datosCompartidosService:DatosCompartidosService,private itinerarioService:ItinerarioService, private empresaServicioService:EmpresaServicioService){}

ngOnInit(): void {
  this.listar_empresas_por_ruta()
  this.listarRutasOrigen()
  this.ListarRutasDestino()
  this.cantidadEmpresasPorRuta()

    if(this.datosCompartidosService.credentials.rol=='INVITADO'){
      this.disableInvitado='display: none'; 
    }
}

private inicializarGrafico(): void {
   
  // let chartSeriestem = [20,16,48,50];
  // let chartLabelstem = ["Apple", "Microsoft", "Facebook", "Google"];
  let chartSeriestem:number[]= [];
  let chartLabelstem:string[] = [];
  // // Puedes agregar valores predeterminados aquí si lo deseas

  for(let i=0;i<this.cantidadEmpresaPorRuta.length;i++){
    chartSeriestem.push(Number(this.cantidadEmpresaPorRuta[i].cantidad_empresas))
    chartLabelstem.push(this.cantidadEmpresaPorRuta[i].origen_ruta+'-'+this.cantidadEmpresaPorRuta[i].destino_ruta)
  }
  console.log('inicarGrafico')
  console.log(chartSeriestem)
  console.log(chartLabelstem)
  this.chartSeries = chartSeriestem;
  this.chartLabels = chartLabelstem;
} 
cantidadEmpresasPorRuta(){
  this.empresaServicioService.CantidadEmpresasPorRuta().subscribe(
    res=>{
      this.cantidadEmpresaPorRuta=res
      console.log(this.cantidadEmpresaPorRuta)
      if (this.cantidadEmpresaPorRuta && this.cantidadEmpresaPorRuta.length > 0) {
        this.inicializarGrafico();
     
       } else {
         // Lógica para manejar el caso en que no hay datos
         console.log('no existen datos')
       }
    },
    err=>{
      console.error(err)
    }
  )
}

listar_empresas_por_ruta(){
  this.empresaServicioService.listarEmpresasPorRuta().subscribe(
    res=>{
        this.lista_empresas_por_ruta=res
        this.empresaTem=res
        console.log(this.lista_empresas_por_ruta)
    },
    err=>{
       console.error(err)
    }
  )
}

listarRutasOrigen(){
  this.itinerarioService.ListaRutasOrigenEmpresa().subscribe(
    res=>{
        this.listaRutasOrigen=res
    },
    err=>{
        console.error(err)
    }
  )
}

ListarRutasDestino(){
 this.itinerarioService.ListaRutasDestinoEmpresa().subscribe(
  res=>{
    this.listaRutasDestino=res
  },
  err=>{
    console.error(err)
  }
 )
}

FiltarPorOrigenDestino(){
  if(this.valorSeleccionadoOrigen=='' && this.valorSeleccionadoDestino=='' ){
    alert('por favor seleccione un oriten y un destino para realizar el filtro')
}
else{
    if(this.valorSeleccionadoOrigen!='' && this.valorSeleccionadoDestino!='' ){
        this.empresaServicioService.ListaEmpresasPorOrigenDestinoRuta(this.valorSeleccionadoOrigen,this.valorSeleccionadoDestino).subscribe(
          res=>{
              this.lista_empresas_por_ruta=res
          },
          err=>{
              console.error(err)
          }
        )
    }
    else{
      if(this.valorSeleccionadoOrigen!='' && this.valorSeleccionadoDestino==''){
          this.empresaServicioService.ListaEmpresasPorOrigenRuta(this.valorSeleccionadoOrigen).subscribe(
            res=>{
              this.lista_empresas_por_ruta=res
            },
            err=>{
              console.error(err)
            }
          )
      }
      else(
        this.empresaServicioService.ListaEmpresasPorDestinoRuta(this.valorSeleccionadoDestino).subscribe(
          res=>{
            this.lista_empresas_por_ruta=res
          },
          err=>{
            console.error(err)
          }
          )
      )
    }
}

}

refrescar(){
  this.listar_empresas_por_ruta()
  this.valorSeleccionadoOrigen=''
  this.valorSeleccionadoDestino=''
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

buscarEnObjeto(event:any){
  const textoBusqueda = event.target.value.toLowerCase();
  let objetosFiltrados:any=[]
    
  // Filtrar los objetos según el texto de búsqueda
  objetosFiltrados = this.empresaTem.filter((objeto: 
    { nombre_empresa: string;
      
     }) => {
    const empresa = objeto.nombre_empresa.toLowerCase();

   
    return empresa.includes(textoBusqueda);
  });
  
  this.lista_empresas_por_ruta=objetosFiltrados

}
}
