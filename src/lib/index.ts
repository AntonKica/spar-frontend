import type { RouteParams } from "$app/types"

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

export const enum_to_name = (code: string, l: object[]) => {
    return l.find((e) => e.code === code).name;
}


class UiRiskAnalysissProcessWorkflow {
    ui(): string {
        return `/risk-analysis-process`;
    }
    list(): string {
        return `/risk-analysis-process/list`;
    }
    list_get(): string {
        return `/svc/risk-analysis-process/`;
    }
    view(code:string): string {
        return `/risk-analysis-process/${code}/view`;
    }
    step_1_threat_overview(code: string): string {
        return `/risk-analysis-process/${code}/workflow/step-1-threat-overview`;
    }
    step_1_threat_overview_list(code: string): string {
        return `/svc/risk-analysis-process/${code}/threat-overview/`;
    }
    step_1_threat_overview_finish(code: string): string {
        return `/svc/risk-analysis-process/${code}/step-1-threat-overview/finish`;
    }
    
    step_1_1_elementary_threat(code: string, asset: string): string {
        return `/risk-analysis-process/${code}/workflow/step-1-1-elementary-threat/${asset}`;
    }
    step_1_1_elementary_threat_get(code: string, asset: string): string {
        return `/svc/risk-analysis-process/${code}/elementary-threat/${asset}`;
    }
    step_1_1_elementary_threat_update(code: string, asset: string): string {
        return `/svc/risk-analysis-process/${code}/elementary-threat/${asset}`;
    }
    step_1_2_specific_threat(code: string, asset: string): string {
        return `/risk-analysis-process/${code}/workflow/step-1-2-specific-threat/${asset}`;
    }
    step_1_2_specific_list(code: string, asset: string): string {
        return `/svc/risk-analysis-process/${code}/specific-threat/${asset}/`;
    }
    step_1_2_specific_overview(code: string, asset: string): string {
        return `/svc/risk-analysis-process/${code}/specific-threat/${asset}/overview`;
    }
    step_1_2_specific_create(code: string, asset: string): string {
        return `/svc/risk-analysis-process/${code}/specific-threat/${asset}`;
    }
    step_1_2_specific_update(code: string, asset: string, threat: string): string {
        return `/svc/risk-analysis-process/${code}/specific-threat/${asset}/${threat}`;
    }
    step_1_2_specific_delete(code: string, asset: string, threat: string): string {
        return `/svc/risk-analysis-process/${code}/specific-threat/${asset}/${threat}`;
    }
    step_1_2_specific_reviewed(code: string, asset: string, value: boolean): string {
        return `/svc/risk-analysis-process/${code}/specific-threat/${asset}/overview/reviewed/${value}`;
    }

    step_2_risk_classification(code: string): string {
        return `/risk-analysis-process/${code}/workflow/step-2-risk-classification`;
    }
    step_2_1_risk_classification(code: string, asset: string): string {
        return `/risk-analysis-process/${code}/workflow/step-2-1-risk-classification/${asset}`;
    }
    step_2_1_risk_classification_get(params: RouteParams<"/risk-analysis-process/[rap]/workflow/step-2-1-risk-classification/[asset]">): string {
        return `/svc/risk-analysis-process/${params.rap}/risk-classification/${params.asset}/`;
    }
    step_2_1_risk_classification_elementary_update(params: RouteParams<"/risk-analysis-process/[rap]/workflow/step-2-1-risk-classification/[asset]">, threat: string): string {
        return `/svc/risk-analysis-process/${params.rap}/risk-classification/${params.asset}/elementary-threat/${threat}`;
    }
    step_2_1_risk_classification_specific_update(params: RouteParams<"/risk-analysis-process/[rap]/workflow/step-2-1-risk-classification/[asset]">, threat: string): string {
        return `/svc/risk-analysis-process/${params.rap}/risk-classification/${params.asset}/specific-threat/${threat}`;
    }
    step_2_risk_classification_finish(params: RouteParams<"/risk-analysis-process/[rap]/workflow/step-2-risk-classification">, threat: string): string {
        return `/svc/risk-analysis-process/${params.rap}/step-2-risk-classification/finish`;
    }
    step_3_risk_treatment(params: RouteParams<"/risk-analysis-process/[rap]/workflow/step-3-risk-treatment">): string {
        return `/risk-analysis-process/${params.rap}/workflow/step-3-risk-treatment`;
    }
    step_3_1_risk_treatment(params: RouteParams<"/risk-analysis-process/[rap]/workflow/step-3-risk-treatment">, asset: string): string {
        return `/risk-analysis-process/${params.rap}/workflow/step-3-1-risk-treatment/${asset}`;
    }
    step_3_1_risk_treatment_get(params: RouteParams<"/risk-analysis-process/[rap]/workflow/step-3-1-risk-treatment/[asset]">): string {
        return `/svc/risk-analysis-process/${params.rap}/risk-treatment/${params.asset}/`;
    }
    step_3_1_risk_treatment_elementary_update(params: RouteParams<"/risk-analysis-process/[rap]/workflow/step-3-1-risk-treatment/[asset]">, threat: string): string {
        return `/svc/risk-analysis-process/${params.rap}/risk-treatment/${params.asset}/elementary-threat/${threat}`;
    }
    step_3_1_risk_treatment_specific_update(params: RouteParams<"/risk-analysis-process/[rap]/workflow/step-3-1-risk-treatment/[asset]">, threat: string): string {
        return `/svc/risk-analysis-process/${params.rap}/risk-treatment/${params.asset}/specific-threat/${threat}`;
    }
};

export const UI_RISK_ANALYSIS_PROCESS_WORKFLOW = new UiRiskAnalysissProcessWorkflow();


export const RISK_CLASSIFICATION_MATRIX = (frequency: number, damage: number) => {
    const matrix = {
        0: {
            0: 0, 1: 0, 2: 1, 3: 1
        },
        1: {
            0: 0, 1: 0, 2: 1, 3: 2
        },
        2: {
            0: 0, 1: 1, 2: 2, 3: 3
        },
        3: {
            0: 0, 1: 2, 2: 3, 3: 3
        }
    };

    return matrix[frequency][damage];
}