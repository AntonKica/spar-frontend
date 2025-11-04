
import type { PageLoad } from './$types';
import { UI_RISK_ANALYSIS_PROCESS_WORKFLOW } from '$lib/index';

export const load: PageLoad = async ({ params, fetch }) => {
    const url = UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_1_2_specific_list(params.rap, params.asset)
    const data = await fetch(url).then(response => response.json());

    const specific_threat_overview_url = UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_1_2_specific_overview(params.rap, params.asset)
    const specific_threat_overview_data = await fetch(specific_threat_overview_url).then(response => response.json());

    return {
        rap: params.rap,
        asset: params.asset,
        specific_threat_overview: specific_threat_overview_data.data,
        specific_threat_list: data.data,
    };
}