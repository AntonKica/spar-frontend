<script lang="ts">
    import { SvelteSet } from 'svelte/reactivity';
    import { page } from '$app/state';
    import { invalidateAll } from '$app/navigation';
    import type { PageData } from './$types';
    import CreateSecurityMeasure from '$lib/CreateSecurityMeasure.svelte';

    let showCreateModal = $state(false);


    let { data }: { data: PageData } = $props();

    let selected = new SvelteSet<string>(data.linkedCodes);

    function toggle(code: string) {
        if (selected.has(code)) {
            selected.delete(code);
        } else {
            selected.add(code);
        }
    }

    async function save() {
        const ra = page.params.ra;

        const res = await fetch(`/svc/risk-analysis/sync-org-risk-treatment/${ra}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([...selected]),
        });

        if (res.ok) {
            invalidateAll();
        }
    }
</script>

<div class="d-flex justify-content-between align-items-center mb-4">
    <h2>Organizačné opatrenia</h2>
    <div class="d-flex gap-2">
        <button class="btn btn-outline-primary" onclick={() => showCreateModal = true}>
            Nové opatrenie
        </button>
        <button class="btn btn-primary" onclick={save}>
            Uložiť ({selected.size})
        </button>
    </div>
</div>

<CreateSecurityMeasure
    show={showCreateModal}
    allowedTypes={["reduce"]}
    defaultType="reduce"
    enums={data.enums}
    oncreated={() => { showCreateModal = false; invalidateAll(); }}
    onclose={() => showCreateModal = false}
/>

<table class="table table-striped table-hover">
    <thead class="table-dark">
        <tr>
            <th style="width: 40px;"></th>
            <th>Kód</th>
            <th>Popis</th>
        </tr>
    </thead>
    <tbody>
        {#each data.allMeasures as measure}
            <tr>
                <td>
                    <button
                        class="btn btn-sm {selected.has(measure.code) ? 'btn-danger' : 'btn-outline-primary'}"
                        onclick={() => toggle(measure.code)}
                    >
                        {selected.has(measure.code) ? '✕' : '+'}
                    </button>
                </td>
                <td>{measure.code}</td>
                <td>{measure.description}</td>
            </tr>
        {:else}
            <tr>
                <td colspan="3" class="text-muted">Žiadne bezpečnostné opatrenia</td>
            </tr>
        {/each}
    </tbody>
</table>