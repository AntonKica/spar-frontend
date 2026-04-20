<!-- src/routes/risk-analysis/[ra]/step/threat-identification/+page.svelte -->
<script lang="ts">
    import type { PageData } from './$types';
    import { page } from '$app/state';
    import { enum_to_name } from '$lib';
	import { goto } from '$app/navigation';

    export let data: PageData;
    async function completeStep() {
        const res = await fetch(`/svc/risk-analysis/complete-step/${page.params.ra}/threat_identification`, {
            method: 'POST',
        });

        if (res.ok) {
            goto(`/risk-analysis/${page.params.ra}/step`);
        }
    }
</script>


<table class="table table-striped table-hover">
    <thead class="table-dark">
        <tr>
            <th>Module</th>
            <th>Name</th>
            <th>Status</th>
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
                        <span class="badge bg-success">done</span>
                    {:else}
                        <span class="badge bg-warning text-dark">pending</span>
                    {/if}
                </td>
                <td>
                    <a href="/risk-analysis/{data.ra.code}/step/1-threat-identification/{module.code}">
                        {module.done ? 'review' : 'start'}
                    </a>
                </td>
            </tr>
        {/each}
    </tbody>
</table>

<h2>Summary</h2>
<button class="btn btn-primary" onclick={completeStep}>Complete threat identification</button>

<table class="table table-striped table-hover">
    <thead class="table-dark">
        <tr>
            <th>Threat</th>
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
                <td colspan={1 + data.modules.length} class="text-muted">No threats selected</td>
            </tr>
        {/each}
    </tbody>
</table>