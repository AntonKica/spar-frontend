<script lang="ts">
	import { page } from '$app/state';
	import { step_complete } from '$lib';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
    let {threat_summary_list, asset_summary_list, risk_acceptance_matrix, risk_avoidance_matrix, risk_transfer_matrix } = data.risk_acceptance_summary;

    
</script>

<h1>Sumár ošetrenia rizík</h1>
<small><a href={`/risk-analysis-process/${page.params.rap_code}/step`}>Vráť sa o krok vyššie.</a> </small>
<br> <br>

<div class="h1 pb-2 mb-4 text-dark border-bottom border-dark">Akceptovanie rizík</div>
<table class="table table-bordered caption-top">
    <thead>
        <tr>
            <th></th>
        {#each asset_summary_list as asset}
            <th class="text-center">
                <div class="fw-bold">{asset.code}</div>
                <div class="fw-normal fst-italic"><small>{asset.name}</small></div>
            </th>
        {/each}
        </tr>
    </thead>
    <tbody>
    {#each threat_summary_list as threat, i}
        <tr>
            <td>
                <div class="fw-bold">{threat.code}</div>
                <div class="fw-normal fst-italic"><small>{threat.name}</small></div>
            </td>
            {#each risk_acceptance_matrix as risk_acceptance}
            <td class="text-center">
                    {#if risk_acceptance[i]}
                        <div class="fw-bold">{risk_acceptance[i].code}</div>
                        <div class="fw-normal fst-italic"><small>{risk_acceptance[i].name}</small></div>
                    {:else}
                    -   
                    {/if}
            </td>
            {/each}
        </tr>
    {/each}
    </tbody>
</table>

<div class="h1 pb-2 mb-4 text-dark border-bottom border-dark">Vyhnutie sa rizík</div>
<table class="table table-bordered caption-top">
    <thead>
        <tr>
            <th></th>
        {#each asset_summary_list as asset}
            <th class="text-center">
                <div class="fw-bold">{asset.code}</div>
                <div class="fw-normal fst-italic"><small>{asset.name}</small></div>
            </th>
        {/each}
        </tr>
    </thead>
    <tbody>
    {#each threat_summary_list as threat, i}
        <tr>
            <td>
                <div class="fw-bold">{threat.code}</div>
                <div class="fw-normal fst-italic"><small>{threat.name}</small></div>
            </td>
            {#each risk_avoidance_matrix as risk_avoidance}
            <td class="text-center">
                    {#if risk_avoidance[i]}
                        <div class="fw-bold">{risk_avoidance[i].code}</div>
                        <div class="fw-normal fst-italic"><small>{risk_avoidance[i].name}</small></div>
                    {:else}
                    -   
                    {/if}
            </td>
            {/each}
        </tr>
    {/each}
    </tbody>
</table>

<div class="h1 pb-2 mb-4 text-dark border-bottom border-dark">Prenesenie rizika</div>
<table class="table table-bordered caption-top">
    <thead>
        <tr>
            <th></th>
        {#each asset_summary_list as asset}
            <th class="text-center">
                <div class="fw-bold">{asset.code}</div>
                <div class="fw-normal fst-italic"><small>{asset.name}</small></div>
            </th>
        {/each}
        </tr>
    </thead>
    <tbody>
    {#each threat_summary_list as threat, i}
        <tr>
            <td>
                <div class="fw-bold">{threat.code}</div>
                <div class="fw-normal fst-italic"><small>{threat.name}</small></div>
            </td>
            {#each risk_transfer_matrix as risk_transfer}
            <td class="text-center">
                    {#if risk_transfer[i]}
                        <div class="fw-bold">{risk_transfer[i].code}</div>
                        <div class="fw-normal fst-italic"><small>{risk_transfer[i].name}</small></div>
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