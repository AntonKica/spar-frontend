<script lang="ts">
	import { UI_ROLE_GET } from '$lib/routes';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<h1>Roly</h1>

<table>
    <thead>
        <tr>
            <td>kód</td>
            <td>názov</td>
            <td>popis</td>
            <td></td>
        </tr>
    </thead>
    <tbody>
    {#each data.data as role}
    <tr>
        <td>{role.code}</td>
        <td>{role.name}</td>
        <td>{role.description}</td>
        <td><a href={UI_ROLE_GET(role)}>pozri</a></td>
    </tr>
    {/each}
    </tbody>
</table>
