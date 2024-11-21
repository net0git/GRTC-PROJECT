import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfiguration } from "read-appsettings-json";

@Injectable({
  providedIn: 'root'
})
export class EmpresaServicioService {

  ///api/itinerario/lista/empresa/:id
  api_uri_empresa='http://'+AppConfiguration.Setting().ipClient+':3000/api/empresaservicio';
  //  api_uri_empresa='http://localhost:3000/api/empresaservicio';


  constructor(private http:HttpClient) { }

  listarEmpresasServicio(){
    return this.http.get(this.api_uri_empresa);
  }

  ObtenerEmpresaServicio(id:number){
    return this.http.get(this.api_uri_empresa+'/'+id)
  }

  ObtenerEmpresaServicioDetalle(id:number){
    return this.http.get(this.api_uri_empresa+'/detalle/'+id)
  }

  CrearEmpresaServicio(body:any){
    return this.http.post(this.api_uri_empresa,body)
  }

  //ingresar una resolucion al conjunto de resoluciones de empresa servicio en la base de datos
  CrearResolucion(body:any){
    return this.http.post(this.api_uri_empresa+'/resoluciones',body)
  }

  //encontrar empresa por placa de vehiculo 
  ObtenerEmpresaPorPlaca(placa:string){
    return this.http.get(this.api_uri_empresa+'/buscar/placa/'+placa)
  }

  //esta funcion busca si existe una empresa registrada con el ruc y tipo de servicio
  BuscarEmpresaPorRuc_tipoServicio(id_tipo_servicio:number, ruc_empresa:string){
    return this.http.get(this.api_uri_empresa+'/'+id_tipo_servicio+'/'+ruc_empresa)
  }

  ModificarEmpresaServicio(id:number, body:any){
    return this.http.put(this.api_uri_empresa+'/'+id,body)
  }

  //Obtner resoluciones de la empresa servicio
  ObtenerResolucionesEmpresaServicio(id:number){
    return this.http.get(this.api_uri_empresa+'/resoluciones/'+id)
  }

  //obtener lista de conductores
  ObtenerListaConductores(id:number){
    return this.http.get(this.api_uri_empresa+'/conductores/lista/'+id)
  }

  ListaResoluciones(id:number){
    
    return this.http.get(this.api_uri_empresa+'/resoluciones/lista/'+id)
  }


  //EN RELACION A LOS REPORTES 
  //lista de empresas por ruta
  listarEmpresasPorRuta(){
  return this.http.get(this.api_uri_empresa+'/detalle/rutas/lista')
 }

 CantidadEmpresasPorServicio(){
  return this.http.get(this.api_uri_empresa+'/detalle/cantidad/tiposervicio')
 }

 // cantidad de empresas por estado
 CantidadEmpresasPorEstado(){
  return this.http.get(this.api_uri_empresa+'/detalle/estado/cantidad')
 }
 
 //cantidad de empresas que pasas por cierta ruta
CantidadEmpresasPorRuta(){
  return this.http.get(this.api_uri_empresa+'/detalle/rutas/cantidad')
}



 //***************************************************************/
// lista de vehiculos que pasan por un origen de ruta
ListaEmpresasPorOrigenRuta(origen:string){
  return this.http.get(this.api_uri_empresa+'/detalle/lista/ruta/origen/'+origen)
}
  //lista de vehiculos que pasan por un destino de ruta
  ListaEmpresasPorDestinoRuta(destino:string){
    return this.http.get(this.api_uri_empresa+'/detalle/lista/ruta/destino/'+destino)
  }
 
  //lista de vehiculos que pasan por un origen y destino
  ListaEmpresasPorOrigenDestinoRuta(origen:string,destino:string){
    return this.http.get(this.api_uri_empresa+'/detalle/lista/ruta/trayecto/'+origen+'/'+destino)
  }
 //****************************************************************

}
