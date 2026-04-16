<script lang="ts">
    import type { LayoutData } from './$types';

    export let data: LayoutData;
</script>

<h1>Risk Analysis: {data.ra.code}</h1>

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
    <li class="list-group-item">
    <a href="/risk-analysis/{data.ra.code}/step/1-threat-identification"> Threat identification </a>
        <ol type="a" class="mt-2">
            <li>Relevant module threats</li>
            <li>Additional elementary threats</li>
            <li>Specific threats</li>
        </ol>
    </li>
</ol>