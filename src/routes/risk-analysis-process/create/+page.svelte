<script lang="ts">
	import type { PageProps } from './$types';
    import { goto } from '$app/navigation';
	import { create_post_request, UI_RISK_ANALYSIS_PROCESS_WORKFLOW } from '$lib';

	let { data }: PageProps = $props();

    const get_objects_under_review = () => {
         return data.asset_list.filter((asset: object) => asset.add_under_review).map(asset => asset.code)       
    }

    async function post() {
        const objects_under_review = get_objects_under_review()
        if (objects_under_review.length <= 0) {
            alert("Zoznam aktív na kontrolu je prázdny. Pridajte aspoň jedno aktívum, aby ste mohli začať proces analýzy rizík.");
            return;
        }
        
        const post_body = { target_objects_under_review: objects_under_review };
        const res = await fetch('/svc/risk-analysis-process/create', create_post_request(post_body))
		
		const json = await res.json()
        if (json.status != "ok") {
            alert("Chyba pri vytvarani" + json.message)
            return;
        }
        
        alert("Proces analýzy rizík bol úspešne iniciovaný")
        goto(UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_1_threat_overview(json.data.code));
    }
</script>

<h1> Vytváranie procesu analýzy rizík</h1>
<small><a href={UI_RISK_ANALYSIS_PROCESS_WORKFLOW.ui()}>Vráť sa o krok vyššie.</a> </small>
<br> <br>


Zační nový proces analýzy rizík: <button type="button" on:click={post}>X</button>

<h2>výber aktív na kontrolu</h2>
<table>
    <thead>
        <tr>
            <th>kód aktíva</th>
            <th>názov aktíva</th>
            <th>pridať na kontrolu ?</th>
        </tr>
    </thead>
    <tbody>
{#each data.asset_list as asset }
        <tr>
        <td>{asset.code}</td>
        <td>{asset.name}</td>
        <td><input type="checkbox" bind:checked={asset.add_under_review}></td>
        </tr>
{/each}
    </tbody>
</table>