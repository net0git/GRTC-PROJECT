import { Router } from "express";
import arrendamientoController from "../../controllers/principal_controllers/arrendamientoController";

class ArrendamientoRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        //consultas para las tuc - 
         this.router.get('/api/arrendamiento',arrendamientoController.ListaArrendamientos)
         this.router.get('/api/arrendamiento/:id',arrendamientoController.ObtenerContratoArrendamientoPorEmpresa)
         this.router.post('/api/arrendamiento',arrendamientoController.CrearContratoArrendamiento)
         this.router.put('/api/arrendamiento/:id',arrendamientoController.ModificarContratoArrendamiento) 
         this.router.delete('/api/arrendamiento/:id',arrendamientoController.EliminarContratoArrendamiento)   
    }
}

const arrendamientoRoutes = new ArrendamientoRoutes
export default arrendamientoRoutes.router;