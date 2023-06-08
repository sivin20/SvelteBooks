// src/hooks.+server.ts
import {
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY
} from '$env/static/public';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { Handle } from '@sveltejs/kit';
import {fail, redirect} from "@sveltejs/kit";
import {supabase} from "$lib/supabaseClient";
import {AuthApiError} from "@supabase/supabase-js";
import * as url from "url";

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.supabase = createSupabaseServerClient({
        supabaseUrl: PUBLIC_SUPABASE_URL,
        supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
        event
    });

    /**
     * a little helper that is written for convenience so that instead
     * of calling `const { data: { session } } = await supabase.auth.getSession()`
     * you just call this `await getSession()`
     */
    event.locals.getSession = async () => {
        const {
            data: { session }
        } = await event.locals.supabase.auth.getSession();
        return session;
    };

    // Redirects unauthenticated user to login
    if(event.url.pathname.startsWith('/dashboard')) {
        if(!await event.locals.getSession()) {
            if(event.url.searchParams.has('hacked')) {
                console.log("hack origin", event.url.origin)
                throw redirect(303, `/login?${event.url.searchParams}`)
            }
            throw redirect(303, "/login")
        }
    }

    // Redirects logged-in user to dashboard if trying to access "/"
    if(await event.locals.getSession()) {
        if(event.url.pathname === '/') {
            throw redirect(303, "/dashboard")
        }
    }

    return resolve(event, {
        /**
         * There´s an issue with `filterSerializedResponseHeaders` not working when using `sequence`
         *
         * https://github.com/sveltejs/kit/issues/8061
         */
        filterSerializedResponseHeaders(name) {
            return name === 'content-range';
        }
    });
};