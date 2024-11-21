import { Router } from "express";
import certificadoController from "../../controllers/principal_controllers/certificadoController";

class CertificadoRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        //consultas para las certificados - 
         this.router.get('/api/certificado',certificadoController.listarCertificados)
         this.router.get('/api/certificado/:id',certificadoController.ObtenerCertificado)
         this.router.post('/api/certificado',certificadoController.CrearCertificado)
         this.router.put('/api/certificado/:id',certificadoController.ModificarCertificado)    
    }
}

const certificadoRoutes = new CertificadoRoutes
export default certificadoRoutes.router;