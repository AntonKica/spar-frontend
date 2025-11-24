
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, fetch, params }) => {
    const risk_classification_summary = await fetch(`/svc/step-3-risk-classification/${params.rap_code}`).then(response => response.json());
    const { threat_list, tour_risk_classification_list } = risk_classification_summary.data;

    return {
        tour_risk_classification_list: tour_risk_classification_list,
        threat_list: threat_list.map((threat: any) => {
            return {
                ...threat,
                tour_list: tour_risk_classification_list.map((tour: any) => tour.threat_risk_list.find((f: any) => f.threat_code == threat.code))
            }
        }),
    };
}