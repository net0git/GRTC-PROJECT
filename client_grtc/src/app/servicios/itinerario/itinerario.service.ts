import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfiguration } from "read-appsettings-json";

@Injectable({
  providedIn: 'root'
})
export class ItinerarioService {
  api_uri_itinerario='http://'+AppConfiguration.Setting().ipClient+':3000/api/itinerario'; 
  //  api_uri_itinerario='http://localhost:3000/api/itinerario';

  constructor(private http:HttpClient) { }
///api/itinerario/lista/ruta/origen
  //el id parametro es el id de la empresa
  listarItinerarioPorEmpresa(id:number){
   return  this.http.get(this.api_uri_itinerario+'/lista/empresa/'+id)
  }

  //listar rutas de origen para vehiculo
  ListaRutasOrigen(){
    return  this.http.get(this.api_uri_itinerario+'/lista/ruta/origen')
   }
  //listar rutas de destino para vehiculo
  ListaRutasDestino(){
    return  this.http.get(this.api_uri_itinerario+'/lista/ruta/destino')
   }

   //listar rutas de origen para empresa
  ListaRutasOrigenEmpresa(){
    return  this.http.get(this.api_uri_itinerario+'/lista/empresas/ruta/origen')
   }
  //listar rutas de destino para empresa
  ListaRutasDestinoEmpresa(){
    return  this.http.get(this.api_uri_itinerario+'/lista/empresas/ruta/destino')
   }

  //el id parametro es el id del propio itinerario
  ObtenerDetalleItinerario(id:number){
    return this.http.get(this.api_uri_itinerario+'/'+id)
  }

  //crear itinerario
  CrearItinerario(body:any){
    return this.http.post(this.api_uri_itinerario,body)
  }

  //modificar itinerario
  ModificarItinerario(id:number,body:any){
    return this.http.put(this.api_uri_itinerario+'/'+id,body)
  }

  //eliminar itinerario
  EliminarItinerario(id:number){
    return this.http.delete(this.api_uri_itinerario+'/'+id)
  }
}
