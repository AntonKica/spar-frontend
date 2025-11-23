<script lang="ts">
	import type { PageProps } from './$types';
    import { page } from '$app/state'

    import { goto } from '$app/navigation';
	import { create_post_request_empty, enum_to_name } from '$lib';

	let { data }: PageProps = $props();
</script>

<h1>Identifikácia relevantných hrozieb</h1>
<small><a href={`/risk-analysis-process/${page.params.rap_code}/step`}>Vráť sa o krok vyššie.</a> </small>
<table class="table table-striped caption-top">
    <thead>
        <tr>
            <th>kód aktíva</th>
            <th>názov aktíva</th>
            <th>typ aktíva</th>
            <th>akcia</th>
        </tr>
    </thead>
    <tbody>
{#each data.rap.tour_list as tour }
        <tr>
        <td>{tour.code} <a href="/organization-info/asset/{tour.code}/detail">👁</a></td>
        <td>{tour.name}</td>
        <td>{enum_to_name(tour.asset_type, data.asset_type_enum)}</td>
        <td><a class="btn btn-primary" href={`/risk-analysis-process/${page.params.rap_code}/step/2-relevant-threat-identification/${tour.code}`}>posúď hrozby</a></td>
        </tr>
{/each}
    </tbody>
</table>