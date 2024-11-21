import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaServicioService } from 'src/app/servicios/empresaServicio/empresa-servicio.service';
import { DatosCompartidosService } from 'src/app/servicios/datoslogin/datos-compartidos.service';




@Component({
  selector: 'app-empresa-servicio',
  templateUrl: './empresa-servicio.component.html',
  styleUrls: ['./empresa-servicio.component.css']
})
export class EmpresaServicioComponent implements OnInit {

  empresas:any=[];//en este arreglo se almanara la informacion que deseamos mostrar en la tabla
  empresasAux:any=[];//como haremos combios en en el primer arreglo, este servira como restaurador de el arreglo original
  empresaTem:any=[];//servira como punto de partida para una busqueda
  objetosFiltrados:any=[];

  disableInvitado='display: block';// variale css que ayudara a ocultar ciertos pedazos de codigo html 
  
  constructor(private datosCompartidosService:DatosCompartidosService,private empresaServicioService:EmpresaServicioService, private router: Router){}
  ngOnInit(): void {
    this.listarEmpresasSevicios();
    console.log(this.datosCompartidosService.credentials.rol)
        if(this.datosCompartidosService.credentials.rol=='INVITADO'){
          this.disableInvitado='display: none';
        }
  }


  listarEmpresasSevicios(){
      this.empresaServicioService.listarEmpresasServicio().subscribe(
        res=>{
          this.empresas=res;
          this.empresasAux=this.empresas;
          this.empresaTem=this.empresas;
          console.log(this.empresas)
        },
        err=>{
          console.error(err);
        }
      )
  }
  restaurarEmpresas() {
    this.empresas = this.empresasAux;
    this.empresaTem=this.empresas

}

  filtrarEmpresa(id: number) {
    this.empresas  = this.empresasAux.filter((empresa: { id_tipo_servicio: number; }) => empresa.id_tipo_servicio == id);
    this.empresaTem=this.empresas
  }

  seleccionarTipoTransporte(event: any) {
    // Obtener el valor seleccionado
    const valorSeleccionado = event.target.value;

    // Aquí puedes ejecutar tu lógica según el valor seleccionado
    switch (valorSeleccionado) {
      case '1':
        // Lógica para Transporte de personas
        this.filtrarEmpresa(valorSeleccionado);
       
        break;
      case '2':
        // Lógica para Transporte turístico
        this.filtrarEmpresa(valorSeleccionado);
      
        break;
      case '3':
        // Lógica para Transporte de trabajadores
        this.filtrarEmpresa(valorSeleccionado);
      
        break;
      case '4':
        // Lógica para Transporte escolar
        this.filtrarEmpresa(valorSeleccionado);
       
        break;
      default:
        // Lógica para el caso por defecto (ninguna opción seleccionada)
        this.restaurarEmpresas();
       
        break;
    }
  }

  buscarEnObjeto(event: any) {
    const textoBusqueda = event.target.value.toLowerCase();
    
    // Filtrar los objetos según el texto de búsqueda
    this.objetosFiltrados = this.empresaTem.filter((objeto: 
      { empresa: string;
        ruc: string; 
        estado: string;
        fecha_inicial: string;
        fecha_final: string;
        tipo_servicio: string;
       }) => {
      const empresa = objeto.empresa.toLowerCase();
      const ruc = objeto.ruc.toLowerCase();
      const estado = objeto.estado.toLowerCase();
      const fecha_inicial = objeto.fecha_inicial.toLowerCase();
      const fecha_final = objeto.fecha_final.toLowerCase();
      
      const tipo_servicio = objeto.tipo_servicio.toLowerCase();
      
      return empresa.includes(textoBusqueda) || ruc.includes(textoBusqueda)|| estado.includes(textoBusqueda)|| fecha_inicial.includes(textoBusqueda) ||fecha_final.includes(textoBusqueda) || tipo_servicio.includes(textoBusqueda);
    });
    this.empresas=this.objetosFiltrados
  }

  Volver(){
    this.router.navigate(['/principal'])
  }

  EmpresaDetalle(id:number){
    this.router.navigate(['principal/empresas/servicio/detalle/',id])
  }
  
  CrearEmpresa(){
   // principal/empresas/servicio/crear/principal
    // this.router.navigate(['principal/empresas/servicio/crear'])
    this.router.navigate(['principal/empresas/servicio/crear/principal'])
  }
}
