import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params, fetch }) => {
    const tour_threat_identification = await fetch(`/svc/step-2-relevant-threat-identification/${params.rap_code}`).then(response => response.json());
	return {
		tour_threat_identification: tour_threat_identification.data
	};
};