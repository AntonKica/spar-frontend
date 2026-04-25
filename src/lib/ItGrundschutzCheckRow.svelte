<!-- src/lib/components/ItGrundschutzCheckRow.svelte -->
<script lang="ts">
    import { enum_to_name } from '$lib';

    let { item, enums, onupdated }: {
        item: {
            id: string;
            code: string;
            description: string;
            status: string;
            evaluation: string;
            kind: string;
        };
        enums: { implementation_status: { code: string; name: string }[] };
        onupdated: () => void;
    } = $props();

    let status = $state(item.status);
    let evaluation = $state(item.evaluation);

    const statusColors: Record<string, string> = {
        not_assessed: '',
        none: 'table-danger',
        partial: 'table-warning',
        full: 'table-success',
        redundant: 'table-info',
    };

    async function save() {
        const endpoint = item.kind === 'requirement'
            ? `/svc/it-grundschutz-check/assessment/requirement/${item.id}`
            : `/svc/it-grundschutz-check/assessment/security-measure/${item.id}`;

        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status, evaluation }),
        });

        if (res.ok) {
            onupdated();
        }
    }
</script>

<tr class={statusColors[status] ?? ''}>
    <td>{item.code}</td>
    <td>{item.description}</td>
    <td>
        <select class="form-select form-select-sm" bind:value={status}>
            {#each enums.implementation_status as s}
                <option value={s.code}>{s.name}</option>
            {/each}
        </select>
    </td>
    <td>
        <textarea
            class="form-control form-control-sm"
            cols="4"
            bind:value={evaluation}
        >
        </textarea>
    </td>
    <td>
        <button
            class="btn btn-sm btn-primary"
            onclick={save}
        >
            Uložiť
        </button>
    </td>
</tr>