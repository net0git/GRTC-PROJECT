import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VehiculoService } from 'src/app/servicios/vehiculo/vehiculo.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {

  historial_vehicular:any=[]

  constructor(private vehiculoService:VehiculoService,private router:Router){}

  Buscar_historial_vehicular(){
    let placa = (<HTMLInputElement>document.getElementById('placa_vehicular')).value;
    if(placa==''){
      alert('por favor digite la placa')
    }
    else{
     this.vehiculoService.ObtenerHistorialVehicular(placa).subscribe(
      res=>{
          this.historial_vehicular=res
      
      },
      err=>{
        console.error(err)
        alert('historial no encontrado')
      }
     )
    } 
  }
  //BOTON PARA VOLVER
  volver(){
    this.router.navigate(['/principal'])
  }
}
