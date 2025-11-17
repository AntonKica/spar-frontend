<script lang="ts">
	import {  UI_RISK_ANALYSIS_PROCESS_WORKFLOW } from '$lib';
	import favicon from '$lib/assets/favicon.svg';
	import spar_logo from '$lib/assets/spar-logo.png';
	import { UI_APPLICATION_LIST, UI_ENUM_BSI_IT_GRUNDSHUTZ_MODULE_LIST, UI_BUSINESS_PROCESS_LIST, UI_ROLE_LIST, UI_IT_SYSTEM_LIST, UI_TABLES, UI_ENUM_BSI_IT_GRUNDSHUTZ_ELEMENTARY_THREAT_LIST} from '$lib/routes';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={spar_logo} />
</svelte:head>

<style>
</style>

<div class="container-fluid">
	<div class="row ">
		<nav class="navbar navbar-expand-lg bg-body-tertiary">
		  <div class="container-fluid">
			<img src={spar_logo} alt="SPAR" width="30" height="30" class="d-inline-block align-text-top">
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			  <span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
			  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
				<li class="nav-item">
				  <a class="nav-link"href="/">Domov</a>
				</li>
				<li class="nav-item">
				  <a class="nav-link" href="/risk-analysis-process">Analýza rizík</a>
				</li>
				<li class="nav-item">
				  <a class="nav-link" href="/risk-analysis-process/create2">0. Vytvorenie procesu analýzy rizík</a>
				</li>
				<li class="nav-item">
				  <a class="nav-link" href="/risk-analysis-process/RAP-000001/step/1-select-tour">1. Výber cieľových objektov na preskúmanie</a>
				</li>
				<li class="nav-item">
					  <a class="nav-link" href="/risk-analysis-process/RAP-000001/step/1-select-tour">1. Výber cieľových objektov na preskúmanie kontrola</a>
				</li>
			  </ul>
			</div>
		  </div>
		</nav>
  	</div>

	{@render children?.()}
</div>