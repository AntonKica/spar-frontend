<script lang="ts">
	import type { PageProps } from './$types';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
	import {
		color_by_risk,
		create_post_request,
		create_post_request_empty,
		enum_to_name,
		post_with_check
	} from '$lib';
	import ThreatImpactTable from '$lib/ThreatImpactTable.svelte';

	let { data }: PageProps = $props();
	let selected_code = $state(data.risk_transfer?.code);
	let selected = $derived(data.risk_transfer_list.find((f: any) => f.code === selected_code));
	let create_name = $state('');
	let create_explanation = $state('');
	let create_risk_transfer_type = $state(0);

	let create_checklist: string[] = $state([]);
	let create_checklist_item: string = $state("");

	function create_list_push() {
		create_checklist.push(create_checklist_item);			
		create_checklist_item = '';
	}
	function create_list_remove(i: string) {
		create_checklist = create_checklist.filter(f => f !== i)
	}

	async function transfer_risk_with_create() {
		if (create_name.trim().length == 0) {
			alert('Názov je prázdny');
			return;
		}
		if (create_explanation.trim().length == 0) {
			alert('Vysvetlenie je prázdne');
			return;
		}
		await post_with_check(
				`/svc/step-4-risk-treatment/${page.params.rap_code}/${page.params.tour_code}/${page.params.threat_code}/risk-transfer`,
				create_post_request({
					name: create_name,
					risk_transfer_type: create_risk_transfer_type,
					checklist: create_checklist,
					explanation: create_explanation
				})
		);
		invalidateAll();
	}

	async function transfer_risk() {
		if (selected_code === null) {
			alert('Vyhnutie je je prázdne');
			return;
		}
		await post_with_check(
				`/svc/step-4-risk-treatment/${page.params.rap_code}/${page.params.tour_code}/${page.params.threat_code}/risk-transfer/${selected_code}`,
				create_post_request_empty()
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
		Vytvor nové prenesenie
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
				<h1 class="modal-title fs-5" id="exampleModalLabel">Nové prenesenie</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<div class="row g-3 align-items-center">
					<div class="col-auto"><label for="name" class="form-label">Názov</label></div>
					<div class="col-auto"><input class="form-control" id="name" bind:value={create_name} /></div>
				</div>
				<label for="create_risk_transfer_type" class="form-label">Typ prenesenia</label>
				<select class="form-select" id="create_risk_transfer_type" bind:value={create_risk_transfer_type}>
					{#each data.risk_transfer_type_enum as risk_transfer_type}
						<option value={risk_transfer_type.code}>{risk_transfer_type.name}</option>
					{/each}
				</select>
				<label for="create_list" class="form-label">Kontrolný zoznam</label>
				<ul class="list-group" id="create_list">
					{#each create_checklist as i}
					<li class="list-group-item">
						<div class="input-group">
							<input class="form-control" value="{i}" readonly/>
							<button class="btn btn-danger input-group-text" onclick={() => create_list_remove(i)}>𐄂</button>
						</div>
					</li>
					{/each}
					<li class="list-group-item">
						<div class="input-group">
							<input class="form-control" bind:value={create_checklist_item} />
							<button class="btn btn-success input-group-text" onclick={() => create_list_push()} disabled={create_checklist_item.length <= 0}>✔</button>
						</div>
					</li>
				</ul>
				<label for="explanation" class="form-label">Zdôvodnenie</label>
				<textarea class="form-control" id="explanation" rows="3" bind:value={create_explanation}
				></textarea>
			</div>
			<div class="modal-footer">
				<button
					type="button"
					class="btn btn-success"
					data-bs-dismiss="modal"
					onclick={transfer_risk_with_create}>Pridaj nové vyyhnutie</button
				>
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zruš</button>
			</div>
		</div>
	</div>
</div>

{#if data.risk_transfer == null}
	<div class="alert alert-warning d-flex align-items-center" role="alert">
		<p>
			(i) Toto riziko ešte nie je ošetrené jeho <b>prenesením</b>.
		</p>
	</div>
{/if}

<div class="row">
	<div class="col-auto">
		<label for="transfer" class="form-label">Názov prenesenia</label>
	</div>
	<div class="col-auto">
		<select class="form-select" id="transfer" bind:value={selected_code}>
			<option value={null}>bez prenesenia</option>
			{#each data.risk_transfer_list as risk_transfer}
				<option value={risk_transfer.code}>{risk_transfer.name}</option>
			{/each}
		</select>
	</div>
</div>

{#if selected !== undefined}
	<b>Typ prenesenia</b> {enum_to_name(selected.risk_transfer_type, data.risk_transfer_type_enum)} <br>
	<b>Kontrolný zoznam</b>
	<ul class="list-group">
		{#each selected.checklist as i}
		<li class="list-group-item"> {i}</li>
		{/each}
	</ul>
	<b>Zdôvodnenie</b>
	<textarea class="form-control" id="explanation" rows="3" readonly>{selected.explanation}</textarea>
{/if}

<button type="button" class="btn btn-success" onclick={transfer_risk}>Ulož a ošetri riziko prenesením</button>