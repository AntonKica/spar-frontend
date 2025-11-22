
import type { PageLoad } from './$types';
import { SVC_ASSET_LIST } from '$lib/routes';

export const load: PageLoad = async ({ parent, fetch, params }) => {
    const tour_threat_identification = await fetch(`/svc/step-2-relevant-threat-identification/${params.rap_code}`).then(response => response.json());
    const tour_threat_summary = await fetch(`/svc/step-2-relevant-threat-identification/${params.rap_code}/summary`).then(response => response.json());
    console.log(tour_threat_identification.data)

    return {
        tour_threat_identification: tour_threat_identification.data,
        tour_et_summary_list: tour_threat_summary.data.et_list.map((et: any) => {
            return {
                ...et,
                tour_list: tour_threat_identification.data.map((tour: any) => tour.et_list.find((f: any) => f.et_code === et.et_code)?.relevance || 0)
            }
        }),
        tour_st_summary_list: tour_threat_summary.data.st_list.map((st: any) => {
            return {
                ...st,
                tour_list: tour_threat_identification.data.map((tour: any) => tour.st_list.find((f: any) => f.st_code === st.st_code) !== undefined)
            }
        }),
    };
}