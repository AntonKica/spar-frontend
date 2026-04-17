<script lang="ts">
    import type { PageData } from './$types';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
	import { enum_to_name } from '$lib';

    export let data: PageData;

    let selectedThreats = new Set<string>();

    function toggle(code: string) {
        if (selectedThreats.has(code)) {
            selectedThreats.delete(code);
        } else {
            selectedThreats.add(code);
        }
        selectedThreats = selectedThreats;
    }

    async function markDone() {
        const ra = $page.params.ra;
        const module = $page.params.module;

        await fetch(`/svc/risk-analysis/mark-done/${ra}/${module}`, {
            method: 'POST',
        });

        goto(`/risk-analysis/${ra}/step/threat-identification`);
    }

     const categoryColors: Record<string, string> = {
        natural_threat: 'bg-success',
        infrastructure_failure: 'bg-secondary',
        compromise_of_functions_and_services: 'bg-warning text-dark',
        human_actions: 'bg-danger',
        physical_threats: 'bg-info text-dark',
        technical_failures: 'bg-primary',
        organizational_threats: 'bg-dark',
    };
</script>

<div class="d-flex justify-content-between align-items-center mb-4">
    <h2>Threat identification: {$page.params.module}</h2>
    <button class="btn btn-success" on:click={markDone}>
        Mark as done
    </button>
</div>

<h3>Relevant module threats</h3>

<table class="table table-striped table-hover">
    <thead class="table-dark">
        <tr>
            <th style="width: 10%;">Code</th>
            <th style="width: 40%;">Name</th>
            <th style="width: 25%;">Category</th>
            <th style="width: 5%;">C</th>
            <th style="width: 5%;">I</th>
            <th style="width: 5%;">A</th>
            <th style="width: 10%;"></th>
        </tr>
    </thead>
    <tbody>
        {#each data.moduleThreats as threat}
            <tr>
                <td>{threat.code}</td>
                <td>{threat.name}</td>
                <td><span class="badge {categoryColors[threat.category] ?? 'bg-secondary'}"> {enum_to_name(threat.category, data.threat_category)}</span></td>
                <td>{threat.confidentiality_impaired ? 'X' : ''}</td>
                <td>{threat.integrity_impaired ? 'X' : ''}</td>
                <td>{threat.availability_impaired ? 'X' : ''}</td>
                <td>
                    <button
                        class="btn btn-sm {selectedThreats.has(threat.code) ? 'btn-danger' : 'btn-outline-primary'}"
                        on:click={() => toggle(threat.code)}
                    >
                        {selectedThreats.has(threat.code) ? 'Remove' : 'Add'}
                    </button>
                </td>
            </tr>
        {:else}
            <tr><td colspan="6" class="text-muted">No module threats</td></tr>
        {/each}
    </tbody>
</table>

<h3>Additional elementary threats</h3>

<table class="table table-striped table-hover">
    <thead class="table-dark">
        <tr>
            <th style="width: 10%;">Code</th>
            <th style="width: 40%;">Name</th>
            <th style="width: 25%;">Category</th>
            <th style="width: 5%;">C</th>
            <th style="width: 5%;">I</th>
            <th style="width: 5%;">A</th>
            <th style="width: 10%;"></th>
        </tr>
    </thead>
    <tbody>
        {#each data.elementaryThreats as threat}
            <tr>
                <td>{threat.code}</td>
                <td>{threat.name}</td>
                <td><span class="badge {categoryColors[threat.category] ?? 'bg-secondary'}"> {enum_to_name(threat.category, data.threat_category)}</span></td>
                <td>{threat.confidentiality_impaired ? 'X' : ''}</td>
                <td>{threat.integrity_impaired ? 'X' : ''}</td>
                <td>{threat.availability_impaired ? 'X' : ''}</td>
                <td>
                    <button
                        class="btn btn-sm {selectedThreats.has(threat.code) ? 'btn-danger' : 'btn-outline-primary'}"
                        on:click={() => toggle(threat.code)}
                    >
                        {selectedThreats.has(threat.code) ? 'Remove' : 'Add'}
                    </button>
                </td>
            </tr>
        {:else}
            <tr><td colspan="6" class="text-muted">No additional elementary threats</td></tr>
        {/each}
    </tbody>
</table>

<h3>Specific threats</h3>

<table class="table table-striped table-hover">
    <thead class="table-dark">
        <tr>
            <th>Code</th>
            <th>Name</th>
            <th>C</th>
            <th>I</th>
            <th>A</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        {#each data.specificThreats as threat}
            <tr>
                <td>{threat.code}</td>
                <td>{threat.name}</td>
                <td>{threat.confidentiality_impaired ? 'X' : ''}</td>
                <td>{threat.integrity_impaired ? 'X' : ''}</td>
                <td>{threat.availability_impaired ? 'X' : ''}</td>
                <td>
                    <button
                        class="btn btn-sm {selectedThreats.has(threat.code) ? 'btn-danger' : 'btn-outline-primary'}"
                        on:click={() => toggle(threat.code)}
                    >
                        {selectedThreats.has(threat.code) ? 'Remove' : 'Add'}
                    </button>
                </td>
            </tr>
        {:else}
            <tr><td colspan="6" class="text-muted">No specific threats</td></tr>
        {/each}
    </tbody>
</table>