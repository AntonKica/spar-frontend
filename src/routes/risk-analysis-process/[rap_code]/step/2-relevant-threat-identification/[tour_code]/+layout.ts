import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params, fetch }) => {
    const tour = await fetch(`/svc/asset/${params.tour_code}`).then(response => response.json());
	return {
		tour: tour.data
	};
};