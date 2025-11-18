<script lang="ts">
	import { page } from '$app/state';
	import { create_post_request } from '$lib';
	import ElementaryThreatImpactTable from '$lib/ElementaryThreatImpactTable.svelte';

	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
    let threat_relevance =  $state(data.elementary_threat_relevance_enum[0].code);
    let explanation =  $state("");

    async function post() {
        if(!confirm("Naozaj si prajete uložiť posudok?")) {
            return;
        }
        const data = {
            threat_relevance: threat_relevance,
            explanation: explanation
        };
        const res = await fetch(
            `/svc/risk-analysis-process/${page.params.rap_code}/threat-identification/${page.params.asset_code}/elementary/${page.params.elementary_threat_code}/review`,
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
    }
</script>
<h1>Posúdenie elementárnej hrozby {data.elementary_threat.code} </h1>

<small><a href={`/risk-analysis-process/${page.params.rap_code}/step/2-relevant-threat-identification/${page.params.asset_code}/a-elementary`}>Vráť sa o krok vyššie.</a> </small>

<div class="row">
    <div class="col-6">
        <b>Kód:</b> {data.elementary_threat.code} <br>
        <b>Názov:</b> {data.elementary_threat.name}
    </div>  
    <div class="col-6">
        <ElementaryThreatImpactTable elemntary_threat={data.elementary_threat}/>
    </div>
</div>



<div>
<label for="relevance" class="form-label">Relevantnosť</label>
<select class="form-select" id="relevance" bind:value={threat_relevance}>
{#each data.elementary_threat_relevance_enum as elementary_threat_relevance }
  <option value={elementary_threat_relevance.code}>{elementary_threat_relevance.name}</option>
{/each}
</select>
</div>
<br>

{#if threat_relevance == 0}
<div class="alert alert-info d-flex align-items-center" role="alert">
  <p>
    (i) Táto hrozba bola označená ako <b>irelevantná</b>, preto nebude súčasťou ďalších krokov.
</p>
</div>
{:else}

<label for="explanation" class="form-label">Zdôvodnenie</label>
<textarea class="form-control" id="explanation" rows="3"></textarea>

<div class="alert alert-info d-flex align-items-center" role="alert">
<p> (i)
{#if threat_relevance == 1}
    Táto hrozba bola označená ako <b>nepriama</b>, preto bude posudzovaná kolektívne s ďalšími nepriamimi hrozbami.
{:else}
    Táto hrozba bola označená ako <b>priama</b>, preto bude posudzovaná samostatne.
{/if}
</p>
</div>
{/if}

<button class="btn btn-success" onclick={post}>Uložiť posudok</button>