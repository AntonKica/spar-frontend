
import type { PageLoad } from './$types';
import { SVC_ASSET_LIST } from '$lib/routes';

export const load: PageLoad = async ({ fetch }) => {
    const data = await fetch(SVC_ASSET_LIST()).then(response => response.json());
    const asset_type_enum = await fetch("/svc/enum/asset-type/").then(response => response.json());
    return {
        asset_list: data.data,
        asset_type_enum: asset_type_enum.data,
    };
}