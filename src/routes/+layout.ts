export const ssr = false;

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params, fetch }) => {
    const enum_list = await fetch("/svc/enum/").then(response => response.json());

	return {
        process_status_enum: enum_list.data.process_status,
        process_step_enum: enum_list.data.process_step,
        asset_type_enum: enum_list.data.asset_type,
        protection_needs_enum: enum_list.data.protection_needs,
        threat_relevance_enum: enum_list.data.threat_relevance,
        threat_probability_enum: enum_list.data.threat_probability,
        threat_impact_enum: enum_list.data.threat_impact.reverse(),
        threat_risk_enum: enum_list.data.threat_risk,
        risk_treatment_enum: enum_list.data.risk_treatment,
	};
};