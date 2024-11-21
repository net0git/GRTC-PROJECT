import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfiguration } from "read-appsettings-json";

@Injectable({
  providedIn: 'root'
})
export class InfraestructuraService {
  api_uri_infraestructura='http://'+AppConfiguration.Setting().ipClient+':3000/api/infraestructura';
  //  api_uri_infraestructura='http://localhost:3000/api/infraestructura';

  constructor(private http:HttpClient) { }

  listarInfraestructuras(){
    return this.http.get(this.api_uri_infraestructura)
  }
  obtenerInfraestructura(id:number){
    return this.http.get(this.api_uri_infraestructura+'/'+id)
  }
  obtenerInfraestructuraPorRuc(ruc:string){
    return this.http.get(this.api_uri_infraestructura+'/ruc/'+ruc)
  }
  crearInfraestructura(body:any){
    return this.http.post(this.api_uri_infraestructura,body)
  }
  modificarInfraestructura(id:number, body:any){
    return this.http.put(this.api_uri_infraestructura+'/'+id,body)
  }

  obtenerInfraestructraResoluciones(id:number){
    return this.http.get(this.api_uri_infraestructura+'/resoluciones/'+id)
  }
  obtenerInfraestructuraCertificados(id:number){
    return this.http.get(this.api_uri_infraestructura+'/certificados/'+id)
  }

  //insertar resolucion a su historial de infraestructura
  crearResolucionInfraestructura(body:any){
    return this.http.post(this.api_uri_infraestructura+'/resoluciones',body)
  }

  //insertar certificado a su historial de infraestructura
  crearCertificadoInfraestructura(body:any){
    return this.http.post(this.api_uri_infraestructura+'/certificados',body)
  }

  //cantidad de infraestructura
  CantidadInfraestructura(){
    return this.http.get(this.api_uri_infraestructura+'/detalle/cantidad')
  }

}
