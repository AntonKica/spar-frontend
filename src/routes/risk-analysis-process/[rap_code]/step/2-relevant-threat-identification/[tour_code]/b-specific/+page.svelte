<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
	import { create_post_request, enum_to_name } from '$lib';
	import type { PageProps } from './$types';
	let { data = $bindable() }: PageProps = $props();

    let name = $state("")
    let descriptiun = $state("")
    let confidentiality_impaired = $state(false)
    let integrity_impaired = $state(false)
    let availability_impaired = $state(false)

    async function create_specific_threat() {
        const res = await fetch(
            UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_1_2_specific_create(data.rap, data.asset), 
            create_post_request(specific_threat_create_data)
        );

        if(res.status != 200) {
            alert("Chyba pri vytvarani: " + res.statusText)
            return;
        }
         
		const json = await res.json()
        if (json.status != "ok") {
            alert("Chyba pri vytvarani" + json.message)
            return;
        }

        alert("Špecifická hrozba bola úspešné pridaná")
        invalidateAll()
    }
</script>
<h1>Identifikácia relevantných špecifických hrozieb</h1>

<small><a href={`/risk-analysis-process/${page.params.rap_code}/step/2-relevant-threat-identification`}>Vráť sa o krok vyššie.</a> </small>

<div class="h4 pb-2 mb-4 text-dark border-bottom border-dark">Definuj novú špefickú hrozbu</div>
<label>Názov <input type="text" bind:value={name}></label><br><br>
<label>Popis<br><textarea bind:value={descriptiun} cols="100" rows="6"></textarea></label> <br>
<label>C <input type="checkbox" bind:checked={confidentiality_impaired}></label>
<label>I <input type="checkbox" bind:checked={confidentiality_impaired}></label>
<label>A <input type="checkbox" bind:checked={confidentiality_impaired}></label><br>

<input class="btn btn-success" onclick={create_specific_threat} value="Pridaj novú špecifickú hrozbu">
<hr>
<div class="h4 pb-2 mb-4 text-dark border-bottom border-dark">Špefické hrozby</div>
<table class="table table-striped">
    <thead>
        <tr>
            <th style="width: 10%;">kód</th>
            <th style="width: 60%;">názov</th>
            <th style="width: 15%;">relevantná</th>
            <th style="width: 15%;">posúď</th>
        </tr>
    </thead>
    <tbody>
{#each data.st_list as specific_threat}
        <tr>
        <td>{specific_threat.code}</td>
        <td>{specific_threat.name}</td>
        <td>{specific_threat.relevant ? "áno" : "nie"}</td>
        <td><a class="btn btn-primary" href={`/risk-analysis-process/${page.params.rap_code}/step/2-relevant-threat-identification/${page.params.tour_code}/b-specific/${specific_threat.code}/review`}>posúď</a> </td>
        </tr>
{/each}
    </tbody>
</table>