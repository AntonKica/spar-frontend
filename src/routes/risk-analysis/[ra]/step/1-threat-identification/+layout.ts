import type { LayoutLoad } from './$types';

export interface ModuleWithStatus {
    code: string;
    name: string;
    description: string;
    done: boolean;
}
export interface ThreatSummary {
    code: string;
    name: string;
    category: string;
    module: string;
}


export const load: LayoutLoad = async ({ fetch, params }) => {
    const [modulesRes, threatsRes] = await Promise.all([
        fetch(`/svc/risk-analysis/list-modules-status/${params.ra}`),
        fetch(`/svc/risk-analysis/list-all-threats/${params.ra}`),
    ]);

    const modules: ModuleWithStatus[] = await modulesRes.json();
    const threats: ThreatSummary[] = await threatsRes.json();

    const presenceMap = new Map<string, Set<string>>();
    for (const t of threats) {
        if (!presenceMap.has(t.code)) {
            presenceMap.set(t.code, new Set());
        }
        presenceMap.get(t.code)!.add(t.module);
    }

    const uniqueThreats = [...new Map(threats.map(t => [t.code, t])).values()];

    const rows = uniqueThreats.map(t => ({
        code: t.code,
        name: t.name,
        category: t.category,
        modules: Object.fromEntries(modules.map(m => [m.code, presenceMap.get(t.code)?.has(m.code) ?? false])),
    }));

    const grouped = new Map<string, typeof rows>();
    for (const row of rows) {
        if (!grouped.has(row.category)) {
            grouped.set(row.category, []);
        }
        grouped.get(row.category)!.push(row);
    }

    return { modules, grouped: [...grouped.entries()] };
};