<script lang="ts">
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<h1>Rola {data.code}</h1>

názov: {data.name} <br/>
popis: {data.description} <br/>