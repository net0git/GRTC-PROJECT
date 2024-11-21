import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DatosCompartidosService } from 'src/app/servicios/datoslogin/datos-compartidos.service';





@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

      disableInvitado='display: block';

  constructor(private datosCompartidosService:DatosCompartidosService ,private activatedRoute:ActivatedRoute, private router:Router){}

  ngOnInit(): void {
      if(this.datosCompartidosService.credentials.rol=='INVITADO' || this.datosCompartidosService.credentials.rol=='EDITOR'){
            this.disableInvitado='display: none';
      }
  }

  empresas_por_servicio(){
        this.router.navigate(['/principal/empresas/servicio']);
  }

  empresas_por_infraestructura(){
        this.router.navigate(['/principal/empresas/infraestructura']);
  }
  
  usuarios(){
        this.router.navigate(['/principal/usuario']);
  }

  vehiculos(){
        this.router.navigate(['/principal/vehiculos'])
  }

  tuc(){
        this.router.navigate(['/principal/tuc'])
  }

  reporte(){
        this.router.navigate(['/principal/reportes'])
  }

  busqueda_por_historial(){
        this.router.navigate(['principal/busqueda'])
  }

  resoluciones(){
        this.router.navigate(['principal/resoluciones'])
  }
}
