import { region, s3Client } from '@app/config/aws.config';
import { PutObjectCommand, PutObjectCommandOutput } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

interface UploadResult {
    location: string;
    data: PutObjectCommandOutput;
}

export async function uploadtoS3(image: string, bucketName: string, userId: string, fileType: string, mimeType: string): Promise<UploadResult> {
    const fileBuffer = base64toBuffer(image);
    const fileName = `${userId}_${uuidv4()}.${fileType}`;
    
    const uploadParams = new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        Body: fileBuffer,
        ContentType: mimeType,
        ACL: 'public-read',
    });

    try {
        const data: PutObjectCommandOutput = await s3Client.send(uploadParams);

        const filePath = `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;

        return {
            location: filePath,
            data,
        };
    } catch (error) {
        console.error('Error uploading file to S3:', error);
        throw error;
    }
}

export async function uploadMultiple(
  images: string[],
  bucketName: string,
  userId: string,
  fileType: string,
  mimeType: string
): Promise<UploadResult[]> {
    const uploadPromises: Promise<UploadResult>[] = images.map((image) =>
    uploadtoS3(image, bucketName, userId, fileType, mimeType)
    );

    const results = await Promise.all(uploadPromises);
    return results;
}

export async function deleteFromS3(key: string, bucketName: string) {
    const params = new PutObjectCommand( {
        Bucket: bucketName,
        Key: key,
    });

    try {
        await s3Client.send(params);
    } catch (error) {
        console.error('Error deleting file from S3:', error);
        throw error;
    }
}

const base64toBuffer = (base64: string): Buffer => {
    if (base64.startsWith('data:')) {
        const base64Data = base64.split(',')[1];
        return Buffer.from(base64Data, 'base64');
    }

    return Buffer.from(base64, 'base64');
}