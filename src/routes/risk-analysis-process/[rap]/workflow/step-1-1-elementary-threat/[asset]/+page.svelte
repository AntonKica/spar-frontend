<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { create_post_request, enum_to_name, UI_RISK_ANALYSIS_PROCESS_WORKFLOW } from '$lib';
	import type { PageProps } from './$types';
	let { data = $bindable() }: PageProps = $props();

   let elementary_threat_list = $state(data.elementary_threat_list);
    function relevance_to_class(threat: any): string {
        if(threat.relevance === 0) {
            return "direct";
        } else if (threat.relevance === 1) {
            return "indirect";
        } else {
            return "irrelevant";
        }
    }

    async function post_changes() {
        const post_data = elementary_threat_list.map((e: any) => {
            return {
                elementary_threat_code: e.elementary_threat_code,
                relevance: e.relevance,
                comment: e.comment,
                reviewed: e.reviewed,
            };
        });

        
        const res = await fetch(
            UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_1_1_elementary_threat_update(data.rap, data.asset), 
            create_post_request(post_data)
        );
         
		const json = await res.json()
        if (json.status != "ok") {
            alert("Chyba pri vytvarani" + json.message)
            return;
        }

        alert("Zmeny boli uložené")
        invalidateAll()
    }
    
    

</script>
<style>
    .irrelevant {
        background-color: white;
    }
    .indirect {
        background-color: yellowgreen;
    }
    .direct {
        background-color: lightcoral;
    }
</style>
<h1>Určenie relevantných hrozieb</h1>

<small><a href={UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_1_threat_overview(data.rap)}>Vráť sa o krok vyššie.</a> </small>
<br> <br>

V tomto kroku identifikujete relevantné hrozby pre každý cieľový objekt na posúdenie.

<br>
Keď skončíš s úpravami, tak <input type="button" value="Ulož zmeny" onclick={post_changes}>
<br> <br>

<input type="button" value="Označ všetky ako preskúmané" onclick={() => {
    for (let et of elementary_threat_list) {
        et.reviewed = true
    }
}}>

<input type="button" value="Označ všetky ako nepreskúmané" onclick={() => {
    for (let et of elementary_threat_list) {
        et.reviewed = false
    }
}}>
<br>

<table>
    <thead>
        <tr>
            <th>názov hrozby</th>
            <th>relevantnosť</th>
            <th>komentár</th>
            <th>preskúmaný</th>
        </tr>
    </thead>
    <tbody>
{#each elementary_threat_list as threat}
        <tr>
        <td>{enum_to_name(threat.elementary_threat_code, data.elementary_threat_enum)}</td>
        <td class={relevance_to_class(threat)}>
            <select bind:value={threat.relevance} class={relevance_to_class(threat)}>
            {#each data.elementary_threat_relevance_enum as elementary_threat_relevance}
            <option value={elementary_threat_relevance.code}>{elementary_threat_relevance.name}</option>
            {/each}
            </select>
        </td>
        <td><textarea bind:value={threat.comment} cols=50 rows=6></textarea></td>
        <td><input type="checkbox" bind:checked={threat.reviewed}> </td>
        </tr>
{/each}
    </tbody>
</table>