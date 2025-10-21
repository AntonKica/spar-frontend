<script lang="ts">
	import {UI_IT_SYSTEM_GET} from '$lib/routes';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<h1>IT Systémy</h1>

<table>
    <thead>
        <tr>
            <td>kód</td>
            <td>názov</td>
            <td>popis</td>
            <td>počet</td>
            <td>modul</td>
            <td></td>
        </tr>
    </thead>
    <tbody>
    {#each data.data as it_system}
    <tr>
        <td>{it_system.code}</td>
        <td>{it_system.name}</td>
        <td>{it_system.description}</td>
        <td>{it_system.count}</td>
        <td>{it_system.module_type.name}</td>
        <td><a href={UI_IT_SYSTEM_GET(it_system)}>pozri</a></td>
    </tr>
    {/each}
    </tbody>
</table>
