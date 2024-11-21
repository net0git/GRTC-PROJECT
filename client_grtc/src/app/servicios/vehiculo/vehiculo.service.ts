import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfiguration } from "read-appsettings-json";



@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  url_api_vehiculo='http://'+AppConfiguration.Setting().ipClient+':3000/api/vehiculo';
  url_api_marca='http://'+AppConfiguration.Setting().ipClient+':3000/api/marca';
  url_api_modelo='http://'+AppConfiguration.Setting().ipClient+':3000/api/modelo';
  
  // url_api_vehiculo='http://localhost:3000/api/vehiculo';
  // url_api_marca='http://localhost:3000/api/marca';
  // url_api_modelo='http://localhost:3000/api/modelo';
  
  
  constructor(private http:HttpClient) { }

  //listar total de vehiculos
  ListarVehiculos(){
    return this.http.get(this.url_api_vehiculo)
  }

  //listar total de vihiculos por empresa
  ListarTotalVehiculosEmpresa(){
    return this.http.get(this.url_api_vehiculo+'/empresaservicio')
  }
  //listar vehiculos por empresa
  ListarVehiculosEmpresa(id:number){
    return this.http.get(this.url_api_vehiculo+'/empresaservicio/'+id)
  }
  //obterner vehiculo por empresa servicio 
  ObtenerVehiculoPorId(id:number){
    return this.http.get(this.url_api_vehiculo+'/'+id)
  }
  ObtenerVehiculoPorPlaca(placa:string){
    return this.http.get(this.url_api_vehiculo+'/placa/'+placa)
  }

  //crear vehiculo 
  CrearVehiculo(body:any){
    return this.http.post(this.url_api_vehiculo, body)
  }

  //Modificar vehiculo
  ModificarVehiculo(id:number,body:any){
    return this.http.put(this.url_api_vehiculo+'/'+id,body)
  }

  //SERVICIOS RELACIONADOS AL MODELO Y MARCA DEL VEHICULO 
  ListarModelos(){
    return this.http.get(this.url_api_modelo)
  }
 
  ListarMarca(){
    return this.http.get(this.url_api_marca)
  }

  ingresarMarca(body:any){
    return this.http.post(this.url_api_marca,body)
  }
  ingresarModelo(body:any){
    return this.http.post(this.url_api_modelo,body)
  }


  //obtener los datos de una marca
  ObtenerDetalleMarcaPorNombre(nombre_marca:string){
    return this.http.get(this.url_api_marca+'/detalle/'+nombre_marca)
  }

  //obtener los datos de un modelo 
  ObtenerDetalleModeloPorNombre(nombre_modelo:string){
    return this.http.get(this.url_api_modelo+'/detalle/'+nombre_modelo)
  }
  //obtener lista de modelos por id_marca
  ObtenerListaModeloPorId(id_marca:number){ 
    return this.http.get(this.url_api_modelo+'/lista/'+id_marca)
  }

  //modificar tuc del vehiculo
  ModificarTuc(id:number,body:any){
    
    return this.http.put(this.url_api_vehiculo+'/modificar/tuc/'+id,body)
  }

  //dar de baja a un vehiculo
  DarBaja(id:number,body:any){
    return this.http.put(this.url_api_vehiculo+'/baja/'+id,body)
  }

  //obtener historial vehicular 
  ObtenerHistorialVehicular(placa:string){
    return  this.http.get(this.url_api_vehiculo+'/historial/'+placa)
  }

//EN RELACION A LOS REPORTES 
  //lista de vehiculos por ruta 
  ListaVehiculosPorRuta(){
    return this.http.get(this.url_api_vehiculo+'/reporte/ruta/lista')
  }
  
//*****************************************************************************************/
//lista de vehiculos que pasan por un origen de ruta
ListaVehiculosPorOrigenRuta(origen:string){
  return this.http.get(this.url_api_vehiculo+'/detalle/lista/ruta/origen/'+origen)
}
  //lista de vehiculos que pasan por un destino de ruta
  ListaVehiculosPorDestinoRuta(destino:string){
    return this.http.get(this.url_api_vehiculo+'/detalle/lista/ruta/destino/'+destino)
  }
 
  //lista de vehiculos que pasan por un origen y destino
  ListaVehiculosPorOrigenDestinoRuta(origen:string,destino:string){
    return this.http.get(this.url_api_vehiculo+'/detalle/lista/ruta/trayecto/'+origen+'/'+destino)
  }
 //****************************************************************************************/


 
  //cantidad de vehiculos por tipo de servicio 
  CantidadVehiculosPorServicio(){
    return this.http.get(this.url_api_vehiculo+'/detalle/cantidad/tiposervicio')
  }

  cantidadVehiculosPorRuta(){
    return this.http.get(this.url_api_vehiculo+'/detalle/cantidad/ruta')
  }


}
