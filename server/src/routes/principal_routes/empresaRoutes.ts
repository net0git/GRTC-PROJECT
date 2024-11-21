import { Router } from "express";
import empresaController from "../../controllers/principal_controllers/empresaController";

class TucRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        //consultas para las empresas en general incluidos las de infraestructuras - 
         this.router.get('/api/empresa',empresaController.listarEmpresas)
         this.router.get('/api/empresa/:id',empresaController.ObtenerEmpresa)
         this.router.get('/api/empresa/ruc/:ruc',empresaController.ObtenerEmpresaPorRuc)
         this.router.post('/api/empresa',empresaController.CrearEmpresa)
         this.router.put('/api/empresa/:id',empresaController.ModificarEmpresa)    
    }
}

const tucRoutes = new TucRoutes
export default tucRoutes.router;