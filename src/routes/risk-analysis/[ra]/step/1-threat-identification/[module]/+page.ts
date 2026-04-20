import type { PageLoad } from './$types';

export interface ThreatModel {
    code: string;
    name: string;
    description: string;
    confidentiality_impaired: boolean;
    integrity_impaired: boolean;
    availability_impaired: boolean;
    category: string;
}

export const load: PageLoad = async ({ fetch, params }) => {
    const [moduleThreatsRes, allThreatsRes, selectedRes] = await Promise.all([
        fetch(`/svc/it-grundschutz/module/${params.module}/threats`),
        fetch('/svc/threat'),
        fetch(`/svc/risk-analysis/list-threats/${params.ra}/${params.module}`),
    ]);

    const moduleThreats: ThreatModel[] = await moduleThreatsRes.json();
    const allThreats: ThreatModel[] = await allThreatsRes.json();
    const selectedThreats: ThreatModel[] = await selectedRes.json();

    const moduleThreatCodes = new Set(moduleThreats.map(t => t.code));
    const elementaryThreats = allThreats.filter(
        t => t.code.startsWith('G-') && !moduleThreatCodes.has(t.code)
    );
    const specificThreats = allThreats.filter(t => t.code.startsWith('THR-'));
    const selectedCodes = selectedThreats.map(t => t.code);

    return {
        moduleThreats,
        elementaryThreats,
        specificThreats,
        selectedCodes
    };
};