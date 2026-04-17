// src/routes/risk-analysis/[ra]/step/threat-identification/[module]/+page.ts
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
    const [moduleThreatsRes, allThreatsRes] = await Promise.all([
        fetch(`/svc/it-grundschutz/module/${params.module}/threats`),
        fetch('/svc/threat'),
    ]);

    const moduleThreats: ThreatModel[] = await moduleThreatsRes.json();
    const allThreats: ThreatModel[] = await allThreatsRes.json();

    const moduleThreatCodes = new Set(moduleThreats.map(t => t.code));
    const elementaryThreats = allThreats.filter(
        t => t.code.startsWith('G-') && !moduleThreatCodes.has(t.code)
    );
    const specificThreats = allThreats.filter(t => t.code.startsWith('THR-'));

    return {
        moduleThreats,
        elementaryThreats,
        specificThreats,
    };
};