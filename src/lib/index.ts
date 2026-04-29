import type { RouteParams } from "$app/types"
import { goto } from '$app/navigation';

export const create_post_request = (entity: object): object => {
    return {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entity)
    }
}
export const create_post_request_empty = (): object => {
    return {
        method: 'POST',
    }
}

export const create_delete_request = (): object => {
    return {
        method: 'DELETE',
    }
}


export const categoryColors: Record<string, string> = {
    natural_threat: 'bg-success',
    infrastructure_failure: 'bg-secondary',
    compromise_of_functions_and_services: 'bg-warning text-dark',
    human_actions: 'bg-danger',
    physical_threats: 'bg-info text-dark',
    technical_failures: 'bg-primary',
    organizational_threats: 'bg-dark',
};

export const enum_to_name = (code: string, l: object[]) => {
    //console.log(`looking for ${code} in ${l}`);
    return l.find((e) => e.code == code).name;
}
export const code_to_name = (code: string, l: object[]) => {
    //console.log(`looking for ${code} in ${l}`);
    return l.find((e) => e.code == code).name;
}
export async function completeStep(ra: string) {
    const res = await fetch(`/svc/risk-analysis/complete-step/${ra}/threat_identification`, {
        method: 'POST',
    });

    if (res.ok) {
        goto(`/risk-analysis/${ra}/step`);
    }
}


export const format_date = (iso: string): string => {
     return new Date(iso).toLocaleDateString('sk-SK', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};