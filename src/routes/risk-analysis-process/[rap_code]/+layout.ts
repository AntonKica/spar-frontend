import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params, fetch }) => {
    const rap = await fetch(`/svc/risk-analysis-process/${params.rap_code}`).then(response => response.json());
	return {
		rap: rap.data
	};
};