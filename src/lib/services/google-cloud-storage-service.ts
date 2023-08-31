import {Bucket, File, Storage} from '@google-cloud/storage';
const VITE_STORAGE_CREDENTIALS = import.meta.env.VITE_STORAGE_CREDENTIALS

const credentials = JSON.parse(VITE_STORAGE_CREDENTIALS);

class GoogleCloudStorageService {
    private storage: Storage;
    public bucketName: string;
    private bucket: Bucket;

    constructor() {
        this.storage = new Storage({
            projectId: 'siglib',
            credentials,
        });
        this.bucketName = 'siglib_bucket';
        this.bucket = this.storage.bucket(this.bucketName);
    }

    async uploadImage(imageBuffer: ArrayBuffer, destination: string): Promise<File> {
        return new Promise<File>((resolve, reject) => {
            const blob: File = this.bucket.file(destination);
            const blobStream = blob.createWriteStream({
                metadata: {
                    contentType: 'image/jpeg', // Change the content type if needed
                },
            });

            const buffer = Buffer.from(imageBuffer);

            blobStream.on('error', (err) => {
                reject(err);
            });

            blobStream.on('finish', () => {
                resolve(blob);
            });

            blobStream.end(buffer);
        });
    }
}

export default GoogleCloudStorageService;
