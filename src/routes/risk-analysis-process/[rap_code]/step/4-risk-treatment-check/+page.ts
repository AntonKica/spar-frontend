
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, fetch, params }) => {
    const risk_treatment_summary = await fetch(`/svc/step-4-risk-treatment/${params.rap_code}/risk-treatment/summary`).then(response => response.json());

    return {
        risk_treatment_summary: risk_treatment_summary.data,
    };
}