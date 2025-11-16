<script lang="ts">
	import { UI_RISK_ANALYSIS_PROCESS_WORKFLOW, enum_to_name, create_post_request } from '$lib';
    import { goto } from '$app/navigation'
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();

    async function finish_step(threat: any) {
        const res = await fetch(
            UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_1_threat_overview_finish(data.rap), 
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

        alert("Identifikácia relevantných hrozieb bola zakončená!")
        goto(UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_2_risk_classification(data.rap))
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
<h1>Určenie relevantných hrozieb</h1>
<small><a href={UI_RISK_ANALYSIS_PROCESS_WORKFLOW.view(data.rap)}>Vráť sa o krok vyššie.</a></small>
<br> <br>

V tomto kroku identifikujete relevantné hrozby pre každý cieľový objekt na posúdenie.

<h2>Ukončenie kroku</h2>

Určenie relevantných hrozieb pre cieľové objekty na preskǔmanie sme dokončili. <input type="button" onclick={finish_step} value="Prejsť na ďalší krok: klasifikáciu rizík.">


<h2>Prehľad aktív a identifikovaných hrozieb</h2>

<table>
    <thead>
        <tr>
            <th>kód aktíva</th>
            <th>názov aktíva</th>
            <th>dôvernosť</th>
            <th>integrita</th>
            <th>dostupnosť</th>
            <th>identifikované základné hrozby</th>
            <th>identifikované dodatočné hrozby</th>
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
        <td class={tour.identified_basic_threat ? "good" : "bad"}>
            {tour.identified_basic_threat ? "✅" : "❌"}
            <a href={UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_1_1_elementary_threat(data.rap, tour.asset_code)}> UPRAV</a>
        </td>
        <td class={tour.identified_specific_threat ? "good" : "bad"}>
            {tour.identified_specific_threat ? "✅" : "❌"}
            <a href={UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_1_2_specific_threat(data.rap, tour.asset_code)}>UPRAV</a>
        </td>
        </tr>
{/each}
    </tbody>
</table>
<!-- ASSETS AND THEIR STATUS -->