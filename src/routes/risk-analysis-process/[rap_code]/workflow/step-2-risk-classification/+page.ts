
import type { PageLoad } from './$types';
import { UI_RISK_ANALYSIS_PROCESS_WORKFLOW } from '$lib/index';
import { SVC_ENUM_PROTECTION_NEEDS_LIST } from '$lib/routes';

export const load: PageLoad = async ({ params, fetch }) => {
    const data = await fetch(UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_1_threat_overview_list(params.rap)).then(response => response.json());
    const protection_needs_data = await fetch(SVC_ENUM_PROTECTION_NEEDS_LIST()).then(response => response.json());
    const res = {
        params: params,
        threat_overview_list: data.data,
        protection_needs_enum: protection_needs_data.data
    };
    return res;
}