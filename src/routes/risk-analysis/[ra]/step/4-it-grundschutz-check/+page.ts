import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
    const res = await fetch(`/svc/it-grundschutz-check/assessment-completed/${params.ra}`);
    const assessmentRes = await fetch(`/svc/it-grundschutz-check/full-assessment/${params.ra}`);
    const completed: boolean = await res.json();
    const assessment = await assessmentRes.json();
    return { completed, assessment };
};