import type { PageLoad } from './$types';
import { SVC_APPLICATION_LIST } from '$lib/routes';

export const load: PageLoad = async ({ fetch }) => {
    const data = await fetch(SVC_APPLICATION_LIST()).then(response => response.json())
    return data
};