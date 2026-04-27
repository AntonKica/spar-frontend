<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;

    let state_to_color_link = (state:string) => {
        return state === data.ra.state ? "link-primary" : "link-secondary";
    }
</script>

<h2>Assets</h2>
<table class="table table-striped table-hover">
    <thead class="table-dark">
        <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Description</th>
            <th>Module</th>
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

<h2>Modules</h2>

<table class="table table-striped table-hover">
    <thead class="table-dark">
        <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Description</th>
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

<h2>Workflow</h2>

<ol class="list-group list-group-numbered">
    <li class="list-group-item"> <a href="/risk-analysis/{data.ra.code}/step/1-threat-identification" class={state_to_color_link("threat_identification")}> Threat identification </a> </li>
    <li class="list-group-item"> <a href="/risk-analysis/{data.ra.code}/step/2-risk-classification" class={state_to_color_link("risk_classification")}> Risk classification </a> </li>
    <li class="list-group-item"> <a href="/risk-analysis/{data.ra.code}/step/3-risk-treatment" class={state_to_color_link("risk_treatment")}> Risk treatment </a> </li>
    <li class="list-group-item"> <a href="/risk-analysis/{data.ra.code}/step/4-it-grundschutz-check" class={state_to_color_link("it_grundschutz_check")}> It Grundschut check </a> </li>
    <li class="list-group-item"> <a href="/risk-analysis/{data.ra.code}/step/5-summary" class={state_to_color_link("done")}> Zhrnutie </a> </li>
</ol>