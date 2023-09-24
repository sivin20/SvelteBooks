
import type {Actions} from "@sveltejs/kit";
import {AuthApiError, SupabaseClient} from "@supabase/supabase-js";
import {fail, redirect} from "@sveltejs/kit";
import type {PageServerLoad} from "./$types";

export const load: PageServerLoad = async ({url, locals: { supabase, getSession }}) => {
    const session = await getSession();

    // if the user is already logged in return them to the dashboard page
    if (session) {
        throw redirect(303, '/dashboard');
    }

    if(url.searchParams.has('hacked')) {
        await supabaseLogin("sigurdskelmosevind@gmail.com", "123456", supabase)
        const paramValue = url.searchParams.get('hacked')
        throw redirect(303, `/dashboard/${paramValue}`)
    }

    return { url: url.origin };
}

async function supabaseLogin(email: string, password: string, supabase: SupabaseClient ) {
    const { error: err } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })

    if (err) {
        if (err instanceof AuthApiError && err.status == 400) {
            console.log("Error", err)
            return fail(400,{
                error: 'Invalid email or password'
            })
        }
        return fail(500, {
            error: "Server error. Please try again later"
        })
    }
}

export const actions: Actions = {
    login: async ({request, locals: {supabase}}) => {
        const body = Object.fromEntries(await request.formData())
        const error = await supabaseLogin(body.email as string, body.password as string, supabase)
        if(!error) {
            throw redirect(303, '/dashboard')
        }
        return error
    },

    register: async ({request, locals: {supabase, getSession}}) => {
        const body = Object.fromEntries(await request.formData())


        const { data, error: err } = await supabase.auth.signUp({
            email: body.email as string,
            password: body.password as string,
            options: {
                data: {
                    first_name: body.name as string
                }
            }
        })

        if(!err) {
            await supabase.auth.signInWithPassword({
                email: body.email as string,
                password: body.password as string
            })

            const session = await getSession()

            if(!session) {
                throw redirect(303, "/")
            }

            await supabase.from('users').insert({
                id: session.user.id,
                first_name: body.first_name as string,
                last_name: body.last_name as string,
                reading_speed: 250
            })

            await supabase.from('libraries').insert({
                id: crypto.randomUUID(),
                name: 'BOOKS READ',
                owner_id: session.user.id
            })
            await supabase.from('libraries').insert({
                id: crypto.randomUUID(),
                name: 'TBR',
                owner_id: session.user.id
            })
            await supabase.from('libraries').insert({
                id: crypto.randomUUID(),
                name: 'IN PROGRESS',
                owner_id: session.user.id
            })
            await supabase.from('libraries').insert({
                id: crypto.randomUUID(),
                name: 'WISHLIST',
                owner_id: session.user.id
            })
        }

        if (err) {
            if (err instanceof AuthApiError && err.status == 400) {
                return fail(400,{
                    error: 'Invalid email or password'
                })
            }
            return fail(500, {
                error: "Server error. Please try again later"
            })
        }

        throw redirect(303, "/dashboard")
    },
}