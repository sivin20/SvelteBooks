import {writable} from 'svelte/store';
import type {Writable} from 'svelte/store';

export const userProfilePicture: Writable<any> = writable(null);

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
        console.error('Error loading image:', error);
    }
}