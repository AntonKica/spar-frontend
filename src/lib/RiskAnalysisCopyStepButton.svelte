<script lang="ts">
    import CopyStepModal from '$lib/RiskAnalysisCopyStepModal.svelte';

    let { ra_state, ra_list }: {
        ra_state: string;
        ra_list: { code: string; state: string; created_at: string }[];
    } = $props();

    let showModal = $state(false);
</script>

<button class="btn btn-outline-secondary" onclick={() => showModal = true}>
    Kopírovať
</button>

<CopyStepModal
    show={showModal}
    {ra_state}
    {ra_list}
    onclose={() => showModal = false}
/>