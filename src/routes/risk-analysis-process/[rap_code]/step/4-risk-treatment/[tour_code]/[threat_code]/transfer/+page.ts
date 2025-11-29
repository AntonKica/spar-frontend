import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch, parent }) => {
    const { risk_treatment } = await parent();
	const risk_transfer_list = await fetch(`/svc/step-4-risk-treatment/risk-transfer/`).then(response => response.json());
	const risk_transfer = risk_treatment === null ? null : await fetch(`/svc/step-4-risk-treatment/risk-transfer/${risk_treatment.treatment_code}`).then(response => response.json());
    return {
        risk_transfer_list: risk_transfer_list.data,
        risk_transfer: risk_transfer?.data,
    };
};