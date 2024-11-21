import { Router } from "express";

import marcaController from "../../controllers/principal_controllers/marcaController";


class MarcasRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        //consultas para de marcas - no se puede eliminar una marca por motivos de seguridad y relacion de tablas
        this.router.get('/api/marca',marcaController.listarMarcas)
        this.router.get('/api/marca/:id',marcaController.ObtenerMarca)
        this.router.post('/api/marca/detalle',marcaController.ObtenerMarcaPorNombre)
        this.router.post('/api/marca',marcaController.CrearMarca)
        this.router.put('/api/marca/:id',marcaController.ModificarMarca)
    
    }
}

const marcasRoutes = new MarcasRoutes
export default marcasRoutes.router;