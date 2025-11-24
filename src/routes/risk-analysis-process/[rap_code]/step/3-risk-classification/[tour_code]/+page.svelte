<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
	import { color_by_risk, create_post_request, enum_to_name, RISK_CLASSIFICATION_MATRIX } from '$lib';
    import AssetProtectionNeedsTable from '$lib/AssetProtectionNeedsTable.svelte';
	import ElementaryThreatImpactTable from '$lib/ElementaryThreatImpactTable.svelte';
	import RiskMatrix from '$lib/RiskMatrix.svelte';
	import type { PageProps } from './$types';
	const { data }: PageProps = $props();
    
    const { tour } = data;

    const tour_risk_classification_list = $state(data.tour_risk_classification_list)
    
    async function post(classification: any) {

        const post_data = {
            probability: classification.probability,
            impact: classification.impact,
            evaluation: classification.evaluation,
        };

        const res = await fetch(
            `/svc/step-3-risk-classification/${page.params.rap_code}/${page.params.tour_code}/classify/${classification.threat_code}`,
            create_post_request(post_data)
        );

        if(res.status != 200) {
            alert("Chyba pri aktualizácií: " + res.statusText)
            return;
        }
         
		const json = await res.json()
        if (json.status != "ok") {
            alert("Chyba pri aktualizácií" + json.message)
            return;
        }

        alert(`Klasifikácia ${classification.threat_code} bola úspešné aktualizovaná`)
        invalidateAll()
    }
</script>
<h1>Klasifikácia rizík</h1>
<small><a href={`/risk-analysis-process/${page.params.rap_code}/step/3-risk-classification`}>Vráť sa o krok vyššie.</a> </small>
<br> <br>

<div class="row">
<div class="col">
    <b>Kód:</b> {tour.code} <br>
    <b>Názov:</b>{tour.name}<br>
</div>
<div class="col">
    <AssetProtectionNeedsTable
        asset={tour}
        protection_needs_enum={data.protection_needs_enum}
    ></AssetProtectionNeedsTable>
    </div>
</div>
<br>


<RiskMatrix
    threat_probability_enum = {data.threat_probability_enum}
    threat_impact_enum = {data.threat_impact_enum}
    threat_risk_enum = {data.threat_risk_enum}
/>

{#each tour_risk_classification_list as tour_risk_classification}
<div class="row justify-content-between border-start border-dark text-bg-light ms-3 me-3 p-2">
    <div class="row justify-content-between">
        <div class="col-6">
            <div class="h2 pb-2 mb-4 text-dark border-bottom border-dark">
                {tour_risk_classification.threat_code} {tour_risk_classification.threat_name}
            </div>
            <b>Pravdepodobnosť:</b> 
            <select id="probability" class="form-select" bind:value={tour_risk_classification.probability}>
            {#each data.threat_probability_enum as threat_probability}
                <option value={threat_probability.code}>{threat_probability.name}</option>
            {/each}
            </select>
            <b>Dopad:</b> 
            <select id="impact" class="form-select" bind:value={tour_risk_classification.impact}>
            {#each data.threat_impact_enum as threat_impact}
                <option value={threat_impact.code}>{threat_impact.name}</option>
            {/each}
            </select><br>
            <b>Vysvetlenie:</b> 
            <textarea class="form-control" id="explanation" rows="3" bind:value={tour_risk_classification.evaluation}></textarea> <br>

            <button class="btn btn-success" onclick={() => post(tour_risk_classification)}>Uložiť klasifickáciu</button>
        </div>
        <div class="col-5">
            <ElementaryThreatImpactTable threat={tour_risk_classification}/>
            <b>Riziko bez dodatočných bezpečnostných opatrení:</b>
            <em style="background-color: {color_by_risk({risk:RISK_CLASSIFICATION_MATRIX(tour_risk_classification)})}">
                {enum_to_name(RISK_CLASSIFICATION_MATRIX(tour_risk_classification), data.threat_risk_enum)}
            </em><br>
        </div>
    </div>
</div>
<br>
{/each}