import { Router } from "express";
import modeloController from '../../controllers/principal_controllers/modeloController'


class ModeloRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        //consultas para personas - no se puede eliminar un modelo por motivos de seguridad y relacion de tablas 
         this.router.get('/api/modelo',modeloController.listarModelos)
         this.router.get('/api/modelo/:id',modeloController.ObtenerModelo)
         this.router.get('/api/modelo/grupo/:nombre_marca',modeloController.listarModelosPorNombreMarca)
         this.router.post('/api/modelo/detalle',modeloController.ObtenerModeloPorNombre)
         this.router.get('/api/modelo/lista/:id_marca',modeloController.ObtenerModeloPorIdMarca)
         this.router.post('/api/modelo',modeloController.CrearModelo)
         this.router.put('/api/modelo/:id',modeloController.ModificarModelo)             
    }

}

const modeloRoutes = new ModeloRoutes
export default modeloRoutes.router;