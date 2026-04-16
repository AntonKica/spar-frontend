import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent, fetch, params }) => {
	const { rap } = await parent();
	const tour_risk_classification_list = await fetch(`/svc/step-3-risk-classification/${params.rap_code}/${params.tour_code}/`).then(response => response.json());

	return {
		tour: rap.tour_list.find((f: any) => f.code == params.tour_code),
		tour_risk_classification_list: tour_risk_classification_list.data,
	};
};