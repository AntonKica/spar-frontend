<script lang="ts">
    let { show, oncreated, onclose, enums }: {
        show: boolean;
        oncreated: () => void;
        onclose: () => void;
        enums: { risk_treatment_type: { code: string; name: string }[] };
    } = $props();

    let newThreat = $state({
        name: '',
        description: '',
        confidentiality_impaired: false,
        integrity_impaired: false,
        availability_impaired: false,
        category: 'human_actions',
    });

    function reset() {
        newThreat = {
            name: '',
            description: '',
            confidentiality_impaired: false,
            integrity_impaired: false,
            availability_impaired: false,
            category: 'human_actions',
        };
    }

    function close() {
        reset();
        onclose();
    }

    async function create() {
        const res = await fetch('/svc/threat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newThreat),
        });

        if (res.ok) {
            reset();
            oncreated();
        }
    }
</script>

{#if show}
    <div class="modal d-block" tabindex="-1" onclick={(e) => { if (e.target === e.currentTarget) close(); }}>
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Nová špecifická hrozba</h5>
                    <button type="button" class="btn-close" onclick={close}></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="name" class="form-label">Názov</label>
                        <input type="text" class="form-control" id="name" bind:value={newThreat.name} />
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label">Popis</label>
                        <textarea class="form-control" id="description" rows="3" bind:value={newThreat.description}></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="category" class="form-label">Kategória</label>
                        <select class="form-select" id="category" bind:value={newThreat.category}>
                            {#each enums.threat_category as tc}
                            <option value={tc.code}>{tc.name}</option>
                            {/each}
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Dopad</label>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="cia-c" bind:checked={newThreat.confidentiality_impaired} />
                            <label class="form-check-label" for="cia-c">Dôvernosť</label>
                        </div>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="cia-i" bind:checked={newThreat.integrity_impaired} />
                            <label class="form-check-label" for="cia-i">Integrita</label>
                        </div>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="cia-a" bind:checked={newThreat.availability_impaired} />
                            <label class="form-check-label" for="cia-a">Dostupnosť</label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick={close}>Zruš</button>
                    <button type="button" class="btn btn-primary" onclick={create} disabled={!newThreat.name}>Vytvor</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-backdrop fade show"></div>
{/if}