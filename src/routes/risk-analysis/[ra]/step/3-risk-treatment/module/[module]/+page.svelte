<script lang="ts">
    import { SvelteSet } from 'svelte/reactivity';
    import { page } from '$app/state';
    import { invalidateAll } from '$app/navigation';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    let selected = new SvelteSet<string>(data.linkedCodes);
    let hasExisting = $derived(data.linkedCodes.length > 0);

    function toggle(code: string) {
        if (selected.has(code)) {
            selected.delete(code);
        } else {
            selected.add(code);
        }
    }

    async function save() {
        const ra = page.params.ra;
        const module = page.params.module;

        const res = await fetch(
            `/svc/risk-analysis/sync-module-risk-treatment/${ra}/${module}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify([...selected]),
            }
        );

        if (res.ok) {
            invalidateAll();
        }
    }

    async function remove() {
        const ra = page.params.ra;
        const module = page.params.module;

        const res = await fetch(
            `/svc/risk-analysis/module-risk-treatment/${ra}/${module}`,
            { method: 'DELETE' }
        );

        if (res.ok) {
            invalidateAll();
        }
    }
</script>

<div class="d-flex justify-content-between align-items-center mb-4">
    <h2>Opatrenia pre modul: {page.params.module}</h2>
    <div class="d-flex gap-2">
        {#if hasExisting}
            <button class="btn btn-danger" onclick={remove}>
                Odstrániť
            </button>
        {/if}
        
        <button class="btn btn-primary" onclick={save}>
            Uložiť ({selected.size})
        </button>
    </div>
</div>

{#if !hasExisting}
    <div class="alert alert-warning mb-4">
        Pre tento modul nie sú definované žiadne opatrenia.
    </div>
{/if}

<h3>Požiadavky modulu</h3>

<table class="table table-striped table-hover">
    <thead class="table-dark">
        <tr>
            <th style="width: 40px;"></th>
            <th>Kód</th>
            <th>Popis</th>
        </tr>
    </thead>
    <tbody>
        {#each data.requirements as req}
            <tr>
                <td>
                    <button
                        class="btn btn-sm {selected.has(req.code) ? 'btn-danger' : 'btn-outline-primary'}"
                        onclick={() => toggle(req.code)}
                    >
                        {selected.has(req.code) ? '✕' : '+'}
                    </button>
                </td>
                <td>{req.code}</td>
                <td>{req.description}</td>
            </tr>
        {:else}
            <tr>
                <td colspan="3" class="text-muted">Žiadne požiadavky</td>
            </tr>
        {/each}
    </tbody>
</table>