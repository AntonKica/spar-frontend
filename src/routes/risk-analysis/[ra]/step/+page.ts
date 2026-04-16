import type { PageLoad } from './$types';

export interface Asset {
    code: string;
    name: string;
    description: string;
    module: string;
}

export interface Module {
    code: string;
    name: string;
    description: string;
}
export const load: PageLoad = async ({ fetch, params }) => {
    const [assetsRes, modulesRes] = await Promise.all([
        fetch(`/svc/risk-analysis/list-assets/${params.ra}`),
        fetch(`/svc/risk-analysis/list-modules/${params.ra}`),
    ]);


    const assets: Asset[] = await assetsRes.json();
    const modules: Module[] = await modulesRes.json();

    return { assets, modules };
};