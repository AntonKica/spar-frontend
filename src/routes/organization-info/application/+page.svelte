<script lang="ts">
	import {UI_APPLICATION_GET} from '$lib/routes';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<h1>Aplikácie</h1>

<table>
    <thead>
        <tr>
            <td>kód</td>
            <td>názov</td>
            <td>popis</td>
            <td>modul</td>
            <td></td>
        </tr>
    </thead>
    <tbody>
    {#each data.data as application}
    <tr>
        <td>{application.code}</td>
        <td>{application.name}</td>
        <td>{application.description}</td>
        <td>{application.module_type.name}</td>
        <td><a href={UI_APPLICATION_GET(application)}>pozri</a></td>
    </tr>
    {/each}
    </tbody>
</table>
