import { SVC_ASSET_GET } from '$lib/routes';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
    const asset_detail = await fetch(SVC_ASSET_GET(params.asset_code)).then(response => response.json());
    return {
        asset_detail: asset_detail.data,
    }
};