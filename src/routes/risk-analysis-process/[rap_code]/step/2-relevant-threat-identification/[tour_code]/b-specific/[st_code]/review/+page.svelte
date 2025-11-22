<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
	import { create_post_request } from '$lib';
	import ElementaryThreatImpactTable from '$lib/ElementaryThreatImpactTable.svelte';

	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
    let relevant =  $state(data.specific_threat.relevant);
    let explanation = $state(data.specific_threat.explanation);

    async function post() {
        if(!confirm("Naozaj si prajete uložiť posudok?")) {
            return;
        }
        const data = {
            relevant: relevant,
            explanation: explanation
        };
        console.log(data)
        const res = await fetch(
            `/svc/step-2-relevant-threat-identification/${page.params.rap_code}/${page.params.tour_code}/specific/${page.params.st_code}/review`,
             create_post_request(data))
        if(res.status != 200) {
            alert("Nastala chyba: " + res.status)
        }

		const json = await res.json()
        if (json.status != "ok") {
            alert("Nastala chyba" + json.message)
            return;
        }
        
        alert("Posudok bol úspešne aktualizovaný")
        invalidateAll();
    }
</script>
<h1>Posúdenie špecifickej hrozby {data.specific_threat.code} </h1>

<small><a href={`/risk-analysis-process/${page.params.rap_code}/step/2-relevant-threat-identification/${page.params.tour_code}/b-specific`}>Vráť sa o krok vyššie.</a> </small>

<div class="row justify-content-between">
    <div class="col-6">
        <b>Kód:</b> {data.specific_threat.code} <br>
        <b>Názov:</b> {data.specific_threat.name} <br>
    </div>  
    <div class="col-4">
        <ElementaryThreatImpactTable elemntary_threat={data.specific_threat}/>
    </div>
</div>



<div>
<label for="relevant" class="form-label">Relevantná</label>
<select class="form-select" id="relevant" bind:value={relevant}>
  <option value={true}>áno</option>
  <option value={false}>nie</option>
</select>
</div>
<br>

{#if relevant == 0}
<div class="alert alert-info d-flex align-items-center" role="alert">
  <p>
    (i) Táto hrozba nie je <b>relevantná</b>, preto nebude súčasťou ďalších krokov.
</p>
</div>
{:else}

<label for="explanation" class="form-label">Zdôvodnenie</label>
<textarea class="form-control" id="explanation" rows="3" bind:value={explanation}></textarea>

<div class="alert alert-info d-flex align-items-center" role="alert">
<p> (i) Táto hrozba bola označená ako <b>relevantná</b>, preto bude ďalej posudzovaná. </p>
</div>
{/if}

<button class="btn btn-success" onclick={post}>Uložiť posudok</button>