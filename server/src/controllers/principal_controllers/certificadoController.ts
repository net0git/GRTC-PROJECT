import { Request, Response } from 'express';
import db from '../../database/database'; // Ruta al archivo db.ts

class CertificadoController{
    public async listarCertificados(req:Request, res:Response):Promise<any>{
        try {
            const certificados=await db.query('select * from d_certificado')
            res.json(certificados['rows']);
        } catch (error) {
            console.error('Error al obtener certificados:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    }

    public async ObtenerCertificado(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const consulta= 'select * from d_certificado where id_certificado = $1';
            const certificado = await db.query(consulta,[id]);

            if (certificado && certificado['rows'].length > 0) {
                res.json(certificado['rows']);
            } else {
                res.status(404).json({ text: 'El certificado no existe' });
            }

        } catch (error) {
            console.error('Error al obtener certificado:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async CrearCertificado(req: Request, res: Response): Promise<void> {
        try {
            const { nro_certificado, anio_certificado, fecha_certificado, nombre_certificado, tomo_certificado, documento } = req.body;
            
            const consulta = `
                INSERT INTO d_certificado(
                        nro_certificado, anio_certificado, fecha_certificado, nombre_certificado, tomo_certificado, documento)
                        VALUES ($1, $2, $3, $4, $5, $6)
                    RETURNING id_certificado; -- Devuelve el ID del certificado insertado
            `;
            
            const valores = [nro_certificado, anio_certificado, fecha_certificado, nombre_certificado, tomo_certificado, documento];
            
            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al insertar certificado:', error);
                    res.status(500).json({ error: 'Error interno del servidor' });
                } else {
                    const idCertificado = resultado.rows[0]['id_certificado']; // ID se encuentra en la primera fila
                    console.log('datos de certificado en BD:', idCertificado);
                    res.json({id_certificado:idCertificado,text: 'La certificado se creó correctamente' });
                }
            });

         } catch (error) {
            console.error('Error al crear certificado:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
         }
    }


    public async ModificarCertificado(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { nro_certificado, anio_certificado, fecha_certificado, nombre_certificado, tomo_certificado, documento } = req.body;

            const consulta = `
                UPDATE d_certificado 
                SET nro_certificado= $1, anio_certificado= $2, fecha_certificado= $3, nombre_certificado= $4, tomo_certificado= $5, documento=$6
                WHERE id_certificado=$7
                `;
            const valores = [ nro_certificado, anio_certificado, fecha_certificado, nombre_certificado, tomo_certificado, documento, id];

            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al modificar certificado:', error);
                } else {
                    console.log('certificado modificado correctamente');
                    res.json({ text: 'El certificado se modifico correctamente' });
                }
            });
        } catch (error) {
            console.error('Error al modificar certificado:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

}
const certificadoController = new CertificadoController();
export default certificadoController;