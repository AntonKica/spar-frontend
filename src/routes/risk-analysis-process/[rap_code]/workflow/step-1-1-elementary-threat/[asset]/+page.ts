
import type { PageLoad } from './$types';
import { UI_RISK_ANALYSIS_PROCESS_WORKFLOW } from '$lib/index';
import { SVC_ENUM_BSI_IT_GRUNDSHUTZ_ELEMENTARY_THREAT_LIST, SVC_ENUM_ELEMENTARY_THREAT_RELEVANCE_LIST } from '$lib/routes';

export const load: PageLoad = async ({ params, fetch }) => {
    const url = UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_1_1_elementary_threat_get(params.rap, params.asset)
    const data = await fetch(url).then(response => response.json());
    const elementary_threat_relevance_enum =  await fetch(SVC_ENUM_ELEMENTARY_THREAT_RELEVANCE_LIST()).then(response => response.json());
    const elementary_threat_enum =  await fetch(SVC_ENUM_BSI_IT_GRUNDSHUTZ_ELEMENTARY_THREAT_LIST()).then(response => response.json());

    const res = {
        rap: params.rap,
        asset: params.asset,
        elementary_threat_list: data.data,
        elementary_threat_relevance_enum: elementary_threat_relevance_enum.data,
        elementary_threat_enum: elementary_threat_enum.data
    };
    return res;
}