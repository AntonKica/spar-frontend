export const create_post_request = (entity: object): object => {
    return {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entity)
    }
}


class UiRiskAnalysissProcessWorkflow {
    step_1_threat_overview(code: string): string {
        return `/risk-analysis-process/${code}/workflow/step-1-threat-overview`;
    }
    step_1_threat_overview_list(code: string): string {
        return `/svc/risk-analysis-process/${code}/threat-overview-list`;
    }
    step_1_1_elementary_threat(code: string, asset: string): string {
        return `/risk-analysis-process/${code}/workflow/step-1-1-elementary-threat/${asset}`;
    }
    step_1_1_elementary_threat_get(code: string, asset: string): string {
        return `/svc/risk-analysis-process/${code}/elementary-threat/${asset}`;
    }
};

export const UI_RISK_ANALYSIS_PROCESS_WORKFLOW = new UiRiskAnalysissProcessWorkflow();