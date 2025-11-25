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
        <td style="background-color: {color_by_risk({risk:RISK_CLASSIFICATION_MATRIX(tour_risk_classification)})}">
                {enum_to_name(RISK_CLASSIFICATION_MATRIX(tour_risk_classification), data.threat_risk_enum)}
        </td>
        <td>-</td>
        <td><a class="btn btn-primary" href={`/risk-analysis-process/${page.params.rap_code}/step/4-risk-treatment/${page.params.tour_code}/${tour_risk_classification.threat_code}/accept`}>akceptuj</a></td>
        <td><a class="btn btn-primary" href={`/risk-analysis-process/${page.params.rap_code}/step/4-risk-treatment/${page.params.tour_code}/${tour_risk_classification.threat_code}/avoida`}>vyhni sa</a></td>
        <td><a class="btn btn-primary" href={`/risk-analysis-process/${page.params.rap_code}/step/4-risk-treatment/${page.params.tour_code}/${tour_risk_classification.threat_code}/transfer`}>prenes</a></td>
        <td><a class="btn btn-primary" href={`/risk-analysis-process/${page.params.rap_code}/step/4-risk-treatment/${page.params.tour_code}/${tour_risk_classification.threat_code}/reduce`}>redukuj</a></td>
        </tr>
{/each}
    </tbody>
</table>