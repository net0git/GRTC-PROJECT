import express, { Application} from 'express';
import cors from 'cors';
import morgan from 'morgan'





//importamos las rutas
import personaRoutes from './routes/principal_routes/personaRoutes';
import marcaRoutes from './routes/principal_routes/marcaRoutes';
import modeloRoutes from './routes/principal_routes/modeloRoutes';

import tucRoutes from './routes/principal_routes/tucRoutes';
import itinerarioRoutes from './routes/principal_routes/itinerarioRoutes';
import detalleRutasRoutes from './routes/principal_routes/detalleRutaRoutres';
import usuariosRoutes from './routes/principal_routes/usuariosRoutes';
import conductorRoutes from './routes/principal_routes/conductorRoutes';
import tipoServicioRoutes from './routes/principal_routes/tipoServicioRoutes';
import tipoInfraestructuraRoutes from './routes/principal_routes/tipoInfraestructuraRoutes';
import certificadoRoutes from './routes/principal_routes/certificadoRoutes';
import resolucionRoutes from './routes/principal_routes/resolucionRoutes';
import empresaServicioRoutes from './routes/principal_routes/empresaServicioRoutes';
import empresainfraestructuraRoutes from './routes/principal_routes/infraestructuraRoutes';
import empresaRoutes from './routes/principal_routes/empresaRoutes';
import historialVehicularRoutes from './routes/principal_routes/historialVehicularRoutes';
import vehiculoRoutes from './routes/principal_routes/vehiculoRoutes';
import arrendamientoRutes from './routes/principal_routes/arrendamientoRutes';



class Server{
    public app: Application;

    constructor(){
        this.app=express();
        this.config();
        this.ruotes();
        
    }
    config():void{
        this.app.set('port',process.env.PORT||3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json({ limit: '100mb' }));
        this.app.use(express.urlencoded({ limit: '100mb', extended: true }));
        // Configura el límite de carga en 50MB (ajusta según tus necesidades)
        // this.app.use(bodyParser.json({ limit: '100mb' }));
        // this.app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
    }
    ruotes():void{
        this.app.use('/',personaRoutes);
        this.app.use('/',marcaRoutes);
        this.app.use('/',modeloRoutes);
        this.app.use('/',arrendamientoRutes);
        this.app.use('/',tucRoutes);
        this.app.use('/',itinerarioRoutes);
        this.app.use('/',detalleRutasRoutes);
        this.app.use('/',usuariosRoutes);
        this.app.use('/',conductorRoutes);
        this.app.use('/',tipoServicioRoutes);
        this.app.use('/',tipoInfraestructuraRoutes);
        this.app.use('/',certificadoRoutes);
        this.app.use('/',resolucionRoutes);
        this.app.use('/',empresaServicioRoutes);
        this.app.use('/',empresainfraestructuraRoutes);
        this.app.use('/',empresaRoutes);
        this.app.use('/',historialVehicularRoutes);
        this.app.use('/',vehiculoRoutes);

    }
    star():void{
        this.app.listen(this.app.get('port'),()=>{
            console.log('server listening in port ', this.app.get('port'))
        })
    }
}

const server=new Server();
server.star();