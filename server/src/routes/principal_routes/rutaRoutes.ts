import { Router } from "express";
import rutasController from "../../controllers/principal_controllers/rutaController";


class RutasRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        //consultas para las tuc - 
        //  this.router.get('/api/ruta/lista/origen',rutasController.listarRutasOrigen)
        //  this.router.get('/api/ruta/lista/destino',rutasController.listarRutasDestino)
        //  this.router.get('/api/tuc/:id',tucController.ObtenerTuc)
        //  this.router.post('/api/tuc',tucController.CrearTuc)
        //  this.router.put('/api/tuc/:id',tucController.ModificarTuc)    
    }
}

const rutasRoutes = new RutasRoutes
export default rutasRoutes.router;