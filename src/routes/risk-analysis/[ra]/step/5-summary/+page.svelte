<script lang="ts">
    import { enum_to_name } from '$lib';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    interface FlatRow {
        module: string;
        threat: string;
        code: string;
        description: string;
        status: string;
        evaluation: string;
    }

    function flatten(): FlatRow[] {
        const rows: FlatRow[] = [];

        if (data.assessment.org) {
            for (const item of data.assessment.org.items) {
                rows.push({
                    module: '',
                    threat: '',
                    code: item.code,
                    description: item.description,
                    status: item.status,
                    evaluation: item.evaluation,
                });
            }
        }

        for (const group of data.assessment.threats) {
            for (const item of group.items) {
                rows.push({
                    module: '',
                    threat: group.threat_code,
                    code: item.code,
                    description: item.description,
                    status: item.status,
                    evaluation: item.evaluation,
                });
            }
        }

        for (const group of data.assessment.modules) {
            for (const item of group.items) {
                rows.push({
                    module: group.module_code,
                    threat: '',
                    code: item.code,
                    description: item.description,
                    status: item.status,
                    evaluation: item.evaluation,
                });
            }
        }

        for (const group of data.assessment.module_threats) {
            for (const item of group.items) {
                rows.push({
                    module: group.module_code,
                    threat: group.threat_code,
                    code: item.code,
                    description: item.description,
                    status: item.status,
                    evaluation: item.evaluation,
                });
            }
        }

        return rows;
    }

    const rows = flatten().sort((a, b) => a.code.localeCompare(b.code));

</script>

<h2>Súhrn</h2>

<table class="table table-striped table-hover">
    <thead class="table-dark">
        <tr>
            <th>Kód</th>
            <th>Modul</th>
            <th>Hrozba</th>
            <th>Popis</th>
            <th>Stav</th>
            <th>Hodnotenie</th>
        </tr>
    </thead>
    <tbody>
        {#each rows as row}
            <tr>
                <td>{row.code}</td>
                <td>{row.module}</td>
                <td>{row.threat}</td>
                <td>{row.description}</td>
                <td>{enum_to_name(row.status, data.enums.implementation_status)}</td>
                <td>{row.evaluation}</td>
            </tr>
        {:else}
            <tr>
                <td colspan="6" class="text-muted">Žiadne záznamy</td>
            </tr>
        {/each}
    </tbody>
</table>