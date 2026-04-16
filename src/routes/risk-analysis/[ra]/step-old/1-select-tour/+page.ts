
import type { PageLoad } from './$types';
import { SVC_ASSET_LIST } from '$lib/routes';

export const load: PageLoad = async ({ parent, fetch, params }) => {
	const { rap } = await parent();
    const asset_list = await fetch(SVC_ASSET_LIST()).then(response => response.json());

    return {
        asset_list: asset_list.data.map((a: object) => {
            return {
                ...a,
                under_review: rap.tour_list.find(tour => tour.code === a.code) !== undefined
            }
        }),
    };
}