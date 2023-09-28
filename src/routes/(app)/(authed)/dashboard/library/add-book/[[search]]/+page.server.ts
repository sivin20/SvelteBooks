import { supabase } from "$lib/supabaseClient";
import { redirect } from "@sveltejs/kit";
import type {PageServerLoad} from  "./$types";

export const load: PageServerLoad = (async ({ parent, locals: { getSession } }) => {
    const session = await getSession()

    if(!session) {
        throw redirect(303, "/")
    }

    const d = await parent()
    console.log("libs", d)

    const { data } = await supabase.from("libraries").select().eq('owner_id', session.user.id);
    return {
        libraries: data ?? [],
    };
})