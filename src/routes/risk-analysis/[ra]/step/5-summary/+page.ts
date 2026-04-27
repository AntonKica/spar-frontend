import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
    const res = await fetch(`/svc/it-grundschutz-check/full-assessment/${params.ra}`);
    const assessment = await res.json();
    return { assessment };
};