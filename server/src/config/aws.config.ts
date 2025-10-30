import { S3Client } from "@aws-sdk/client-s3";
import { get_env } from "./env.config";

const accessKey = get_env('AWS_ACCESS_KEY_ID');
const secreteKey = get_env('AWS_SECRET_ACCESS_KEY');
export const region = get_env('AWS_REGION');

export const s3Client = new S3Client({
    region: region,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secreteKey,
    },
})

