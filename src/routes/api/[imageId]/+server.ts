import GoogleCloudStorageService from "$lib/services/google-cloud-storage.service";

export async function GET({ params } :any ): Promise<Response> {
    const imageId: string = params.imageId as string;
    const storageService: GoogleCloudStorageService = new GoogleCloudStorageService();
    const image: Blob | null = await storageService.getImage(imageId);
    if (image) {
        const imageBuffer: ArrayBuffer = await image.arrayBuffer(); // Convert image to ArrayBuffer
        const fileType: string = getFileTypeFromBlob(image);

        const headers: Headers = new Headers({
            'Content-Type': `image/${fileType}`, // Set the appropriate content type (adjust as needed)
        });

        return new Response(imageBuffer, { headers });
    } else {
        const errorResponse: Response = new Response('Image not found', {status: 404});
        return errorResponse
    }

    function getFileTypeFromBlob(blob: Blob): string {
        const fileExtension = blob.type.split('/').pop(); // Extract file extension from MIME type
        return fileExtension ? fileExtension.toLowerCase() : 'jpeg'; // Default to 'jpeg' if file extension is not available
    }
}