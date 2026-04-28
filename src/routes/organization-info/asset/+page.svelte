<!-- src/routes/asset/+page.svelte -->
<script lang="ts">
    import { invalidateAll } from '$app/navigation';
    import { code_to_name, enum_to_name } from '$lib';
	import CreateAssetModal from '$lib/CreateAssetModal.svelte';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    let showCreateModal = $state(false);

    async function deleteAsset(code: string) {
        if (!confirm(`Naozaj chcete odstrániť aktívum ${code}?`)) return;

        const res = await fetch(`/svc/asset/${code}`, {
            method: 'DELETE',
        });

        if (res.ok) {
            invalidateAll();
        }
    }
</script>

<div class="d-flex justify-content-between align-items-center mb-4">
    <h1>Aktíva</h1>
    <button class="btn btn-primary" onclick={() => showCreateModal = true}>
        Nové aktívum
    </button>
</div>

<table class="table table-striped table-hover">
    <thead class="table-dark">
        <tr>
            <th>Kód</th>
            <th>Názov</th>
            <th>Popis</th>
            <th>Modul</th>
            <th>C</th>
            <th>I</th>
            <th>A</th>
            <th style="width: 10%;"></th>
        </tr>
    </thead>
    <tbody>
        {#each data.assets as asset}
            <tr>
                <td>{asset.code}</td>
                <td>{asset.name}</td>
                <td>{asset.description}</td>
                <td>{asset.module}</td>
                <td>{code_to_name(asset.confidentiality_protection_requirement, data.enums.protection_requirement)}</td>
                <td>{code_to_name(asset.integrity_protection_requirement, data.enums.protection_requirement)}</td>
                <td>{code_to_name(asset.availability_protection_requirement, data.enums.protection_requirement)}</td>
                <td>
                    <button
                        class="btn btn-sm btn-danger"
                        onclick={() => deleteAsset(asset.code)}
                    >
                        Odstrániť
                    </button>
                </td>
            </tr>
        {:else}
            <tr>
                <td colspan="8" class="text-muted">Žiadne aktíva</td>
            </tr>
        {/each}
    </tbody>
</table>

<CreateAssetModal
    show={showCreateModal}
    modules={data.modules}
    enums={data.enums}
    oncreated={() => { showCreateModal = false; invalidateAll(); }}
    onclose={() => showCreateModal = false}
/>