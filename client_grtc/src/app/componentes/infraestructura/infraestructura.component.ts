import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfraestructuraService } from 'src/app/servicios/infraestructura/infraestructura.service';
import { DatosCompartidosService } from 'src/app/servicios/datoslogin/datos-compartidos.service';

@Component({
  selector: 'app-infraestructura',
  templateUrl: './infraestructura.component.html',
  styleUrls: ['./infraestructura.component.css']
})
export class InfraestructuraComponent implements OnInit {

  Infraestructura:any=[]//arreglo de todas las empresas que registraron una o mas infraestructura
  InfraestructuraAux:any=[]//emplearemos este arreglo como respaldo de la lista original
  InfraestructuraTemp:any=[]
  objetosFiltrados:any=[];

  disableInvitado='display: block';// variale css que ayudara a ocultar ciertos pedazos de codigo html 

 constructor(private datosCompartidosService:DatosCompartidosService,private InfraestructuraService:InfraestructuraService, private router:Router){}
  ngOnInit(): void {
    console.log('lista_infraestructura')
    this.listarInfrestructura()
    if(this.datosCompartidosService.credentials.rol=='INVITADO'){
      this.disableInvitado='display: none';
    }
  }
  listarInfrestructura(){
    this.InfraestructuraService.listarInfraestructuras().subscribe(
      res=>{

            this.Infraestructura=res;
            this.InfraestructuraAux=this.Infraestructura;
            this.InfraestructuraTemp=this.Infraestructura;   
            
      },
      err=>{
            console.error(err);
      }
    )
  }

  filtrarInfraestructura(id: number) {
    this.Infraestructura  = this.InfraestructuraAux.filter((Infraestructura: { id_tipo_infraestructura: number; }) => Infraestructura.id_tipo_infraestructura == id);
    this.InfraestructuraTemp=this.Infraestructura
  }
  seleccionarTipoInfraestructura(event: any) {
    // Obtener el valor seleccionado
    const valorSeleccionado = event.target.value;

    // Aquí puedes ejecutar tu lógica según el valor seleccionado
    switch (valorSeleccionado) {
      case '1':
        // Lógica para Transporte de personas
        this.filtrarInfraestructura(valorSeleccionado);
      
        break;
      case '2':
        // Lógica para Transporte turístico
        this.filtrarInfraestructura(valorSeleccionado);
      
        break;
      case '3':
        // Lógica para Transporte de trabajadores
        this.filtrarInfraestructura(valorSeleccionado);
      
        break;
      case '4':
        // Lógica para Transporte escolar
        this.filtrarInfraestructura(valorSeleccionado);
       
        break;
      default:
        // Lógica para el caso por defecto (ninguna opción seleccionada)
        this.restaurarInfraestructura();
       
        break;
    }
  }
  restaurarInfraestructura() {
    this.Infraestructura = this.InfraestructuraAux;
    this.InfraestructuraTemp=this.InfraestructuraAux;

}
  buscarEnObjeto(event: any) {
    const textoBusqueda = event.target.value.toLowerCase();
    
    // Filtrar los objetos según el texto de búsqueda
    this.objetosFiltrados = this.InfraestructuraTemp.filter((objeto: 
      { nombre_infraestructura: string;
        ruc_infraestructura: string; 
        direccion_infraestructura: string;
        fecha_inicial: string;
        nombre_empresa:string;
       }) => {
      const nombre_infraestructura = objeto.nombre_infraestructura.toLowerCase();
      const ruc_infraestructura = objeto.ruc_infraestructura.toLowerCase();
      const direccion_infraestructura = objeto.direccion_infraestructura.toLowerCase();
      const fecha_inicial = objeto.fecha_inicial.toLowerCase();
      const nombre_empresa = objeto.nombre_empresa.toLowerCase();

      return nombre_infraestructura.includes(textoBusqueda) || ruc_infraestructura.includes(textoBusqueda)|| direccion_infraestructura.includes(textoBusqueda)|| fecha_inicial.includes(textoBusqueda)|| nombre_empresa.includes(textoBusqueda) ;
    });
    this.Infraestructura=this.objetosFiltrados
  }
  Volver(){
    this.router.navigate(['/principal'])
  }
  DetalleInfraestructura(id:number){
    this.router.navigate(['/principal/empresas/infraestructura/detalle/',id])
  }  
  CrearInfraestructura(){
    this.router.navigate(['/principal/empresas/infraestructura/principal/crear'])
  }
  InfraestructuraDetalle(id_infraestructura:number){
    this.router.navigate(['/principal/empresas/infraestructura/detalle/',id_infraestructura])
  }
  
}
