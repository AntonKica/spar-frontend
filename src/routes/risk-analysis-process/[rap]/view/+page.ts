import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
    console.log(params)
    return {
        params: params
    };
};