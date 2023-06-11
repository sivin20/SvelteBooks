import {writable} from 'svelte/store';
import type {Writable} from 'svelte/store';

export const booksReadStore: Writable<any> = writable([]);
export const tbrStore: Writable<any> = writable([]);
export const inProgressStore: Writable<any> = writable([]);
export const wishlistStore: Writable<any> = writable([]);