import { Component, OnInit } from '@angular/core';
import { EmpresaServicioService } from 'src/app/servicios/empresaServicio/empresa-servicio.service';

import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';
import { DatosCompartidosService } from 'src/app/servicios/datoslogin/datos-compartidos.service';

import * as XLSX from 'xlsx'


@Component({
  selector: 'app-reportes-empresa-servicio',
  templateUrl: './reportes-empresa-servicio.component.html',
  styleUrls: ['./reportes-empresa-servicio.component.css']
})
export class ReportesEmpresaServicioComponent implements OnInit{
 
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



  empresas:any=[];//en este arreglo se almanara la informacion que deseamos mostrar en la tabla
  empresasAux:any=[];//en este arreglo reservaremos una copia de la informacion de empresas
  empresaTem:any=[];//servira como punto de partida para una busqueda
  objetosFiltrados:any=[];

  cantidadEmpresas:any=[]; //cantidad de empresas por servicio

  disableInvitado=''//variable temporal para cambiar el estado del html

  constructor(private datosCompartidosService:DatosCompartidosService,private empresaServicioService:EmpresaServicioService){}

  ngOnInit(): void {
    
    this.listarEmpresasSevicios()
    console.log('entro al ngOnInit')
    // this.actualizarDatos()
    this.obtenerCantidadEmpresas()

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

    for(let i=0;i<this.cantidadEmpresas.length-1;i++){
      chartSeriestem.push(Number(this.cantidadEmpresas[i].cantidad_empresas))
      chartLabelstem.push(this.cantidadEmpresas[i].tipo_servicio)
    }
    console.log('inicarGrafico')
    console.log(chartSeriestem)
    console.log(chartLabelstem)
    this.chartSeries = chartSeriestem;
    this.chartLabels = chartLabelstem;
  }


  reiniciarGrafico(): void {
    this.inicializarGrafico();
    // Puedes agregar lógica adicional aquí según tus necesidades
  }
  listarEmpresasSevicios(){
    this.empresaServicioService.listarEmpresasServicio().subscribe(
      res=>{
        this.empresas=res;
         
         this.empresasAux=this.empresas;
         this.empresaTem=this.empresas;
        
        console.log(this.empresas)
      },
      err=>{
        console.error(err);
      }
    )
}
 obtenerCantidadEmpresas(){
  this.empresaServicioService.CantidadEmpresasPorServicio().subscribe(
    res => {
      this.cantidadEmpresas = res;
      console.log(this.cantidadEmpresas);
      
      if (this.cantidadEmpresas && this.cantidadEmpresas.length > 0) {
        this.inicializarGrafico();
      } else {
        // Lógica para manejar el caso en que no hay datos
        console.log('no existen datos')
      }
    },
    err => {
      console.error(err);
    }
  );
}

restaurarEmpresas() {
  this.empresas = this.empresasAux;
  this.empresaTem=this.empresas

}

filtrarEmpresa(id: number) {
  this.empresas  = this.empresasAux.filter((empresa: { id_tipo_servicio: number; }) => empresa.id_tipo_servicio == id);
  this.empresaTem=this.empresas
}

seleccionarTipoTransporte(event: any) {
  // Obtener el valor seleccionado
  const valorSeleccionado = event.target.value;

  // Aquí puedes ejecutar tu lógica según el valor seleccionado
  switch (valorSeleccionado) {
    case '1':
      // Lógica para Transporte de personas
      this.filtrarEmpresa(valorSeleccionado);
     
      break;
    case '2':
      // Lógica para Transporte turístico
      this.filtrarEmpresa(valorSeleccionado);
    
      break;
    case '3':
      // Lógica para Transporte de trabajadores
      this.filtrarEmpresa(valorSeleccionado);
    
      break;
    case '4':
      // Lógica para Transporte escolar
      this.filtrarEmpresa(valorSeleccionado);
     
      break;
    default:
      // Lógica para el caso por defecto (ninguna opción seleccionada)
      this.restaurarEmpresas();
     
      break;
  }
}

buscarEnObjeto(event: any) {
  const textoBusqueda = event.target.value.toLowerCase();
  
  // Filtrar los objetos según el texto de búsqueda
  this.objetosFiltrados = this.empresaTem.filter((objeto: 
    { empresa: string;
      ruc: string; 
      estado: string;
      fecha_inicial: string;
      fecha_final: string;
      tipo_servicio: string;
     }) => {
    const empresa = objeto.empresa.toLowerCase();
    const ruc = objeto.ruc.toLowerCase();
    const estado = objeto.estado.toLowerCase();
    const fecha_inicial = objeto.fecha_inicial.toLowerCase();
    const fecha_final = objeto.fecha_final.toLowerCase();
    
    const tipo_servicio = objeto.tipo_servicio.toLowerCase();
    
    return empresa.includes(textoBusqueda) || ruc.includes(textoBusqueda)|| estado.includes(textoBusqueda)|| fecha_inicial.includes(textoBusqueda) ||fecha_final.includes(textoBusqueda) || tipo_servicio.includes(textoBusqueda);
  });
  this.empresas=this.objetosFiltrados
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
function ViewChild(arg0: string, arg1: { static: boolean; }): (target: ReportesEmpresaServicioComponent, propertyKey: "containerElement") => void {
  throw new Error('Function not implemented.');
}

