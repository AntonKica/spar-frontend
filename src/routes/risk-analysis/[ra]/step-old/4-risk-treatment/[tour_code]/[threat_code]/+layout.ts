import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent, fetch, params }) => {
	const { tour_risk_classification_list } = await parent();

	return {
		risk_clasification: tour_risk_classification_list.find((f: any) => f.threat_code == params.threat_code)
	};
};