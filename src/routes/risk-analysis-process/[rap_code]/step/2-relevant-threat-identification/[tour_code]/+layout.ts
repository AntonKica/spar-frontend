import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent, params }) => {
	const { tour_threat_identification } = await parent();
	return {
		tour: tour_threat_identification.find((f: any) => f.tour_code === params.tour_code)
	};
};