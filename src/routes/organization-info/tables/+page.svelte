<script lang="ts">
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();

    function in_relation(application: any, business_process: any): boolean {
        return data.business_process_application_list.find((bpa:any)=> bpa.business_process_code == business_process.code && bpa.application_code == application.code) !== undefined;
    }
</script>

<h1>Biznisové procesy x aplikácie</h1>

<table>
    <thead>
        <tr>
            <td>biznisovný proces / aplikácie</td>
            {#each data.business_process_list as business_process}
            <td>{business_process.code}<br><small>{business_process.name}</small></td>
            {/each}
        </tr>
    </thead>
    <tbody>
    {#each data.application_list as application}
    <tr>
        <td>{application.code}<br><small>{application.name}</small></td>
        {#each data.business_process_list as business_process}
        <td>
            {#if in_relation(application, business_process)}X{/if}
        </td>
        {/each}
    </tr>
    {/each}
    </tbody>
</table>
