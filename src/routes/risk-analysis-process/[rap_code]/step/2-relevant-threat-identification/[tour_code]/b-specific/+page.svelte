<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
	import { create_post_request, enum_to_name } from '$lib';
	import type { PageProps } from './$types';
	let { data = $bindable() }: PageProps = $props();

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
        const res = await fetch('/svc/specific-threat', create_post_request(data));

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
<h1>Identifikácia relevantných špecifických hrozieb</h1>

<small><a href={`/risk-analysis-process/${page.params.rap_code}/step/2-relevant-threat-identification`}>Vráť sa o krok vyššie.</a> </small>

<div class="h4 pb-2 mb-4 text-dark border-bottom border-dark">Definuj novú špefickú hrozbu</div>
<div class="row">
    <div class="col">
        <label>Názov <input type="text" bind:value={name}></label><br><br>
        <label for="description">Popis </label> 
        <textarea class="form-control" id="description" bind:value={description} rows="6"></textarea>
        <br>
    </div>
    <div class="col">
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
    </div>
</div>

<input class="btn btn-success" onclick={create_specific_threat} value="Pridaj novú špecifickú hrozbu"/>
<hr>
<div class="h4 pb-2 mb-4 text-dark border-bottom border-dark">Špefické hrozby</div>
<table class="table table-striped">
    <thead>
        <tr>
            <th style="width: 10%;">kód</th>
            <th style="width: 60%;">názov</th>
            <th style="width: 15%;">relevantná</th>
            <th style="width: 15%;">posúď</th>
        </tr>
    </thead>
    <tbody>
{#each data.st_list as specific_threat}
        <tr>
        <td>{specific_threat.code}</td>
        <td>{specific_threat.name}</td>
        <td>{specific_threat.relevant ? "áno" : "nie"}</td>
        <td><a class="btn btn-primary" href={`/risk-analysis-process/${page.params.rap_code}/step/2-relevant-threat-identification/${page.params.tour_code}/b-specific/${specific_threat.code}/review`}>posúď</a> </td>
        </tr>
{/each}
    </tbody>
</table>