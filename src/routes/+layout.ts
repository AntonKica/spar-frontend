export const ssr = false;
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
    const [enumsRes, analysesRes] = await Promise.all([
        fetch('/svc/enum'),
        fetch('/svc/risk-analysis'),
    ]);

    const enums = await enumsRes.json();
    const ra_list = await analysesRes.json();

    return { enums, ra_list };
};