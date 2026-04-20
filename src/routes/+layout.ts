export const ssr = false;

import type { LayoutLoad } from './$types';
export const load: LayoutLoad = async ({ params, fetch }) => {
    const enums = await fetch("/svc/enum").then(response => response.json());

	return { enums };
};