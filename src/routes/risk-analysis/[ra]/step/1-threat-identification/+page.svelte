<!-- src/routes/risk-analysis/[ra]/step/threat-identification/+page.svelte -->
<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<h2>Threat identification</h2>

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