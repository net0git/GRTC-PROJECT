import { Router } from "express";
import tucController from "../../controllers/principal_controllers/tucController";


class TucRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        //consultas para las tuc - 
         this.router.get('/api/tuc',tucController.listarTuc)
         this.router.get('/api/tuc/:id',tucController.ObtenerTuc)
         this.router.get('/api/tuc/buscar/:nro_tuc',tucController.ObtenerTucPorNumero)
         this.router.get('/api/tuc/listar/:placa',tucController.listrTucPorPlaca)
         this.router.post('/api/tuc',tucController.CrearTuc)
         this.router.put('/api/tuc/:id',tucController.ModificarTuc)   
         this.router.put('/api/tuc/modificar/modal/:id',tucController.ModificarTucModal) 

        
    }
}

const tucRoutes = new TucRoutes
export default tucRoutes.router;