import { s3, bucketName } from '../../s3config';
import { PutObjectRequest, ManagedUpload } from 'aws-sdk/clients/s3';

/**
 * Sube un archivo a Amazon S3.
 *
 * @param fileContent - El contenido del archivo a subir.
 * @param fileName - El nombre del archivo en el bucket.
 * @returns La respuesta de la operación de subida.
 */
const uploadFile = async (fileContent: Buffer, fileName: string): Promise<ManagedUpload.SendData> => {
    const params: PutObjectRequest = {
        Bucket: bucketName ?? '',
        Key: fileName,
        Body: fileContent,
    };

    try {
        const data = await s3.upload(params).promise();
        console.log('Archivo subido con éxito', data);
        return data;
    } catch (error) {
        console.error('Error al subir archivo', error);
        throw new Error('Error al subir archivo a S3');
    }
};

export default uploadFile;
