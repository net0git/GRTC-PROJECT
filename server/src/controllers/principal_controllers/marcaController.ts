import { Request, Response } from 'express';
import db from '../../database/database'; // Ruta al archivo db.ts

class MarcaController{
    public async listarMarcas(req:Request, res:Response):Promise<any>{
        try {
            const marca=await db.query('select * from d_marca order by nombre_marca')
            res.json(marca['rows']);
        } catch (error) {
            console.error('Error al obtener marca:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    }

    public async ObtenerMarca(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const consulta= 'select * from d_marca where id_marca =$1 ';
            const marca = await db.query(consulta,[id]);

            if (marca && marca['rows'].length > 0) {
                res.json(marca['rows']);
            } else {
                res.status(404).json({ text: 'La marca no existe' });
            }

        } catch (error) {
            console.error('Error al obtener marca:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async ObtenerMarcaPorNombre(req: Request, res: Response): Promise<void> {
        try {
            const { nombre_marca } = req.body;
            const consulta= 'select * from d_marca where nombre_marca =$1';
            const marca = await db.query(consulta,[nombre_marca]);

            if (marca && marca['rows'].length > 0) {
                res.json(marca['rows']);
            } else {
                res.status(404).json({ text: 'La marca no existe' });
            }

        } catch (error) {
            console.error('Error al obtener marca:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async CrearMarca(req: Request, res: Response): Promise<void> {
        try {
            const { nombre_marca } = req.body;

            const consulta = `
                INSERT INTO d_marca( nombre_marca ) VALUES ($1);      
            `;
            
            const valores = [nombre_marca];
            
            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al insertar marca:', error);
                } else {
                    console.log('marca insertado correctamente');
                    res.json({ text: 'La marca se creó correctamente' });
                }
            });

         } catch (error) {
            console.error('Error al crear marca:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
         }
    }


    public async ModificarMarca(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { nombre_marca } = req.body;

            const consulta = `
                UPDATE d_marca 
                SET nombre_marca= $1
                WHERE id_marca=$2
                `;
            const valores = [nombre_marca,id];

            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al modificar marca:', error);
                } else {
                    console.log('marca modificada correctamente');
                    res.json({ text: 'La marca se modifico correctamente' });
                }
            });
        } catch (error) {
            console.error('Error al modificar marca:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

}
const marcaController = new MarcaController();
export default marcaController;