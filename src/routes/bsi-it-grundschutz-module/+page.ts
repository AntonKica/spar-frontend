import type { PageLoad } from './$types';

export interface Module {
    code: string;
    name: string;
    description: string;
}

export const load: PageLoad = async ({ fetch }) => {
    const res = await fetch('/svc/it-grundschutz/module');
    const modules: Module[] = await res.json();
    return { modules };
};