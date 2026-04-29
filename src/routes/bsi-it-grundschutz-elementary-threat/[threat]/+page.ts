import type { PageLoad } from './$types';
import type { Threat } from '$lib/types';

export const load: PageLoad = async ({ fetch, params }) => {
    const res = await fetch(`/svc/threat/${params.threat}`);
    const threat: Threat = await res.json();
    return { threat };
};