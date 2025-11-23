<script lang="ts">
	import type { PageProps } from './$types';
	import {UI_ENUM_BSI_IT_GRUNDSHUTZ_ELEMENTARY_THREAT_GET} from '$lib/routes';
	import { enum_to_name, UI_RISK_ANALYSIS_PROCESS_WORKFLOW } from '$lib';
	let { data }: PageProps = $props();
</script>

<h1>Prehľad procesov analýzy rizík</h1>

<small><a href={UI_RISK_ANALYSIS_PROCESS_WORKFLOW.ui()}>Vráť sa o krok vyššie.</a> </small>
<br> <br>

<table class="table table-striped">
    <thead>
        <tr>
            <td>kód</td>
            <td>dátum</td>
            <td>krok</td>
            <td>status</td>
            <td>pozri</td>
        </tr>
    </thead>
    <tbody>
    {#each data.rap_list as rap}
    <tr>
        <td>{rap.code}</td>
        <td>{rap.created_on}</td>
        <td>{enum_to_name(rap.process_step, data.process_step_enum)}</td>
        <td>{enum_to_name(rap.process_status, data.process_status_enum)}</td>
        <td><a href={`/risk-analysis-process/${rap.code}/step`}>pozri</a></td>
    </tr>
    {/each}
    </tbody>
</table>
