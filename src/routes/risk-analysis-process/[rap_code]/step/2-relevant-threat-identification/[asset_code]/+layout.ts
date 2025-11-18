import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params, fetch }) => {
    const asset = await fetch(`/svc/asset/${params.asset_code}`).then(response => response.json());
	return {
		asset_detail: asset.data
	};
};