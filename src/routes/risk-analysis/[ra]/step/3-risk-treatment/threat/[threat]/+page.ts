// src/routes/risk-analysis/[ra]/step/3-risk-treatment/threat/[threat]/+page.ts
import type { PageLoad } from './$types';

export interface SecurityMeasure {
    code: string;
    treatment: string;
    description: string;
}

export interface RiskTreatment {
    code: string;
    risk_analysis: string;
    module: string | null;
    threat: string | null;
    treatment: string;
    description: string;
}

export const load: PageLoad = async ({ fetch, params }) => {
    const [treatmentRes, linkedRes, allMeasuresRes] = await Promise.all([
        fetch(`/svc/risk-analysis/threat-risk-treatment/${params.ra}/${params.threat}`),
        fetch(`/svc/risk-analysis/threat-risk-treatment-measures/${params.ra}/${params.threat}`),
        fetch('/svc/security-measure'),
    ]);

    const treatment: RiskTreatment | null = await treatmentRes.json();
    const linkedMeasures: SecurityMeasure[] = await linkedRes.json();
    const allMeasures: SecurityMeasure[] = await allMeasuresRes.json();
    const linkedCodes = linkedMeasures.map(m => m.code);

    return {
        treatment,
        allMeasures,
        linkedCodes,
    };
};