import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TucService } from 'src/app/servicios/tuc/tuc.service';

@Component({
  selector: 'app-tuc',
  templateUrl: './tuc.component.html',
  styleUrls: ['./tuc.component.css']
})
export class TucComponent {
  detalle_tuc:any=[]//arreglo que almacenara la busqueda de un tuc por su id_tuc

constructor(private tucService:TucService,private router:Router){

}
listaTuc:any=[]//lista de todos los tuc relacionados un vehiculo

buscarTucPorNumero(){
  let tuc = (<HTMLInputElement>document.getElementById('placa')).value;
  this.tucService.obtenerTucPorNumero(tuc).subscribe(
    res=>{
      this.detalle_tuc=res
      this.detalle_tuc=this.detalle_tuc[0]
    },
    err=>{
      console.error(err)
    }
  )
}

listarTucPorPlaca(){
  let placa = (<HTMLInputElement>document.getElementById('placa')).value;
  this.tucService.listarTucPorPlaca(placa).subscribe(
    res=>{
        this.listaTuc=res
        console.log(this.listaTuc)
    },
    err=>{
        console.error(err)
        alert('no se encontraron TUC relaconados con la placa')
    }
  )
}

//funcion para volver  a la pagina principal
  volver(){
    this.router.navigate(['/principal'])
  }
}
