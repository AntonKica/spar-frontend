
import type { PageLoad } from './$types';
import { UI_RISK_ANALYSIS_PROCESS_WORKFLOW } from '$lib/index';
import { SVC_ENUM_BSI_IT_GRUNDSHUTZ_ELEMENTARY_THREAT_LIST, SVC_ENUM_FREQUNCY_OF_OCCURRENCE_LIST, SVC_ENUM_POTENTIAL_DAMAGE_LIST, SVC_ENUM_POTENTIAL_RISK_LIST } from '$lib/routes';

export const load: PageLoad = async ({ params, fetch }) => {
    const risk_classification_list = await fetch(UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_2_1_risk_classification_get(params)).then(response => response.json());
    const frequency_of_occurrence_enum = await fetch(SVC_ENUM_FREQUNCY_OF_OCCURRENCE_LIST()).then(response => response.json());
    const potential_damage_enum = await fetch(SVC_ENUM_POTENTIAL_DAMAGE_LIST()).then(response => response.json());
    const potential_risk_enum = await fetch(SVC_ENUM_POTENTIAL_RISK_LIST()).then(response => response.json());
    const elementary_threat_enum = await fetch(SVC_ENUM_BSI_IT_GRUNDSHUTZ_ELEMENTARY_THREAT_LIST()).then(response => response.json());
    
    return {
        rap: params.rap,
        params: params,
        elementary_threat_risk_classification_list: risk_classification_list.data.tour_elementary_threat_risk_classification_list,
        specific_threat_risk_classification_list: risk_classification_list.data.tour_specific_threat_risk_classification_list,
        elementary_threat_enum: elementary_threat_enum.data,
        frequency_of_occurrence_enum: frequency_of_occurrence_enum.data,
        potential_damage_enum: potential_damage_enum.data,
        potential_risk_enum: potential_risk_enum.data,
    };
}