import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, params }) => {
	const { threat_list } = await parent();

    return {
        threat: threat_list.find((threat: any) => threat.code === params.threat_code),
    };
};