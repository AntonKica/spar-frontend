import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent, fetch, params }) => {
	const { tour_risk_classification_list } = await parent();
	const risk_treatment = await fetch(`/svc/step-4-risk-treatment/${params.rap_code}/${params.tour_code}/${params.threat_code}`).then(response => response.json());

	return {
		risk_treatment: risk_treatment.data,
		risk_clasification: tour_risk_classification_list.find((f: any) => f.threat_code == params.threat_code)
	};
};