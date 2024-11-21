import { Request, Response } from 'express';
import db from '../../database/database'; // Ruta al archivo db.ts

class TucController{
    public async listarTuc(req:Request, res:Response):Promise<any>{
        try {
            const tuc=await db.query('select * from t_tuc')
            res.json(tuc['rows']);
        } catch (error) {
            console.error('Error al obtener tucs:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    }

    public async ObtenerTuc(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const consulta= 'select * from t_tuc where id_tuc = $1';
            const tuc = await db.query(consulta,[id]);

            if (tuc && tuc['rows'].length > 0) {
                res.json(tuc['rows']);
            } else {
                res.status(404).json({ text: 'La tuc no existe' });
            }

        } catch (error) {
            console.error('Error al obtener tuc:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    public async listrTucPorPlaca(req: Request, res: Response): Promise<void> {
        try {
            const { placa } = req.params;
            const consulta= 'select * from t_tuc where placa = $1';
            const tuc = await db.query(consulta,[placa]);

            if (tuc && tuc['rows'].length > 0) {
                res.json(tuc['rows']);
            } else {
                res.status(404).json({ text: 'TUC´s no existes' });
            }

        } catch (error) {
            console.error('Error al obtener tuc´s:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    public async ObtenerTucPorNumero(req: Request, res: Response): Promise<void> {
        try {
            const { nro_tuc } = req.params;
            const consulta= 'select * from t_tuc where nro_tuc = $1';
            const tuc = await db.query(consulta,[nro_tuc]);

            if (tuc && tuc['rows'].length > 0) {
                res.json(tuc['rows']);
            } else {
                res.status(404).json({ text: 'La tuc no existe' });
            }

        } catch (error) {
            console.error('Error al obtener tuc:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }


    public async CrearTuc(req: Request, res: Response): Promise<void> {
        try {
            const { nro_tuc, nro_impresion, fecha_exp, condicion, placa, fecha_ven, razon_social, nro_part_reg, nombre_resolucion, marca, anio_fabricacion, color, nro_chasis, nro_asientos, peso, carga, ruta, modalidad  } = req.body;

            const consulta = `
                    INSERT INTO t_tuc( nro_tuc, nro_impresion, fecha_exp, condicion, placa, fecha_ven,razon_social, nro_part_reg, nombre_resolucion, marca, anio_fabricacion, color, nro_chasis, nro_asientos, peso, carga, ruta, modalidad)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
                    RETURNING id_tuc; -- Devolver el ID de la persona insertada
            `;
            
            const valores = [nro_tuc, nro_impresion, fecha_exp, condicion, placa, fecha_ven, razon_social, nro_part_reg, nombre_resolucion, marca, anio_fabricacion, color, nro_chasis, nro_asientos, peso, carga, ruta, modalidad ];
            
            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al insertar tuc:', error);
                    res.status(500).json({ error: 'Error interno del servidor' });
                } else {
                    const idtuc = resultado.rows[0]['id_tuc']; // ID se encuentra en la primera fila
                    console.log('datos de la tuc en BD:', idtuc);
                    res.json({id_tuc:idtuc,text: 'El TUC se creó correctamente' });
                }
            });

         } catch (error) {
            console.error('Error al crear TUC:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
         }
    }
   


    public async ModificarTuc(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { nro_tuc, nro_impresion, copia } = req.body;

            const consulta = `
                UPDATE t_tuc 
                SET nro_tuc=$1, nro_impresion=$2, copia=$3
                WHERE id_tuc=$4
                `;
            const valores = [ nro_tuc, nro_impresion, copia, id];

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

    public async ModificarTucModal(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { copia } = req.body;

            const consulta = `
                UPDATE t_tuc 
                SET  copia=$1
                WHERE id_tuc=$2
                `;
            const valores = [ copia, id];

            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al modificar tucModal:', error);
                } else {
                    console.log('tucModal modificado correctamente');
                    res.json({ text: 'La tucModal se modifico correctamente' });
                }
            });
        } catch (error) {
            console.error('Error al modificar tucModal:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    

}
const tucController = new TucController();
export default tucController;