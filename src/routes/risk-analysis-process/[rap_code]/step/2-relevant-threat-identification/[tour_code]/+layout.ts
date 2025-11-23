import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent, fetch, params }) => {
	const { rap } = await parent();
	const threat_list = await fetch(`/svc/threat/`).then(response => response.json());
	const threat_identification = await fetch(`/svc/step-2-relevant-threat-identification/${params.rap_code}/${params.tour_code}/`).then(response => response.json());

	return {
		tour: rap.tour_list.find((f: any) => f.code === params.tour_code),
		threat_list: threat_list.data.map((threat: any) => {
			const f = threat_identification.data.find((f: any) => f.threat_code == threat.code)
			return {
				...threat,
				type: threat.code.startsWith("G-") ? 0 : 1,
				relevance: f?.relevance || 0,
				explanation: f?.explanation || ""
			}
		}),
	};
};