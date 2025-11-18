import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent, params, fetch }) => {
	const { elementary_threat_enum } = await parent();
    const elementary_threat = elementary_threat_enum.find(et => et.code === params.elementary_threat_code);

    return {
        elementary_threat: elementary_threat,
    };
};