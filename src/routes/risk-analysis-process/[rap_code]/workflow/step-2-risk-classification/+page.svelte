<script lang="ts">
	import { UI_RISK_ANALYSIS_PROCESS_WORKFLOW, create_post_request, enum_to_name } from '$lib';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();

    async function finish_step(threat: any) {
        const res = await fetch(
            UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_2_risk_classification_finish(data.params), 
            create_post_request({})
        );
        
        if(res.status != 200) {
            alert("Chyba pri zakončení kroku: " + res.statusText)
            return;
        }
         
		const json = await res.json()
        if (json.status != "ok") {
            alert("Chyba pri zakončení kroku: " + json.message)
            return;
        }

        alert("Klasifikácia rizík bola zakončená!")
        goto(UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_2_risk_classification(data.params))
    }
</script>
<style>
    .box {
        background-color: lightgray;
        border: 2px solid black;
        margin: 20px;
        padding: 20px;
        width: 10em;
        height: 10em;
    }

    .bad {
        background-color: lightcoral;
    }
    .good {
        background-color: greenyellow;
    }
</style>
<h1>Klasifikácia rizík</h1>
<small><a href={UI_RISK_ANALYSIS_PROCESS_WORKFLOW.view(data.params.rap)}>Vráť sa o krok vyššie.</a></small>
<br><br>

Klasifikáciu rizík pre cieľové objekty na preskǔmanie sme dokončili. <input type="button" onclick={finish_step} value="Prejsť na ďalší krok: ošetrenie rizka.">
<br>
<br>

<table>
    <thead>
        <tr>
            <th>kód aktíva</th>
            <th>názov aktíva</th>
            <th>dôvernosť</th>
            <th>integrita</th>
            <th>dostupnosť</th>
            <th>klasifikované riziká</th>
        </tr>
    </thead>
    <tbody>
{#each data.threat_overview_list as tour }
        <tr>
        <td>{tour.asset_code}</td>
        <td>{tour.asset_name}</td>
        <td>{enum_to_name(tour.confidentiality_protection_needs, data.protection_needs_enum)}</td>
        <td>{enum_to_name(tour.integrity_protection_needs, data.protection_needs_enum)}</td>
        <td>{enum_to_name(tour.availability_protection_needs, data.protection_needs_enum)}</td>
        <td>
            <a href={UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_2_1_risk_classification(data.rap_code, tour.asset_code)}>POZRI</a>
        </td>
        </tr>
{/each}
    </tbody>
</table>
<!-- ASSETS AND THEIR STATUS -->