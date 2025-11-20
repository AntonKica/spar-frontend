
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params, parent }) => {
    let { elementary_threat_enum, tour_threat_identification } = await parent();
    let elementary_threat_list = elementary_threat_enum.map((et: any) => {
        let f = tour_threat_identification.et_list.find((f: any) => f.et_code === et.code);
        return {
            ...et,
            relevance: f?.relevance || 0,
            explanation: f?.explanation || ""
        }
    });
    
    return {
        elementary_threat_list: elementary_threat_list,
    };
}