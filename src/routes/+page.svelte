<script lang="ts">
    import { goto } from '$app/navigation';
	import type { pageprops } from './$types';
	import { enum_to_name, create_post_request_empty } from '$lib';
	let { data }: pageprops = $props();

    async function create_risk_analysis() {
        const res = await fetch('/svc/risk-analysis', create_post_request_empty())
		const json = await res.json()
        if (json.code === undefined) {
            alert("Chyba pri vytvarani" + json.message)
            return;
        }
        
        alert("Proces analýzy rizík bol úspešne iniciovaný")
        goto(`/risk-analysis/${json.code}/step`);
    }
</script>

<style>
    .box {
        background-color: lightgray;
        border: 2px solid black;
        margin: 20px;
        padding: 20px;
        width: 10em;
        height: 10em;
    }
</style>
<h1>SPAR - Systém na podporu analýzy rizík</h1>

<button class="btn btn-primary" onclick={create_risk_analysis}>Začni novú analýzu rizík.</button>

<h2>prehľad procesov analýzy rizík</h2>

<table class="table table-striped">
    <thead>
        <tr>
            <td>kód</td>
            <td>dátum</td>
            <td>status</td>
            <td>pozri</td>
        </tr>
    </thead>
    <tbody>
    {#each data.ra_list as ra}
    <tr>
        <td>{ra.code}</td>
        <td>{ra.created_at}</td>
        <td>{enum_to_name(ra.state, data.risk_analysis_state)}</td>
        <td><a href={`/risk-analysis/${ra.code}/step`}>pozri</a></td>
    </tr>
    {/each}
    </tbody>
</table>
