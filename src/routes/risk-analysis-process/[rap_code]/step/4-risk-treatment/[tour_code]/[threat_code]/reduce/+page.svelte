<script lang="ts">
	import type { PageProps } from './$types';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
	import {
		color_by_risk,
		create_post_request,
		enum_to_name,
		post_with_check
	} from '$lib';
	import ThreatImpactTable from '$lib/ThreatImpactTable.svelte';

	let { data }: PageProps = $props();
	let risk_reduction_selected_list = $state(data.risk_reduction_selected_list);
	let create_reduction = $state({
		name: "",
		explanation: "",
		confidentiality_protected: false,
		integrity_protected: false,
		availability_protected: false,
	});

	function add_risk_reduction(item: object) {
		risk_reduction_selected_list.push(item);
	}
	function remove_risk_reduction(item: object) {
		risk_reduction_selected_list = risk_reduction_selected_list.filter((f: object) => f.code !== item.code)
	}

	async function reduce_risk_with_create() {
		if (create_reduction.name.trim().length == 0) {
			alert('Názov je prázdny');
			return;
		}
		if (create_reduction.explanation.trim().length == 0) {
			alert('Vysvetlenie je prázdne');
			return;
		}
		await post_with_check(
				`/svc/step-4-risk-treatment/${page.params.rap_code}/${page.params.tour_code}/${page.params.threat_code}/risk-reduce`,
				create_post_request(create_reduction)
		);
		invalidateAll();
	}

	async function reduction_risk() {
		let code_list = risk_reduction_selected_list.map((i: object) => i.code)
		if (code_list.length <= 0) {
			alert('Redukovanie je prázdne');
			return;
		}
		await post_with_check(
				`/svc/step-4-risk-treatment/${page.params.rap_code}/${page.params.tour_code}/${page.params.threat_code}/risk-reduce/`,
				create_post_request(code_list)
		);
		invalidateAll();
	}
</script>

<h1>Prenesenie rizika {page.params.threat_code}</h1>

<small
	><a
		href={`/risk-analysis-process/${page.params.rap_code}/step/4-risk-treatment/${page.params.tour_code}`}
		>Vráť sa o krok vyššie.</a
	>
</small>
<br /><br />

<div class="col-4">
	<b>Potenciálne riziko:</b>
	<span style="background-color: {color_by_risk(data.risk_clasification)}"
		>{enum_to_name(data.risk_clasification.risk, data.threat_risk_enum)}</span
	>
	<ThreatImpactTable threat={data.risk_clasification} />

	<button
		type="button"
		class="btn btn-primary"
		data-bs-toggle="modal"
		data-bs-target="#exampleModal"
	>
		Vytvor nové ošetrenie
	</button>
</div>

<br /> <br />

<div
	class="modal fade"
	id="exampleModal"
	tabindex="-1"
	aria-labelledby="exampleModalLabel"
	aria-hidden="true"
>
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="exampleModalLabel">Nové ošetrenie</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<div class="row g-3 align-items-center">
					<div class="col-auto"><label for="name" class="form-label">Názov</label></div>
					<div class="col-auto"><input class="form-control" id="name" bind:value={create_reduction.name} /></div>
				</div>
				<table class="table caption-top">
					<caption>ošetruje</caption>
					<thead>
						<tr><th>C</th><th>I</th><th>A</th></tr>
					</thead>
					<tbody>
						<tr>
							<td><input type="checkbox" bind:checked={create_reduction.confidentiality_protected}></td>
							<td><input type="checkbox" bind:checked={create_reduction.integrity_protected}></td>
							<td><input type="checkbox" bind:checked={create_reduction.availability_protected}></td>
						</tr>
					</tbody>
				</table>
				<label for="explanation" class="form-label">Zdôvodnenie</label>
				<textarea class="form-control" id="explanation" rows="3" bind:value={create_reduction.explanation}
				></textarea>
			</div>
			<div class="modal-footer">
				<button
					type="button"
					class="btn btn-success"
					data-bs-dismiss="modal"
					onclick={reduce_risk_with_create}>Pridaj nové ošetrenie</button
				>
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zruš</button>
			</div>
		</div>
	</div>
</div>

{#if data.risk_reduction_selected_list.length <= 0}
	<div class="alert alert-warning d-flex align-items-center" role="alert">
		<p>
			(i) Toto riziko ešte nie je ošetrené jeho <b>redukovaním</b>, nemá priradené žiadne opatrenie.
		</p>
	</div>
{/if}


<button type="button" class="btn btn-success" onclick={reduction_risk}>Ulož a ošetri riziko prenesením</button><br><br>
<label for="create_list" class="form-label">Kontrolný zoznam</label>
<table class="table table-stripped">
	<thead>
	<tr>
		<th style="width: 10%;">kód</th>
		<th style="width: 20%;">názov</th>
		<th style="width: 50%;">popis</th>
		<th style="width: 5%;">C</th>
		<th style="width: 5%;">I</th>
		<th style="width: 5%;">A</th>
		<th style="width: 5%;">akcia</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td></td>
		<td></td>
		<td></td>
		<td class={data.risk_clasification.confidentiality_impaired ? "bg-danger" : ""}></td>
		<td class={data.risk_clasification.integrity_impaired ? "bg-danger" : ""}></td>
		<td class={data.risk_clasification.availability_impaired ? "bg-danger" : ""}></td>
		<td></td>
	</tr>
	<tr></tr>
	{#each data.risk_reduction_list as risk_reduction}
	<tr>
		<td>{risk_reduction.code}</td>
		<td>{risk_reduction.name}</td>
		<td>{risk_reduction.explanation}</td>
		<td class={risk_reduction.confidentiality_protected ? "bg-success" : ""}></td>
		<td class={risk_reduction.integrity_protected ? "bg-success" : ""}></td>
		<td class={risk_reduction.availability_protected ? "bg-success" : ""}></td>
		<td>
		{#if risk_reduction_selected_list.find((f: object) => f.code === risk_reduction.code)}
			<button class="btn btn-danger input-group-text" onclick={() => remove_risk_reduction(risk_reduction)}>𐄂</button>
		{:else}
			<button class="btn btn-success input-group-text" onclick={() => add_risk_reduction(risk_reduction)}>✔</button>
		{/if}
		</td>
	</tr>
	{/each}
	</tbody>

</table>