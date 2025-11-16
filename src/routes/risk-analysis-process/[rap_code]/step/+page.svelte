<script lang="ts">
	import { UI_RISK_ANALYSIS_PROCESS_WORKFLOW } from '$lib';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();

	const to_highlight = (process_status: number) => {
		if(process_status === 0) {
			return "text-bg-success";
		} else if (process_status === 2) {
			return "text-secondary";
		} else {
			return "text-primary";
		}
	}
</script>

<h1>Proces analýzy rizík {data.params.rap}</h1>
<small><a href={UI_RISK_ANALYSIS_PROCESS_WORKFLOW.list()}>Vráť sa o krok vyššie.</a></small>
<br> <br>

<h2>Status</h2>

<ol>
<li class={to_highlight(data.rap.step_1_select_tour_process_status)}>
		identifikácia cieľových objektov na preskúmanie
		<ul>
		<li>
			<a href={`/risk-analysis-process/${data.params.rap_code}/step/1-select-tour`}>výber cieľových objektov na preskúmanie</a>
		</li>
		<li>
			<a href={`/risk-analysis-process/${data.params.rap_code}/step/1-check-tour`}>kontrola cieľových objektov na preskúmanie</a>
		</li>
	</ul>
</li>
<li class={to_highlight(data.rap.step_2_threat_identification_process_status)}>
		identifikácia cieľových objektov na preskúmanie
		<ul>
		<li>
			<a href="">dummy</a>
		</li>
		<li>
			<a href="">dummy</a>
		</li>
</li>
</ol>