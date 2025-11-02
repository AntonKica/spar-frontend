
import type { PageLoad } from './$types';
import { UI_RISK_ANALYSIS_PROCESS_WORKFLOW } from '$lib/index';

export const load: PageLoad = async ({ params, fetch }) => {
    const url = UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_1_1_elementary_threat_get(params.rap, params.asset)
    console.log(url)
    const data = await fetch(url).then(response => response.json());
    const res = {
        elementary_threat_list: data.data
    };
    return res;
}