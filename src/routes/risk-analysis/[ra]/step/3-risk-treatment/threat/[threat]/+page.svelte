<!-- src/routes/risk-analysis/[ra]/step/3-risk-treatment/threat/[threat]/+page.svelte -->
<script lang="ts">
    import { SvelteSet } from 'svelte/reactivity';
    import { page } from '$app/state';
    import { goto, invalidateAll } from '$app/navigation';
    import { enum_to_name } from '$lib';
    import CreateSecurityMeasure from '$lib/CreateSecurityMeasure.svelte';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    let treatmentType = $state(data.treatment?.treatment ?? 'reduce');
    let selected = new SvelteSet<string>(data.linkedCodes);
    let showCreateModal = $state(false);

    let filteredMeasures = $derived(
        data.allMeasures.filter(m => m.treatment === treatmentType)
    );

    let isMultiSelect = $derived(treatmentType === 'reduce');

    function toggle(code: string) {
        if (isMultiSelect) {
            if (selected.has(code)) {
                selected.delete(code);
            } else {
                selected.add(code);
            }
        } else {
            selected.clear();
            selected.add(code);
        }
    }

    function onTreatmentTypeChange() {
        selected.clear();
    }

    async function save() {
        const ra = page.params.ra;
        const threat = page.params.threat;

        const res = await fetch(`/svc/risk-analysis/sync-threat-risk-treatment/${ra}/${threat}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                treatment: treatmentType,
                measures: [...selected],
            }),
        });

        if (res.ok) {
            goto(`/risk-analysis/${ra}/step/3-risk-treatment`);
        }
    }
</script>

<div class="d-flex justify-content-between align-items-center mb-4">
    <h2>Ošetrenie hrozby: {page.params.threat}</h2>
    <div class="d-flex gap-2">
        
        <a href="/risk-analysis/{page.params.ra}/step/3-risk-treatment"
            class="btn btn-secondary"
        >
            Späť
        </a>
        <button class="btn btn-primary" onclick={save}>
            Uložiť ({selected.size})
        </button>
    </div>
</div>

<div class="mb-4">
    <label for="treatment-type" class="form-label">Typ ošetrenia</label>
    <select
        class="form-select"
        id="treatment-type"
        bind:value={treatmentType}
        onchange={onTreatmentTypeChange}
    >
        {#each data.enums.treatment_type as t}
            <option value={t.code}>
                {t.name}
            </option>
        {/each}
    </select>
</div>

<div class="d-flex justify-content-between align-items-center mb-3">
    <h3>
        Opatrenia — {enum_to_name(treatmentType, data.enums.treatment_type)}
        {#if !isMultiSelect}
            <small class="text-muted">(výber jedného)</small>
        {/if}
    </h3>
    <button class="btn btn-outline-primary btn-sm" onclick={() => showCreateModal = true}>
        Nové opatrenie
    </button>
</div>

<table class="table table-striped table-hover">
    <thead class="table-dark">
        <tr>
            <th style="width: 40px;"></th>
            <th>Kód</th>
            <th>Popis</th>
        </tr>
    </thead>
    <tbody>
        {#each filteredMeasures as measure}
            <tr>
                <td>
                    <button
                        class="btn btn-sm {selected.has(measure.code) ? 'btn-danger' : 'btn-outline-primary'}"
                        onclick={() => toggle(measure.code)}
                    >
                        {selected.has(measure.code) ? '✕' : '+'}
                    </button>
                </td>
                <td>{measure.code}</td>
                <td>{measure.description}</td>
            </tr>
        {:else}
            <tr>
                <td colspan="3" class="text-muted">
                    Žiadne opatrenia pre typ {enum_to_name(treatmentType, data.enums.treatment_type)}
                </td>
            </tr>
        {/each}
    </tbody>
</table>

<CreateSecurityMeasure
    show={showCreateModal}
    allowedTypes={['avoid', 'reduce', 'transfer', 'accept']}
    defaultType={treatmentType}
    enums={data.enums}
    oncreated={() => { showCreateModal = false; invalidateAll(); }}
    onclose={() => showCreateModal = false}
/>