<!-- src/routes/asset/CreateAssetModal.svelte -->
<script lang="ts">
    let { show, modules, enums, oncreated, onclose }: {
        show: boolean;
        modules: { code: string; name: string }[];
        enums: { protection_requirement: { code: string; name: string }[] };
        oncreated: () => void;
        onclose: () => void;
    } = $props();

    let name = $state('');
    let description = $state('');
    let module = $state('');
    let confidentiality_protection_requirement = $state('low');
    let integrity_protection_requirement = $state('low');
    let availability_protection_requirement = $state('low');
    let confidentiality_protection_requirement_description = $state('');
    let integrity_protection_requirement_description = $state('');
    let availability_protection_requirement_description = $state('');

    function reset() {
        name = '';
        description = '';
        module = '';
        confidentiality_protection_requirement = 'low';
        integrity_protection_requirement = 'low';
        availability_protection_requirement = 'low';
        confidentiality_protection_requirement_description = '';
        integrity_protection_requirement_description = '';
        availability_protection_requirement_description = '';
    }

    function close() {
        reset();
        onclose();
    }

    async function create() {
        const res = await fetch('/svc/asset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                description,
                module,
                confidentiality_protection_requirement,
                integrity_protection_requirement,
                availability_protection_requirement,
                confidentiality_protection_requirement_description,
                integrity_protection_requirement_description,
                availability_protection_requirement_description,
            }),
        });

        if (res.ok) {
            reset();
            oncreated();
        }
    }

    let canSubmit = $derived(name.trim() !== '' && module !== '');
</script>

{#if show}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="modal d-block" tabindex="-1" onclick={(e) => { if (e.target === e.currentTarget) close(); }}>
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Nové aktívum</h5>
                    <button type="button" class="btn-close" onclick={close}></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="name" class="form-label">Názov</label>
                        <input type="text" class="form-control" id="name" bind:value={name} />
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label">Popis</label>
                        <textarea class="form-control" id="description" rows="3" bind:value={description}></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="module" class="form-label">Modul</label>
                        <select class="form-select" id="module" bind:value={module}>
                            <option value="">— Vyberte modul —</option>
                            {#each modules as m}
                                <option value={m.code}>{m.code} — {m.name}</option>
                            {/each}
                        </select>
                    </div>

                    <hr />
                    <h6>Požiadavky na ochranu</h6>

                    <div class="row g-3 mb-3">
                        <div class="col-md-4">
                            <label for="c-req" class="form-label">Dôvernosť</label>
                            <select class="form-select" id="c-req" bind:value={confidentiality_protection_requirement}>
                                {#each enums.protection_requirement as p}
                                    <option value={p.code}>{p.name}</option>
                                {/each}
                            </select>
                        </div>
                        <div class="col-md-4">
                            <label for="i-req" class="form-label">Integrita</label>
                            <select class="form-select" id="i-req" bind:value={integrity_protection_requirement}>
                                {#each enums.protection_requirement as p}
                                    <option value={p.code}>{p.name}</option>
                                {/each}
                            </select>
                        </div>
                        <div class="col-md-4">
                            <label for="a-req" class="form-label">Dostupnosť</label>
                            <select class="form-select" id="a-req" bind:value={availability_protection_requirement}>
                                {#each enums.protection_requirement as p}
                                    <option value={p.code}>{p.name}</option>
                                {/each}
                            </select>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="c-desc" class="form-label">Odôvodnenie dôvernosti</label>
                        <textarea class="form-control" id="c-desc" rows="2" bind:value={confidentiality_protection_requirement_description}></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="i-desc" class="form-label">Odôvodnenie integrity</label>
                        <textarea class="form-control" id="i-desc" rows="2" bind:value={integrity_protection_requirement_description}></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="a-desc" class="form-label">Odôvodnenie dostupnosti</label>
                        <textarea class="form-control" id="a-desc" rows="2" bind:value={availability_protection_requirement_description}></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick={close}>Zrušiť</button>
                    <button type="button" class="btn btn-primary" onclick={create} disabled={!canSubmit}>Vytvoriť</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-backdrop fade show"></div>
{/if}