export const ssr = false;

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params, fetch }) => {
    const asset_type_enum = await fetch("/svc/enum/asset-type/").then(response => response.json());
    const protection_needs_enum = await fetch("/svc/enum/protection-needs/").then(response => response.json());
    const process_status_enum = await fetch("/svc/enum/process-status/").then(response => response.json())
    const process_step_enum = await fetch("/svc/enum/process-step/").then(response => response.json())
    const threat_relevance_enum = await fetch('/svc/enum/threat-relevance/').then(response => response.json());

	return {
        process_status_enum: process_status_enum.data,
        process_step_enum: process_step_enum.data,
        asset_type_enum: asset_type_enum.data,
        protection_needs_enum: protection_needs_enum.data,
        threat_relevance_enum: threat_relevance_enum.data,
	};
};