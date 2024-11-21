import { Router } from "express";
import tipoServicioController from "../../controllers/principal_controllers/tipoServicioController";


class TipoServicioRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        //consultas para las tuc - 
         this.router.get('/api/tiposervicio',tipoServicioController.listarTiposServicios)
         this.router.get('/api/tiposervicio/:id',tipoServicioController.ObtenerTipoServicio)
         this.router.post('/api/tiposervicio',tipoServicioController.CrearTipoServicio)
         this.router.put('/api/tiposervicio/:id',tipoServicioController.ModificarTipoServicio)    
    }
}

const tipoServicioRoutes = new TipoServicioRoutes
export default tipoServicioRoutes.router;