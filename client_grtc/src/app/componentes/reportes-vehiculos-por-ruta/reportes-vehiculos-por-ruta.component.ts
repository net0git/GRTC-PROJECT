import { Component, OnInit } from '@angular/core';
import { ItinerarioService } from 'src/app/servicios/itinerario/itinerario.service';
import { VehiculoService } from 'src/app/servicios/vehiculo/vehiculo.service';
import { DatosCompartidosService } from 'src/app/servicios/datoslogin/datos-compartidos.service';
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reportes-vehiculos-por-ruta',
  templateUrl: './reportes-vehiculos-por-ruta.component.html',
  styleUrls: ['./reportes-vehiculos-por-ruta.component.css']
})
export class ReportesVehiculosPorRutaComponent implements OnInit {
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


  lista_vehiculos_por_ruta:any=[]

  listaRutasOrigen:any=[] //lista unica de todos los puntos de origen 
  valorSeleccionadoOrigen='' //variable que almacenara el valor del SelectOrigen

  listaRutasDestino:any=[] //lista unica de todos los puntos de destino 
  valorSeleccionadoDestino='' //variable que almacenara el valor del SelectDestino

  cantidadVehiculosPorRuta:any=[] //cantidad de vehiculos por ruta

  disableInvitado='display: block';// variale css que ayudara a ocultar ciertos pedazos de codigo html 

constructor(private datosCompartidosService:DatosCompartidosService,private itinerarioService:ItinerarioService,private vehiculoService:VehiculoService){}
  ngOnInit(): void {
    this.listarVehiculosPorRuta()
    this.listarRutasOrigen()
    this.ListarRutasDestino()
    this.CantidadVehiculosPorRuta()
    if(this.datosCompartidosService.credentials.rol=='INVITADO'){
      this.disableInvitado='display: none'; 
    }
}
CantidadVehiculosPorRuta(){
  this.vehiculoService.cantidadVehiculosPorRuta().subscribe(
    res=>{
        this.cantidadVehiculosPorRuta=res
        if (this.cantidadVehiculosPorRuta && this.cantidadVehiculosPorRuta.length > 0) {
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

private inicializarGrafico(): void {
   
  // let chartSeriestem = [20,16,48,50];
  // let chartLabelstem = ["Apple", "Microsoft", "Facebook", "Google"];
  let chartSeriestem:number[]= [];
  let chartLabelstem:string[] = [];
  // // Puedes agregar valores predeterminados aquí si lo deseas

  for(let i=0;i<this.cantidadVehiculosPorRuta.length;i++){
    chartSeriestem.push(Number(this.cantidadVehiculosPorRuta[i].cantidad_vehiculos))
    chartLabelstem.push(this.cantidadVehiculosPorRuta[i].origen_ruta+'-'+this.cantidadVehiculosPorRuta[i].destino_ruta)
  }
  console.log('inicarGrafico')
  console.log(chartSeriestem)
  console.log(chartLabelstem)
  this.chartSeries = chartSeriestem;
  this.chartLabels = chartLabelstem;
} 
listarVehiculosPorRuta(){
  this.vehiculoService.ListaVehiculosPorRuta().subscribe(
    res=>{
        this.lista_vehiculos_por_ruta=res
    },
    err=>{
        console.error(err)
    }
  )
}

listarRutasOrigen(){
  
  this.itinerarioService.ListaRutasOrigen().subscribe(
    res=>{
      this.listaRutasOrigen=res
      console.log(this.listaRutasOrigen)
    },
    err=>{
      console.error(err)
    }
  )
}

ListarRutasDestino(){
  this.itinerarioService.ListaRutasDestino().subscribe(
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
          this.vehiculoService.ListaVehiculosPorOrigenDestinoRuta(this.valorSeleccionadoOrigen,this.valorSeleccionadoDestino).subscribe(
            res=>{
                this.lista_vehiculos_por_ruta=res
            },
            err=>{
                console.error(err)
            }
          )
      }
      else{
        if(this.valorSeleccionadoOrigen!='' && this.valorSeleccionadoDestino==''){
            this.vehiculoService.ListaVehiculosPorOrigenRuta(this.valorSeleccionadoOrigen).subscribe(
              res=>{
                this.lista_vehiculos_por_ruta=res
              },
              err=>{
                console.error(err)
              }
            )
        }
        else(
          this.vehiculoService.ListaVehiculosPorDestinoRuta(this.valorSeleccionadoDestino).subscribe(
            res=>{
              this.lista_vehiculos_por_ruta=res
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

  this.listarVehiculosPorRuta()
  this.valorSeleccionadoOrigen='' 
  this.valorSeleccionadoDestino=''
}
buscarEnObjeto(event:any){

  }

  ExporToExcel():void{
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
