<script lang="ts">
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<h1>Moduly BSI IT-Grundschutz Kompendium</h1>

<table>
    <thead>
        <tr>
            <td>názov</td>
        </tr>
    </thead>
    <tbody>
    {#each data.data as bsiModule}
    <tr>
        <td>{bsiModule.name}</td>
    </tr>
    {/each}
    </tbody>
</table>
