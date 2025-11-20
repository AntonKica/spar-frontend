import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent, params, fetch }) => {
	const { elementary_threat_list } = await parent();
    const elementary_threat = elementary_threat_list.find(et => et.code === params.et_code);

    return {
        elementary_threat: elementary_threat,
    };
};