import type { PageLoad } from './$types';
import { UI_RISK_ANALYSIS_PROCESS_WORKFLOW  } from '$lib/index';

export const load: PageLoad = async ({ fetch }) => {
    const rap_list = await fetch("/svc/risk-analysis-process/").then(response => response.json())
    const process_status_enum = await fetch("/svc/enum/process-status/").then(response => response.json())
    const process_step_enum = await fetch("/svc/enum/process-step/").then(response => response.json())
    return {
        rap_list: rap_list.data,
        process_status_enum: process_status_enum.data,
        process_step_enum: process_step_enum.data,
    }
};