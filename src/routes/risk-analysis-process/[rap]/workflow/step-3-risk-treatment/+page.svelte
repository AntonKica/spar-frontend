<script lang="ts">
	import { UI_RISK_ANALYSIS_PROCESS_WORKFLOW, enum_to_name } from '$lib';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>
<style>
</style>
<h1>Ošetrenie rizík</h1>
<small><a href={UI_RISK_ANALYSIS_PROCESS_WORKFLOW.view(data.params.rap)}>Vráť sa o krok vyššie.</a></small>
<br> <br>

<table>
    <thead>
        <tr>
            <th>kód aktíva</th>
            <th>názov aktíva</th>
            <th>ošetrenie rizík</th>
        </tr>
    </thead>
    <tbody>
{#each data.threat_overview_list as tour }
        <tr>
        <td>{tour.asset_code}</td>
        <td>{tour.asset_name}</td>
        <td>
            <a href={UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_3_1_risk_treatment(data.params, tour.asset_code)}>POZRI</a>
        </td>
        </tr>
{/each}
    </tbody>
</table>