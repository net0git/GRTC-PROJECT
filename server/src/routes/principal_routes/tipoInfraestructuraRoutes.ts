import { Router } from "express";
import tipoInfraestructuraController from "../../controllers/principal_controllers/tipoInfraestructuraControllore";

class TipoInfraestructuraRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        //consultas para los tipos de infraestructura - 
         this.router.get('/api/tipoinfraestructura',tipoInfraestructuraController.listarTipoInfraestructura)
         this.router.get('/api/tipoinfraestructura/:id',tipoInfraestructuraController.ObtenerTipoInfraestructura)
         this.router.post('/api/tipoinfraestructura',tipoInfraestructuraController.CrearTipoInfraestructura)
         this.router.put('/api/tipoinfraestructura/:id',tipoInfraestructuraController.ModificarTipoInfraestructura)    
    }
}

const tipoInfraestructuraRoutes = new TipoInfraestructuraRoutes
export default tipoInfraestructuraRoutes.router;