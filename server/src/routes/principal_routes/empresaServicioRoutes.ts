import { Router } from "express";
import empresaServicioController from "../../controllers/principal_controllers/empresaServicioController";


class EmpresaServicioRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        //consultas para las  - 
         this.router.get('/api/empresaservicio',empresaServicioController.listarEmpresasServicios)
        //  this.router.get('/api/empresaservicio/transportepersonas',empresaServicioController.listarEmpresasServicios_trans_personas)
         this.router.get('/api/empresaservicio/detalle/:id',empresaServicioController.ObtenerDetalleEmpresaServicio)//ObtenerDetalleEmpresaServicio
         this.router.get('/api/empresaservicio/:id',empresaServicioController.ObtenerEmpresaServicio)//ObtenerDetalleEmpresaServicio

         this.router.post('/api/empresaservicio',empresaServicioController.CrearEmpresaServicio)
         this.router.put('/api/empresaservicio/:id',empresaServicioController.ModificarEmpresaServicio)  
         
         //consulta todas las resoluciones de la empresa Servicio
         this.router.get('/api/empresaservicio/resoluciones/:id',empresaServicioController.ObtnerResolucionesDeEmpresaServicio)//ObtenerDetalleEmpresaServicio

         //lista el nombre de las resoluciones correspondientes a la empresa servicio
         this.router.get('/api/empresaservicio/resoluciones/lista/:id',empresaServicioController.ListarNombreResolucionesDeEmpresaServicio)

         //consulta de la existencia de una empresa buscada por ruc y tipo de servicio
         this.router.get('/api/empresaservicio/:id_tipo_servicio/:empresa_ruc',empresaServicioController.BuscarEmpresaPorRuc_TipoServicio)
         
         //ingresar resolucion al conjunto de resoluciones
         this.router.post('/api/empresaservicio/resoluciones', empresaServicioController.CrearResolucionEmpresaServicio)
  
         //obtener la lista de los conductores que pertenecen a una empresa por servicio
         this.router.get('/api/empresaservicio/conductores/lista/:id',empresaServicioController.ObtenerListaConductores)

         //obtener empresa por placa 
         this.router.get('/api/empresaservicio/buscar/placa/:placa',empresaServicioController.ObtenerEmpresaPorPlaca)
        
         //obtener empresas por ruta
         this.router.get('/api/empresaservicio/detalle/rutas/lista',empresaServicioController.listarEmpresasPorRuta)
        
         //obtener las cantidades de las empresas que pertencen a un tipo de servico 
         this.router.get('/api/empresaservicio/detalle/cantidad/tiposervicio',empresaServicioController.CantidadDeEmpresasPorTipoServicio)

         //cantidad de empresas que se encunentran en algun estado de Activas, Alertas o de Baja
         this.router.get('/api/empresaservicio/detalle/estado/cantidad',empresaServicioController.CantidadEstadoEmpresas)
         //cantidad de empresas por ruta 
         this.router.get('/api/empresaservicio/detalle/rutas/cantidad',empresaServicioController.CantidadDeEmpresasPorRuta)
       
          //lista de empresas que pasan por un origen de ruta
          this.router.get('/api/empresaservicio/detalle/lista/ruta/origen/:origen',empresaServicioController.listarEmpresasPorRutaOrigen)
          //lista de empresas que pasan por un destino
          this.router.get('/api/empresaservicio/detalle/lista/ruta/destino/:destino',empresaServicioController.listarEmpresasPorRutaDestino)
          //lista de empresas que pasan por un origen y destino
          this.router.get('/api/empresaservicio/detalle/lista/ruta/trayecto/:origen/:destino',empresaServicioController.listarEmpresasPorRutaOrigenDestino)
 
       
       
        }
        
       
}

const empresaServicioRoutes = new EmpresaServicioRoutes
export default empresaServicioRoutes.router;