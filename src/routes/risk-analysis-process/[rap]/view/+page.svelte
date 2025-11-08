<script lang="ts">
	import { UI_RISK_ANALYSIS_PROCESS_WORKFLOW } from '$lib';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<h1>Proces analýzy rizík {data.params.rap}</h1>
<small><a href={UI_RISK_ANALYSIS_PROCESS_WORKFLOW.list()}>Vráť sa o krok vyššie.</a></small>
<br> <br>

<h2>Status</h2>

<ul>
<li>
	<a href={UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_1_threat_overview(data.params.rap)}>Identifikácia relevantných hrozieb</a>
</li>

<li>
	<a href={UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_2_risk_classification(data.params.rap)}>Klasifikácia rizík</a>
</li>
<li>
	<a href={UI_RISK_ANALYSIS_PROCESS_WORKFLOW.step_3_risk_treatment(data.params)}>Ošetrenie rizík</a>
</li>
</ul>