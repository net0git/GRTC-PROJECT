import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfiguration } from "read-appsettings-json";

@Injectable({
  providedIn: 'root'
})
export class HistorialvehicularService {

  url_api_historialVehiuclar='http://'+AppConfiguration.Setting().ipClient+':3000/api/historialvehicular';
  //  url_api_historialVehiuclar='http://localhost:3000/api/historialvehicular';


  constructor(private http:HttpClient) { }

  obtenerHistorialVehicularPorEmpresa(id:number){
    return this.http.get(this.url_api_historialVehiuclar+'/'+id)
  }

  crearHistorialVehicular(body:any){
    return this.http.post(this.url_api_historialVehiuclar,body)
  }
}
