import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch, parent }) => {
	const risk_avoidance_list = await fetch(`/svc/step-4-risk-treatment/risk-avoidance/`).then(response => response.json());
	const risk_avoidance = await fetch(`/svc/step-4-risk-treatment/${params.rap_code}/${params.tour_code}/${params.threat_code}/risk-avoidance`).then(response => response.json());
    return {
        risk_avoidance_list: risk_avoidance_list.data,
        risk_avoidance: risk_avoidance.data,
    };
};