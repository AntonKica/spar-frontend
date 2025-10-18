import type { PageLoad } from './$types';
import { SVC_BUSINESS_PROCESS_LIST } from '$lib/routes';

export const load: PageLoad = async ({ fetch }) => {
    const data = await fetch(SVC_BUSINESS_PROCESS_LIST()).then(response => response.json())
    return data
};