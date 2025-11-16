import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
    const rap = await fetch(`/svc/risk-analysis-process/${params.rap_code}`).then(response => response.json());
    return {
        params: params,
        rap: rap.data,
    };
};