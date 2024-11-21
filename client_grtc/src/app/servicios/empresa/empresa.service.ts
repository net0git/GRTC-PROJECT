import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfiguration } from "read-appsettings-json";


@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  api_uri_empresa='http://'+AppConfiguration.Setting().ipClient+':3000/api/empresa';
  //  api_uri_empresa='http://localhost:3000/api/empresa';

  constructor(private http:HttpClient) { }

  obtenerEmpresa(id:number){
    return this.http.get(this.api_uri_empresa+'/'+id)
  }

  obtenerEmpresaPorRuc(ruc:string){
    return this.http.get(this.api_uri_empresa+'/ruc/'+ruc)
  }

  crearEmpresa(body:any){
    return this.http.post(this.api_uri_empresa,body)
  }

  modificarEmpresa(id:number,body:any){
    return this.http.put(this.api_uri_empresa+'/'+id,body)
  }
}
