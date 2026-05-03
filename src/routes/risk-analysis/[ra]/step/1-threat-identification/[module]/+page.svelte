<script lang="ts">
    import type { PageData } from './$types';
    import { page } from '$app/state';
    import { goto } from '$app/navigation';
	import { enum_to_name, categoryColors } from '$lib';
    import { invalidateAll } from '$app/navigation';
    import CreateThreatModal from '$lib/CreateSpecificThreat.svelte';
	import { SvelteSet } from 'svelte/reactivity';

    // ... existing code ...

    let showModal = $state(false);
    let { data }: { data: PageData } = $props();
    let selectedThreats: Set<string> = new SvelteSet(data.selectedCodes);
    const ra = page.params.ra;
    const module = page.params.module;

    function toggle(code: string) {
        if (selectedThreats.has(code)) {
            selectedThreats.delete(code);
        } else {
            selectedThreats.add(code);
        }
    }

    async function markDone() {
        await fetch(`/svc/risk-analysis/mark-done/${ra}/${module}`, {
            method: 'POST',
        });

        goto(`/risk-analysis/${ra}/step/1-threat-identification`);
    }
    async function saveThreats() {
        await fetch(`/svc/risk-analysis/sync-threats/${ra}/${module}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([...selectedThreats]),
        });
    }
</script>

<h2>Identifikácia relevantných hrozieb: {module}</h2>
<button class="btn btn-primary" onclick={saveThreats}> Uložiť ({selectedThreats.size}) </button>
<button class="btn btn-success" onclick={markDone}> Označiť ako dokončené </button>


<h3>Relevantné základné hrozby pre modul</h3>

<table class="table table-striped table-hover">
    <thead class="table-dark">
        <tr>
            <th style="width: 10%;">Kód</th>
            <th style="width: 40%;">Názov</th>
            <th style="width: 25%;">Kategória</th>
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
                <td><span class="badge {categoryColors[threat.category] ?? 'bg-secondary'}"> {enum_to_name(threat.category, data.enums.threat_category)}</span></td>
                <td>{threat.confidentiality_impaired ? 'X' : ''}</td>
                <td>{threat.integrity_impaired ? 'X' : ''}</td>
                <td>{threat.availability_impaired ? 'X' : ''}</td>
                <td>
                    <button
                        class="btn btn-sm {selectedThreats.has(threat.code) ? 'btn-danger' : 'btn-outline-primary'}"
                        onclick={() => toggle(threat.code)}
                    >
                        {selectedThreats.has(threat.code) ? 'Vymaž' : 'Pridaj'}
                    </button>
                </td>
            </tr>
        {:else}
            <tr><td colspan="6" class="text-muted">No module threats</td></tr>
        {/each}
    </tbody>
</table>

<h3>Dodatočné základné hrozby</h3>

<table class="table table-striped table-hover">
    <thead class="table-dark">
        <tr>
            <th style="width: 10%;">Kód</th>
            <th style="width: 40%;">Názov</th>
            <th style="width: 25%;">Kategória</th>
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
                <td><span class="badge {categoryColors[threat.category] ?? 'bg-secondary'}"> {enum_to_name(threat.category, data.enums.threat_category)}</span></td>
                <td>{threat.confidentiality_impaired ? 'X' : ''}</td>
                <td>{threat.integrity_impaired ? 'X' : ''}</td>
                <td>{threat.availability_impaired ? 'X' : ''}</td>
                <td>
                    <button
                        class="btn btn-sm {selectedThreats.has(threat.code) ? 'btn-danger' : 'btn-outline-primary'}"
                        onclick={() => toggle(threat.code)}
                    >
                        {selectedThreats.has(threat.code) ? 'Vymaž' : 'Pridaj'}
                    </button>
                </td>
            </tr>
        {:else}
            <tr><td colspan="6" class="text-muted">Žiadne dodatočné elementárne hrozby</td></tr>
        {/each}
    </tbody>
</table>

<h3>Špecifické hrozby


    <button class="btn btn-outline-primary btn-sm" onclick={() => showModal = true}>
        Vytvor novú špecifickú hrozbu
    </button>
</h3>

<CreateThreatModal
    show={showModal}
    enums={data.enums}
    oncreated={() => { showModal = false; invalidateAll(); }}
    onclose={() => showModal = false}
/>

<table class="table table-striped table-hover">
    <thead class="table-dark">
        <tr>
            <th style="width: 10%;">Kód</th>
            <th style="width: 40%;">Názov</th>
            <th style="width: 25%;">Kategória</th>
            <th style="width: 5%;">C</th>
            <th style="width: 5%;">I</th>
            <th style="width: 5%;">A</th>
            <th style="width: 10%;"></th>
        </tr>
    </thead>
    <tbody>
        {#each data.specificThreats as threat}
            <tr>
                <td>{threat.code}</td>
                <td>{threat.name}</td>
                <td><span class="badge {categoryColors[threat.category] ?? 'bg-secondary'}"> {enum_to_name(threat.category, data.enums.threat_category)}</span></td>
                <td>{threat.confidentiality_impaired ? 'X' : ''}</td>
                <td>{threat.integrity_impaired ? 'X' : ''}</td>
                <td>{threat.availability_impaired ? 'X' : ''}</td>
                <td>
                    <button
                        class="btn btn-sm {selectedThreats.has(threat.code) ? 'btn-danger' : 'btn-outline-primary'}"
                        onclick={() => toggle(threat.code)}
                    >
                        {selectedThreats.has(threat.code) ? 'Vymaž' : 'Pridaj'}
                    </button>
                </td>
            </tr>
        {:else}
            <tr><td colspan="6" class="text-muted">Žiadne špecifické hrozby</td></tr>
        {/each}
    </tbody>
</table>