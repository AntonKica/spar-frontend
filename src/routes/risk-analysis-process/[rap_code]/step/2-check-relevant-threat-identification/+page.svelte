<script lang="ts">
	import type { PageProps } from '../1-check-tour copy/$types';

    import { goto, invalidate, invalidateAll } from '$app/navigation';
    import { page } from '$app/state';
	import { create_post_request_empty, enum_to_name } from '$lib';

	let { data }: PageProps = $props();
    console.log(data)

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
        invalidateAll()
        goto(`/risk-analysis-process/${page.params.rap_code}/step`)
    }
    
    function relevance_to_class(tour: any | undefined) {
        if(tour === undefined) {
            return "";
        } else if (tour.relevance == 1) {
            return "text-bg-warning";
        } else {
            return "text-bg-danger";
        }
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
</style>

<h1>Kontrola identifikovaných potenciálnych hrozieb</h1>
<small><a href={`/risk-analysis-process/${page.params.rap_code}/step`}>Vráť sa o krok vyššie.</a> </small>
<br> <br>


<div class="h1 pb-2 mb-4 text-dark border-bottom border-dark">Aktíva a hrozby</div>
<table class="table caption-top">
    <thead>
        <tr>
            <th></th>
        {#each data.tour_threat_list as tour}
            <th>
                <div class="fw-bold">{tour.tour_code}</div>
                <div class="fw-normal fst-italic"><small>{tour.tour_name}</small></div>
            </th>
        {/each}
        </tr>
    </thead>
    <tbody>
    {#each data.threat_list as threat}
        <tr>
            <td>
                <div class="fw-bold">{threat.code}</div>
                <div class="fw-normal fst-italic"><small>{threat.name}</small></div>
            </td>
            {#each threat.tour_list as tour}
            <td class={relevance_to_class(tour)}></td>
            {/each}
        </tr>
    {/each}
    </tbody>
</table>

<div class="alert alert-info" role="alert">
  <h4 class="alert-heading">Ukončenie identifikácie potenciálnych hrozieb</h4>
  <p>V prípade, že ste spokojní s vybratou množinou potenciálnych hrozieb, prejdite do ďalšieho kroku.</p>
  <button class="btn btn-success" onclick={() => post()}>Potvrdiť a prejsť do ďalšieho kroku</button>
</div>