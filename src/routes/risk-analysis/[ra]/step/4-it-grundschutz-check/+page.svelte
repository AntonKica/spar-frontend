<script lang="ts">
    import { page } from '$app/state';
    import type { PageData } from './$types';
    import { invalidateAll } from '$app/navigation';
    import ItGrundschutzCheckRow from '$lib/ItGrundschutzCheckRow.svelte';
    import { enum_to_name } from '$lib';
	import CompleteStepButton from '$lib/CompleteStepButton.svelte';

    let { data }: { data: PageData } = $props();
    const treatmentColors: Record<string, string> = {
        avoid: 'bg-danger',
        reduce: 'bg-primary',
        transfer: 'bg-warning text-dark',
        accept: 'bg-success',
    };

    const base = `/risk-analysis/${page.params.ra}/step/4-it-grundschutz-check`;
</script>

<h2>Kontrola implementácie</h2>

{#if data.completed}
    <div class="alert alert-success mb-4">
        Všetky opatrenia boli ohodnotené.
    </div>
    <CompleteStepButton state="it_grundschutz_check" label="Dokončiť ošetrenie rizík" />
{:else}
    <div class="alert alert-warning mb-4">
        Niektoré opatrenia ešte neboli ohodnotené.
    </div>
{/if}

{#if data.assessment.org}
    <h3>
        Organizačné opatrenia
        <span class="badge bg-primary ms-2">
            {enum_to_name(data.assessment.org.treatment_type, data.enums.treatment_type)}
        </span>
    </h3>

    <table class="table table-striped table-hover">
        <thead class="table-dark">
            <tr>
                <th style="width: 5%;">Kód</th>
                <th style="width: 35%;">Popis</th>
                <th style="width: 15%;">Stav</th>
                <th style="width: 40%;">Hodnotenie</th>
                <th style="width: 5%;"></th>
            </tr>
        </thead>
        <tbody>
            {#each data.assessment.org.items as item}
                <ItGrundschutzCheckRow
                    {item}
                    enums={data.enums}
                    onupdated={() => invalidateAll()}
                />
            {:else}
                <tr>
                    <td colspan="5" class="text-muted">Žiadne opatrenia</td>
                </tr>
            {/each}
        </tbody>
    </table>
{:else}
    <h3>Organizačné opatrenia</h3>
    <p class="text-muted">Žiadne organizačné opatrenia</p>
{/if}
<h3>Hrozby</h3>

{#if data.assessment.threats.length > 0}
    {#each data.assessment.threats as group}
        <h4>
            {group.threat_code} — {group.threat_name}
            <span class="badge {treatmentColors[group.treatment_type]} ms-2">
                {enum_to_name(group.treatment_type, data.enums.treatment_type)}
            </span>
        </h4>

        <table class="table table-striped table-hover mb-4">
            <thead class="table-dark">
                <tr>
                    <th style="width: 5%;">Kód</th>
                    <th style="width: 35%;">Popis</th>
                    <th style="width: 15%;">Stav</th>
                    <th style="width: 40%;">Hodnotenie</th>
                    <th style="width: 5%;"></th>
                </tr>
            </thead>
            <tbody>
                {#each group.items as item}
                    <ItGrundschutzCheckRow
                        {item}
                        enums={data.enums}
                        onupdated={() => invalidateAll()}
                    />
                {:else}
                    <tr>
                        <td colspan="5" class="text-muted">Žiadne opatrenia</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {/each}
{:else}
    <p class="text-muted">Žiadne opatrenia pre hrozby</p>
{/if}

<h3>Moduly</h3>

{#if data.assessment.modules.length > 0}
    {#each data.assessment.modules as group}
        <h4>
            {group.module_code} — {group.module_name}
            <span class="badge {treatmentColors[group.treatment_type]} ms-2">
                {enum_to_name(group.treatment_type, data.enums.treatment_type)}
            </span>
        </h4>

        <table class="table table-striped table-hover mb-4">
            <thead class="table-dark">
                <tr>
                    <th style="width: 5%;">Kód</th>
                    <th style="width: 35%;">Popis</th>
                    <th style="width: 15%;">Stav</th>
                    <th style="width: 40%;">Hodnotenie</th>
                    <th style="width: 5%;"></th>
                </tr>
            </thead>
            <tbody>
                {#each group.items as item}
                    <ItGrundschutzCheckRow
                        {item}
                        enums={data.enums}
                        onupdated={() => invalidateAll()}
                    />
                {:else}
                    <tr>
                        <td colspan="5" class="text-muted">Žiadne opatrenia</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {/each}
{:else}
    <p class="text-muted">Žiadne opatrenia pre moduly</p>
{/if}

<h3>Modul + Hrozba</h3>

{#if data.assessment.module_threats.length > 0}
    {#each data.assessment.module_threats as group}
        <h4>
            {group.module_code} / {group.threat_code} — {group.threat_name}
            <span class="badge {treatmentColors[group.treatment_type]} ms-2">
                {enum_to_name(group.treatment_type, data.enums.treatment_type)}
            </span>
        </h4>

        <table class="table table-striped table-hover mb-4">
            <thead class="table-dark">
                <tr>
                    <th style="width: 5%;">Kód</th>
                    <th style="width: 35%;">Popis</th>
                    <th style="width: 15%;">Stav</th>
                    <th style="width: 40%;">Hodnotenie</th>
                    <th style="width: 5%;"></th>
                </tr>
            </thead>
            <tbody>
                {#each group.items as item}
                    <ItGrundschutzCheckRow
                        {item}
                        enums={data.enums}
                        onupdated={() => invalidateAll()}
                    />
                {:else}
                    <tr>
                        <td colspan="5" class="text-muted">Žiadne opatrenia</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {/each}
{:else}
    <p class="text-muted">Žiadne opatrenia pre modul + hrozba</p>
{/if}
