
import type { PageLoad } from './$types';
import { SVC_ASSET_LIST } from '$lib/routes';

export const load: PageLoad = async ({ fetch }) => {
    const data = await fetch(SVC_ASSET_LIST()).then(response => response.json());
    const res = {
        asset_list: data.data
    };
    console.log(res)
    return res;
}