import { Request, Response } from 'express';
import db from '../../database/database'; // Ruta al archivo db.ts

class ConductorController{
    public async listarConductoresPorEmpresa(req:Request, res:Response):Promise<any>{
        try {
            const {id} =req.params;
            
            const conductores = await db.query('select * from t_conductor where id_empresa_servicio=$1',[id]);

            if (conductores && conductores['rows'].length > 0) {
                res.json(conductores['rows']);
            } else {
                res.status(404).json({ text: 'los conductores no existen' });
            }
        } catch (error) {
            console.error('Error al obtener conductores:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        } 
    }

    //listar conductores con todo sus detalles para reportes 
    public async listarTotalConductores(req:Request, res:Response):Promise<any>{
        try {
           
            const consulta = `
                        SELECT 
                            tc.id_conductor,
                            tc.nro_licencia,
                            tc.categoria,
                            tp.nombres AS nombre_conductor,
                            tp.ap_paterno AS apellido_paterno,
                            tp.ap_materno AS apellido_materno,
                            tp.tipo_doc AS tipo_documento,
                            tp.documento AS numero_documento,
                            tp.telefono AS telefono,
                            tp.correo AS correo,
                            e.razon_social AS nombre_empresa
                        FROM 
                            t_conductor AS tc
                        JOIN 
                            t_persona AS tp ON tc.id_persona = tp.id_persona
                        JOIN 
                            t_empresa_servicio AS te ON tc.id_empresa_servicio = te.id_empresa_servicio
                        JOIN 
                            t_empresa AS  e ON te.id_empresa=e.id_empresa
                      `;
            const conductores = await db.query(consulta);

            if (conductores && conductores['rows'].length > 0) {
                res.json(conductores['rows']);
            } else {
                res.status(404).json({ text: 'los conductores no existen' });
            }
        } catch (error) {
            console.error('Error al obtener conductores:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
   
    }


    public async CrearConductor(req: Request, res: Response): Promise<void> {
        try {
            const { id_persona,nro_licencia,id_empresa_servicio,categoria } = req.body;
            
            const consulta = `
                INSERT INTO t_conductor(
                    id_persona,nro_licencia, id_empresa_servicio,categoria)
                    VALUES ($1, $2, $3, $4);
            `;
            
            const valores = [id_persona,nro_licencia,id_empresa_servicio,categoria ];
            
            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al insertar conductor:', error);
                } else {
                    console.log('conductor insertado correctamente');
                    res.json({ text: 'El conductor se creó correctamente' });
                }
            });

         } catch (error) {
            console.error('Error al crear conductor:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
         }
    }


    public async ModificarConductor(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { nro_licencia, categoria } = req.body;

            const consulta = `
                UPDATE t_conductor 
                        SET nro_licencia= $1, categoria=$2 
                    WHERE id_conductor=$3
                `;
            const valores = [nro_licencia,categoria, id];

            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al modificar conductor:', error);
                } else {
                    console.log('conductor modificado correctamente');
                    res.json({ text: 'el conductor se modifico correctamente' });
                }
            });
        } catch (error) {
            console.error('Error al modificar conductor:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async EliminarConductor(req:Request, res:Response):Promise<any>{
        try {
            const {id} =req.params;
            
            const consulta='DELETE FROM t_conductor WHERE id_conductor =$1';

            db.query(consulta, [id], (error, resultado) => {
                if (error) {
                    console.error('Error al eliminar conductor:', error);
                } else {
                    console.log('conductor eliminado correctamente');
                    res.json({ text: 'el conductor se elimino correctamente' });
                }
            });
        } catch (error) {
            console.error('Error al eliminar conductores:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    }

}
const conductorController = new ConductorController();
export default conductorController;