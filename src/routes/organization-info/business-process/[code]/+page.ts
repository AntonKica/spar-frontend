import { SVC_BUSINESS_PROCESS_GET, SVC_ROLE_GET } from '$lib/routes';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
    const data = await fetch(SVC_BUSINESS_PROCESS_GET(params.code)).then(r => r.json());
    const responsible = await fetch(SVC_ROLE_GET(data.data.responsible)).then(r => r.json())
    data.data.responsible = responsible.data;

    console.log(data)

    return data.data;
};