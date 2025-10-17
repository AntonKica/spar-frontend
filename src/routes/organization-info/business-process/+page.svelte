<script lang="ts">
	import { UI_BUSINESS_PROCESS_GET } from '$lib/routes';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<h1>Biznisové procesy</h1>

<table>
    <thead>
        <tr>
            <td>kód</td>
            <td>názov</td>
            <td>popis</td>
            <td>typ</td>
            <td></td>
        </tr>
    </thead>
    <tbody>
    {#each data.data as businessProcess}
    <tr>
        <td>{businessProcess.code}</td>
        <td>{businessProcess.name}</td>
        <td>{businessProcess.description}</td>
        <td>{businessProcess.process_type.name}</td>
        <!--<td>{businessProcess.responsible}</td>-->
        <!--td>{businessProcess.staff.join(", ")}</td-->
        <td><a href={UI_BUSINESS_PROCESS_GET(businessProcess)}>pozri</a></td>
    </tr>
    {/each}
    </tbody>
</table>
