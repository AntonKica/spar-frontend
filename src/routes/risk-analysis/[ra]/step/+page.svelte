<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
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
    <li class="list-group-item"> <a href="/risk-analysis/{data.ra.code}/step/1-threat-identification"> Threat identification </a> </li>
    <li class="list-group-item"> <a href="/risk-analysis/{data.ra.code}/step/2-risk-classification"> Risk classification </a> </li>
    <li class="list-group-item"> <a href="/risk-analysis/{data.ra.code}/step/3-risk-treatment"> Risk treatment </a> </li>
</ol>