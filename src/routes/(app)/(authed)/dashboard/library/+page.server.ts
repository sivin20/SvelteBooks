import { supabase } from "$lib/supabaseClient";
import type {PageServerLoad} from "../../../../../../.svelte-kit/types/src/routes/(app)/(unauthed)/login/$types";
import { redirect} from "@sveltejs/kit";


export const load: PageServerLoad = (async ({ locals: { getSession } }) => {
    const session = await getSession()

    if(!session) {
        throw redirect(303, "/")
    }

    const { data } =  await supabase.rpc('get_libraries_with_book_info', {owner_uid: session.user.id})

    console.log("data", data)

    //: TODO: Make libraries come in the correct order in a better way..
    let libraries: any[] = []
    for (let lib of data) {
        if (lib.name === 'BOOKS READ') {
            libraries[0] = lib
        }
        if (lib.name === 'TBR') {
            libraries[1] = lib
        }
        if (lib.name === 'IN PROGRESS') {
            libraries[2] = lib
        }
        if(lib.name == 'WISHLIST') {
            libraries[3] = lib
        }
    }

    return {
        libraries: libraries ?? []
    };
})