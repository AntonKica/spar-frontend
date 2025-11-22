<script lang="ts">
	import type { PageProps } from './$types';
	import { page } from '$app/state';
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

<h1>Proces analýzy rizík {data.rap.code}</h1>
<small><a href={`/risk-analysis-process/list`}>Vráť sa o krok vyššie.</a></small>
<br> <br>

<h2>Status</h2>

<ol>
<li class={to_highlight(data.rap.step_1_select_tour_process_status)}>
		identifikácia cieľových objektov na preskúmanie
		<ul>
		<li>
			<a href={`/risk-analysis-process/${page.params.rap_code}/step/1-select-tour`}>výber cieľových objektov na preskúmanie</a>
		</li>
		<li>
			<a href={`/risk-analysis-process/${page.params.rap_code}/step/1-check-tour`}>kontrola cieľových objektov na preskúmanie</a>
		</li>
	</ul>
</li>
<li class={to_highlight(data.rap.step_2_threat_identification_process_status)}>
	identifikácia relevantných hrozieb
	<ul>
		<li>
			<a href={`/risk-analysis-process/${page.params.rap_code}/step/2-relevant-threat-identification`}>identifikácia relevantných hrozieb</a>
		</li>
		<li>
			<a href={`/risk-analysis-process/${page.params.rap_code}/step/2-check-relevant-threat-identification`}>kontrola identifikovaných relevantných hrozieb</a>
		</li>
	</ul>
</li>
</ol>