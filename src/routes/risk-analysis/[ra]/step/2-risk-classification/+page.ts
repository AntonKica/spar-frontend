// src/routes/risk-analysis/[ra]/step/2-risk-classification/+page.ts
import type { PageLoad } from './$types';

export interface RiskClassificationDetail {
    module: string;
    threat_code: string;
    threat_name: string;
    category: string;
    likelihood: string;
    impact: string;
    evaluation: string;
}

export interface RiskMatrixCell {
    likelihood: string;
    impact: string;
    risk: string;
}

export interface RiskMatrix {
    likelihoods: string[];
    impacts: string[];
    cells: RiskMatrixCell[];
}

export const load: PageLoad = async ({ fetch, params }) => {
    const [classificationsRes, matrixRes] = await Promise.all([
        fetch(`/svc/risk-analysis/list-risk-classifications/${params.ra}`),
        fetch('/svc/risk-analysis/risk-matrix'),
    ]);

    const classifications: RiskClassificationDetail[] = await classificationsRes.json();
    const matrix: RiskMatrix = await matrixRes.json();

    return { classifications, matrix };
};