import type { LayoutLoad } from './$types';

export interface RiskAnalysis {
    code: string;
    state: string;
    created_at: string;
}

export const load: LayoutLoad = async ({ fetch, params }) => {
    const res = await fetch(`/svc/risk-analysis/${params.ra}`);
    const ra: RiskAnalysis = await res.json();
    return { ra };
};