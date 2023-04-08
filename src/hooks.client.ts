// src/hooks.+server.ts

import type { Handle } from '@sveltejs/kit';
import {redirect} from "@sveltejs/kit";
import {supabase} from "./lib/supabaseClient";

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.supabase = supabase

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
            throw redirect(303, "/login")
        }
    }

    // Redirects logged in user to dashboard if trying to access "/"
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