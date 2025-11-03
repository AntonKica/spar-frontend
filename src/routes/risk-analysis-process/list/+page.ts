import type { PageLoad } from './$types';
import { UI_RISK_ANALYSIS_PROCESS_WORKFLOW  } from '$lib/index';

export const load: PageLoad = async ({ fetch }) => {
    const data = await fetch(UI_RISK_ANALYSIS_PROCESS_WORKFLOW.list_get()).then(response => response.json())
    return {
        risk_analysis_process_list: data.data
    }
};