// src/routes/risk-analysis/[ra]/step/threat-identification/+page.ts
import type { LayoutLoad } from './$types';

export interface ModuleWithStatus {
    code: string;
    name: string;
    description: string;
    done: boolean;
}

export const load: LayoutLoad = async ({ fetch, params }) => {
    const res = await fetch(`/svc/risk-analysis/list-modules-status/${params.ra}`);
    const modules: ModuleWithStatus[] = await res.json();
    return { modules };
};