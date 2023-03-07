import type { PageLoad } from './$types';

/** @type {import('./$types').PageLoad} */
export const load = (async ({ fetch }) => {
    const req = await fetch('http://localhost:8080/api/matches');
    const matches = await req.json();
    return {
        matches
    }
}) satisfies PageLoad;