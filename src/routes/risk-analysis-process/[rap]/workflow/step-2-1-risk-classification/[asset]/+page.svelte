<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { create_post_request, enum_to_name, RISK_CLASSIFICATION_MATRIX, UI_RISK_ANALYSIS_PROCESS_WORKFLOW } from '$lib';
	import type { PageProps } from './$types';
	let { data = $bindable() }: PageProps = $props();

   let elementary_threat_risk_classification_list = $state(data.elementary_threat_risk_classification_list);
   let specific_threat_risk_classification_list = $state(data.specific_threat_risk_classification_list);
    
    const color_by_risk = (e:any): string => {
        const risk = RISK_CLASSIFICATION_MATRIX(e.frequency_of_occurrence, e.potential_damage);
        if(risk === 0) {
             return "low-risk";           
        } else if (risk === 1)   {
            return "medium-risk";
        } else if (risk === 2)   {
            return "high-risk";
        } else {
            return "very-high-risk"
        }
    }

    
    async function update_elementary_threat_risk_classification(threat: any) {
        const post_data = {
            frequency_of_occurrence: threat.frequency_of_occurrence,
            potential_damage: threat.potential_damage,
            name: threat.name,
            description: threat.description,
            evaluation: threat.evaluation,
        };

        const res = await fetch(
            UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_2_1_risk_classification_elementary_update(data.params, threat.tour_elementary_threat_code), 
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

        alert("Klasifikácia elementarnej hrozby bola úspešné aktualizovaná")
        invalidateAll()
    }

    async function update_specific_threat_risk_classification(threat: any) {
        const post_data = {
            frequency_of_occurrence: threat.frequency_of_occurrence,
            potential_damage: threat.potential_damage,
            name: threat.name,
            description: threat.description,
            evaluation: threat.evaluation,
        };

        const res = await fetch(
            UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_2_1_risk_classification_specific_update(data.params, threat.tour_specific_threat_code), 
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

        alert("Klasifikácia elementarnej hrozby bola úspešné aktualizovaná")
        invalidateAll()
    }

</script>
<style>
    .box {
        background-color: ghostwhite;
        border: 2px solid black;
        margin: 20px;
        padding: 20px;
        width: 90%;
    }
    .low-risk {
        color: #008000;
    }
    .medium-risk {
        color: #E4D00A;
    }
    .high-risk {
        color: #ffb700;
    }
    .very-high-risk {
        color: crimson;
    }
</style>
<h1>Klasifikácia rizík  </h1>
<small><a href={UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_2_risk_classification(data.rap)}>Vráť sa o krok vyššie.</a> </small>
<br> <br>

<b>Kód:</b> {data.rap} <br>
<b>Názov:</b>{data.asset.name}<br>
<b>Dôvernosť:</b> {enum_to_name(data.asset.confidentiality_protection_needs, data.protection_needs_enum)}<br>
<b>Integrita:</b> {enum_to_name(data.asset.integrity_protection_needs, data.protection_needs_enum)}<br>
<b>Dostupnosť:</b> {enum_to_name(data.asset.availability_protection_needs, data.protection_needs_enum)}<br>
<br>

V tomto kroku vyhodnotíte riziká vyplývajúce z elementárnych a špecifckých hrozieb.

<br> <br>

<h2>Elementárne hrozby</h2>
{#each elementary_threat_risk_classification_list as elementary_threat_risk_classification}
<div class="box">
    <h3>Hrozba {enum_to_name(elementary_threat_risk_classification.tour_elementary_threat_code, data.elementary_threat_enum)}</h3>
    <!--<b>Narušené základné hodnoty:</b> {elementary_threat_risk_classificatio.core_values_impaired} <br>-->
    <b>Frekvencia:</b>
        <select bind:value={elementary_threat_risk_classification.frequency_of_occurrence}>
        {#each data.frequency_of_occurrence_enum as frequency_of_occurrence}
        <option value={frequency_of_occurrence.code}>{frequency_of_occurrence.name}</option>
        {/each}
        </select>
    <br>

    <b>Rozsah poškodenia:</b>
        <select bind:value={elementary_threat_risk_classification.potential_damage}>
        {#each data.potential_damage_enum as potential_damage}
        <option value={potential_damage.code}>{potential_damage.name}</option>
        {/each}
        </select>
    <br>

    <b>Riziko bez dodatočných bezpečnostných opatrení:</b> <em class={color_by_risk(elementary_threat_risk_classification)}>{enum_to_name(
        RISK_CLASSIFICATION_MATRIX(elementary_threat_risk_classification.frequency_of_occurrence, elementary_threat_risk_classification.potential_damage),
    data.potential_risk_enum
    )}
    </em>
     <br>
    <b>Popis:</b><br>
    <textarea bind:value={elementary_threat_risk_classification.description} cols=100 rows=4></textarea><br>

    <b>Vyhodnotenie:</b><br>
    <textarea bind:value={elementary_threat_risk_classification.evaluation} cols=100 rows=4></textarea><br>

    <input type="button" onclick={() => update_elementary_threat_risk_classification(elementary_threat_risk_classification)} value="✔ aktualizuj">
</div>
{/each}
<h2>Špecifické hrozby</h2>
{#each specific_threat_risk_classification_list as specific_threat_risk_classification}
<div class="box">
    <h3>Hrozba {specific_threat_risk_classification.tour_specific_threat_code}</h3>
    <!--<b>Narušené základné hodnoty:</b> {elementary_threat_risk_classificatio.core_values_impaired} <br>-->
    <b>Frekvencia:</b>
        <select bind:value={specific_threat_risk_classification.frequency_of_occurrence}>
        {#each data.frequency_of_occurrence_enum as frequency_of_occurrence}
        <option value={frequency_of_occurrence.code}>{frequency_of_occurrence.name}</option>
        {/each}
        </select>
    <br>

    <b>Rozsah poškodenia:</b>
        <select bind:value={specific_threat_risk_classification.potential_damage}>
        {#each data.potential_damage_enum as potential_damage}
        <option value={potential_damage.code}>{potential_damage.name}</option>
        {/each}
        </select>
    <br>

    <b>Riziko bez dodatočných bezpečnostných opatrení:</b> <em class={color_by_risk(specific_threat_risk_classification)}>{enum_to_name(
        RISK_CLASSIFICATION_MATRIX(specific_threat_risk_classification.frequency_of_occurrence, specific_threat_risk_classification.potential_damage),
    data.potential_risk_enum
    )}
    </em>
     <br>
    <b>Popis:</b><br>
    <textarea bind:value={specific_threat_risk_classification.description} cols=100 rows=4></textarea><br>

    <b>Vyhodnotenie:</b><br>
    <textarea bind:value={specific_threat_risk_classification.evaluation} cols=100 rows=4></textarea><br>

    <input type="button" onclick={() => update_specific_threat_risk_classification(specific_threat_risk_classification)} value="✔ aktualizuj">
</div>
{/each}