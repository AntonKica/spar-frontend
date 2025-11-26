import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
    const { risk_treatment } = await parent();
	const risk_acceptance_list = await fetch(`/svc/step-4-risk-treatment/risk-acceptance/`).then(response => response.json());
	const risk_acceptance = risk_treatment === null ? null : await fetch(`/svc/step-4-risk-treatment/risk-acceptance/${risk_treatment.treatment_code}`).then(response => response.json());
    return {
        risk_acceptance_list: risk_acceptance_list.data,
        risk_acceptance: risk_acceptance?.data,
    };
};