import { Component, OnInit } from '@angular/core';
import { VehiculoService } from 'src/app/servicios/vehiculo/vehiculo.service';
import { DatosCompartidosService } from 'src/app/servicios/datoslogin/datos-compartidos.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reportes-historial-vehicular',
  templateUrl: './reportes-historial-vehicular.component.html',
  styleUrls: ['./reportes-historial-vehicular.component.css']
})
export class ReportesHistorialVehicularComponent implements OnInit {

  historial_vehicular:any=[]
  disableInvitado=''//variable temporal para cambiar el estado del html

  constructor(private datosCompartidosService:DatosCompartidosService,private vehiculoService:VehiculoService){}

  ngOnInit(): void {
    if(this.datosCompartidosService.credentials.rol=='INVITADO'){
      this.disableInvitado='display: none';
     
    }
  }

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
