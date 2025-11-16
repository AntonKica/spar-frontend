
import type { PageLoad } from './$types';
import { SVC_ASSET_LIST } from '$lib/routes';

export const load: PageLoad = async ({ fetch, params }) => {
    const rap = await fetch(`/svc/risk-analysis-process/${params.rap_code}`).then(response => response.json());
    const asset_type_enum = await fetch("/svc/enum/asset-type/").then(response => response.json());
    const asset_list = await fetch(SVC_ASSET_LIST()).then(response => response.json());

    return {
        params: params,
        rap: rap.data,
        asset_list: asset_list.data.map((a: object) => {
            return {
                ...a,
                under_review: rap.data.tour_list.find(tour => tour === a.code) !== undefined
            }
        }),
        asset_type_enum: asset_type_enum.data,
    };
}