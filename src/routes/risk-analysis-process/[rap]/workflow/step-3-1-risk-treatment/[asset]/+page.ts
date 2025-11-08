
import type { PageLoad } from './$types';
import { UI_RISK_ANALYSIS_PROCESS_WORKFLOW } from '$lib/index';
import { SVC_ASSET_GET, SVC_ENUM_BSI_IT_GRUNDSHUTZ_ELEMENTARY_THREAT_LIST, SVC_ENUM_POTENTIAL_RISK_LIST, SVC_ENUM_PROTECTION_NEEDS_LIST, SVC_ENUM_RISK_TREATMENT_LIST } from '$lib/routes';

export const load: PageLoad = async ({ params, fetch }) => {
    const asset = await fetch(SVC_ASSET_GET(params.asset)).then(response => response.json());
    const risk_treatment_list = await fetch(UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_3_1_risk_treatment_get(params)).then(response => response.json());
    const protection_needs_enum = await fetch(SVC_ENUM_PROTECTION_NEEDS_LIST()).then(response => response.json());
    const elementary_threat_enum = await fetch(SVC_ENUM_BSI_IT_GRUNDSHUTZ_ELEMENTARY_THREAT_LIST()).then(response => response.json());
    const potential_risk_enum = await fetch(SVC_ENUM_POTENTIAL_RISK_LIST()).then(response => response.json());
    const risk_treatment_enum = await fetch(SVC_ENUM_RISK_TREATMENT_LIST()).then(response => response.json());
    
    return {
        params: params,
        asset: asset.data,
        elementary_threat_risk_treatment_list: risk_treatment_list.data.tour_elementary_threat_risk_treatment_list,
        specific_threat_risk_treatment_list: risk_treatment_list.data.tour_specific_threat_risk_treatment_list,
        protection_needs_enum: protection_needs_enum.data,
        elementary_threat_enum: elementary_threat_enum.data,
        potential_risk_enum: potential_risk_enum.data,
        risk_treatment_enum: risk_treatment_enum.data,
    };
}