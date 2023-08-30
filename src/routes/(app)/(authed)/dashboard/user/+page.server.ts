import fs from 'fs/promises'
import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'
import GoogleCloudStorageService from "$lib/services/google-cloud-storage-service";
import sharp from "sharp";

export const actions: Actions = {
    avatar: async ({ request, route, url,  locals: { getSession } }) => {
        const session = await getSession();
        if (!session) {
            throw redirect(303, '/login');
        }
        const data = await request.formData();
        const imageFile = data.get('avatar')
        if(imageFile instanceof File) {
            console.log("imagefile", imageFile);
        }
        const imageBuffer = await imageFile.arrayBuffer();
        const temporaryFilePath = `${ process.cwd()}/static/${session.user.id}`;
        const resizedImageBuffer = await sharp(Buffer.from(imageBuffer))
            .resize(100, 100)
            .jpeg({ quality: 80 }) // Adjust compression quality as needed
            .toBuffer();

        await fs.writeFile(temporaryFilePath, Buffer.from(resizedImageBuffer));

        const storageService = new GoogleCloudStorageService();

        // Sending the upload request using the service
        try {
            const file = await storageService.uploadImage(temporaryFilePath, session.user.id)
                .finally(() => {
                    fs.unlink(temporaryFilePath);
                });
            console.log(`Image uploaded to ${storageService.bucketName}.`);

        } catch (err) {
            console.error(`Error uploading image image_to_upload.jpeg: ${err}`);
        }

    },
}
