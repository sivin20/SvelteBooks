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


    return {
        libraries: data ?? []
    };
})

export const actions: Actions = {
    create: async ({request, locals: {supabase, getSession}}) => {
        const session = await getSession()

        if(!session) {
            throw redirect(303, "/")
        }

        const body = Object.fromEntries(await request.formData())

        const { data, error: err } = await supabase.from('libraries').insert({
            id: crypto.randomUUID(),
            name: body.name as string,
            owner_id: session.user.id
        })

        if (err) {
            return fail(500, {
                error: "Server error. Please try again later"
            })
        }

        throw redirect(303, "/dashboard/library")
    }
}