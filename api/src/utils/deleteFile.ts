import { s3, bucketName } from '../../s3config';
import { DeleteObjectOutput } from 'aws-sdk/clients/s3';

/**
 * Elimina un archivo de Amazon S3.
 *
 * @param fileName - El nombre del archivo en el bucket a eliminar.
 * @returns La respuesta de la operación de eliminación.
 */
const deleteFile = async (fileName: string): Promise<DeleteObjectOutput> => {
    const params = {
        Bucket: bucketName ?? '',
        Key: fileName,
    };

    try {
        const data = await s3.deleteObject(params).promise();
        console.log('Archivo eliminado con éxito', data);
        return data;
    } catch (error) {
        console.error('Error al eliminar archivo', error);
        throw new Error('Error al eliminar archivo de S3');
    }
};

export default deleteFile;
