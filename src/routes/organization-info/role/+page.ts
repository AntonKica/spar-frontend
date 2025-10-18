import type { PageLoad } from './$types';
import { SVC_ROLE_LIST } from '$lib/routes';

export const load: PageLoad = async ({ fetch }) => {
    const data = await fetch(SVC_ROLE_LIST()).then(response => response.json())
    return data
};