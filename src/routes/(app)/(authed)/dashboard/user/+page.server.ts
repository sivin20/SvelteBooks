import fs from 'fs/promises'
import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'
import GoogleCloudStorageService from "$lib/services/google-cloud-storage.service";
import sharp from "sharp";
import type {PageServerLoad} from "../../../../../../.svelte-kit/types/src/routes/(app)/(authed)/dashboard/$types";

// export const load: PageServerLoad = async ({url, locals: { getSession }}) => {
//     const session = await getSession();
//
//     // if the user is already logged in return them to the dashboard page
//     if (!session) {
//         throw redirect(303, '/login');
//     }
//
//     const userId = session.user.id
//     const googleCloudimage = `${userId}`
//
//     try {
//         console.log("src", googleCloudimage);
//         const storageService: GoogleCloudStorageService = new GoogleCloudStorageService();
//         const image: Blob | null = await storageService.getImage(googleCloudimage);
//         console.log("image",image)
//
//         if (image) {
//             return {
//                 image: image
//             }
//         } else {
//             // Handle the case where the image doesn't exist or there was an error.
//             console.error('Image not found or error occurred');
//             return null; // You can choose to return null or handle the error as needed.
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         throw error; // Optionally, you can rethrow the error if needed.
//     }
// }

export const actions: Actions = {
    avatar: async ({ request, route, url,  locals: { getSession } }) => {
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
}
