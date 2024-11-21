import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaServicioService } from 'src/app/servicios/empresaServicio/empresa-servicio.service';
import { InfraestructuraService } from 'src/app/servicios/infraestructura/infraestructura.service';
import { VehiculoService } from 'src/app/servicios/vehiculo/vehiculo.service';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent  implements OnInit {
  showComponent: string ='reportesEmpresaServicio' // Inicialmente, no se muestra ningún componente

  cantidad_empresas_por_tipoServicio:any=[]
  cantidad_infraestructura:any=[]
  cantidad_vehiculos_servicio:any=[]
  cantidad_empresas_por_estado:any=[]

 

constructor(private vehiculoService:VehiculoService ,private infraestructuraService:InfraestructuraService,private empresaServicioService:EmpresaServicioService,private router:Router){}

ngOnInit(): void {
  this.Cantidad_de_empresas_por_tipoServicio();
  this.CantidadInfraestructura();
  this.CantidadVehiculoServicio();
  this.CantidadEmpresasPorEstado();  
}

//volver a la pagina principal 
   // Función para mostrar el componente deseado
   showSelectedComponent(componentName: string) {
    this.showComponent = componentName;
  }

  Cantidad_de_empresas_por_tipoServicio(){
    this.empresaServicioService.CantidadEmpresasPorServicio().subscribe(
      res=>{
          
          this.cantidad_empresas_por_tipoServicio=res
          
          
      },
      err=>{
          console.error(err)
      }
    )
  }

  CantidadInfraestructura(){
    this.infraestructuraService.CantidadInfraestructura().subscribe(
      res=>{
        this.cantidad_infraestructura=res
      },
      err=>{
        console.error(err)
      }
    )
  }

  CantidadVehiculoServicio(){
    this.vehiculoService.CantidadVehiculosPorServicio().subscribe(
      res=>{
          this.cantidad_vehiculos_servicio=res
      },
      err=>{
          console.error(err)
      }
    )
  }
  
  CantidadEmpresasPorEstado(){
    this.empresaServicioService.CantidadEmpresasPorEstado().subscribe(
      res=>{
        this.cantidad_empresas_por_estado=res
        this.cantidad_empresas_por_estado=this.cantidad_empresas_por_estado[0]
      },
      err=>{
        console.error(err)
      }
    )
  }

  volver(){
    this.router.navigate(['/principal'])
  }
}
