import type { PageLoad } from './$types';
import { SVC_ENUM_MODULE_LIST } from '$lib/routes';

export const load: PageLoad = async ({ fetch }) => {
    const data = await fetch(SVC_ENUM_MODULE_LIST()).then(response => response.json())
    return data
};