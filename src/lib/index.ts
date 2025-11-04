export const create_post_request = (entity: object): object => {
    return {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entity)
    }
}

export const create_delete_request = (): object => {
    return {
        method: 'DELETE',
    }
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
    step_1_threat_overview(code: string): string {
        return `/risk-analysis-process/${code}/workflow/step-1-threat-overview`;
    }
    step_1_threat_overview_list(code: string): string {
        return `/svc/risk-analysis-process/${code}/threat-overview/`;
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
};

export const UI_RISK_ANALYSIS_PROCESS_WORKFLOW = new UiRiskAnalysissProcessWorkflow();