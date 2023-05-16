import { supabase } from "$lib/supabaseClient";
import type {PageServerLoad} from "../../../../../../.svelte-kit/types/src/routes/(app)/(unauthed)/login/$types";
import { fail, redirect} from "@sveltejs/kit";
import type { Actions } from './$types'


export const load: PageServerLoad = (async ({ locals: { getSession } }) => {
    const session = await getSession()

    if(!session) {
        throw redirect(303, "/")
    }

    const { data } =  await supabase.rpc('get_libraries_with_book_info', {owner_uid: session.user.id})
    console.log("data", data)

    return {
        libraries: data ?? []
    };
})