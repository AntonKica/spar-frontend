<script lang="ts">
    import { enum_to_name } from '$lib';

    let { show, allowedTypes, defaultType, enums, oncreated, onclose }: {
        show: boolean;
        allowedTypes: string[];
        defaultType: string;
        enums: { treatment_type: { code: string; name: string }[] };
        oncreated: () => void;
        onclose: () => void;
    } = $props();

    let treatmentType = $state(defaultType);
    let description = $state('');

    function reset() {
        treatmentType = defaultType;
        description = '';
    }

    function close() {
        reset();
        onclose();
    }

    async function create() {
        const res = await fetch('/svc/security-measure', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                treatment: treatmentType,
                description,
            }),
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
                <h5 class="modal-title">Nové opatrenie</h5>
                <button type="button" class="btn-close" onclick={close}></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label for="treatment-type" class="form-label">Typ ošetrenia</label>
                    <select
                        class="form-select"
                        id="treatment-type"
                        bind:value={treatmentType}
                        disabled={allowedTypes.length === 1}
                    >
                        {#each allowedTypes as t}
                            <option value={t}>
                                {enum_to_name(t, enums.treatment_type)}
                            </option>
                        {/each}
                    </select>
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Popis</label>
                    <textarea
                        class="form-control"
                        id="description"
                        rows="4"
                        bind:value={description}
                    ></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick={close}>
                    Zrušiť
                </button>
                <button
                    type="button"
                    class="btn btn-primary"
                    onclick={create}
                    disabled={!description.trim()}
                >
                    Vytvoriť
                </button>
            </div>
        </div>
    </div>
    </div>
    <div class="modal-backdrop fade show"></div>
{/if}