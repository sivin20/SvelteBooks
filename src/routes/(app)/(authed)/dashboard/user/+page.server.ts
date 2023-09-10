import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'
import GoogleCloudStorageService from "$lib/services/google-cloud-storage.service";
import sharp from "sharp";


export const actions: Actions = {
    avatar: async ({ request,  locals: { getSession } }) => {
        const session = await getSession();
        if (!session) {
            throw redirect(303, '/login');
        }
        const data: FormData = await request.formData();
        const imageFile: Blob = data.get('avatar') as Blob
        const imageBuffer: ArrayBuffer = await imageFile.arrayBuffer();
        const resizedImageBuffer: Buffer = await sharp(Buffer.from(imageBuffer))
            .resize(100, 100)
            .toBuffer();


        const storageService: GoogleCloudStorageService = new GoogleCloudStorageService();

        // Sending the upload request using the service
        try {
           await storageService.uploadImage(resizedImageBuffer, session.user.id, imageFile.type)
            console.log(`Image uploaded to ${storageService.bucketName}.`);
        } catch (err) {
            console.error(`Error uploading image: ${err}`);
        }

    },

    user: async ({request, url, locals: {getSession} }) => {
        const session = await getSession();
        if (!session) {
            throw redirect(303, '/login');
        }
        const data: FormData = await request.formData();
    },

    deleteUser: async ({request, url, locals: {getSession} }) => {
        const session = await getSession();
        if (!session) {
            throw redirect(303, '/login');
        }
        const data: FormData = await request.formData();
        console.log("deletUser data", data)
    }
}
