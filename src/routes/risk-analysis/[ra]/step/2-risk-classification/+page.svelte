<script lang="ts">
    import type { PageData } from './$types';
    import { enum_to_name } from '$lib';
	import CompleteStepButton from '$lib/CompleteStepButton.svelte';
	import RiskAnalysisCopyStepButton from '$lib/RiskAnalysisCopyStepButton.svelte';

    let { data }: { data: PageData } = $props();

    const riskBgColors: Record<string, string> = {
        low: '#1b5e20',
        medium: '#66bb6a',
        high: '#fdd835',
        very_high: '#c62828',
    };

    const riskTextColors: Record<string, string> = {
        low: '#ffffff',
        medium: '#000000',
        high: '#000000',
        very_high: '#ffffff',
    };

    function cellRisk(likelihood: string, impact: string): string {
        const cell = data.matrix.cells.find(
            c => c.likelihood === likelihood && c.impact === impact
        );
        return cell?.risk ?? 'low';
    }

    const threats = [...new Map(
        data.classifications.map(c => [c.threat_code, { code: c.threat_code, name: c.threat_name }])
    ).values()];

    const modules = [...new Set(data.classifications.map(c => c.module))].sort();

    function findClassification(module: string, threatCode: string) {
        return data.classifications.find(
            c => c.module === module && c.threat_code === threatCode
        );
    }
</script>

<CompleteStepButton
    state="risk_classification"
    label="Dokončiť klasifikáciu rizík"
/>
<RiskAnalysisCopyStepButton
    ra_state="risk_classification"
    ra_list={data.ra_list}
/>

<h2>Matica rizík</h2>

<table class="table table-bordered text-center mb-4">
    <thead>
    </thead>
    <tbody>
        {#each [...data.matrix.impacts].reverse() as impact}
            <tr>
                <th>{enum_to_name(impact, data.enums.impact)}</th>
                {#each data.matrix.likelihoods as likelihood}
                    {@const risk = cellRisk(likelihood, impact)}
                    <td
                        style="background-color: {riskBgColors[risk]}; color: {riskTextColors[risk]}; font-weight: 500;"
                    >
                        {enum_to_name(risk, data.enums.risk)}
                    </td>
                {/each}
            </tr>
        {/each}
        <tr>
            <th></th>
            {#each data.matrix.likelihoods as likelihood}
                <th>{enum_to_name(likelihood, data.enums.likelihood)}</th>
            {/each}
        </tr>
    </tbody>
</table>
<h2>Riziká podľa modulov a hrozieb</h2>

<div class="table-responsive">
    <table class="table table-bordered text-center">
        <thead class="table-dark">
            <tr>
                <th></th>
                {#each threats as threat}
                    <th class="text-nowrap" style="font-size: 12px;">
                        {threat.code}
                        <br />
                        <small>{threat.name}</small>
                    </th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each modules as module}
                <tr>
                    <th class="text-nowrap">{module}</th>
                    {#each threats as threat}
                        {@const cls = findClassification(module, threat.code)}
                        {#if cls}
                            {@const risk = cellRisk(cls.likelihood, cls.impact)}
                            <td
                                style="background-color: {riskBgColors[risk]}; color: {riskTextColors[risk]}; font-weight: 500;"
                            >
                                <a href="/risk-analysis/{data.ra.code}/step/2-risk-classification/{module}/{threat.code}"
                                  style="color: inherit; text-decoration: none;"
                                  title="Upraviť"> {enum_to_name(risk, data.enums.risk)} ✎ </a>
                            </td>
                        {:else}
                            <td class="text-muted">—</td>
                        {/if}
                    {/each}
                </tr>
            {:else}
                <tr>
                    <td colspan={1 + threats.length} class="text-muted">No classifications</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>