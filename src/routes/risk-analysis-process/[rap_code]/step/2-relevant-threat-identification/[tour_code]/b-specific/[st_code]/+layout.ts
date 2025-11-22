import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent, params, fetch }) => {
	const { st_list } = await parent();
    const specific_threat = st_list.find(st => st.code === params.st_code);

    return {
        specific_threat: specific_threat,
    };
};