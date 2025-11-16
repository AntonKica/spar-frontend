<script lang="ts">
	import { enum_to_name } from '$lib';
	import { UI_ROLE_GET } from '$lib/routes';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const asset_detail = data.asset_detail;
    
    const to_security_measure_class = (val: boolean) => {
        return val ? "text-bg-success" : "text-bg-light";
    }
    const to_threat_measure_class = (val: boolean) => {
        return val ? "text-bg-danger" : "text-bg-light";
    }
    const to_level_class = (val: number) => {
        if(val === 0) {
            return "text-bg-success";
        } else if(val === 1) {
            return "text-bg-warning";            
        } else {
            return "text-bg-danger";            
        }
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

    const core_value_coverage_list = {
            "dôvernosť": 
            asset_detail.fulfilled_threat_list.map((ft: any) => {
                return {
                    ft: ft,
                    color_list: asset_detail.security_measure_list.map((sm: any) => {
                        return to_color_class(sm.confidentiality_protected, ft.confidentiality_impaired)
                    })
                };
            }),
            "integrita": 
            asset_detail.fulfilled_threat_list.map((ft: any) => {
                return {
                    ft: ft,
                    color_list: asset_detail.security_measure_list.map((sm: any) => {
                        return to_color_class(sm.integrity_protected, ft.integrity_impaired)
                    })
                };
            }),
            "dostupnosť": 
            asset_detail.fulfilled_threat_list.map((ft: any) => {
                return {
                    ft: ft,
                    color_list: asset_detail.security_measure_list.map((sm: any) => {
                        return to_color_class(sm.availability_protected, ft.availability_impaired)
                    })
                };
            }),
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
            <b>Potreba ochrany</b>
            <table class="table caption-top">
                <thead>
                    <tr>
                        <th>C</th>
                        <th>I</th>
                        <th>A</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class={to_level_class(asset_detail.confidentiality_protection_needs)}>
                            {enum_to_name(asset_detail.confidentiality_protection_needs, data.protection_needs_enum)}
                        </td>
                        <td class={to_level_class(asset_detail.integrity_protection_needs)}>
                            {enum_to_name(asset_detail.integrity_protection_needs, data.protection_needs_enum)}
                        </td>
                        <td class={to_level_class(asset_detail.availability_protection_needs)}>
                            {enum_to_name(asset_detail.availability_protection_needs, data.protection_needs_enum)}
                        </td>
                    </tr>
                </tbody>
            </table>
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

<div class="container-fluid pb-5">
    <div class="h2 pb-2 mb-4 text-dark border-bottom border-dark">Naplnené bezpečnostné hrozby</div>
    {#if asset_detail.fulfilled_threat_list.length === 0}
        <div class="fw-bold fst-italic text-bg-success">bez naplnených bezpečnostných hrozieb</div>
    {/if}
    {#each asset_detail.fulfilled_threat_list as fulfilled_threat}
        <div class="row justify-content-between border-start border-dark text-bg-light ms-3 me-3 p-2">
            <div class="row">
                <div class="col-10">
                    <b>Kód:</b> {fulfilled_threat.code} <br>
                    <b>Názov:</b> {fulfilled_threat.threat_name} <br>
                    <b>Časová cena:</b> {fulfilled_threat.time_cost || "N/A" } {fulfilled_threat.time_cost_unit}<br>
                    <b>Finančná cena:</b> {fulfilled_threat.monetary_cost || "N/A"} € <br>
                    <br>
                </div>
                <div class="col">
                <table class="table">
                    <caption>ohrozuje</caption>
                    <thead>
                        <tr>
                            <th>C</th>
                            <th>I</th>
                            <th>A</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class={to_threat_measure_class(fulfilled_threat.confidentiality_impaired)}></td>
                            <td class={to_threat_measure_class(fulfilled_threat.integrity_impaired)}></td>
                            <td class={to_threat_measure_class(fulfilled_threat.availability_impaired)}></td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <b>Popis</b><br> <em>{fulfilled_threat.description || "popis je prázdny"}</em>
                </div>
            </div>
        </div><br>
    {/each}
</div>

<div class="container-fluid pb-5" hidden={asset_detail.security_measure_list.length == 0 || asset_detail.fulfilled_threat_list.length == 0}>
    <div class="h2 pb-2 mb-4 text-info border-bottom border-info">Prehľady</div>
    <div class="h3 pb-2 mb-4 text-dark border-bottom border-dark">pokrytie základných hodnôt</div>
    
    <div class="row">
        <div class="col-3">
            <table class="table">
                <thead>
                    <tr>
                        <th>pokryté</th>
                        <th>ohrozené</th>
                        <th>farba</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>áno</td>
                    <td>áno</td>
                    <td class={to_color_class(true, true)}></td>
                </tr>
                <tr>
                    <td>nie</td>
                    <td>áno</td>
                    <td class={to_color_class(false, true)}></td>
                </tr>
                <tr>
                    <td>áno/nie</td>
                    <td>nie</td>
                    <td class={to_color_class(false, false)}></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>

    {#each Object.entries(core_value_coverage_list) as [core_value, core_coverage]}
    
    <table class="table caption-top">
        <caption class="h4 text-dark">{core_value}</caption>
        <thead>
            <tr>
                <th></th>
            {#each asset_detail.security_measure_list as security_measure}
                <th>
                    <div class="fw-bold">{security_measure.code}</div>
                    <div class="fw-normal fst-italic"><small>{security_measure.name}</small></div>
                </th>
            {/each}
            </tr>
        </thead>
        <tbody>
        {#each core_coverage as fulfilled_threat}
            <tr>
                <td>
                    <div class="fw-bold">{fulfilled_threat.ft.code}</div>
                    <div class="fw-normal fst-italic"><small>{fulfilled_threat.ft.threat_name}</small></div>
                </td>
                {#each fulfilled_threat.color_list as color}
                <td class={color}></td>
                {/each}
            </tr>
        {/each}
        </tbody>
    </table>
    {/each}
</div>