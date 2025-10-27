import type { PageLoad } from './$types';
import { SVC_ENUM_BSI_IT_GRUNDSHUTZ_ELEMENTARY_THREAT_LIST } from '$lib/routes';

export const load: PageLoad = async ({ fetch }) => {
    const data = await fetch(SVC_ENUM_BSI_IT_GRUNDSHUTZ_ELEMENTARY_THREAT_LIST()).then(response => response.json())
    return data
};