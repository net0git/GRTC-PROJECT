import { Component, OnInit } from '@angular/core';
import { EmpresaServicioService } from 'src/app/servicios/empresaServicio/empresa-servicio.service';
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';

@Component({
  selector: 'app-reportes-empresas-estado',
  templateUrl: './reportes-empresas-estado.component.html',
  styleUrls: ['./reportes-empresas-estado.component.css']
})
export class ReportesEmpresasEstadoComponent implements OnInit {
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

 cantidad_empresas_por_estado:any=[]//cantidad de empresas por estado 
 constructor(private empresaServicioService:EmpresaServicioService){}
 ngOnInit(): void {
   this.CantidadEmpresasPorEstado();
 }

 private inicializarGrafico(): void {
   
  // let chartSeriestem = [20,16,48,50];
  // let chartLabelstem = ["Apple", "Microsoft", "Facebook", "Google"];
  let chartSeriestem:number[]= [Number(this.cantidad_empresas_por_estado[0].empresas_activas),Number(this.cantidad_empresas_por_estado[0].empresas_de_baja),Number(this.cantidad_empresas_por_estado[0].empresas_en_alerta)];
  let chartLabelstem:string[] = ['EMPRESAS ACTIVAS','EMPRESAS INACTIVAS','EMPRESAS EN ALERTA'];
  // // Puedes agregar valores predeterminados aquí si lo deseas

  // for(let i=0;i<this.cantidad_empresas_por_estado.length;i++){
  //   chartSeriestem.push(Number(this.cantidad_empresas_por_estado[i].cantidad_infraestructuras))
  //   chartLabelstem.push(this.cantidad_empresas_por_estado[i].tipo_infraestructura)
  // }
  // console.log('inicarGrafico')
  // console.log(chartSeriestem)
  // console.log(chartLabelstem)
  this.chartSeries = chartSeriestem;
  this.chartLabels = chartLabelstem;
}

CantidadEmpresasPorEstado(){
  this.empresaServicioService.CantidadEmpresasPorEstado().subscribe(
    res=>{
      this.cantidad_empresas_por_estado=res
      // this.cantidad_empresas_por_estado=this.cantidad_empresas_por_estado[0]
      if (this.cantidad_empresas_por_estado && this.cantidad_empresas_por_estado.length > 0) {
        
        console.log(this.cantidad_empresas_por_estado)
        this.inicializarGrafico()
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
}
