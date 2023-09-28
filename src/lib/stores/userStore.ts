import {writable} from 'svelte/store';
import type {Writable} from 'svelte/store';
import {supabase} from "$lib/supabaseClient";
import type {LoggedInUser} from "$lib/models/LoggedInUser";

export const userProfilePicture: Writable<any> = writable(null);
export const loggedInUser: Writable<LoggedInUser> = writable(<LoggedInUser>{});

export async function getImageFromCloud(imageId: string) {
    try {
        const response = await fetch(`/api/${imageId}`);
        if (response.ok) {
            const blob = URL.createObjectURL(await response.blob())
            userProfilePicture.set(blob);
        } else {
            // Handle the case where the image retrieval failed
            console.error('Failed to load image:', response.status);
        }
    } catch (error) {
        console.error('Error loading image..');
    }
}

export async function getUserFromId(id: string) {
    try {
        const response = await supabase.from('users').select().eq('id', id)
        if(!response.error) {
            const user: LoggedInUser = response.data[0]
            loggedInUser.set(user)
        }
    } catch (error) {
        console.log("Error loading user", error)
    }
}