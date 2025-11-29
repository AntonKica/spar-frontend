import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const risk_acceptance_list = await fetch(`/svc/step-4-risk-treatment/risk-acceptance/`).then(response => response.json());
	const risk_acceptance = await fetch(`/svc/step-4-risk-treatment/${params.rap_code}/${params.tour_code}/${params.threat_code}/risk-acceptance`).then(response => response.json());
    return {
        risk_acceptance_list: risk_acceptance_list.data,
        risk_acceptance: risk_acceptance.data,
    };
};