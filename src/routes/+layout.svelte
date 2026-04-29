<script lang="ts">
	import spar_logo from '$lib/assets/spar-logo.png';
	import 'bootstrap/dist/css/bootstrap.min.css';
	import 'bootstrap/dist/js/bootstrap.bundle.min.js';
	


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
				  <a class="nav-link"href="/organization-info/asset">Aktíva</a>
				</li>
				<li class="nav-item">
				  <a class="nav-link"href="/bsi-it-grundschutz-module">Moduly GSK</a>
				</li>
				<li class="nav-item">
				  <a class="nav-link"href="/bsi-it-grundschutz-elementary-threat">Hrozby GSK</a>
				</li>
			  </ul>
			</div>
		  </div>
		</nav>
  	</div>

	{@render children?.()}
</div>