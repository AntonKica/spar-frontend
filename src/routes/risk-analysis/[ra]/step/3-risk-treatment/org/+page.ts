// src/routes/risk-analysis/[ra]/step/3-risk-treatment/org/+page.ts
import type { PageLoad } from './$types';

export interface SecurityMeasure {
    code: string;
    treatment: string;
    description: string;
}

export const load: PageLoad = async ({ fetch, params }) => {
    const [allRes, linkedRes] = await Promise.all([
        fetch('/svc/security-measure/by-treatment/reduce'),
        fetch(`/svc/risk-analysis/list-org-risk-treatment-measures/${params.ra}`),
    ]);

    const allMeasures: SecurityMeasure[] = await allRes.json();
    const linkedMeasures: SecurityMeasure[] = await linkedRes.json();
    const linkedCodes = linkedMeasures.map(m => m.code);

    return { allMeasures, linkedCodes };
};