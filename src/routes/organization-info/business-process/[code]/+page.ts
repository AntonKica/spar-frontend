import { SVC_BUSINESS_PROCESS_GET, SVC_BUSINESS_PROCESS_GET_ASSIGNED_ROLES, SVC_ROLE_GET } from '$lib/routes';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
    const data = await fetch(SVC_BUSINESS_PROCESS_GET(params.code)).then(r => r.json());
    const responsible = await fetch(SVC_ROLE_GET(data.data.responsible)).then(r => r.json())
    const assigned_roles = await fetch(SVC_BUSINESS_PROCESS_GET_ASSIGNED_ROLES(params.code)).then(r => r.json())
    data.data.responsible = responsible.data;
    data.data.assigned_roles = assigned_roles.data;
    
    console.log(assigned_roles)

    return data.data;
};