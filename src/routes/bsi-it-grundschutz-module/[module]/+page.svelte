<!-- src/routes/it-grundschutz-module/[module]/+page.svelte -->
<script lang="ts">
    import { page } from '$app/state';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<div class="mb-3">
    <a href="/it-grundschutz-module" class="btn btn-secondary btn-sm">
        Späť
    </a>
</div>

<h1>Modul: {page.params.module}</h1>

<h2>Hrozby</h2>

<table class="table table-striped table-hover mb-4">
    <thead class="table-dark">
        <tr>
            <th>Kód</th>
            <th>Názov</th>
            <th>C</th>
            <th>I</th>
            <th>A</th>
        </tr>
    </thead>
    <tbody>
        {#each data.threats as threat}
            <tr>
                <td>{threat.code}</td>
                <td>{threat.name}</td>
                <td>{threat.confidentiality_impaired ? 'X' : ''}</td>
                <td>{threat.integrity_impaired ? 'X' : ''}</td>
                <td>{threat.availability_impaired ? 'X' : ''}</td>
            </tr>
        {:else}
            <tr>
                <td colspan="5" class="text-muted">Žiadne hrozby</td>
            </tr>
        {/each}
    </tbody>
</table>

<h2>Požiadavky</h2>

<table class="table table-striped table-hover">
    <thead class="table-dark">
        <tr>
            <th>Kód</th>
            <th>Popis</th>
        </tr>
    </thead>
    <tbody>
        {#each data.requirements as req}
            <tr>
                <td>{req.code}</td>
                <td>{req.description}</td>
            </tr>
        {:else}
            <tr>
                <td colspan="2" class="text-muted">Žiadne požiadavky</td>
            </tr>
        {/each}
    </tbody>
</table>