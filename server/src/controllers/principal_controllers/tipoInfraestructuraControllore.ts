import { Request, Response } from 'express';
import db from '../../database/database'; // Ruta al archivo db.ts

class TipoInfraestructuraController{
    public async listarTipoInfraestructura(req:Request, res:Response):Promise<any>{
        try {
            const infraestructura=await db.query('select * from d_tipo_infraestructura')
            res.json(infraestructura['rows']);
        } catch (error) {
            console.error('Error al obtener tipo de infraestructuras:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    }

    public async ObtenerTipoInfraestructura(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const consulta= 'select * from d_tipo_infraestructura where id_tipo_infraestructura = $1';
            const infraestructura = await db.query(consulta,[id]);

            if (infraestructura && infraestructura['rows'].length > 0) {
                res.json(infraestructura['rows']);
            } else {
                res.status(404).json({ text: 'El tipo de infraestructura no existe' });
            }

        } catch (error) {
            console.error('Error al obtener tipo de infraestructura:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async CrearTipoInfraestructura(req: Request, res: Response): Promise<void> {
        try {
            const { denominacion } = req.body;
           
            const consulta = `
                INSERT INTO d_tipo_infraestructura(
                    denominacion)
                    VALUES ($1);
            `;
            
            const valores = [denominacion];
            
            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al insertar tipo de infraestructura:', error);
                } else {
                    console.log('tipo de infraestructura insertado correctamente');
                    res.json({ text: 'El tipo de infraestructura se creó correctamente' });
                }
            });

         } catch (error) {
            console.error('Error al crear tuc:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
         }
    }


    public async ModificarTipoInfraestructura(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { denominacion } = req.body;

            const consulta = `
                UPDATE d_tipo_infraestructura
                SET denominacion=$1
                WHERE id_tipo_infraestructura=$2
                `;
            const valores = [ denominacion, id];

            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al modificar el tipo de infraestructura:', error);
                } else {
                    console.log('tipo de infraestructura modificado correctamente');
                    res.json({ text: 'El tipo de infraestructura se modifico correctamente' });
                }
            });
        } catch (error) {
            console.error('Error al modificar el tipo de infraestructura:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

}
const tipoInfraestructuraController = new TipoInfraestructuraController();
export default tipoInfraestructuraController;