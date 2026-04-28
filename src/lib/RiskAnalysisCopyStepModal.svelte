<script lang="ts">
    import { page } from '$app/state';
    import { invalidateAll } from '$app/navigation';

   let { show, ra_state, ra_list, onclose }: {
        show: boolean;
        ra_state: string;
        ra_list: { code: string; state: string; created_at: string }[];
        onclose: () => void;
    } = $props();
    

    let srcCode = $state('');
    let loading = $state(false);
    let error = $state('');

    function reset() {
        srcCode = '';
        loading = false;
        error = '';
    }

    function close() {
        reset();
        onclose();
    }

    async function copy() {
        const dst = page.params.ra;

        if (!srcCode) {
            error = 'Vyberte zdrojovú analýzu';
            return;
        }

        loading = true;
        error = '';

        const res = await fetch(
            `/svc/risk-analysis/copy-step/${srcCode}/${ra_state}/${dst}`,
            { method: 'POST' }
        );

        loading = false;

        if (res.ok) {
            reset();
            onclose();
            invalidateAll();
        } else {
            const body = await res.json().catch(() => null);
            error = body?.message ?? 'Chyba pri kopírovaní';
        }
    }
</script>

{#if show}
    <div class="modal d-block" tabindex="-1" onclick={(e) => { if (e.target === e.currentTarget) close(); }}>
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Kopírovať z inej analýzy</h5>
                    <button type="button" class="btn-close" onclick={close}></button>
                </div>
                <div class="modal-body">
                    {#if error}
                        <div class="alert alert-danger">{error}</div>
                    {/if}
                    <div class="mb-3">
                        <label for="src-code" class="form-label">Zdrojová analýza</label>
                        <select class="form-select" id="src-code" bind:value={srcCode}>
                            <option value="">— Vyberte analýzu —</option>
                            {#each ra_list as a}
                                <option value={a.code.trim()}>{a.code.trim()}</option>
                            {/each}
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick={close}>
                        Zrušiť
                    </button>
                    <button
                        type="button"
                        class="btn btn-primary"
                        onclick={copy}
                        disabled={loading || !srcCode}
                    >
                        {loading ? 'Kopírujem...' : 'Kopírovať'}
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-backdrop fade show"></div>
{/if}