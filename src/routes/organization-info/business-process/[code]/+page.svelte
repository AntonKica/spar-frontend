<script lang="ts">
	import { UI_ROLE_GET } from '$lib/routes';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<h1>Biznisový proces {data.code}</h1>

názov: {data.name} <br/>
popis procesu: {data.description} <br/>
druh procesu: {data.process_type.name} <br/>
zodpovedný: <a href={UI_ROLE_GET(data.responsible)}>{data.responsible.name}</a><br/>

<h2>príslušné aplikáčné procesy</h2>
