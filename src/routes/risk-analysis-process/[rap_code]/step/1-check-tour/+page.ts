
import type { PageLoad } from './$types';
import { SVC_ASSET_LIST } from '$lib/routes';

export const load: PageLoad = async ({ fetch, params }) => {
    const rap = await fetch(`/svc/risk-analysis-process/${params.rap_code}/detail`).then(response => response.json());
    const asset_type_enum = await fetch("/svc/enum/asset-type/").then(response => response.json());
    const protection_needs_enum = await fetch("/svc/enum/protection-needs/").then(response => response.json());

    return {
        params: params,
        rap: rap.data,
        asset_type_enum: asset_type_enum.data,
        protection_needs_enum: protection_needs_enum.data,
    };
}