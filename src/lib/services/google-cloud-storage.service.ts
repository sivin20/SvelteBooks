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

    async uploadImage(imageBuffer: ArrayBuffer, destination: string, contentType: string): Promise<File> {
        return new Promise<File>((resolve, reject) => {
            const blob: File = this.bucket.file(destination);
            const blobStream = blob.createWriteStream({
                metadata: {
                    contentType: contentType, // Change the content type if needed
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

    async getImage(imagePath: string): Promise<Blob | null> {
        return new Promise<Blob | null>(async (resolve, reject) => {
            const file: File = this.bucket.file(imagePath);

            try {
                // Get the metadata of the file to determine its content type
                const [metadata] = await file.getMetadata();

                // Determine the content type based on the metadata
                const contentType = metadata.contentType || 'application/octet-stream';

                // Read the file's content as a buffer
                const [content] = await file.download();

                // Create a Blob instance using the determined content type
                const blob = new Blob([content], { type: contentType });

                resolve(blob);
            } catch (err) {
                // If the file does not exist or there's an error, return null or handle the error accordingly.
                console.error('Error fetching image:', err);
                resolve(null);
            }
        });
    }


}

export default GoogleCloudStorageService;
