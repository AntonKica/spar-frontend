<script lang="ts">
    import { page } from '$app/state';
    import { goto, invalidateAll } from '$app/navigation';

    let { state, label }: {
        state: string;
        label: string;
    } = $props();

    async function completeStep() {
        const ra = page.params.ra;

        const res = await fetch(`/svc/risk-analysis/complete-step/${ra}/${state}`, {
            method: 'POST',
        });

        if (res.ok) {
            goto(`/risk-analysis/${page.params.ra}/step`);
            invalidateAll()
        }
    }
</script>

<button class="btn btn-primary" onclick={completeStep}>
    {label}
</button>