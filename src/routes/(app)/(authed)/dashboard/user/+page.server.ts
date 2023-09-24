import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'
import GoogleCloudStorageService from "$lib/services/google-cloud-storage.service";
import sharp from "sharp";
import {supabase} from "$lib/supabaseClient";
import type {LoggedInUser} from "$lib/models/LoggedInUser";
import {first_name} from "$lib/components/dashboard/welcomeSection.svelte";


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
        const body: Partial<LoggedInUser> = Object.fromEntries(await request.formData())
        const userData= {
            first_name: body.first_name,
            last_name: body.last_name
        }
        try {
            await supabase.from('users').update(userData).eq('id', session.user.id)
        } catch (err) {
            console.error("Error updating user", err)
        }
    },

    reading_speed: async ({request, url, locals: {getSession} }) => {
        const session = await getSession();
        if (!session) {
            throw redirect(303, '/login');
        }
        const body: Partial<LoggedInUser> = Object.fromEntries(await request.formData())
        const userData= {
            reading_speed: body.reading_speed,
        }
        try {
            await supabase.from('users').update(userData).eq('id', session.user.id)
        } catch (err) {
            console.error("Error updating user", err)
        }
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
