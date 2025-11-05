<script lang="ts">
	import { UI_RISK_ANALYSIS_PROCESS_WORKFLOW } from '$lib';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<h1>Proces analýzy rizík {data.rap}</h1>
<small><a href={UI_RISK_ANALYSIS_PROCESS_WORKFLOW.list()}>Vráť sa o krok vyššie.</a></small>
<br> <br>

<h2>Status</h2>

<ul>
<li>
	<a href={UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_1_threat_overview(data.rap)}>Identifikácia relevantných hrozieb</a>
</li>

<li>
	<a href={UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_2_risk_classification(data.rap)}>Klasifikácia rizíkk</a>
</li>
</ul>