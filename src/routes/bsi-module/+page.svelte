<script lang="ts">
	import type { PageProps } from './$types';
	import {UI_BSI_MODULE_GET} from '$lib/routes';
	let { data }: PageProps = $props();
</script>

<h1>Moduly BSI IT-Grundschutz Kompendium</h1>

<table>
    <thead>
        <tr>
            <td>názov</td>
            <td></td>
        </tr>
    </thead>
    <tbody>
    {#each data.data as bsiModule}
    <tr>
        <td>{bsiModule.name}</td>
        <td><a href={UI_BSI_MODULE_GET(bsiModule)}>pozri</a></td>
    </tr>
    {/each}
    </tbody>
</table>
