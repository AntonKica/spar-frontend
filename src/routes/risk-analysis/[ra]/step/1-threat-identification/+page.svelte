<script lang="ts">
    import type { PageData } from './$types';
    import { enum_to_name } from '$lib';
	import CompleteStepButton from '$lib/CompleteStepButton.svelte';
	import RiskAnalysisCopyStepModal from '$lib/RiskAnalysisCopyStepModal.svelte';
	import RiskAnalysisCopyStepButton from '$lib/RiskAnalysisCopyStepButton.svelte';

    let { data }: { data: PageData } = $props();
</script>


<table class="table table-striped table-hover">
    <thead class="table-dark">
        <tr>
            <th>Modul</th>
            <th>Názov</th>
            <th>Stav</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        {#each data.modules as module}
            <tr>
                <td>{module.code}</td>
                <td>{module.name}</td>
                <td>
                    {#if module.done}
                        <span class="badge bg-success">ukončený</span>
                    {:else}
                        <span class="badge bg-warning text-dark">čakajúci</span>
                    {/if}
                </td>
                <td>
                    <a href="/risk-analysis/{data.ra.code}/step/1-threat-identification/{module.code}">posúď </a>
                </td>
            </tr>
        {/each}
    </tbody>
</table>

<h2>Zhrnutie identifikovaných hrozieb</h2>
<CompleteStepButton
    state="threat_identification"
    label="Dokončiť identifikáciu hrozieb"
/>

<RiskAnalysisCopyStepButton
    ra_state="threat_identification"
    ra_list={data.ra_list}
/>


<table class="table table-striped table-hover">
    <thead class="table-dark">
        <tr>
            <th>Hrozba</th>
            {#each data.modules as module}
                <th class="text-center">{module.code}</th>
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each data.grouped as [category, rows]}
            <tr class="table-secondary">
                <td colspan={1 + data.modules.length}>
                    <strong>{enum_to_name(category, data.enums.threat_category)}</strong>
                </td>
            </tr>
            {#each rows as row}
                <tr>
                    <td>{row.code} — {row.name}</td>
                    {#each data.modules as module}
                        <td class="text-center">
                            {row.modules[module.code] ? 'X' : ''}
                        </td>
                    {/each}
                </tr>
            {/each}
        {:else}
            <tr>
                <td colspan={1 + data.modules.length} class="text-muted">Neboli zvolené žiadne hrozby</td>
            </tr>
        {/each}
    </tbody>
</table>