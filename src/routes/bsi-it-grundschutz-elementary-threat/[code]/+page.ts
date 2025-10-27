import { SVC_ENUM_BSI_IT_GRUNDSHUTZ_ELEMENTARY_THREAT_LIST } from '$lib/routes';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
    const data = await fetch(SVC_ENUM_BSI_IT_GRUNDSHUTZ_ELEMENTARY_THREAT_LIST()).then(r => r.json());

    data.data = data.data.filter((e: any) => e.code == params.code)[0]

    return data.data;
};