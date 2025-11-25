<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
	import { create_post_request } from '$lib';

	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
    let risk_acceptance_code =  $state(data.risk_acceptance?.code);
    let explanation =  $state();

    async function post() {
        if(!confirm("Naozaj si prajete uložiť?")) {
            return;
        }
        const data = {
            explanation: explanation
        };
        console.log(data)
        const res = await fetch(
            `/svc/step-4-risk-treatment/${page.params.rap_code}/${page.params.tour_code}/${page.params.threat_code}/acceptance`,
             create_post_request(data))
        if(res.status != 200) {
            alert("Nastala chyba: " + res.status)
        }

		const json = await res.json()
        if (json.status != "ok") {
            alert("Nastala chyba" + json.message)
            return;
        }
        
        alert("Ošetremie bolo úspešne aktualizovaný")
        invalidateAll();
    }
</script>
<h1>Akceptovanie rizika {page.params.threat_code} </h1>

<small><a href={`/risk-analysis-process/${page.params.rap_code}/step/4-risk-treatment/${page.params.tour_code}`}>Vráť sa o krok vyššie.</a> </small>
<br><br>


<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Vytvor novú akceptáciu
</button>
<br> <br>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Nová akceptácia</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <label for="explanation" class="form-label">Zdôvodnenie</label>
        <textarea class="form-control" id="explanation" rows="3" readonly>{explanation}</textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-bs-dismiss="modal" onclick={post}>Pridaj novú akceptáciu</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zruš</button>
      </div>
    </div>
  </div>
</div>
<div class="row">
    <div class="col-auto">
        <label for="acceptance" class="form-label">Výber akceptácie</label>
    </div>
    <div class="col-auto">
        <select class="form-select" id="acceptance" bind:value={risk_acceptance_code}>
          <option value="">-</option>
        {#each [{code: "idk", name:"name"}] as threat_relevance }
          <option value={threat_relevance.code}>{threat_relevance.name}</option>
        {/each}
        </select>
    </div>
</div>

{#if data.risk_acceptance?.code === undefined}
<div class="alert alert-warning d-flex align-items-center" role="alert">
  <p>
    (i) Toto riziko ešte nie je ošetrené jeho <b>akceptovaním</b>.
</p>
</div>
{:else}
<label for="explanation" class="form-label">Zdôvodnenie</label>
<textarea class="form-control" id="explanation" rows="3" readonly>{data.risk_acceptance.explanation}</textarea>
{/if}
