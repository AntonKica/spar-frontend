import { SVC_ASSET_GET, SVC_ENUM_PROTECTION_NEEDS_LIST } from '$lib/routes';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
    const data = await fetch(SVC_ASSET_GET(params.asset_code)).then(response => response.json());
    const asset_type_enum = await fetch("/svc/enum/asset-type/").then(response => response.json());
    const protection_needs_enum = await fetch(SVC_ENUM_PROTECTION_NEEDS_LIST()).then(response => response.json());
    return {
        asset_detail: data.data,
        asset_type_enum: asset_type_enum.data,
        protection_needs_enum: protection_needs_enum.data
    }
};