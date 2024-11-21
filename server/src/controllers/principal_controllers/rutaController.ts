import { Request, Response } from 'express';
import db from '../../database/database'; // Ruta al archivo db.ts

class RutasController{
    public async listarRutas(req:Request, res:Response):Promise<any>{
        try {
            const rutas=await db.query('select * from t_detalle_ruta_itinerario')
            res.json(rutas['rows']);
        } catch (error) {
            console.error('Error al obtener rutas:', error);
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

    public async ObtenerRuta(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const consulta= 'select * from d_rutas where id_ruta = $1';
            const ruta = await db.query(consulta,[id]);

            if (ruta && ruta['rows'].length > 0) {
                res.json(ruta['rows']);
            } else {
                res.status(404).json({ text: 'La ruta no existe' });
            }

        } catch (error) {
            console.error('Error al obtener ruta:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async CrearRuta(req: Request, res: Response): Promise<void> {
        try {
            const { origen, destino, corredor } = req.body;
            
            const consulta = `
                INSERT INTO d_ruta(
                    origen, destino, corredor)
                    VALUES ($1, $2, $3);
            `;
            
            const valores = [origen, destino, corredor];
            
            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al insertar ruta:', error);
                } else {
                    console.log('ruta insertado correctamente');
                    res.json({ text: 'La ruta se creó correctamente'});
                }
            });

         } catch (error) {
            console.error('Error al crear tuc:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
         }
    }


    public async ModificarTuc(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { nro_tuc,nro_impresion,fecha_exp, condicion,estado,fecha_ven } = req.body;

            const consulta = `
                UPDATE t_tuc 
                SET nro_tuc= $1, nro_impresion= $2, fecha_exp= $3, condicion= $4, estado= $5, fecha_ven= $6 
                WHERE id_tuc=$7
                `;
            const valores = [ nro_tuc,nro_impresion,fecha_exp, condicion,estado,fecha_ven, id];

            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al modificar tuc:', error);
                } else {
                    console.log('tuc modificado correctamente');
                    res.json({ text: 'La tuc se modifico correctamente' });
                }
            });
        } catch (error) {
            console.error('Error al modificar tuc:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

}
const rutasController = new RutasController();
export default rutasController;