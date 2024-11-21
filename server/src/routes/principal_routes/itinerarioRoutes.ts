import { Router } from "express";
// import personaController from '../../controllers/principal_controllers/personaController'
import itinerarioController from "../../controllers/principal_controllers/itinerarioController";

class ItinerariRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        //consultas para itinerario _ no se permite eliminar itinerario por motivos de seguridad y relacion de tablas 
        this.router.get('/api/itinerario',itinerarioController.listarItineario)
        //lista de rutas origen para un vehiculo
        this.router.get('/api/itinerario/lista/ruta/origen',itinerarioController.listarRutasOrigenVehiculo)
        //lista de rutas destino para un vehiculo 
        this.router.get('/api/itinerario/lista/ruta/destino',itinerarioController.listarRutasDestinoVehiculo)

        //lista de ruta origen para una empresa
        this.router.get('/api/itinerario/lista/empresas/ruta/origen',itinerarioController.listarRutasOrigenEmpresa)
        //lista de rutas de destino para una empresa
        this.router.get('/api/itinerario/lista/empresas/ruta/destino',itinerarioController.listarRutasDestinoEmpresa)

        this.router.get('/api/itinerario/lista/empresa/:id',itinerarioController.listarItinearioPorEmpresa)
        this.router.get('/api/itinerario/:id',itinerarioController.ObtenerItinerario)
        this.router.post('/api/itinerario',itinerarioController.CrearItinerario)
        this.router.put('/api/itinerario/:id',itinerarioController.ModificarItinerario) 

        //eliminar itinerario 
        this.router.delete('/api/itinerario/:id',itinerarioController.EliminarItinerario)
        
    }
}

const itinerariRoutes = new ItinerariRoutes
export default itinerariRoutes.router;