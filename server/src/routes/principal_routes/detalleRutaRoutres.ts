import { Router } from "express";
import detalleRutasController from "../../controllers/principal_controllers/detalleRutasController";


class DetalleRutasRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        //consultas para las tuc - 
        //  this.router.get('/api/detalleruta',detalleRutasController.listarDetalleRutas)
        //  this.router.get('/api/detalleruta/:id',detalleRutasController.ObtenerDetalleRuta)
        //  this.router.get('/api/detalle/lista/rutas/origen',detalleRutasController.listarRutasOrigen)
        //  this.router.get('/api/detalle/lista/rutas/destino',detalleRutasController.listarRutasDestino)
        //  this.router.post('/api/detalleruta',detalleRutasController.CrearDetalleRuta)
        //  this.router.put('/api/detalleruta/:id',detalleRutasController.ModificarDetalleRutas)    
    }
}

const detalleRutasRoutes = new DetalleRutasRoutes
export default detalleRutasRoutes.router;