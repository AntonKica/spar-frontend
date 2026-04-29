import type { PageLoad } from './$types';
export const load: PageLoad = async ({ fetch }) => {
    const ra_list = await fetch("/svc/risk-analysis").then(response => response.json())
    return {
        ra_list: ra_list,
    }
};