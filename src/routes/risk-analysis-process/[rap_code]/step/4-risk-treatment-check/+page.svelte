<script lang="ts">
	import { page } from '$app/state';
    
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
    let {threat_summary_list, asset_summary_list, risk_treatment_matrix } = data.risk_treatment_summary;
</script>

<h1>Sumár ošetrenia rizík</h1>
<small><a href={`/risk-analysis-process/${page.params.rap_code}/step`}>Vráť sa o krok vyššie.</a> </small>
<br> <br>

<div class="h1 pb-2 mb-4 text-dark border-bottom border-dark">Matica opatrení</div>
<table class="table table-bordered table-striped caption-top">
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
            {#each risk_treatment_matrix as risk_acceptance_list}
            <td class="text-center">
                <div class="row justify-content-around">
                    {#each risk_acceptance_list[i] as risk_acceptance}
                    <div class="col-auto">
                        <div class="fw-bold">{risk_acceptance.code}</div>
                        <div class="fw-normal fst-italic"><small>{risk_acceptance.name}</small></div>
                    </div>
                    {/each}
                </div>
            </td>
            {/each}
        </tr>
    {/each}
    </tbody>
</table>
<!--
<div class="h1 pb-2 mb-4 text-dark border-bottom border-dark">Redukovanie rizík</div>
<div class="container p5">
<StaticTree raw_nodes={data.risk_treatment_summary.risk_reduction_nodes} raw_links={data.risk_treatment_summary.risk_reduction_lines} width={800} height={500} /> 
</div>
-->