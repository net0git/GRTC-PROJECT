import { Router } from "express";
import vehiculoController from "../../controllers/principal_controllers/vehiculoController";

class TucRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        //consultas para los vehiculos- 
         this.router.get('/api/vehiculo',vehiculoController.listarVehiculos)
         this.router.get('/api/vehiculo/empresaservicio/:id',vehiculoController.listarVehiculosDetallePorEmpresa)
         this.router.get('/api/vehiculo/empresaservicio',vehiculoController.listarTotalVehiculosPorEmpresa)
         this.router.get('/api/vehiculo/:id',vehiculoController.ObtenerVehiculo)
         this.router.get('/api/vehiculo/placa/:placa',vehiculoController.ObtenerVehiculoPorPlaca)
         this.router.get('/api/vehiculo/historial/:placa',vehiculoController.ObtenerHistorialVehicularPorPlaca)
         this.router.post('/api/vehiculo',vehiculoController.CrearVehiculo)
         this.router.put('/api/vehiculo/:id',vehiculoController.ModificarVehiculo)    
         //modificar tuc del vehiculo
         this.router.put('/api/vehiculo/modificar/tuc/:id',vehiculoController.ModificarTucVehiculo) 
         //dar de baja el vehiculo
         this.router.put('/api/vehiculo/baja/:id',vehiculoController.BajaVehiculo)
         //listar vehiculos por ruta
         this.router.get('/api/vehiculo/reporte/ruta/lista',vehiculoController.listarVehiculosPorRuta)
         //cantidad de vehiculos por ruta
         this.router.get('/api/vehiculo/detalle/cantidad/ruta', vehiculoController.CantidadVehiculosPorRuta)
         //cantidades de vehiculos Por tipo de servicio 
         this.router.get('/api/vehiculo/detalle/cantidad/tiposervicio', vehiculoController.CantidadVehiculosPorTipoServicio)
         //lista de vehiculos que pasan por un oriten 
         this.router.get('/api/vehiculo/detalle/lista/ruta/origen/:origen',vehiculoController.listarVehiculosPorOrigenRuta)
         //lista de vehiculos que pasan por un destino
         this.router.get('/api/vehiculo/detalle/lista/ruta/destino/:destino',vehiculoController.listarVehiculosPorDestinoRuta)
         //lista de vehiculos que pasan por un origen y destino
         this.router.get('/api/vehiculo/detalle/lista/ruta/trayecto/:origen/:destino',vehiculoController.listarVehiculosPorOrigenDestinoRuta)

    }
}

const tucRoutes = new TucRoutes
export default tucRoutes.router;