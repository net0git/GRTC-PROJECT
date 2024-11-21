import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { NavegadorComponent } from './componentes/navegador/navegador.component';
import { UserComponent } from './componentes/user/user.component';
import { UserformComponent } from './componentes/userform/userform.component';


import {HttpClientModule} from '@angular/common/http';
import { AuthService } from './servicios/autentificacion/auth.service';
import { FormsModule } from '@angular/forms';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { EmpresaServicioComponent } from './componentes/empresa-servicio/empresa-servicio.component';
import { TucComponent } from './componentes/tuc/tuc.component';
import { VehiculosComponent } from './componentes/vehiculos/vehiculos.component';
import { CreateUserComponent } from './componentes/create-user/create-user.component';
import { EmpresaDetalleComponent } from './componentes/empresa-detalle/empresa-detalle.component';
import { InfraestructuraComponent } from './componentes/infraestructura/infraestructura.component';
import { InfraestructuraDetalleComponent } from './componentes/infraestructura-detalle/infraestructura-detalle.component';
import { InfraestructuraFromComponent } from './componentes/infraestructura-from/infraestructura-from.component';
import { InfraestructuraResolucionFormComponent } from './componentes/infraestructura-resolucion-form/infraestructura-resolucion-form.component';
import { ResolucionFormComponent } from './componentes/resolucion-form/resolucion-form.component';
import { InfraestructuraCertificadoFormComponent } from './componentes/infraestructura-certificado-form/infraestructura-certificado-form.component';
import { EmpresaServicioFormComponent } from './componentes/empresa-servicio-form/empresa-servicio-form.component';
import { EmpresaServicioResolucionFormComponent } from './componentes/empresa-servicio-resolucion-form/empresa-servicio-resolucion-form.component';
import { EmpresaServicioConductorComponent } from './componentes/empresa-servicio-conductor/empresa-servicio-conductor.component';
import { EmpresaServicioArrendamientoComponent } from './componentes/empresa-servicio-arrendamiento/empresa-servicio-arrendamiento.component';
import { EmpresaServicioItinerarioComponent } from './componentes/empresa-servicio-itinerario/empresa-servicio-itinerario.component';
import { EmpresaServicioVehiculoComponent } from './componentes/empresa-servicio-vehiculo/empresa-servicio-vehiculo.component';

import { ReportesComponent } from './componentes/reportes/reportes.component';
import { BusquedaComponent } from './componentes/busqueda/busqueda.component';
import { ResolucionesComponent } from './componentes/resoluciones/resoluciones.component';
import { ReportesEmpresaServicioComponent } from './componentes/reportes-empresa-servicio/reportes-empresa-servicio.component';
import { ReportesInfraestructuraComponent } from './componentes/reportes-infraestructura/reportes-infraestructura.component';
import { ReportesVehiculosComponent } from './componentes/reportes-vehiculos/reportes-vehiculos.component';
import { ReportesConductoresComponent } from './componentes/reportes-conductores/reportes-conductores.component';
import { ReportesHistorialVehicularComponent } from './componentes/reportes-historial-vehicular/reportes-historial-vehicular.component';
import { ReportesVehiculosPorEmpresaComponent } from './componentes/reportes-vehiculos-por-empresa/reportes-vehiculos-por-empresa.component';
import { ReportesEmpresasPorRutaComponent } from './componentes/reportes-empresas-por-ruta/reportes-empresas-por-ruta.component';
import { ReportesVehiculosPorRutaComponent } from './componentes/reportes-vehiculos-por-ruta/reportes-vehiculos-por-ruta.component';
import { EmpresaServicioFormPrincipalComponent } from './componentes/empresa-servicio-form-principal/empresa-servicio-form-principal.component';
import { InfraestructuraFormPrincipalComponent } from './componentes/infraestructura-form-principal/infraestructura-form-principal.component';

import { NgApexchartsModule } from 'ng-apexcharts';
import { ReportesEmpresasEstadoComponent } from './componentes/reportes-empresas-estado/reportes-empresas-estado.component';








@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavegadorComponent,
    UserComponent,
    UserformComponent,
    PrincipalComponent,
    EmpresaServicioComponent,
    InfraestructuraComponent,
    TucComponent,
    VehiculosComponent,
    CreateUserComponent,
    EmpresaDetalleComponent,
    InfraestructuraDetalleComponent,
    InfraestructuraFromComponent,
    InfraestructuraResolucionFormComponent,
    ResolucionFormComponent,
    InfraestructuraCertificadoFormComponent,
    EmpresaServicioFormComponent,
    EmpresaServicioResolucionFormComponent,
    EmpresaServicioConductorComponent,
    EmpresaServicioArrendamientoComponent,
    EmpresaServicioItinerarioComponent,
    EmpresaServicioVehiculoComponent,
    ReportesComponent,
    BusquedaComponent,
    ResolucionesComponent,
    ReportesEmpresaServicioComponent,
    ReportesInfraestructuraComponent,
    ReportesVehiculosComponent,
    ReportesConductoresComponent,
    ReportesHistorialVehicularComponent,
    ReportesVehiculosPorEmpresaComponent,
    ReportesEmpresasPorRutaComponent,
    ReportesVehiculosPorRutaComponent,
    EmpresaServicioFormPrincipalComponent,
    InfraestructuraFormPrincipalComponent,
    ReportesEmpresasEstadoComponent,
    

  
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgApexchartsModule
    
   
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
