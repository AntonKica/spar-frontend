<script lang="ts">
	import type { PageProps } from '../1-check-tour copy/$types';
    import ProtectionNeedCell from '$lib/ProtectionNeedCell.svelte';

    import { goto } from '$app/navigation';
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
        goto(`/risk-analysis-process/${page.params.rap_code}/step`)
    }
    
    function relevance_to_class(relevance: number) {
        if(relevance == 0) {
            return "";
        } else if (relevance == 1) {
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

<h1>Kontrola vybraných potenciálnych hrozieb</h1>
<small><a href={`/risk-analysis-process/${page.params.rap_code}/step`}>Vráť sa o krok vyššie.</a> </small>
<br> <br>


<div class="h1 pb-2 mb-4 text-dark border-bottom border-dark">Aktíva a hrozby</div>
<table class="table caption-top">
    <thead>
        <tr>
            <th></th>
        {#each data.tour_threat_identification as tour}
            <th>
                <div class="fw-bold">{tour.tour_code}</div>
                <div class="fw-normal fst-italic"><small>{tour.tour_name}</small></div>
            </th>
        {/each}
        </tr>
    </thead>
    <tbody>
    {#each data.tour_et_summary_list as et}
        <tr>
            <td>
                <div class="fw-bold">{et.et_code}</div>
                <div class="fw-normal fst-italic"><small>{enum_to_name(et.et_code, data.elementary_threat_enum)}</small></div>
            </td>
            {#each et.tour_list as relevance}
            <td class={relevance_to_class(relevance)}></td>
            {/each}
        </tr>
    {/each}
    {#each data.tour_st_summary_list as st}
        <tr>
            <td>
                <div class="fw-bold">{st.st_code}</div>
                <div class="fw-normal fst-italic"><small>{st.st_name}</small></div>
            </td>
            {#each st.tour_list as relevant}
            <td class={relevant ? "text-bg-danger" : ""}></td>
            {/each}
        </tr>
    {/each}
    </tbody>
</table>

<div class="alert alert-info" role="alert">
  <h4 class="alert-heading">Ukončenie výberu aktív na kontrolu</h4>
  <p>V prípade, že ste spokojní s vybratou množino aktív na kontrolu, prejdite do ďalšieho krkoku.</p>
  <button class="btn btn-success" onclick={() => post()}>Potvrdiť a prejsť do ďalšieho kroku</button>
</div>