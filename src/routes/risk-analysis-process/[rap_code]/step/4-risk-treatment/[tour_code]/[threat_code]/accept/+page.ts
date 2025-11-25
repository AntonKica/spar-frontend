import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const risk_acceptance = await fetch(`/svc/step-4-risk-treatment/${params.rap_code}/${params.tour_code}/${params.threat_code}/acceptance`).then(response => response.json());
    return {
        risk_acceptance: risk_acceptance.data,
    };
};