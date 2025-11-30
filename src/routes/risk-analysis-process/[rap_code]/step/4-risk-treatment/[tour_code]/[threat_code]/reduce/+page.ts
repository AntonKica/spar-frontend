import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch, parent }) => {
	const risk_reduction_list = await fetch(`/svc/step-4-risk-treatment/risk-reduction/`).then(response => response.json());
	const risk_reduction_selected_list = await fetch(`/svc/step-4-risk-treatment/${params.rap_code}/${params.tour_code}/${params.threat_code}/risk-reduction/`).then(response => response.json());
    return {
        risk_reduction_list: risk_reduction_list.data,
        risk_reduction_selected_list: risk_reduction_selected_list.data,
    };
};