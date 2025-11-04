<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { create_delete_request, create_post_request, UI_RISK_ANALYSIS_PROCESS_WORKFLOW } from '$lib';
	import type { PageProps } from './$types';
	let { data = $bindable() }: PageProps = $props();

   let specific_threat_list = $state(data.specific_threat_list);
    const default_specific_threat_create_data = () => { return {
        name: "názov vystihujúci hrozbu",
        description: "detailný popis hrozby"
    }};

    let specific_threat_create_data = $state(default_specific_threat_create_data())

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
    
    async function update_specific_threat(threat: any) {
        const post_data = {
            name: threat.name,
            description: threat.description,
        };

        const res = await fetch(
            UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_1_2_specific_update(data.rap, data.asset, threat.code), 
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

        alert("Špecifická hrozba bola úspešné aktualizovaná")
        invalidateAll()
    }

    async function delete_specific_threat(threat: any) {
        const res = await fetch(
            UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_1_2_specific_delete(data.rap, data.asset, threat.code), 
            create_delete_request()
        );
        
        if(res.status != 200) {
            alert("Chyba pri vymazávaní: " + res.statusText)
            return;
        }
        alert("Špecifická hrozba bola úspešné vymazaná")
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
    .box-green {
        background-color: palegreen;
        border: 2px solid black;
        margin: 20px;
        padding: 20px;
        width: 90%;
    }
</style>
<h1>Určenie špecifických hrozieb pre aktívum</h1>

<small><a href={UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_1_threat_overview(data.rap)}>Vráť sa o krok vyššie.</a> </small>
<br> <br>

<par>
V tomto kroku identifikujete špecifické hrozby pre cieľový objekt na posúdenie.
</par>

<br>
Špecifické hrozby pre aktívum sú preskúmané: <input type="button" value="Nie" onclick={() => {}}>
<br> <br>

<h2>Pridaj novú špecifickú hrozbu</h2>
<div class="box-green">
    <label>Názov <input type="text" bind:value={specific_threat_create_data.name}></label><br><br>
    <label>Popis<br><textarea bind:value={specific_threat_create_data.description} cols="100" rows="6"></textarea></label> <br>
    <input type="button" onclick={create_specific_threat} value="Pridaj novú špecifickú hrozbu">
</div>

<hr>
<h2>Zoznam špecifických hrozieb</h2>
{#each specific_threat_list as threat}
<div class="box">
    <h3>{threat.code}</h3>
    <input type="text" bind:value={threat.name}><br><br>
    <textarea bind:value={threat.description} cols="100" rows="6"></textarea><br>
    <input type="button" onclick={() => delete_specific_threat(threat)} value="✖ zruš">
    <input type="button" onclick={() => update_specific_threat(threat)} value="✔ aktualizuj">
</div>
{/each}
