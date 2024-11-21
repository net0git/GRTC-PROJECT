import { Request, Response } from 'express';
import db from '../../database/database'; // Ruta al archivo db.ts

class TipoServicioController{
    public async listarTiposServicios(req:Request, res:Response):Promise<any>{
        try {
            const servicios=await db.query('select * from d_tipo_servicio')
            res.json(servicios['rows']);
        } catch (error) {
            console.error('Error al obtener tipos de servicios:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    }

    public async ObtenerTipoServicio(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const consulta= 'select * from d_tipo_servicio where id_tipo_servicio = $1';
            const servicio = await db.query(consulta,[id]);

            if (servicio && servicio['rows'].length > 0) {
                res.json(servicio['rows']);
            } else {
                res.status(404).json({ text: 'El tipo de servicio no existe' });
            }

        } catch (error) {
            console.error('Error al obtener el tipo de servicio:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async CrearTipoServicio(req: Request, res: Response): Promise<void> {
        try {
            const { denominacion} = req.body;
            const consulta = `
                INSERT INTO d_tipo_servicio(
                    denominacion)
                    VALUES ($1);
            `;
            
            const valores = [denominacion];
            
            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al insertar tipo de servicio:', error);
                } else {
                    console.log('tipo de servicio insertado correctamente');
                    res.json({ text: 'El tipo de servicio se creó correctamente' });
                }
            });

         } catch (error) {
            console.error('Error al crear tipo de servicio:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
         }
    }


    public async ModificarTipoServicio(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { denominacion } = req.body;

            const consulta = `
                UPDATE d_tipo_servicio 
                SET denominacion=$1 
                WHERE id_tipo_servicio=$2
                `;
            const valores = [ denominacion, id];

            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al modificar tipo de servicio:', error);
                } else {
                    console.log('el tipo de servicio se modificado correctamente');
                    res.json({ text: 'El tipo de servicio se modifico correctamente' });
                }
            });
        } catch (error) {
            console.error('Error al modificar el tipo de servicio:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

}
const tipoServicioController = new TipoServicioController();
export default tipoServicioController;