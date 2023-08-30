import {Bucket, Storage} from '@google-cloud/storage';
const VITE_STORAGE_CREDENTIALS = import.meta.env.VITE_STORAGE_CREDENTIALS

const credentials = JSON.parse(VITE_STORAGE_CREDENTIALS);

class GoogleCloudStorageService {
    private storage: Storage;
    private bucketName: string;
    private bucket: Bucket;

    constructor() {
        this.storage = new Storage({
            projectId: 'siglib',
            credentials,
        });
        this.bucketName = 'siglib_bucket';
        this.bucket = this.storage.bucket(this.bucketName);
    }

    async uploadImage(imageFile: string, destination: string): Promise<File> {
        return new Promise<File>((resolve, reject) => {
            this.bucket.upload(imageFile, { destination }, (err, file) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(file);
                }
            });
        });
    }
}

export default GoogleCloudStorageService;
