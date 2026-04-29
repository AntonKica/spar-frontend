<!-- src/routes/it-grundschutz-module/+page.svelte -->
<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<h1>IT-Grundschutz moduly</h1>

<table class="table table-striped table-hover">
    <thead class="table-dark">
        <tr>
            <th>Kód</th>
            <th>Názov</th>
            <th>Popis</th>
        </tr>
    </thead>
    <tbody>
        {#each data.modules as module}
            <tr>
                <td> <a href="/bsi-it-grundschutz-module/{module.code}"> {module.code} </a></td>
                <td>{module.name}</td>
                <td>{module.description}</td>
            </tr>
        {:else}
            <tr>
                <td colspan="3" class="text-muted">Žiadne moduly</td>
            </tr>
        {/each}
    </tbody>
</table>