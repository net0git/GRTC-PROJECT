import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfiguration } from "read-appsettings-json";

@Injectable({
  providedIn: 'root'
})
export class CertificadoService {

api_url_certificado='http://'+AppConfiguration.Setting().ipClient+':3000/api/certificado';
//  api_url_certificado='http://localhost:3000/api/certificado';
  constructor(private http:HttpClient) { }

  CrearCertificado(body:any){
    return this.http.post(this.api_url_certificado,body)
  }
  obtenerCertificado(id:number){
    return this.http.get(this.api_url_certificado+'/'+id)
  }
  ModificarCertificado(id:number,body:any){
    return this.http.put(this.api_url_certificado+'/'+id,body)
  }
}
