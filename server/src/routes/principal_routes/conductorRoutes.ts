import { Router } from "express";
import conductorController from '../../controllers/principal_controllers/conductorController'


class ConductorRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        //consultas para las tuc - 
         this.router.get('/api/conductor/lista/:id',conductorController.listarConductoresPorEmpresa)
         this.router.get('/api/conductor',conductorController.listarTotalConductores)
        //  this.router.get('/api/conductor/detalle/:id',conductorController.ObtenerConductor)
         this.router.post('/api/conductor',conductorController.CrearConductor)
         this.router.put('/api/conductor/:id',conductorController.ModificarConductor)    
         this.router.delete('/api/conductor/:id',conductorController.EliminarConductor)
    }
}

const conductorRoutes = new ConductorRoutes
export default conductorRoutes.router;