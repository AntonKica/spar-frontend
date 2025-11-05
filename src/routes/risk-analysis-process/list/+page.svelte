<script lang="ts">
	import type { PageProps } from './$types';
	import {UI_ENUM_BSI_IT_GRUNDSHUTZ_ELEMENTARY_THREAT_GET} from '$lib/routes';
	import { UI_RISK_ANALYSIS_PROCESS_WORKFLOW } from '$lib';
	let { data }: PageProps = $props();
</script>

<h1>Prehľad procesov analýzy rizík</h1>

<small><a href={UI_RISK_ANALYSIS_PROCESS_WORKFLOW.ui()}>Vráť sa o krok vyššie.</a> </small>
<br> <br>

<table>
    <thead>
        <tr>
            <td>kód</td>
            <td>dátum</td>
            <td>pozri</td>
        </tr>
    </thead>
    <tbody>
    {#each data.risk_analysis_process_list as risk_analysis_process}
    <tr>
        <td>{risk_analysis_process.code}</td>
        <td>{risk_analysis_process.created_on}</td>
        <td><a href={UI_RISK_ANALYSIS_PROCESS_WORKFLOW.view(risk_analysis_process.code)}>pozri</a></td>
    </tr>
    {/each}
    </tbody>
</table>
