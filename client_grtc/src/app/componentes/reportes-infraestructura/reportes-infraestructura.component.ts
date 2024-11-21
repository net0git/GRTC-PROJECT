import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfraestructuraService } from 'src/app/servicios/infraestructura/infraestructura.service';
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';
import { DatosCompartidosService } from 'src/app/servicios/datoslogin/datos-compartidos.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reportes-infraestructura',
  templateUrl: './reportes-infraestructura.component.html',
  styleUrls: ['./reportes-infraestructura.component.css']
})
export class ReportesInfraestructuraComponent implements OnInit {

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

  Infraestructura:any=[]//arreglo de todas las empresas que registraron una o mas infraestructura
  InfraestructuraAux:any=[]//emplearemos este arreglo como respaldo de la lista original
  InfraestructuraTemp:any=[]
  objetosFiltrados:any=[];

  cantidadInfraestructura:any=[]; //cantidad de empresas por infraestructura
  disableInvitado='display: block';// variale css que ayudara a ocultar ciertos pedazos de codigo html 

  constructor(private datosCompartidosService:DatosCompartidosService,private infraestructuraService:InfraestructuraService,private router:Router){}
  ngOnInit(): void {
    this.listarInfraestructura()
    this.CantidadInfraestructura()
    if(this.datosCompartidosService.credentials.rol=='INVITADO'){
      this.disableInvitado='display: none'; 
    }
  }

  listarInfraestructura(){
    this.infraestructuraService.listarInfraestructuras().subscribe(
      res=>{

            this.Infraestructura=res;
            this.InfraestructuraAux=this.Infraestructura;
            this.InfraestructuraTemp=this.Infraestructura;   
            
      },
      err=>{
            console.error(err);
      }
    )
  }

  private inicializarGrafico(): void {
   
    // let chartSeriestem = [20,16,48,50];
    // let chartLabelstem = ["Apple", "Microsoft", "Facebook", "Google"];
    let chartSeriestem:number[]= [];
    let chartLabelstem:string[] = [];
    // // Puedes agregar valores predeterminados aquí si lo deseas

    for(let i=0;i<this.cantidadInfraestructura.length-1;i++){
      chartSeriestem.push(Number(this.cantidadInfraestructura[i].cantidad_infraestructuras))
      chartLabelstem.push(this.cantidadInfraestructura[i].tipo_infraestructura)
    }
    console.log('inicarGrafico')
    console.log(chartSeriestem)
    console.log(chartLabelstem)
    this.chartSeries = chartSeriestem;
    this.chartLabels = chartLabelstem;
  } 

  CantidadInfraestructura(){
    this.infraestructuraService.CantidadInfraestructura().subscribe(
      res=>{
        this.cantidadInfraestructura=res

        if (this.cantidadInfraestructura && this.cantidadInfraestructura.length > 0) {
         this.inicializarGrafico();
         console.log(this.cantidadInfraestructura)
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

  filtrarInfraestructura(id: number) {
    this.Infraestructura  = this.InfraestructuraAux.filter((Infraestructura: { id_tipo_infraestructura: number; }) => Infraestructura.id_tipo_infraestructura == id);
    this.InfraestructuraTemp=this.Infraestructura
  }
  seleccionarTipoInfraestructura(event: any) {
    // Obtener el valor seleccionado
    const valorSeleccionado = event.target.value;

    // Aquí puedes ejecutar tu lógica según el valor seleccionado
    switch (valorSeleccionado) {
      case '1':
        // Lógica para Transporte de personas
        this.filtrarInfraestructura(valorSeleccionado);
      
        break;
      case '2':
        // Lógica para Transporte turístico
        this.filtrarInfraestructura(valorSeleccionado);
      
        break;
      case '3':
        // Lógica para Transporte de trabajadores
        this.filtrarInfraestructura(valorSeleccionado);
      
        break;
      case '4':
        // Lógica para Transporte escolar
        this.filtrarInfraestructura(valorSeleccionado);
       
        break;
      default:
        // Lógica para el caso por defecto (ninguna opción seleccionada)
        this.restaurarInfraestructura();
       
        break;
    }
  }
  restaurarInfraestructura() {
    this.Infraestructura = this.InfraestructuraAux;
    this.InfraestructuraTemp=this.InfraestructuraAux;

}
  buscarEnObjeto(event: any) {
    const textoBusqueda = event.target.value.toLowerCase();
    
    // Filtrar los objetos según el texto de búsqueda
    this.objetosFiltrados = this.InfraestructuraTemp.filter((objeto: 
      { nombre_infraestructura: string;
        direccion: string; 
        distrito: string;
        provincia:string;
        departamento:string;
        nombre_resolucion:string;
        fecha_act: string;
        
       }) => {
      const nombre_infraestructura = objeto.nombre_infraestructura.toLowerCase();
      const direccion = objeto.direccion.toLowerCase();
      const distrito = objeto.distrito.toLowerCase();
      const provincia = objeto.provincia.toLowerCase();
      const departamento = objeto.departamento.toLowerCase();
      const nombre_resolucion= objeto.nombre_resolucion.toLowerCase();

      return nombre_infraestructura.includes(textoBusqueda) || direccion.includes(textoBusqueda)|| distrito.includes(textoBusqueda)|| provincia.includes(textoBusqueda)|| departamento.includes(textoBusqueda)||nombre_resolucion.includes(textoBusqueda) ;
    });
    this.Infraestructura=this.objetosFiltrados
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
