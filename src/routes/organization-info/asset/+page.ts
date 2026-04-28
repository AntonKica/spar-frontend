import type { PageLoad } from './$types';

export interface Asset {
    code: string;
    name: string;
    description: string;
    module: string;
    confidentiality_protection_requirement: string;
    integrity_protection_requirement: string;
    availability_protection_requirement: string;
    confidentiality_protection_requirement_description: string;
    integrity_protection_requirement_description: string;
    availability_protection_requirement_description: string;
}

export interface Module {
    code: string;
    name: string;
    description: string;
}

export interface EnumCodeName {
    code: string;
    name: string;
}

export interface Enums {
    protection_requirement: EnumCodeName[];
}

export const load: PageLoad = async ({ fetch }) => {
    const [assetsRes, modulesRes] = await Promise.all([
        fetch('/svc/asset'),
        fetch('/svc/asset/all/module'),
    ]);

    const assets: Asset[] = await assetsRes.json();
    const modules: Module[] = await modulesRes.json();

    return { assets, modules };
};