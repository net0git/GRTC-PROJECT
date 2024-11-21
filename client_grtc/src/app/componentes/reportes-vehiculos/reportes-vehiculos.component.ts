import { Component, OnInit } from '@angular/core';
import { VehiculoService } from 'src/app/servicios/vehiculo/vehiculo.service';
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';
import { DatosCompartidosService } from 'src/app/servicios/datoslogin/datos-compartidos.service';


import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reportes-vehiculos',
  templateUrl: './reportes-vehiculos.component.html',
  styleUrls: ['./reportes-vehiculos.component.css']
})
export class ReportesVehiculosComponent implements OnInit{
  listaVehiculos:any=[]; listaAxuVehiculos:any=[]

  cantidad_vehiculos_servicio:any=[];//cantidad de vehiculos por servicio


  chartSeries = [0];
  chartLabels = [""];
 
  chartDetails: ApexChart = {
   type: 'donut',
   toolbar: {
     show: true
   }
 };
 
 
  chartDataLabels: ApexDataLabels = {
   enabled: true
 
 };

 disableInvitado='display: block';// variale css que ayudara a ocultar ciertos pedazos de codigo html 

  constructor(private datosCompartidosService:DatosCompartidosService,private vehiculoService:VehiculoService){}
  ngOnInit(): void {
    this.listarVehiculos()
    this.CantidadVehiculoServicio()
    if(this.datosCompartidosService.credentials.rol=='INVITADO'){
      this.disableInvitado='display: none'; 
    }
  }

  listarVehiculos(){
    this.vehiculoService.ListarVehiculos().subscribe(
      res=>{
          this.listaVehiculos=res;
          this.listaAxuVehiculos=res;
          console.log(this.listaVehiculos)
      },
      err=>{
          console.error(err)
      }
    )
  }
  buscarEnListaVehiculos(event: any) {
    let objetosFiltrados
    const textoBusqueda = event.target.value.toLowerCase();
    
    if(textoBusqueda==''){
      this.listaVehiculos=this.listaAxuVehiculos
    }
    else{
    // Filtrar los objetos según el texto de búsqueda
    objetosFiltrados = this.listaAxuVehiculos.filter((objeto: 
      { razon_social: string;
        anio_fabricacion: string; 
        placa: string;
        marca: string;
        modelo: string;
        categoria: string;
        tipo_servicio:string;
       }) => {
      const empresa = objeto.razon_social.toLowerCase();
      const anio_fabricacion = objeto.anio_fabricacion.toLowerCase();
      const placa = objeto.placa.toLowerCase();
      const marca = objeto.marca.toLowerCase();
      const modelo = objeto.modelo.toLowerCase();
      const categoria = objeto.categoria.toLowerCase();
      
      const tipo_servicio = objeto.tipo_servicio.toLowerCase();
      
      return empresa.includes(textoBusqueda) || anio_fabricacion.includes(textoBusqueda)|| placa.includes(textoBusqueda)|| marca.includes(textoBusqueda) ||modelo.includes(textoBusqueda) || categoria.includes(textoBusqueda)|| tipo_servicio.includes(textoBusqueda);
    });
    this.listaVehiculos=objetosFiltrados
    }
  }

  CantidadVehiculoServicio(){
    this.vehiculoService.CantidadVehiculosPorServicio().subscribe(
      res=>{
          this.cantidad_vehiculos_servicio=res
          if (this.cantidad_vehiculos_servicio && this.cantidad_vehiculos_servicio.length > 0) {
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

    for(let i=0;i<this.cantidad_vehiculos_servicio.length-1;i++){
      chartSeriestem.push(Number(this.cantidad_vehiculos_servicio[i].cantidad_vehiculos))
      chartLabelstem.push(this.cantidad_vehiculos_servicio[i].tipo_servicio)
    }
    console.log('inicarGrafico')
    console.log(chartSeriestem)
    console.log(chartLabelstem)
    this.chartSeries = chartSeriestem;
    this.chartLabels = chartLabelstem;
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
