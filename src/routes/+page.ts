import type { PageLoad } from './$types';
import { UI_RISK_ANALYSIS_PROCESS_WORKFLOW  } from '$lib/index';

export const load: PageLoad = async ({ fetch }) => {
    const ra_list = await fetch("/svc/risk-analysis").then(response => response.json())
    return {
        ra_list: ra_list,
    }
};