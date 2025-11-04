
import type { PageLoad } from './$types';
import { UI_RISK_ANALYSIS_PROCESS_WORKFLOW } from '$lib/index';

export const load: PageLoad = async ({ params, fetch }) => {
    const url = UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_1_2_specific_list(params.rap, params.asset)
    const data = await fetch(url).then(response => response.json());

    return {
        rap: params.rap,
        specific_threat_list: data.data,
    };
}