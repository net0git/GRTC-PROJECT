import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfiguration } from "read-appsettings-json";

@Injectable({
  providedIn: 'root'
})
export class ConductorService {
  api_url_conductor='http://'+AppConfiguration.Setting().ipClient+':3000/api/conductor';
  // api_url_conductor='http://localhost:3000/api/conductor';

  constructor(private http:HttpClient) { }

  //listar total de conductores
  listarTotalConductores(){
    return this.http.get(this.api_url_conductor)
  }
  //listar coductores por empresa
  listarConductores(id:number){
    return this.http.get(this.api_url_conductor+'/lista/'+id)
  }

  GuardarConductor(body:any){
    return this.http.post(this.api_url_conductor,body)
  }

  //eliminar conductor
  EliminarConductor(id:number){
    return this.http.delete(this.api_url_conductor+'/'+id)
  }

  //modificar conductor
  ModificarConductor(id:number,body:any){
    return this.http.put(this.api_url_conductor+'/'+id,body)
  }
}
