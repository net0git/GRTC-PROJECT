import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfiguration } from "read-appsettings-json";

@Injectable({
  providedIn: 'root'
})
export class MarcaModeloService {

  url_api_marca='http://'+AppConfiguration.Setting().ipClient+':3000/api/marca'
  url_api_modelo='http://'+AppConfiguration.Setting().ipClient+':3000/api/modelo'

  // url_api_marca='http://localhost:3000/api/marca'
  // url_api_modelo='http://localhost:3000/api/modelo'


  constructor(private http:HttpClient) { }

 //listar total de marcas
  ListarMarcas(){
  return this.http.get(this.url_api_marca)
 }

 //listar modelo por id_marca
 listarModelosPorIdMarca(id_marca:number){
  return this.http.get(this.url_api_modelo+"/lista/"+id_marca)
 }
 //listar modelos por nombre de la marca
 listarModelosPorNombreMarca(nombre_marca:string){
  return this.http.get(this.url_api_modelo+'/grupo/'+nombre_marca)

 }

 //buscar marca por nombre//
BuscarMarcaPorNombre(marca:string){
  const body={nombre_marca:marca}
  return this.http.post(this.url_api_marca+'/detalle',body)
}

 //buscar modelo por nombre
 BuscarModeloPorNombre(modelo:string){
  const body={nombre_modelo:modelo}
  return this.http.post(this.url_api_modelo+'/detalle',body)
 }

 //buscar modelo por id
 BuscarModeloPorIdModelo(id_modelo:number){
  return this.http.get(this.url_api_modelo+'/'+id_modelo)
 }
  





}
