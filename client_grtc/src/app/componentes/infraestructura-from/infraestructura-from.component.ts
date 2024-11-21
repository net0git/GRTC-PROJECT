import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfraestructuraService } from 'src/app/servicios/infraestructura/infraestructura.service';
import { ActivatedRoute } from '@angular/router';
import { UbicacionService } from 'src/app/servicios/ubicacion/ubicacion.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-infraestructura-from',
  templateUrl: './infraestructura-from.component.html',
  styleUrls: ['./infraestructura-from.component.css']
})
export class InfraestructuraFromComponent implements OnInit{

  
  modificar=false;//esta variable nos indicara si el estado de la ventana sera de creacion de usuario o modificacion, todo esto en funcion a la url que llegue a activiar la ventana

  //datos de Infraestructura
  data_infraestructura:any={
    
};


 
  claseBoton: string = 'btn btn-lg btn-success mt-3 text-white ';

  departamentos: string[] = []
  provincias: string[] = []
  distritosPorProvincia: string[] = []



  // provincias: string[] = [
  //   'ACOMAYO',
  //   'ANTA',
  //   'CALCA',
  //   'CANAS',
  //   'CANCHIS',
  //   'CHUMBIVILCAS',
  //   'CUSCO',
  //   'ESPINAR',
  //   'LA CONVENCIÓN',
  //   'PARURO',
  //   'PAUCARTAMBO',
  //   'QUISPICANCHI',
  //   'URUBAMBA'
  // ];
  // distritosPorProvincia: { [key: string]: string[] } = {
  //   'ACOMAYO': ['ACOMAYO', 'ACOPIA', 'MOSOC LLACTA','POMACANCHI','RONDOCAN','SANGARARÁ'],
  //   'ANTA': ['ANTA', 'ANCAHUASI', 'CACHIMAYO', 'CHINCHAYPUJIO', 'HUAROCONDO', 'LIMATAMBO', 'MOLLEPATA', 'PUCYURA', 'ZURITE'],
  //   'CALCA':['CALCA','COYA','LAMAY','LARES','PISAC','SAN SALVADOR','TARAY','YANATILE'],
  //   'CANAS':['CHECCA','KUNTURKANKI','LANGUI','LAYO','PAMPAMARCA','QUEHUE','TÚPAC AMARU','YANAOCO'],
  //   'CANCHIS':['CHECACUPE','COLQUEMARCA','COMBAPATA','COPORAQUE','LIVITACA','MARANGANI','SAN PABLO','SAN PEDRO','SANTA ANA','SICUANI','TINTA'],
  //   'CHUMBIVILCAS':['CCAPACMARCA','CHAMACA','COLQUEMARCA','LIVITACA','LLUSCO','QUIÑOTA','SANTO TOMÁS','VELILLE'],
  //   'CUSCO': ['CUSCO', 'CCORCA', 'POROY', 'SAN JERÓNIMO', 'SAN SEBASTIÁN', 'SANTIAGO', 'SAYLLA', 'WANCHAQ'],
  //   'ESPINAR': ['ESPINAR', 'CONDOROMA', 'COPORAQUE', 'OCORURO', 'PALLPATA', 'PICHIGUA', 'SUYCKUTAMBO', 'ALTO PICHIGUA', 'SANTA ANA', 'OSEFINA', 'PALCA'],
  //   'LA CONVENCIÓN': ['QUILLABAMBA', 'ECHARATE', 'SANTA ANA', 'VILCABAMBA', 'HUAYOPATA', 'MARANURA', 'OCOBAMBA', 'QUELLOUNO', 'KIMBIRI', 'SANTA TERESA', 'MOLLEPATA', 'LA CONVENCIÓN', 'AYNA', 'SANTA ISABEL', 'VILLA VIRGEN', 'VILLA KINTIARINA', 'MEGANTONI'],
  //   'PARURO': ['PARURO', 'ACCHA', 'CCAPI', 'COLCHA', 'HUANOQUITE', 'OMACHA', 'PACCARITAMBO', 'PILLPINTO', 'YAURISQUE'],
  //   'PAUCARTAMBO': ['PAUCARTAMBO', 'CAICAY', 'CHALLABAMBA', 'COLQUEPATA', 'HUANCARANI', 'KOSÑIPATA', 'PAUCARTAMBO', 'QUEHUE', 'TRES UNIDOS'],
  //   'QUISPICANCHI': ['URCOS', 'ANDAHUAYLILLAS', 'CAMANTI', 'CCARHUAYO', 'CCATCA', 'CUSIPATA', 'HUARO', 'LUCRE', 'MARCAPATA', 'OCONGATE', 'OROPESA', 'QUIQUIJANA', 'URCOS'],
  //   'URUBAMBA': ['URUBAMBA', 'CHINCHERO', 'HUAYLLABAMBA', 'MACHUPICCHU', 'MARAS', 'OLLANTAYTAMBO', 'YUCAY']
  // };


  

  constructor(private ubicacionService:UbicacionService,private activatedRoute:ActivatedRoute, private infraestructuraService:InfraestructuraService,private router:Router){}  

  ngOnInit(): void {
    const params=this.activatedRoute.snapshot.params;
    if(params['id']){
      this.modificar=true;
      this.infraestructuraService.obtenerInfraestructura(params['id']).subscribe(
        res=>{
           
            this.data_infraestructura=res;
            console.log(this.data_infraestructura)
            this.data_infraestructura=this.data_infraestructura[0]
            this.data_infraestructura.fecha_act=this.FechaConFormato(this.data_infraestructura.fecha_act)
            this.claseBoton = 'btn btn-lg btn-warning mt-3';
            this.ListaDepartamentos()
            this.onDepartamentoChange()
            this.onProvinciaChange()
        },
        err=>{
            console.error(err);
        }
      )
    }  
  }

   //ubicacion------------------------------------------------------------------------------------------
  // lista de departamento
  ListaDepartamentos(){
    this.departamentos=this.ubicacionService.getDepartamentos()
  }
  onDepartamentoChange() {
    const departamentoSeleccionado = this.data_infraestructura.departamento;
    console.log(departamentoSeleccionado)
    this.provincias = this.ubicacionService.getProvinciasPorDepartamento(departamentoSeleccionado);
    console.log(this.provincias)
  }
  onProvinciaChange(){
    const ProvinciaSeleccionado = this.data_infraestructura.provincia;
    console.log(ProvinciaSeleccionado)
    this.distritosPorProvincia = this.ubicacionService.getDistritosPorProvincia(ProvinciaSeleccionado);
    console.log(this.distritosPorProvincia)
  }
//----------------------------------------------------------------------------------------------------
 
   //CONVERTIR A MAYUSCULAS
convertirAMayusculas(valor: string): string {
  return valor.toUpperCase();
  } 
 
FechaConFormato(fechaISO:string):string{
// Función para convertir una fecha ISO a formato "mm-yyyy-dd"
  const fecha = new Date(fechaISO);
  const dia = fecha.getDate().toString().padStart(2, '0'); // Obtiene el día
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Obtiene el mes (agregamos 1 porque los meses en JavaScript comienzan en 0)
  const anio = fecha.getFullYear(); // Obtiene el año
  // Formatea la fecha en "yyyy-dd-mm"
  return `${anio}-${mes}-${dia}`;
}

//___________________________________________________________________________________
//================================MODIFICADR VALORES==================================

async ModificarInfraestructura(){
  const params=this.activatedRoute.snapshot.params;
  this.infraestructuraService.modificarInfraestructura(params['id'],this.data_infraestructura).subscribe(
    res=>{
      console.log(res)
    },
    err=>{
      console.error(err)
    }
  )
}
//____________________________________________________________________________________
//=========================VALIDAR FORMULARIO=============================
//validar para guardar
validarFormulario() {
  // Realiza la validación de los campos aquí
  if (this.data_infraestructura.id_tipo_infraestructura == 0) {
    alert('Por favor, selecciona un Tipo de Infraestructura.');
    document.getElementById("tipo_infraestructura")?.focus();
    return;
  }

  if (!this.data_infraestructura.nombre_infraestructura) {
    alert('Por favor, ingresa el Nombre de la Infraestructura.');
    document.getElementById("nombre_infraestructura")?.focus();
    return;
  }

  if (this.data_infraestructura.mtc === undefined) {
    alert('Por favor, selecciona una opción en el campo Trámite (Regional o MTC).');
    return;
  }


  if (!this.data_infraestructura.direccion) {
    alert('Por favor, ingresa la Dirección de la Infraestructura.');
    document.getElementById("direccion_infraestructura")?.focus();
    return;
  }

  if (!this.data_infraestructura.expediente) {
    alert('Por favor, ingresa el Expediente de la Infraestructura.');
    document.getElementById("expediente")?.focus();
    return;
  }



  if (!this.data_infraestructura.fecha_act) {
    alert('Por favor, selecciona la Fecha de Activación de la Infraestructura.');
    document.getElementById("fecha_infraestructura")?.focus();
    return;
  }

  if (!this.data_infraestructura.departamento) {
    alert('Por favor, selecciona el Departamento de la Infraestructura.');
    document.getElementById("departamento_infraestructura")?.focus();
    return;
  }

  if (!this.data_infraestructura.provincia) {
    alert('Por favor, selecciona la Provincia de la Infraestructura.');
    document.getElementById("provincia_infraestructura")?.focus();
    return;
  }

  if (!this.data_infraestructura.distrito) {
    alert('Por favor, selecciona el Distrito de la Infraestructura.');
    document.getElementById("distrito_infraestructura")?.focus();
    return;
  }


  

  // Si llega hasta aquí, significa que todos los campos están validados correctamente
  // Puedes ejecutar la acción deseada aquí
  if(this.modificar){
    
    this.ModificarInfraestructura();
    this.MensajeDeModificado()
    this.volerInfraestructuraDetalle();
  }
  

}
//__________________________FUNCION PRINCIPAL________________________________________


//======================================================================
//*****/ BUSCAR SI EXISTE EMPRESA************/
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//MENSAJES ANIMADOS---------------------------------------------------------------------
MensajeDeGuardado(){
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Registro exitoso',
    showConfirmButton: false,
    timer: 1500
  })
}
MensajeDeModificado(){
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Modificacion Exitosa',
    showConfirmButton: false,
    timer: 1500
  })
}
//-----------------------------------------------------------------------------------------------
//__________VOLVER A LA PAGINAS ANTERIORES_______________________________________________
volverListaInfraestructura(){
  this.router.navigate(['principal/empresas/infraestructura'])
}
volerInfraestructuraDetalle(){

  this.router.navigate(['/principal/empresas/infraestructura/detalle/',this.data_infraestructura.id_infraestructura]) 
}

  
}


