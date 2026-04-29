import type { Threat, Requirement } from '$lib/types';
import type { PageLoad } from './$types';


export const load: PageLoad = async ({ fetch, params }) => {
    const [threatsRes, requirementsRes] = await Promise.all([
        fetch(`/svc/it-grundschutz/module/${params.module}/threats`),
        fetch(`/svc/it-grundschutz/module/${params.module}/requirements`),
    ]);

    const threats: Threat[] = await threatsRes.json();
    const requirements: Requirement[] = await requirementsRes.json();

    return { threats, requirements };
};