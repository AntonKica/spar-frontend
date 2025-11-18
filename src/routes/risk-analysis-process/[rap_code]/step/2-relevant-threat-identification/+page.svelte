<script lang="ts">
	import type { PageProps } from './$types';
    import { page } from '$app/state'
    import ProtectionNeedCell from '$lib/ProtectionNeedCell.svelte';

    import { goto } from '$app/navigation';
	import { create_post_request_empty, enum_to_name } from '$lib';

	let { data }: PageProps = $props();

    async function post() {
        if(!confirm("Naozaj si prajete pokračovať?")) {
            return;
        }
        const res = await fetch(`/svc/risk-analysis-process/${page.params.rap_code}/step/${data.rap.process_step}/complete`, create_post_request_empty())
        if(res.status != 200) {
            alert("Nastala chyba: " + res.status)
        }

		const json = await res.json()
        if (json.status != "ok") {
            alert("Nastala chyba" + json.message)
            return;
        }
        
        alert("Pokračujte v ďalšiom kroku")
        goto("/risk-analysis-process/step/2-idk")
    }
</script>

<h1>Identifikácia relevantných hrozieb</h1>
<small><a href={`/risk-analysis-process/${page.params.rap_code}/step`}>Vráť sa o krok vyššie.</a> </small>
<table class="table table-striped caption-top">
    <thead>
        <tr>
            <th>kód aktíva</th>
            <th>názov aktíva</th>
            <th>typ aktíva</th>
            <th>elementárne hrozby</th>
            <th>špecifické hrozby</th>
        </tr>
    </thead>
    <tbody>
{#each data.rap.tour_list as tour }
        <tr>
        <td>{tour.code} <a href="/organization-info/asset/{tour.code}/detail">👁</a></td>
        <td>{tour.name}</td>
        <td>{enum_to_name(tour.asset_type, data.asset_type_enum)}</td>
        <td><a class="btn btn-primary" href={`/risk-analysis-process/${page.params.rap_code}/step/2-relevant-threat-identification/${tour.code}/a-elementary`}>posúď elementárne hrozby</a></td>
        <td><a class="btn btn-primary" href={`/risk-analysis-process/${page.params.rap_code}/step/2-relevant-threat-identification/${tour.code}/b-specific`}>posúď špecifické hrozby</a></td>
        </tr>
{/each}
    </tbody>
</table>