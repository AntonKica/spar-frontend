import type { PageLoad } from './$types';

export interface Module {
    code: string;
    name: string;
}

export interface ThreatWithModule {
    code: string;
    name: string;
    module: string;
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
    const [modulesRes, threatsRes, treatmentsRes] = await Promise.all([
        fetch(`/svc/risk-analysis/list-modules/${params.ra}`),
        fetch(`/svc/risk-analysis/list-all-threats/${params.ra}`),
        fetch(`/svc/risk-analysis/list-all-treatments/${params.ra}`),
    ]);

    const modules: Module[] = await modulesRes.json();
    const allThreats: ThreatWithModule[] = await threatsRes.json();
    const treatments: RiskTreatment[] = await treatmentsRes.json();

    const threats = [...new Map(
        allThreats.map(t => [t.code, { code: t.code, name: t.name }])
    ).values()];

    const presenceMap: Record<string, string[]> = {};
    for (const t of allThreats) {
        if (!presenceMap[t.code]) {
            presenceMap[t.code] = [];
        }
        presenceMap[t.code].push(t.module);
    }

    const orgTreatment = treatments.find(
        t => t.module === null && t.threat === null
    ) ?? null;

    const threatTreatments: Record<string, string> = {};
    const moduleTreatments: Record<string, string> = {};
    const cellTreatments: Record<string, string> = {};

    for (const t of treatments) {
        if (t.module === null && t.threat !== null) {
            threatTreatments[t.threat] = t.treatment;
        } else if (t.module !== null && t.threat === null) {
            moduleTreatments[t.module] = t.treatment;
        } else if (t.module !== null && t.threat !== null) {
            cellTreatments[`${t.module}:${t.threat}`] = t.treatment;
        }
    }

    return {
        modules,
        threats,
        presenceMap,
        orgTreatment,
        threatTreatments,
        moduleTreatments,
        cellTreatments,
    };
};