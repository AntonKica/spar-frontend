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
	let risk_acceptance_code = $state(data.risk_acceptance?.code);
	let name = $state('');
	let explanation = $state('');

	async function accept_risk_with_create() {
		if (name.trim().length == 0) {
			alert('Názov je prázdny');
			return;
		}
		if (explanation.trim().length == 0) {
			alert('Názov je prázdny');
			return;
		}
		await post_with_check(
			fetch(
				`/svc/step-4-risk-treatment/${page.params.rap_code}/${page.params.tour_code}/${page.params.threat_code}/risk-accept`,
				create_post_request({
					name: name,
					explanation: explanation
				})
			)
		);
		invalidateAll();
	}

	async function accept_risk() {
		if (risk_acceptance_code === null) {
			alert('Akceptácia je prázdna');
			return;
		}
		await post_with_check(
			fetch(
				`/svc/step-4-risk-treatment/${page.params.rap_code}/${page.params.tour_code}/${page.params.threat_code}/risk-accept/${risk_acceptance_code}`,
				create_post_request_empty()
			)
		);
		invalidateAll();
	}
</script>

<h1>Akceptovanie rizika {page.params.threat_code}</h1>

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
		Vytvor novú akceptáciu
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
				<h1 class="modal-title fs-5" id="exampleModalLabel">Nová akceptácia</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<div class="row g-3 align-items-center">
					<div class="col-auto"><label for="name" class="form-label">Názov</label></div>
					<div class="col-auto"><input class="form-control" id="name" bind:value={name} /></div>
				</div>
				<label for="explanation" class="form-label">Zdôvodnenie</label>
				<textarea class="form-control" id="explanation" rows="3" bind:value={explanation}
				></textarea>
			</div>
			<div class="modal-footer">
				<button
					type="button"
					class="btn btn-success"
					data-bs-dismiss="modal"
					onclick={accept_risk_with_create}>Pridaj novú akceptáciu</button
				>
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zruš</button>
			</div>
		</div>
	</div>
</div>

{#if data.risk_acceptance == null}
	<div class="alert alert-warning d-flex align-items-center" role="alert">
		<p>
			(i) Toto riziko ešte nie je ošetrené jeho <b>akceptovaním</b>.
		</p>
	</div>
{/if}

<div class="row">
	<div class="col-auto">
		<label for="acceptance" class="form-label">Názov akceptácie</label>
	</div>
	<div class="col-auto">
		<select class="form-select" id="acceptance" bind:value={risk_acceptance_code}>
			<option value={null}>bez akceptácie</option>
			{#each data.risk_acceptance_list as risk_acceptance}
				<option value={risk_acceptance.code}>{risk_acceptance.name}</option>
			{/each}
		</select>
	</div>
</div>

{#if risk_acceptance_code !== null}
	<label for="explanation" class="form-label">Zdôvodnenie</label>
	<textarea class="form-control" id="explanation" rows="3" readonly>{data.risk_acceptance_list.find((f: any) => f.code == risk_acceptance_code).explanation}</textarea>
{/if}

<button type="button" class="btn btn-success" onclick={accept_risk}
	>Ulož a ošetri riziko akcepovaním</button
>
