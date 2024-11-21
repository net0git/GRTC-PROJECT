import { Request, Response } from 'express';
import db from '../../database/database'; // Ruta al archivo db.ts

class ModeloController{
    public async listarModelos(req:Request, res:Response):Promise<any>{
        try {
            const modelos=await db.query('select * from t_modelo order by nombre_modelo')
            res.json(modelos['rows']);
        } catch (error) {
            console.error('Error al obtener modelos:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        

    }
///////perndient e a desarrollar
    public async listarModelosPorNombreMarca(req:Request, res:Response):Promise<any>{
        try {
            const { nombre_marca  } = req.params;
            const consulta = `
                        SELECT
                            m.id_modelo,
                            m.nombre_modelo,
                            marca.nombre_marca
                        FROM
                            t_modelo m
                        JOIN
                            d_marca marca ON m.id_marca = marca.id_marca
                        WHERE 
                            marca.nombre_marca=$1
            `;

            const valores = [nombre_marca];
            
            const modelos = await db.query(consulta,valores);

            if (modelos && modelos['rows'].length > 0) {
                res.json(modelos['rows']);
            } else {
                res.status(404).json({ text: 'la lista de modelos no existe' });
            }

        } catch (error) {
            console.error('Error al obtener modelos:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    }

    public async ObtenerModelo(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const consulta= 'select * from t_modelo where id_modelo = '+id;
            const modelo = await db.query(consulta);

            if (modelo && modelo['rows'].length > 0) {
                res.json(modelo['rows']);
            } else {
                res.status(404).json({ text: 'La modelo no existe' });
            }

        } catch (error) {
            console.error('Error al obtener modelo:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async ObtenerModeloPorNombre(req: Request, res: Response): Promise<void> {
        try {
            const { nombre_modelo  } = req.body;
            const consulta= 'select * from t_modelo where nombre_modelo=$1';
            const modelo = await db.query(consulta,[nombre_modelo]);

            if (modelo && modelo['rows'].length > 0) {
                res.json(modelo['rows']);
            } else {
                res.status(404).json({ text: 'La modelo no existe' });
            }

        } catch (error) {
            console.error('Error al obtener modelo:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    public async ObtenerModeloPorIdMarca(req: Request, res: Response): Promise<void> {
        try {
            const { id_marca } = req.params;
            const consulta= 'select * from t_modelo where id_marca=$1';
            const modelo = await db.query(consulta,[id_marca]);

            if (modelo && modelo['rows'].length > 0) {
                res.json(modelo['rows']);
            } else {
                res.status(404).json({ text: 'la lista de modelos no existe' });
            }

        } catch (error) {
            console.error('Error al obtener lista de modelos:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async CrearModelo(req: Request, res: Response): Promise<void> {
        try {
            const { nombre_modelo, id_marca } = req.body;

            const consulta = `
                INSERT INTO t_modelo(
                     nombre_modelo, id_marca)
                    VALUES ($1, $2);
            `;
            
            const valores = [nombre_modelo,id_marca];
            
            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al insertar modelo:', error);
                } else {
                    console.log('modelo insertado correctamente');
                    res.json({ text: 'El modelo se creó correctamente' });
                }
            });

         } catch (error) {
            console.error('Error al crear modelo:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
         }
    }


    public async ModificarModelo(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { nombre_modelo,id_marca } = req.body;

            const consulta = `
                UPDATE t_modelo
                SET nombre_modelo= $1
                WHERE id_modelo=$2
                `;
            const valores = [nombre_modelo,id];

            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al insertar modelo:', error);
                } else {
                    console.log('modelo modificado correctamente');
                    res.json({ text: 'el modelo se modifico correctamente' });
                }
            });
        } catch (error) {
            console.error('Error al modificar modelo:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

}
const modeloController = new ModeloController();
export default modeloController;