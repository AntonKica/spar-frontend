import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent, fetch, params }) => {
	const { rap } = await parent();
	const risk_treatment = await fetch(`/svc/step-4-risk-treatment/${params.rap_code}/${params.tour_code}/${params.threat_code}`).then(response => response.json());

	return {
		tour: rap.tour_list.find((f: any) => f.code == params.tour_code),
		risk_treatment: risk_treatment.data,
	};
};