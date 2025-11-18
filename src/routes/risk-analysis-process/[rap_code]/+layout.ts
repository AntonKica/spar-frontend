import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params, fetch }) => {
    const rap = await fetch(`/svc/risk-analysis-process/${params.rap_code}/detail`).then(response => response.json());
	return {
		rap: rap.data
	};
};