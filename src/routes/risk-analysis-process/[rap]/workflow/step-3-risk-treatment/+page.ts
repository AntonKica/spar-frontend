
import type { PageLoad } from './$types';
import { UI_RISK_ANALYSIS_PROCESS_WORKFLOW } from '$lib/index';

export const load: PageLoad = async ({ params, fetch }) => {
    const data = await fetch(UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_1_threat_overview_list(params.rap)).then(response => response.json());
    const res = {
        params: params,
        threat_overview_list: data.data,
    };
    return res;
}