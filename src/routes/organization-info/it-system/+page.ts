import type { PageLoad } from './$types';
import { SVC_IT_SYSTEM_LIST } from '$lib/routes';

export const load: PageLoad = async ({ fetch }) => {
    const data = await fetch(SVC_IT_SYSTEM_LIST()).then(response => response.json())
    return data
};