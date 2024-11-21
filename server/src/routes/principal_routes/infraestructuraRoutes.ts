import { Router } from "express";
import infraestructuraController from "../../controllers/principal_controllers/infraestructuraController";


class EmpresaInfraestructuraRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        //consultas para las las empresas por infraestuctura - 
         this.router.get('/api/infraestructura',infraestructuraController.listarAllInfraestructura)
         this.router.get('/api/infraestructura/:id',infraestructuraController.ObtenerInfraestructuraDetalle)
         this.router.post('/api/infraestructura',infraestructuraController.CrearInfraestructura)
         this.router.put('/api/infraestructura/:id',infraestructuraController.ModificarEmpresaInfraestuctura)  
         
         //consulta de sus resoluciones, el id que se pasa como parametro es de la infraestructura
         this.router.get('/api/infraestructura/resoluciones/:id',infraestructuraController.ObtnerResolucionesDeInfraestructura)
         //consulta de sus certificados
         this.router.get('/api/infraestructura/certificados/:id',infraestructuraController.ObtnerCertificadosDeInfraestructura)
        //registrar resolucion al conjunto de resoluciones
        this.router.post('/api/infraestructura/resoluciones',infraestructuraController.CrearResolucionInfraestructura)
        //resgistrar certificado al conjunto de resoluciones
        this.router.post('/api/infraestructura/certificados',infraestructuraController.CrearCertificadoInfraestructura)
        //obtener las cantidades de las infraestructuras
        this.router.get('/api/infraestructura/detalle/cantidad',infraestructuraController.CantidadDeInfraestructura)
        }
}

const empresaInfraestructuraRoutes = new EmpresaInfraestructuraRoutes
export default empresaInfraestructuraRoutes.router;