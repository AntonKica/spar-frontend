import { SVC_APPLICATION_GET } from '$lib/routes';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
    const data = await fetch(SVC_APPLICATION_GET(params.code)).then(r => r.json());

    return data.data;
};