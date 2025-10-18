<script lang="ts">
	import { UI_BSI_MODULES_GET } from '$lib/routes';
import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<h1>Aplikácia {data.code}</h1>

názov: {data.name} <br/>
popis: {data.description} <br/>
modul: <a href={UI_BSI_MODULES_GET(data.module_type)}>{data.module_type.name}</a> <br/>