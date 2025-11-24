<script lang="ts">
	import { page } from '$app/state';
	import { color_by_risk, enum_to_name, step_complete } from '$lib';
	import RiskMatrix from '$lib/RiskMatrix.svelte';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();

    
</script>

<h1>Kontrola potenciálnych rizík</h1>
<small><a href={`/risk-analysis-process/${page.params.rap_code}/step`}>Vráť sa o krok vyššie.</a> </small>
<br> <br>

<RiskMatrix
    threat_probability_enum = {data.threat_probability_enum}
    threat_impact_enum = {data.threat_impact_enum}
    threat_risk_enum = {data.threat_risk_enum}
/>

<div class="h1 pb-2 mb-4 text-dark border-bottom border-dark">Aktíva, hrozby a riziká</div>
<table class="table caption-top">
    <thead>
        <tr>
            <th></th>
        {#each data.tour_risk_classification_list as tour}
            <th>
                <div class="fw-bold">{tour.tour_code}</div>
                <div class="fw-normal fst-italic"><small>{tour.tour_name}</small></div>
            </th>
        {/each}
        </tr>
    </thead>
    <tbody>
    {#each data.threat_list as threat}
        <tr>
            <td>
                <div class="fw-bold">{threat.code}</div>
                <div class="fw-normal fst-italic"><small>{threat.name}</small></div>
            </td>
            {#each threat.tour_list as tour}

            <td class="text-center" style="background-color: {color_by_risk(tour)}">
                    {#if tour}
                        {enum_to_name(tour.risk, data.threat_risk_enum)}
                    {:else}
                    -   
                    {/if}
            </td>
            {/each}
        </tr>
    {/each}
    </tbody>
</table>

<div class="alert alert-info" role="alert">
  <h4 class="alert-heading">Ukončenie klasifikácie rizík</h4>
  <p>V prípade, že ste spokojní s klasifikáciou rizík, prejdite do ďalšieho kroku.</p>
  <button class="btn btn-success" onclick={() => step_complete(page.params.rap_code, data.rap.process_step)}>Potvrdiť a prejsť do ďalšieho kroku</button>
</div>