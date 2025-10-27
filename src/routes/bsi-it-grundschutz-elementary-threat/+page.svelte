<script lang="ts">
	import type { PageProps } from './$types';
	import {UI_ENUM_BSI_IT_GRUNDSHUTZ_ELEMENTARY_THREAT_GET} from '$lib/routes';
	let { data }: PageProps = $props();
</script>

<h1>Hrozby BSI IT-Grundschutz Kompendium</h1>

<table>
    <thead>
        <tr>
            <td>názov</td>
            <td></td>
        </tr>
    </thead>
    <tbody>
    {#each data.data as module}
    <tr>
        <td>{module.name}</td>
        <td><a href={UI_ENUM_BSI_IT_GRUNDSHUTZ_ELEMENTARY_THREAT_GET(module)}>pozri</a></td>
    </tr>
    {/each}
    </tbody>
</table>
