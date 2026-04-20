import type { PageLoad } from './$types';
import type { RiskMatrix, RiskClassificationDetail } from '../../+page';

export const load: PageLoad = async ({ fetch, params }) => {
    const [classificationRes, matrixRes] = await Promise.all([
        fetch(`/svc/risk-analysis/risk-classification/${params.ra}/${params.module}/${params.threat}`),
        fetch('/svc/risk-analysis/risk-matrix'),
    ]);

    const classification: RiskClassificationDetail = await classificationRes.json();
    const matrix: RiskMatrix = await matrixRes.json();

    return { classification, matrix };
};