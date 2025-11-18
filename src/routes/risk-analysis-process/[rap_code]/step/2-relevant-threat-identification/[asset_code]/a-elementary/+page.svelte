<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
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
<h1>Identifikácia relevantných elementárnych hrozieb</h1>

<small><a href={`/risk-analysis-process/${page.params.rap_code}/step/2-relevant-threat-identification`}>Vráť sa o krok vyššie.</a> </small>
<table class="table table-striped">
    <thead>
        <tr>
            <th>kód</th>
            <th>názov</th>
            <th>stav
                <select>
                    <option>všetky</option>
                    <option>bez dopadu</option>
                    <option>nepriamy dopad</option>
                    <option>priamy dopad</option>
                </select>
            </th>
            <th>posúď</th>
        </tr>
    </thead>
    <tbody>
{#each data.elementary_threat_enum as elementary_threat}
        <tr>
        <td>{elementary_threat.code}</td>
        <td>{elementary_threat.name}</td>
        <td>bez dopadu</td>
        <td><a class="btn btn-primary" href={`/risk-analysis-process/${page.params.rap_code}/step/2-relevant-threat-identification/${page.params.asset_code}/a-elementary/${elementary_threat.code}/review`}>posúď</a> </td>
        </tr>
{/each}
    </tbody>
</table>