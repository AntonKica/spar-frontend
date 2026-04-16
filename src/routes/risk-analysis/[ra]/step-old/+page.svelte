<script lang="ts">
	import type { PageProps } from './$types';
	import { page } from '$app/state';
	let { data }: PageProps = $props();

	const to_highlight = (process_status: number, highlight_status: number) => {
		if(process_status === highlight_status) {
			return "text-success";
		} else if (process_status === 2) {
			return "text-secondary";
		} else {
			return "text-primary";
		}
	}
</script>

<h1>Proces analýzy rizík {data.ra.code}</h1>
<small><a href={`/risk-analysis/list`}>Vráť sa o krok vyššie.</a></small>
<br> <br>

<h2>Status</h2>

<ol>
<li class={to_highlight(data.ra.process_step, 0)}>
		identifikácia cieľových objektov na preskúmanie
		<ul>
		<li>
			<a href={`/risk-analysis/${page.params.ra_code}/step/1-select-tour`}>výber cieľových objektov na preskúmanie</a>
		</li>
		<li>
			<a href={`/risk-analysis/${page.params.ra_code}/step/1-check-tour`}>kontrola cieľových objektov na preskúmanie</a>
		</li>
	</ul>
</li>
<li class={to_highlight(data.ra.process_step, 1)}>
	identifikácia relevantných hrozieb
	<ul>
		<li>
			<a href={`/risk-analysis/${page.params.ra_code}/step/2-relevant-threat-identification`}>identifikácia relevantných hrozieb</a>
		</li>
		<li>
			<a href={`/risk-analysis/${page.params.ra_code}/step/2-relevant-threat-identification-check`}>kontrola identifikovaných relevantných hrozieb</a>
		</li>
	</ul>
</li>
<li class={to_highlight(data.ra.process_step, 2)}>
	klasifikácia potenciálnych rizík
	<ul>
		<li>
			<a href={`/risk-analysis/${page.params.ra_code}/step/3-risk-classification`}>klasifikácia rizík</a>
		</li>
		<li>
			<a href={`/risk-analysis/${page.params.ra_code}/step/3-risk-classification-check`}>kontrola klasifikácie rizík</a>
		</li>
	</ul>
</li>
<li class={to_highlight(data.ra.process_step, 3)}>
	klasifikácia potenciálnych rizík
	<ul>
		<li>
			<a href={`/risk-analysis/${page.params.ra_code}/step/4-risk-treatment`}>ošetrenie rizík</a>
		</li>
		<li>
			<a href={`/risk-analysis/${page.params.ra_code}/step/4-risk-treatment-check`}>kontrola ošetrenia rizík</a>
		</li>
	</ul>
</li>
</ol>