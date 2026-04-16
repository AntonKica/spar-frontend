
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, fetch, params }) => {
    const tour_threat_identification = await fetch(`/svc/step-2-relevant-threat-identification/${params.rap_code}/`).then(response => response.json());
    const { threat_list, tour_threat_list } = tour_threat_identification.data;

    return {
        tour_threat_list: tour_threat_list,
        threat_list: threat_list.map((threat: any) => {
            return {
                ...threat,
                tour_list: tour_threat_list.map((tour: any) => tour.threat_list.find((f: any) => f.threat_code == threat.code))
            }
        }),
    };
}