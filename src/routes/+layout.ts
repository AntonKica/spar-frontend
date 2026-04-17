export const ssr = false;

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params, fetch }) => {
    const enum_list = await fetch("/svc/enum").then(response => response.json());

	return {
        risk_analysis_state: enum_list.risk_analysis_state,
        threat_category: enum_list.threat_category,
	};
};