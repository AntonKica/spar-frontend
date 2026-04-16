<script lang="ts">
	import { page } from '$app/state';
	import { invalidateAll } from '$app/navigation';
	import { create_post_request, enum_to_name } from '$lib';
	import type { PageProps } from './$types';
	let { data = $bindable() }: PageProps = $props();
    let type_filter = $state(-1)
    let relevance_filter = $state(-1)

    const shoud_be_hidden = (threat: any) => {
        const hidden_type = type_filter != -1 && threat.type != type_filter;
        const hidden_relevance = relevance_filter != -1 && threat.relevance != relevance_filter;
        return hidden_type || hidden_relevance;
    }
    
    let name = $state("")
    let description = $state("")
    let confidentiality_impaired = $state(false)
    let integrity_impaired = $state(false)
    let availability_impaired = $state(false)

    async function create_specific_threat() {
        const data = {
                name: name,
                description: description,
                confidentiality_impaired: confidentiality_impaired,
                integrity_impaired: integrity_impaired,
                availability_impaired: availability_impaired,
            };
        const res = await fetch('/svc/threat', create_post_request(data));

        if(res.status != 200) {
            alert("Chyba pri vytvarani: " + res.statusText)
            return;
        }
         
		const json = await res.json()
        if (json.status != "ok") {
            alert("Chyba pri vytvarani" + json.message)
            return;
        }

        alert("Špecifická hrozba bola úspešné pridaná")
        invalidateAll()
    }

</script>
<h1>Identifikácia relevantných hrozieb</h1>



<small><a href={`/risk-analysis-process/${page.params.rap_code}/step/2-relevant-threat-identification`}>Vráť sa o krok vyššie.</a> </small>

<br><br>
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Pridaj novú špecifickú hrozbu
</button>
<br> <br>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Nová špefická hrozba</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <label>Názov <input type="text" bind:value={name}></label><br><br>
        <table class="table caption-top">
            <caption>ohrozuje</caption>
            <thead>
                <tr><th>C</th><th>I</th><th>A</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="checkbox" bind:checked={confidentiality_impaired}></td>
                    <td><input type="checkbox" bind:checked={integrity_impaired}></td>
                    <td><input type="checkbox" bind:checked={availability_impaired}></td>
                </tr>
            </tbody>
        </table>
        <label for="description">Popis </label> 
        <textarea class="form-control" id="description" bind:value={description} rows="6"></textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-bs-dismiss="modal" onclick={create_specific_threat}>Pridaj novú špecifickú hrozbu</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zruš</button>
      </div>
    </div>
  </div>
</div>

<div class="h4 pb-2 mb-4 text-dark border-bottom border-dark">Hrozby na posúdenie</div>
<table class="table table-striped">
    <thead>
        <tr>
            <th style="width: 10%;">kód</th>
            <th style="width: 45%;">názov</th>
            <th style="width: 15%;">druh
                <select bind:value={type_filter}>
                    <option value={-1}>všetky</option>
                    <option value={0}>elementárna</option>
                    <option value={1}>špecifická</option>
                </select>
            </th>
            <th style="width: 15%;">stav
                <select bind:value={relevance_filter}>
                    <option value={-1}>všetky</option>
                    {#each data.threat_relevance_enum as threat_relevance}
                    <option value={threat_relevance.code}>{threat_relevance.name}</option>
                    {/each}
                </select>
            </th>
            <th style="width: 15%;">posúď</th>
        </tr>
    </thead>
    <tbody>
{#each data.threat_list as threat}
        <tr hidden={shoud_be_hidden(threat)}>
        <td>{threat.code}</td>
        <td>{threat.name}</td>
        <td>{threat.type == 0 ? "elementárna" : "špecifická"}</td>
        <td>{enum_to_name(threat.relevance, data.threat_relevance_enum)}</td>
        <td><a class="btn btn-primary" href={`/risk-analysis-process/${page.params.rap_code}/step/2-relevant-threat-identification/${page.params.tour_code}/review/${threat.code}`}>posúď</a> </td>
        </tr>
{/each}
    </tbody>
</table>