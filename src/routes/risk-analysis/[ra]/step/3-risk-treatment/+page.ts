// src/routes/risk-analysis/[ra]/step/3-risk-treatment/+page.ts
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

export const load: PageLoad = async ({ fetch, params }) => {
    const [modulesRes, threatsRes] = await Promise.all([
        fetch(`/svc/risk-analysis/list-modules/${params.ra}`),
        fetch(`/svc/risk-analysis/list-all-threats/${params.ra}`),
    ]);

    const modules: Module[] = await modulesRes.json();
    const allThreats: ThreatWithModule[] = await threatsRes.json();

    const threats = [...new Map(
        allThreats.map(t => [t.code, { code: t.code, name: t.name }])
    ).values()];

    const presenceMap = new Map<string, Set<string>>();
    for (const t of allThreats) {
        if (!presenceMap.has(t.code)) {
            presenceMap.set(t.code, new Set());
        }
        presenceMap.get(t.code)!.add(t.module);
    }

    return { modules, threats, presenceMap: Object.fromEntries(
        [...presenceMap.entries()].map(([k, v]) => [k, [...v]])
    )};
};