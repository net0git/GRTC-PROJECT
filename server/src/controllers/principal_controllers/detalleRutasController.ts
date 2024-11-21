import { Request, Response } from 'express';
import db from '../../database/database'; // Ruta al archivo db.ts

class DetalleRutasController{
    public async listarDetalleRutas(req:Request, res:Response):Promise<any>{
        try {
            const detallerRutas=await db.query('select * from t_detalle_ruta')
            res.json(detallerRutas['rows']);
        } catch (error) {
            console.error('Error al obtener detallerRutas:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    }

    public async ObtenerDetalleRuta(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const consulta= 'select * from t_detalle_ruta where id_detalle_ruta = $1';
            const detalleruta = await db.query(consulta,[id]);

            if (detalleruta && detalleruta['rows'].length > 0) {
                res.json(detalleruta['rows']);
            } else {
                res.status(404).json({ text: 'el detalle de la ruta no existe' });
            }

        } catch (error) {
            console.error('Error al obtener detalle de ruta:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async listarRutasOrigen(req:Request, res:Response):Promise<any>{
        try {
            const consulta = `
                        SELECT DISTINCT
                            tdr.origen AS origen_ruta
                        FROM 
                            t_detalle_ruta_itinerario AS tdr
                        WHERE 
                            (tdr.origen IS NOT NULL AND tdr.origen <> '')
            `;
            const rutas=await db.query(consulta)
            res.json(rutas['rows']);
        } catch (error) {
            console.error('Error al obtener rutas origen:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    }
    
    public async listarRutasDestino(req:Request, res:Response):Promise<any>{
        try {
            const consulta = `
                            SELECT DISTINCT
                                tdr.destino AS destino_ruta
                            FROM 
                                t_detalle_ruta_itinerario AS tdr
                            WHERE 
                                (tdr.destino IS NOT NULL AND tdr.destino <> '');
            `;
            const rutas=await db.query(consulta)
            res.json(rutas['rows']);
        } catch (error) {
            console.error('Error al obtener rutas destino:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    }

    public async CrearDetalleRuta(req: Request, res: Response): Promise<void> {
        try {
            const { id_itinerario, id_ruta} = req.body;
            
            const consulta = `
                INSERT INTO t_detalle_ruta(
                    id_itinerario, id_ruta)
                    VALUES ($1, $2);
            `;
            
            const valores = [id_itinerario, id_ruta];
            
            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al insertar detalle de ruta:', error);
                } else {
                    console.log('el detalle de la ruta se inserto correctamente');
                    res.json({ text: 'el detalle de ruta se creó correctamente' });
                }
            });

         } catch (error) {
            console.error('Error al crear detalle de ruta:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
         }
    }


    public async ModificarDetalleRutas(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { id_itinerario, id_ruta } = req.body;

            const consulta = `
                UPDATE t_detalle_ruta 
                SET id_itinerario=$1, id_ruta=$2 
                WHERE id_detalle_ruta=$3
                `;
            const valores = [ id_itinerario, id_ruta, id];

            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al modificar tuc:', error);
                } else {
                    console.log('tuc modificado correctamente');
                    res.json({ text: 'el detalle de ruta se modifico correctamente' });
                }
            });
        } catch (error) {
            console.error('Error al modificar el detalle de ruta:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

}
const detalleRutasController = new DetalleRutasController();
export default detalleRutasController;