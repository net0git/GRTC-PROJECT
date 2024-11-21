import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfiguration } from "read-appsettings-json";

@Injectable({
  providedIn: 'root'
})
export class TucService {
  url_api_tuc='http://'+AppConfiguration.Setting().ipClient+':3000/api/tuc';
  // url_api_tuc='http://localhost:3000/api/tuc';


  constructor(private http:HttpClient) { }

  crearTuc(body:any){
    return this.http.post(this.url_api_tuc,body)
  }

  obtenerDetalleTuc(id:number){
    return this.http.get(this.url_api_tuc+'/'+id)
  }

  //listar tuc por placa
  listarTucPorPlaca(placa:string){
    return this.http.get(this.url_api_tuc+'/listar/'+placa)
  }


  obtenerTucPorNumero(nro_tuc:string){
    return this.http.get(this.url_api_tuc+'/buscar/'+nro_tuc)
  }
  //modificar tuc, en este caso sole se modificara el numero de tuc, el numero de impresion y las copias del tuc 
  modificarTuc(id:number,body:any){
   
    return this.http.put(this.url_api_tuc+'/'+id,body)
  }

  //modificar el tuc modal que vehiculos
  modificarTucModal(id:number,body:any){
    return this.http.put(this.url_api_tuc+'/modificar/modal/'+id,body)
  }


}
