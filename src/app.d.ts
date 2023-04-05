// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
import { SupabaseClient, Session } from '@supabase/supabase-js';
import { Database } from './DatabaseDefinitions';

declare global {
    namespace App {
        interface Locals {
            supabase: SupabaseClient<Database>;
            getSession(): Promise<Session | null>;
        }
        interface PageData {
            session: Session | null;
        }
        // interface Error {}
        // interface Platform {}
    }
}

declare module '@fortawesome/pro-solid-svg-icons/index.es' {
    export * from '@fortawesome/pro-solid-svg-icons';
}
