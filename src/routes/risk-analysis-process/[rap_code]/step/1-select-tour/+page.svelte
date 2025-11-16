<script lang="ts">
	import type { PageProps } from './$types';
    import { goto } from '$app/navigation';
	import { create_post_request, enum_to_name, UI_RISK_ANALYSIS_PROCESS_WORKFLOW } from '$lib';

	let { data }: PageProps = $props();

    let asset_list = data.asset_list;

    async function post() {
        console.log("wtf")
        const objects_under_review = asset_list.filter((asset: object) => asset.under_review).map(asset => asset.code)
        if (objects_under_review.length == 0) {
            alert("Zoznam aktív na kontrolu je prázdny. Pridajte aspoň jedno aktívum, aby ste mohli začať proces analýzy rizík.");
            return;
        }
        const res = await fetch(`/svc/risk-analysis-process/${data.params.rap_code}/tour`, create_post_request(objects_under_review))
		
		const json = await res.json()
        if (json.status != "ok") {
            alert("Chyba pri aktualizácií" + json.message)
            return;
        }
        
        alert("Proces analýzy rizík bol úspešne akualizovaný")
    }
</script>

<h1> Vytváranie procesu analýzy rizík</h1>
<small><a href={`/risk-analysis-process/${data.params.rap_code}/step`}>Vráť sa o krok vyššie.</a> </small>
<br> <br>



<h2>výber aktív na kontrolu</h2>
<table class="table table-striped">
    <thead>
        <tr>
            <th>kód aktíva</th>
            <th>názov aktíva</th>
            <th>typ aktíva</th>
            <th>zahrnúť</th>
        </tr>
    </thead>
    <tbody>
{#each asset_list as asset }
        <tr>
        <td>{asset.code} <a href="/organization-info/asset/{asset.code}/detail">👁</a></td>
        <td>{asset.name}</td>
        <td>{enum_to_name(asset.asset_type, data.asset_type_enum)}</td>
        <td><input class="form-check-input" type="checkbox" bind:checked={asset.under_review}></td>
        </tr>
{/each}
    </tbody>
</table>
<button class="btn btn-success" onclick={() => post()}>Aktualizovať</button>