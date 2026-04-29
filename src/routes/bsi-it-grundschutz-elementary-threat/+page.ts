import type { PageLoad } from './$types';
import type { Threat } from '$lib/types';

export const load: PageLoad = async ({ fetch }) => {
    const res = await fetch('/svc/threat');
    const threats: Threat[] = await res.json();
    return { threats };
};