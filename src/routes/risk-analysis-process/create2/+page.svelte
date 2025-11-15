<script lang="ts">
	import type { PageProps } from './$types';
    import { goto } from '$app/navigation';
	import { create_post_request } from '$lib';

	let { data }: PageProps = $props();

    async function create_risk_analysis_process() {
        const res = await fetch('/svc/risk-analysis-process/create', create_post_request({}))
		const json = await res.json()
        if (json.status != "ok") {
            alert("Chyba pri vytvarani" + json.message)
            return;
        }
        
        alert("Proces analýzy rizík bol úspešne iniciovaný")
        goto("/risk-analysis-process/");
    }
</script>

<h1> Vytvorenie nového procesu analýzy rizík</h1>

<button type="button" class="btn btn-primary" onclick={create_risk_analysis_process}>Zační nový proces analýzy rizík</button>