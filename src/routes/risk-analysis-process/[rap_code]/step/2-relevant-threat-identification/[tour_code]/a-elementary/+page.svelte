<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
	import { create_post_request, enum_to_name, UI_RISK_ANALYSIS_PROCESS_WORKFLOW } from '$lib';
	import type { PageProps } from './$types';
	let { data = $bindable() }: PageProps = $props();
    let filter = $state(-1)

</script>
<h1>Identifikácia relevantných elementárnych hrozieb</h1>

<small><a href={`/risk-analysis-process/${page.params.rap_code}/step/2-relevant-threat-identification`}>Vráť sa o krok vyššie.</a> </small>
<table class="table table-striped">
    <thead>
        <tr>
            <th style="width: 10%;">kód</th>
            <th style="width: 60%;">názov</th>
            <th style="width: 15%;">stav
                <select bind:value={filter}>
                    <option value={-1}>všetky</option>
                    {#each data.elementary_threat_relevance_enum as elementary_threat_relevance}
                    <option value={elementary_threat_relevance.code}>{elementary_threat_relevance.name}</option>
                    {/each}
                </select>
            </th>
            <th style="width: 15%;">posúď</th>
        </tr>
    </thead>
    <tbody>
{#each data.elementary_threat_list as elementary_threat}
        <tr hidden={elementary_threat.relevance !== filter && filter !== -1}>
        <td>{elementary_threat.code}</td>
        <td>{elementary_threat.name}</td>
        <td>{enum_to_name(elementary_threat.relevance, data.elementary_threat_relevance_enum)}</td>
        <td><a class="btn btn-primary" href={`/risk-analysis-process/${page.params.rap_code}/step/2-relevant-threat-identification/${page.params.tour_code}/a-elementary/${elementary_threat.code}/review`}>posúď</a> </td>
        </tr>
{/each}
    </tbody>
</table>