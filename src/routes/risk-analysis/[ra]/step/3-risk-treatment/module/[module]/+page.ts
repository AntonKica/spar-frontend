import type { PageLoad } from './$types';
export interface Requirement {
    code: string;
    module: string;
    description: string;
}

export const load: PageLoad = async ({ fetch, params }) => {
    const [linkedRes, requirementsRes] = await Promise.all([
        fetch(`/svc/risk-analysis/module-risk-treatment-measures/${params.ra}/${params.module}`),
        fetch(`/svc/it-grundschutz/module/${params.module}/requirements`),
    ]);

    const linkedRequirements: Requirement[] = await linkedRes.json();
    const requirements: Requirement[] = await requirementsRes.json();
    const linkedCodes = linkedRequirements.map(r => r.code);

    return {
        requirements,
        linkedCodes,
    };
};