
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, parent }) => {
    let { tour } = await parent();
    const specific_threat_list = await fetch(`/svc/specific-threat/`).then(response => response.json());
    
    const st_list = specific_threat_list.data.map((st: any) => {
        let f = tour.st_list.find((f: any) => f.st_code === st.code);
        return {
            ...st,
            relevant: f !== undefined,
            explanation: f?.explanation || ""
        }
    });
    
    return {
        st_list: st_list,
    };
}