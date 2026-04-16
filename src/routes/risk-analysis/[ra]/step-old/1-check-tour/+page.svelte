<script lang="ts">
	import type { PageProps } from './$types';
    import ProtectionNeedCell from '$lib/ProtectionNeedCell.svelte';

    import { page } from '$app/state';
	import { enum_to_name, step_complete } from '$lib';

	let { data }: PageProps = $props();

</script>

<h1>Kontrola vybraných aktív na kontrolu</h1>
<small><a href={`/risk-analysis-process/${page.params.rap_code}/step`}>Vráť sa o krok vyššie.</a> </small>
<br> <br>



<table class="table table-striped caption-top">
<caption><h2>vybrané aktív na kontrolu</h2></caption>
    <thead>
        <tr>
            <th>kód aktíva</th>
            <th>názov aktíva</th>
            <th>typ aktíva</th>
            <th>C</th>
            <th>I</th>
            <th>A</th>
        </tr>
    </thead>
    <tbody>
{#each data.rap.tour_list as tour }
        <tr>
        <td>{tour.code} <a href="/organization-info/asset/{tour.code}/detail">👁</a></td>
        <td>{tour.name}</td>
        <td>{enum_to_name(tour.asset_type, data.asset_type_enum)}</td>
        <ProtectionNeedCell protection_needs={tour.confidentiality_protection_needs} protection_needs_enum={data.protection_needs_enum} />
        <ProtectionNeedCell protection_needs={tour.integrity_protection_needs} protection_needs_enum={data.protection_needs_enum} />
        <ProtectionNeedCell protection_needs={tour.availability_protection_needs} protection_needs_enum={data.protection_needs_enum} />
        </tr>
{/each}
    </tbody>
</table>
<div class="alert alert-info" role="alert">
  <h4 class="alert-heading">Ukončenie výberu aktív na kontrolu</h4>
  <p>V prípade, že ste spokojní s vybratou množino aktív na kontrolu, prejdite do ďalšieho krkoku.</p>
  <button class="btn btn-success" onclick={() => step_complete(page.params.rap_code, data.rap.process_step)}>Potvrdiť a prejsť do ďalšieho kroku</button>
</div>