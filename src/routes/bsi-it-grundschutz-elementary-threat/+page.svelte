<script lang="ts">
	import { enum_to_name } from '$lib';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<h1>Elementárne hrozby</h1>

<table class="table table-striped table-hover">
    <thead class="table-dark">
        <tr>
            <th>Kód</th>
            <th>Názov</th>
            <th>Kategória</th>
            <th>C</th>
            <th>I</th>
            <th>A</th>
        </tr>
    </thead>
    <tbody>
        {#each data.threats as threat}
            <tr>
                <td> <a href="/bsi-it-grundschutz-elementary-threat/{threat.code}">{threat.code}</a> </td>
                <td>{threat.name}</td>
                <td>{enum_to_name(threat.category, data.enums.threat_category)}</td>
                <td>{threat.confidentiality_impaired ? 'X' : ''}</td>
                <td>{threat.integrity_impaired ? 'X' : ''}</td>
                <td>{threat.availability_impaired ? 'X' : ''}</td>
            </tr>
        {:else}
            <tr>
                <td colspan="6" class="text-muted">Žiadne hrozby</td>
            </tr>
        {/each}
    </tbody>
</table>