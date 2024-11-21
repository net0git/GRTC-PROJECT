import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfiguration } from "read-appsettings-json";

@Injectable({
  providedIn: 'root'
})
export class ArrendamientoService {
  api_url_arrendamiento='http://'+AppConfiguration.Setting().ipClient+':3000/api/arrendamiento';
  //  api_url_arrendamiento='http://localhost:3000/api/arrendamiento';
  constructor(private http:HttpClient) { }

  ListarContratosArrendamientos(){
    return this.http.get(this.api_url_arrendamiento)
  }

  //id sera el id_empresa_servicio
  obtenerContratroArrendamientoPorEmpresa(id:number){
    return this.http.get(this.api_url_arrendamiento+'/'+id)
  }

  CrearContratoArrendamiento(body:any){
    return this.http.post(this.api_url_arrendamiento,body)
  }

  //en este caso el id sera id_contrato 
  ModificarContratoArrendamiento(id:number,body:any){
    return this.http.put(this.api_url_arrendamiento+'/'+id,body)
  }
  
  //eliminar un contrato de arrendamiento
  EliminarContratoArrendamiento(id:number){
    return this.http.delete(this.api_url_arrendamiento+'/'+id)
  }
}
