<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { create_post_request, enum_to_name, UI_RISK_ANALYSIS_PROCESS_WORKFLOW } from '$lib';
	import type { PageProps } from './$types';
	let { data = $bindable() }: PageProps = $props();

   let elementary_threat_risk_treatment_list = $state(data.elementary_threat_risk_treatment_list);
   let specific_threat_risk_treatment_list = $state(data.specific_threat_risk_treatment_list);
    
    const color_by_risk = (e:any): string => {
        if(e === 0) {
             return "low-risk";           
        } else if (e === 1)   {
            return "medium-risk";
        } else if (e === 2)   {
            return "high-risk";
        } else {
            return "very-high-risk"
        }
    }

    
    async function update_elementary_threat_risk_treatment(threat: any) {
        const post_data = {
            potential_risk: threat.potential_risk,
            remaining_risk: threat.remaining_risk,
            risk_treatment: threat.risk_treatment,
            description: threat.description,
        };

        const res = await fetch(
            UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_3_1_risk_treatment_elementary_update(data.params, threat.tour_elementary_threat_code), 
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

        alert("Ošetrenie elementarnej hrozby bola úspešné aktualizované")
        invalidateAll()
    }

    async function update_specific_threat_risk_treatment(threat: any) {
        const post_data = {
            potential_risk: threat.potential_risk,
            remaining_risk: threat.remaining_risk,
            risk_treatment: threat.risk_treatment,
            description: threat.description,
        };

        const res = await fetch(
            UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_3_1_risk_treatment_specific_update(data.params, threat.tour_specific_threat_code), 
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

        alert("Ošetrenie špecifickej hrozby bola úspešné aktualizované")
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
<h1>Ošetrenie rizík {data.params.asset}</h1>
<small><a href={UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_3_risk_treatment(data.params)}>Vráť sa o krok vyššie.</a> </small>
<br> <br>

<b>Kód:</b> {data.params.asset} <br>
<b>Názov:</b>{data.asset.name}<br>
<b>Dôvernosť:</b> {enum_to_name(data.asset.confidentiality_protection_needs, data.protection_needs_enum)}<br>
<b>Integrita:</b> {enum_to_name(data.asset.integrity_protection_needs, data.protection_needs_enum)}<br>
<b>Dostupnosť:</b> {enum_to_name(data.asset.availability_protection_needs, data.protection_needs_enum)}<br>
<br>

V tomto kroku vyhodnotíte riziká vyplývajúce z elementárnych a špecifckých hrozieb.

<br> <br>

<h2>Elementárne hrozby</h2>
{#each elementary_threat_risk_treatment_list as elementary_threat_risk_treatment}
<div class="box">
    <h3>Hrozba {enum_to_name(elementary_threat_risk_treatment.tour_elementary_threat_code, data.elementary_threat_enum)}</h3>
    <b>Riziko bez dodatočných bezpečnostných opatrení:</b> <em class={color_by_risk(elementary_threat_risk_treatment.potential_risk)}>
        {enum_to_name(elementary_threat_risk_treatment.potential_risk, data.potential_risk_enum)}
    </em>
     <br>
     <b>Riziko s dodatočnými bezpečnostnými opatreniami:
        <select bind:value={elementary_threat_risk_treatment.remaining_risk}>
        {#each data.potential_risk_enum as potential_risk}
        <option value={potential_risk.code}>{potential_risk.name}</option>
        {/each}
        </select>
        <br>
     <b>Ošetrenie rizika:
        <select bind:value={elementary_threat_risk_treatment.risk_treatment}>
        {#each data.risk_treatment_enum as risk_treatment}
        <option value={risk_treatment.code}>{risk_treatment.name}</option>
        {/each}
        </select>
        <br><br>
    <b>Popis:</b><br>
    <textarea bind:value={elementary_threat_risk_treatment.description} cols=100 rows=4></textarea><br>

    <input type="button" onclick={() => update_elementary_threat_risk_treatment(elementary_threat_risk_treatment)} value="✔ aktualizuj">
</div>
{/each}
<h2>Špeficické hrozby</h2>
{#each specific_threat_risk_treatment_list as specific_threat_risk_treatment}
<div class="box">
    <h3>Hrozba {specific_threat_risk_treatment.tour_specific_threat_code}</h3>
    <b>Riziko bez dodatočných bezpečnostných opatrení:</b> <em class={color_by_risk(specific_threat_risk_treatment.potential_risk)}>
        {enum_to_name(specific_threat_risk_treatment.potential_risk, data.potential_risk_enum)}
    </em>
     <br>
     <b>Riziko s dodatočnými bezpečnostnými opatreniami:
        <select bind:value={specific_threat_risk_treatment.remaining_risk}>
        {#each data.potential_risk_enum as potential_risk}
        <option value={potential_risk.code}>{potential_risk.name}</option>
        {/each}
        </select>
        <br>
     <b>Ošetrenie rizika:
        <select bind:value={specific_threat_risk_treatment.risk_treatment}>
        {#each data.risk_treatment_enum as risk_treatment}
        <option value={risk_treatment.code}>{risk_treatment.name}</option>
        {/each}
        </select>
        <br><br>
    <b>Popis:</b><br>
    <textarea bind:value={specific_threat_risk_treatment.description} cols=100 rows=4></textarea><br>

    <input type="button" onclick={() => update_specific_threat_risk_treatment(specific_threat_risk_treatment)} value="✔ aktualizuj">
</div>
{/each}