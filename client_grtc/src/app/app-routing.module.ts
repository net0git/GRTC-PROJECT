import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { AuthGuard } from './Guardian/auth.guard';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { UserformComponent } from './componentes/userform/userform.component';


import { EmpresaServicioComponent } from './componentes/empresa-servicio/empresa-servicio.component';
import { EmpresaServicioFormComponent } from './componentes/empresa-servicio-form/empresa-servicio-form.component';
import { EmpresaServicioFormPrincipalComponent } from './componentes/empresa-servicio-form-principal/empresa-servicio-form-principal.component';
import { EmpresaServicioVehiculoComponent } from './componentes/empresa-servicio-vehiculo/empresa-servicio-vehiculo.component';
import { EmpresaServicioResolucionFormComponent } from './componentes/empresa-servicio-resolucion-form/empresa-servicio-resolucion-form.component';
import { EmpresaServicioConductorComponent } from './componentes/empresa-servicio-conductor/empresa-servicio-conductor.component';
import { EmpresaServicioArrendamientoComponent } from './componentes/empresa-servicio-arrendamiento/empresa-servicio-arrendamiento.component';
import { EmpresaServicioItinerarioComponent } from './componentes/empresa-servicio-itinerario/empresa-servicio-itinerario.component';

import { UserComponent } from './componentes/user/user.component';
import { CreateUserComponent } from './componentes/create-user/create-user.component';


import { EmpresaDetalleComponent } from './componentes/empresa-detalle/empresa-detalle.component';
import { InfraestructuraComponent } from './componentes/infraestructura/infraestructura.component';
import { InfraestructuraDetalleComponent } from './componentes/infraestructura-detalle/infraestructura-detalle.component';
import { InfraestructuraResolucionFormComponent } from './componentes/infraestructura-resolucion-form/infraestructura-resolucion-form.component'; 
import { InfraestructuraFromComponent } from './componentes/infraestructura-from/infraestructura-from.component';
import { InfraestructuraCertificadoFormComponent } from './componentes/infraestructura-certificado-form/infraestructura-certificado-form.component';
import { InfraestructuraFormPrincipalComponent } from './componentes/infraestructura-form-principal/infraestructura-form-principal.component';

import { VehiculosComponent } from './componentes/vehiculos/vehiculos.component';
import { TucComponent } from './componentes/tuc/tuc.component';
import { ReportesComponent } from './componentes/reportes/reportes.component';
import { BusquedaComponent } from './componentes/busqueda/busqueda.component';
import { ResolucionesComponent } from './componentes/resoluciones/resoluciones.component';


const routes: Routes = [
  {
    path:'',
    redirectTo:'/login',
    pathMatch:'full'
  },
  { path:'login', component: LoginComponent},
  { path:'principal', component: PrincipalComponent ,canActivate: [AuthGuard]},
  { path:'principal/usuario', component: UserComponent ,canActivate: [AuthGuard]},
  { path:'principal/usuario/crear', component:CreateUserComponent ,canActivate: [AuthGuard]},
  { path:'principal/usuario/modificar/:id',component:CreateUserComponent ,canActivate: [AuthGuard]},
  { path:'principal/usuarioform/:id', component:UserformComponent ,canActivate: [AuthGuard]},

  { path:'principal/vehiculos', component:VehiculosComponent ,canActivate: [AuthGuard]},
  { path:'principal/tuc', component:TucComponent ,canActivate: [AuthGuard]},
  { path:'principal/reportes', component:ReportesComponent ,canActivate: [AuthGuard]},
  { path:'principal/busqueda', component:BusquedaComponent ,canActivate: [AuthGuard]},
  { path:'principal/resoluciones', component:ResolucionesComponent ,canActivate: [AuthGuard]},

  { path:'principal/empresas/servicio', component: EmpresaServicioComponent ,canActivate: [AuthGuard]},
  { path:'principal/empresas/servicio/crear', component: EmpresaServicioFormComponent ,canActivate: [AuthGuard]},
  { path:'principal/empresas/servicio/crear/principal', component: EmpresaServicioFormPrincipalComponent ,canActivate: [AuthGuard]},
  { path:'principal/empresas/servicio/crear/resolucion/:id_e', component: EmpresaServicioResolucionFormComponent ,canActivate: [AuthGuard]},
  { path:'principal/empresas/servicio/registrar/conductor/:id', component: EmpresaServicioConductorComponent ,canActivate: [AuthGuard]},
  { path:'principal/empresas/servicio/registrar/vehiculo/:id', component: EmpresaServicioVehiculoComponent ,canActivate: [AuthGuard]},
  { path:'principal/empresas/servicio/registrar/itinerario/:id', component: EmpresaServicioItinerarioComponent ,canActivate: [AuthGuard]},
  { path:'principal/empresas/servicio/registrar/arrendamiento/:id', component: EmpresaServicioArrendamientoComponent ,canActivate: [AuthGuard]},
  { path:'principal/empresas/servicio/modificar/resolucion/:id_e/:id_r', component: EmpresaServicioResolucionFormComponent ,canActivate: [AuthGuard]},
  { path:'principal/empresas/servicio/modificar/:id', component:EmpresaServicioFormComponent ,canActivate: [AuthGuard]},
  { path:'principal/empresas/servicio/detalle/:id', component:EmpresaDetalleComponent ,canActivate: [AuthGuard]},

  { path:'principal/empresas/infraestructura', component:InfraestructuraComponent  ,canActivate: [AuthGuard]},
  { path:'principal/empresas/infraestructura/detalle/:id', component:InfraestructuraDetalleComponent  ,canActivate: [AuthGuard]},
  { path:'principal/empresas/infraestructura/detalle/crear/resolucion/:id_i', component: InfraestructuraResolucionFormComponent ,canActivate: [AuthGuard] },
  { path:'principal/empresas/infraestructura/detalle/modificar/resolucion/:id_i/:id_r', component: InfraestructuraResolucionFormComponent ,canActivate: [AuthGuard]},
  { path:'principal/empresas/infraestructura/detalle/crear/certificado/:id_i', component: InfraestructuraCertificadoFormComponent ,canActivate: [AuthGuard]},
  { path:'principal/empresas/infraestructura/detalle/modificar/certificado/:id_i/:id_c', component: InfraestructuraCertificadoFormComponent ,canActivate: [AuthGuard] },
  { path:'principal/empresas/infraestructura/modificar/:id', component: InfraestructuraFromComponent ,canActivate: [AuthGuard]},
  { path:'principal/empresas/infraestructura/crear', component: InfraestructuraFromComponent ,canActivate: [AuthGuard]},
  { path:'principal/empresas/infraestructura/principal/crear', component: InfraestructuraFormPrincipalComponent ,canActivate: [AuthGuard]},
  
  { path: '**', redirectTo: '/login' } // Ruta de comodín para URLs desconocidas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
