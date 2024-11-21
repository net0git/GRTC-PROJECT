import { Router } from "express";
import historialVehicularController from "../../controllers/principal_controllers/historialVehicularController";


class HistorialVehicularRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
  config():void{
        //consultas para los historiales vehiculares - 
         this.router.get('/api/historialvehicular',historialVehicularController.listarHistorialVehicular);
         this.router.get('/api/historialvehicular/:id',historialVehicularController.ListarHistorialVehicularPorEmpresa);
         this.router.post('/api/historialvehicular',historialVehicularController.CrearHistorialVehicular);
          
    }
}

const historialVehicularRoutes = new HistorialVehicularRoutes
export default historialVehicularRoutes.router;