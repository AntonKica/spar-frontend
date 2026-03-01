<script lang="ts">
	import { enum_to_name } from '$lib';
	import AssetProtectionNeedsTable from '$lib/AssetProtectionNeedsTable.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const asset_detail = data.asset_detail;
    
    const to_security_measure_class = (val: boolean) => {
        return val ? "text-bg-success" : "text-bg-light";
    }

    const to_color_class = (sm: boolean, ft: boolean) => {
        if(sm && ft) {
            return "text-bg-success";
        } if(!sm && ft) {
            return "text-bg-warning";
        } else {
            return "text-bg-light";
        }
    }

</script>

<div class="container-fluid pb-5" id="basic-info">
    <div class="h1 pb-2 mb-4 text-primary border-bottom border-primary">Prehľad aktíva</div>

    
    <div class="row">
        <div class="col-8">
            <b>Kód:</b> {asset_detail.code} <br>
            <b>Názov:</b> {asset_detail.name} <br>
            <b>Typ:</b> {enum_to_name(asset_detail.asset_type, data.asset_type_enum)} <br>
        </div>
        <div class="col">
            <AssetProtectionNeedsTable
                asset={asset_detail}
                protection_needs_enum={data.protection_needs_enum}
            ></AssetProtectionNeedsTable>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <b>Popis</b><br><em>{asset_detail.description || "popis je prázdny"}</em>
        </div>
    </div>
</div>
<div class="container-fluid pb-5">
    <div class="h2 pb-2 mb-4 text-dark border-bottom border-dark">Zavedené bezpečnostné opatrenia </div>
    {#if asset_detail.security_measure_list.length === 0}
        <div class="fw-bold fst-italic text-bg-warning">bez zavedených bezpečnostných opatrení</div>
    {/if}
    {#each asset_detail.security_measure_list as security_measure}
        <div class="row justify-content-between border-start border-dark text-bg-light ms-3 me-3 p-2">
            <div class="row">
                <div class="col-10">
                    <b>Kód:</b> {security_measure.code} <br>
                    <b>Názov:</b> {security_measure.name} <br>
                    <br>
                </div>
                <div class="col">
                <table class="table">
                    <caption>ošetruje</caption>
                    <thead>
                        <tr>
                            <th>C</th>
                            <th>I</th>
                            <th>A</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class={to_security_measure_class(security_measure.confidentiality_protected)}></td>
                            <td class={to_security_measure_class(security_measure.integrity_protected)}></td>
                            <td class={to_security_measure_class(security_measure.availability_protected)}></td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <b>Popis</b><br> <em>{security_measure.description || "popis je prázdny"}</em>
                </div>
            </div>
        </div><br>
    {/each}
</div>