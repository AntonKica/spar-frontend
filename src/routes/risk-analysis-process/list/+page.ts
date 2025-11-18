import type { PageLoad } from './$types';
import { UI_RISK_ANALYSIS_PROCESS_WORKFLOW  } from '$lib/index';

export const load: PageLoad = async ({ fetch }) => {
    const rap_list = await fetch("/svc/risk-analysis-process/").then(response => response.json())
    return {
        rap_list: rap_list.data,
    }
};