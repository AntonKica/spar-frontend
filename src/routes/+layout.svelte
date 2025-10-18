<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<style>
/* The side navigation menu */
.content {
  margin-left: 250px;
}
.sidenav {
  height: 100%; /* 100% Full-height */
  width: 250px; /* 0 width - change this with JavaScript */
  position: fixed;
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  overflow-x: hidden; /* Disable horizontal scroll */
  background-color: lightgray;
  padding-top: 2em; /* Place content 60px from the top */
}
table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {background-color: #f2f2f2;}
</style>

<div class="sidenav">
<ul>
	<li> <a href="/">Organizačné informácie</a> 
		<ul>
			<li>
				<a href="/organization-info/business-process">biznisové procesy</a>
			</li>
			<li>
				<a href="#">miestnosti</a>
			</li>
			<li>
				<a href="#">osoby</a>
			</li>
			<li>
				<a href="/organization-info/role">roly</a>
			</li>
			<li>
				<a href="#">it systémy</a>
			</li>
			<li>
				<a href="#">technika</a>
			</li>
			<li>
				<a href="#">aplikácie</a>
			</li>
		</ul>
	</li>
</ul>
</div>
<div class="content">
{@render children?.()}
</div>