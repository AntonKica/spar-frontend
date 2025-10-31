import { SVC_IT_SYSTEM_GET } from '$lib/routes';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
    //const data = await fetch(`/svc/risk-analysis-process/${params.rap}`).then(r => r.json());

    return {
        code: params.rap
    };
};