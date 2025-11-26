<script lang="ts">
	import { page } from '$app/state';
	import { color_by_risk, enum_to_name } from '$lib';
	import type { PageProps } from './$types';
	const { data }: PageProps = $props();
    
    const { tour } = data;
    const tour_risk_classification_list = $state(data.tour_risk_classification_list)
</script>
<h1>Ošetrenie rizík</h1>
<small><a href={`/risk-analysis-process/${page.params.rap_code}/step/4-risk-treatment`}>Vráť sa o krok vyššie.</a> </small>
<br> <br>

<b>Kód:</b> {tour.code} <br>
<b>Názov:</b>{tour.name}<br>


<table class="table table-striped">
    <thead>
        <tr>
            <th>kód hrozby</th>
            <th>názov hrozby</th>
            <th>potenciálne rizko</th>
            <th>vybraná forma ošetrenia</th>
            <th colspan="4" class="text-center">ošetri riziko</th>
        </tr>
    </thead>
    <tbody>
{#each tour_risk_classification_list as tour_risk_classification}
        <tr>
        <td>{tour_risk_classification.threat_code}</td>
        <td>{tour_risk_classification.threat_name}</td>
        <td style="background-color: {color_by_risk(tour_risk_classification)}">{enum_to_name(tour_risk_classification.risk, data.threat_risk_enum)}</td>
        <td>
        {#if tour_risk_classification.treatment_type !== null}
            {enum_to_name(tour_risk_classification.treatment_type, data.risk_treatment_enum)}
            {:else}
            -
            {/if}
        </td>
        <td><a class="btn btn-primary" href={`/risk-analysis-process/${page.params.rap_code}/step/4-risk-treatment/${page.params.tour_code}/${tour_risk_classification.threat_code}/accept`}>akceptuj</a></td>
        <td><a class="btn btn-primary" href={`/risk-analysis-process/${page.params.rap_code}/step/4-risk-treatment/${page.params.tour_code}/${tour_risk_classification.threat_code}/avoida`}>vyhni sa</a></td>
        <td><a class="btn btn-primary" href={`/risk-analysis-process/${page.params.rap_code}/step/4-risk-treatment/${page.params.tour_code}/${tour_risk_classification.threat_code}/transfer`}>prenes</a></td>
        <td><a class="btn btn-primary" href={`/risk-analysis-process/${page.params.rap_code}/step/4-risk-treatment/${page.params.tour_code}/${tour_risk_classification.threat_code}/reduce`}>redukuj</a></td>
        </tr>
{/each}
    </tbody>
</table>