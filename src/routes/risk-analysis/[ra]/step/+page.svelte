<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;

    let state_to_color_link = (state:string) => {
        return state === data.ra.state ? "link-primary" : "link-secondary";
    }
</script>

<h2>Aktíva</h2>
<table class="table table-striped table-hover">
    <thead class="table-dark">
        <tr>
            <th>Kód</th>
            <th>Meno</th>
            <th>Popis</th>
            <th>Modul</th>
        </tr>
    </thead>
    <tbody>
        {#each data.assets as asset}
            <tr>
                <td>{asset.code}</td>
                <td>{asset.name}</td>
                <td>{asset.description}</td>
                <td>{asset.module}</td>
            </tr>
        {/each}
    </tbody>
</table>

<h2>Moduly</h2>

<table class="table table-striped table-hover">
    <thead class="table-dark">
        <tr>
            <th>Kód</th>
            <th>Názov</th>
            <th>Popis</th>
        </tr>
    </thead>
    <tbody>
        {#each data.modules as module}
            <tr>
                <td>{module.code}</td>
                <td>{module.name}</td>
                <td>{module.description}</td>
            </tr>
        {/each}
    </tbody>
</table>

<h2>Pracovný postup</h2>

<ol class="list-group list-group-numbered">
    <li class="list-group-item"> <a href="/risk-analysis/{data.ra.code}/step/1-threat-identification" class={state_to_color_link("threat_identification")}> Identifikácia rizík </a> </li>
    <li class="list-group-item"> <a href="/risk-analysis/{data.ra.code}/step/2-risk-classification" class={state_to_color_link("risk_classification")}> Klasifikácia rizík </a> </li>
    <li class="list-group-item"> <a href="/risk-analysis/{data.ra.code}/step/3-risk-treatment" class={state_to_color_link("risk_treatment")}> Ošetrenie rizík </a> </li>
    <li class="list-group-item"> <a href="/risk-analysis/{data.ra.code}/step/4-it-grundschutz-check" class={state_to_color_link("it_grundschutz_check")}> Kontrola IT-Grundschutz </a> </li>
    <li class="list-group-item"> <a href="/risk-analysis/{data.ra.code}/step/5-summary" class={state_to_color_link("done")}> Zhrnutie </a> </li>
</ol>