import { Request, Response } from 'express';
import db from '../../database/database'; // Ruta al archivo db.ts

class PersonaController{
    public async listarPersonas(req:Request, res:Response):Promise<any>{
        try {
            const personas=await db.query('select * from t_persona')
            res.json(personas['rows']);
        } catch (error) {
            console.error('Error al obtener personas:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    }

    public async ObtenerPersona(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const consulta= 'select * from t_persona where id_persona = $1';
            const persona = await db.query(consulta,[id]);

            if (persona && persona['rows'].length > 0) {
                res.json(persona['rows']);
            } else {
                res.status(404).json({ text: 'La persona no existe' });
            }

        } catch (error) {
            console.error('Error al obtener persona:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async CrearPersona(req: Request, res: Response): Promise<void> {
        try {
            const { nombres, ap_paterno, ap_materno, tipo_doc, documento, telefono, correo } = req.body;

            const consulta = `
                INSERT INTO t_persona(nombres, ap_paterno, ap_materno, tipo_doc, documento, telefono, correo)
                    VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING id_persona; -- Devolver el ID de la persona insertada
            `;
            
            const valores = [nombres,ap_paterno,ap_materno, tipo_doc,documento,telefono,correo];
            
            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al insertar persona:', error);
                    res.status(500).json({ error: 'Error interno del servidor' });
                } else {
                    const idPersona = resultado.rows[0]['id_persona']; // ID se encuentra en la primera fila
                    console.log('datos de usuario en BD:', idPersona);
                    res.json({id_persona:idPersona,text: 'La persona se creó correctamente' });
                }
            });

         } catch (error) {
            console.error('Error al crear persona:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
         }
    }


    public async ModificarPersona(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { nombres, ap_paterno, ap_materno, tipo_doc, documento, telefono, correo } = req.body;

            const consulta = `
                UPDATE t_persona 
                SET nombres= $1, ap_paterno= $2, ap_materno= $3, tipo_doc= $4, documento= $5, telefono= $6, correo= $7 
                WHERE id_persona=$8
                `;
            const valores = [nombres,ap_paterno,ap_materno,tipo_doc,documento,telefono,correo,id];

            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al modificar persona:', error);
                } else {
                    console.log('persona modificada correctamente');
                    res.json({ text: 'La persona se modifico correctamente' });
                }
            });
        } catch (error) {
            console.error('Error al modificar persona:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async EliminarPersona(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const consulta = `
                        DELETE FROM t_persona where id_persona=$1;
                `;
            const valores = [id];

            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al eliminar persona:', error);
                } else {
                    console.log('persona elimada correctamente');
                    res.json({ text: 'La persona se elimino correctamente' });
                }
            });
        } catch (error) {
            console.error('Error al eliminar persona:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

}
const personaController = new PersonaController();
export default personaController;