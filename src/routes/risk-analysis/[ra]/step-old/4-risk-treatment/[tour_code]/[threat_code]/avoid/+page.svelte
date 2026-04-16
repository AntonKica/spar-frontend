<script lang="ts">
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

	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
	let selected_code = $state(data.risk_avoidance?.code);
	let create_name = $state('');
	let create_explanation = $state('');

	async function avoid_risk_with_create() {
		if (create_name.trim().length == 0) {
			alert('Názov je prázdny');
			return;
		}
		if (create_explanation.trim().length == 0) {
			alert('Vysvetlenie je prázdne');
			return;
		}
		await post_with_check(
				`/svc/step-4-risk-treatment/${page.params.rap_code}/${page.params.tour_code}/${page.params.threat_code}/risk-avoid`,
				create_post_request({
					name: create_name,
					explanation: create_explanation
				})
		);
		invalidateAll();
	}

	async function avoid_risk() {
		if (selected_code === null) {
			alert('Vyhnutie je je prázdne');
			return;
		}
		await post_with_check(
				`/svc/step-4-risk-treatment/${page.params.rap_code}/${page.params.tour_code}/${page.params.threat_code}/risk-avoid/${selected_code}`,
				create_post_request_empty()
		);
		invalidateAll();
	}
</script>

<h1>Vyhnutie sa riziku {page.params.threat_code}</h1>

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
		Vytvor nové vyhnutie
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
				<h1 class="modal-title fs-5" id="exampleModalLabel">Nové vyyhnutie</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<div class="row g-3 align-items-center">
					<div class="col-auto"><label for="name" class="form-label">Názov</label></div>
					<div class="col-auto"><input class="form-control" id="name" bind:value={create_name} /></div>
				</div>
				<label for="explanation" class="form-label">Zdôvodnenie</label>
				<textarea class="form-control" id="explanation" rows="3" bind:value={create_explanation}
				></textarea>
			</div>
			<div class="modal-footer">
				<button
					type="button"
					class="btn btn-success"
					data-bs-dismiss="modal"
					onclick={avoid_risk_with_create}>Pridaj nové vyyhnutie</button
				>
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zruš</button>
			</div>
		</div>
	</div>
</div>

{#if data.risk_avoidance == null}
	<div class="alert alert-warning d-flex align-items-center" role="alert">
		<p>
			(i) Toto riziko ešte nie je ošetrené jeho <b>vyhnutím</b>.
		</p>
	</div>
{/if}

<div class="row">
	<div class="col-auto">
		<label for="avoidance" class="form-label">Názov vynutia</label>
	</div>
	<div class="col-auto">
		<select class="form-select" id="avoidance" bind:value={selected_code}>
			<option value={null}>bez vyhnutia</option>
			{#each data.risk_avoidance_list as risk_avoidance}
				<option value={risk_avoidance.code}>{risk_avoidance.name}</option>
			{/each}
		</select>
	</div>
</div>

{#if selected_code !== null && selected_code !== undefined}
	<label for="explanation" class="form-label">Zdôvodnenie</label>
	<textarea class="form-control" id="explanation" rows="3" readonly>{data.risk_avoidance_list.find((f: any) => f.code == selected_code).explanation}</textarea>
{/if}

<button type="button" class="btn btn-success" onclick={avoid_risk}
	>Ulož a ošetri riziko vyhnutím</button
>
