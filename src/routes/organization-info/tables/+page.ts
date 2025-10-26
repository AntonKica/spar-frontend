import type { PageLoad } from './$types';
import { SVC_APPLICATION_LIST, SVC_BUSINESS_PROCESS_LIST, SVC_BUSINESS_PROCESS_APPLICATION_LIST } from '$lib/routes';

export const load: PageLoad = async ({ fetch }) => {
    const application = await fetch(SVC_APPLICATION_LIST()).then(response => response.json())
    const business_process = await fetch(SVC_BUSINESS_PROCESS_LIST()).then(response => response.json())
    const business_process_application = await fetch(SVC_BUSINESS_PROCESS_APPLICATION_LIST()).then(response => response.json())
    return {
        application_list: application.data,
        business_process_list: business_process.data,
        business_process_application_list: business_process_application.data
    }
};