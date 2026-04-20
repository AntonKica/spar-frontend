<script lang="ts">
    import type { PageData } from './$types';
    import { page } from '$app/state';
    import { goto } from '$app/navigation';
    import { enum_to_name } from '$lib';

    let { data }: { data: PageData } = $props();

    let likelihood = $state(data.classification.likelihood);
    let impact = $state(data.classification.impact);
    let evaluation = $state(data.classification.evaluation);
    let risk = $derived(lookupRisk(likelihood, impact));

    const riskBgColors: Record<string, string> = {
        low: '#1b5e20',
        medium: '#66bb6a',
        high: '#fdd835',
        very_high: '#c62828',
    };

    const riskTextColors: Record<string, string> = {
        low: '#ffffff',
        medium: '#ffffff',
        high: '#000000',
        very_high: '#ffffff',
    };

    function lookupRisk(l: string, i: string): string {
        const cell = data.matrix.cells.find(
            c => c.likelihood === l && c.impact === i
        );
        return cell?.risk ?? 'low';
    }

    async function save() {
        const res = await fetch(
            `/svc/risk-analysis/risk-classification/${page.params.ra}/${page.params.module}/${page.params.threat}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ likelihood, impact, evaluation }),
            }
        );

        if (res.ok) {
            goto(`/risk-analysis/${page.params.ra}/step/2-risk-classification`);
        }
    }
</script>

<h2>
    {data.classification.threat_code} — {data.classification.threat_name}
</h2>
<p class="text-muted">
    Modul: {data.classification.module} |
    Kategória: {enum_to_name(data.classification.category, data.enums.threat_category)}
</p>

<div class="mb-4">
    <span
        class="badge fs-6"
        style="background-color: {riskBgColors[risk]}; color: {riskTextColors[risk]};"
    >
        Riziko: {enum_to_name(risk, data.enums.risk)}
    </span>
</div>

<div class="row g-3 mb-3">
    <div class="col-md-6">
        <label for="likelihood" class="form-label">Pravdepodobnosť</label>
        <select class="form-select" id="likelihood" bind:value={likelihood}>
            {#each data.enums.likelihood as l}
                <option value={l.code}>{l.name}</option>
            {/each}
        </select>
    </div>
    <div class="col-md-6">
        <label for="impact" class="form-label">Dopad</label>
        <select class="form-select" id="impact" bind:value={impact}>
            {#each data.enums.impact as i}
                <option value={i.code}>{i.name}</option>
            {/each}
        </select>
    </div>
</div>

<div class="mb-3">
    <label for="evaluation" class="form-label">Hodnotenie</label>
    <textarea class="form-control" id="evaluation" rows="4" bind:value={evaluation}></textarea>
</div>

<button class="btn btn-primary" onclick={save}>
    Uložiť
</button>