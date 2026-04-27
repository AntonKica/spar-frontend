<!-- src/routes/risk-analysis/[ra]/step/3-risk-treatment/+page.svelte -->
<script lang="ts">
    import type { PageData } from './$types';
    import { page } from '$app/state';
    import { enum_to_name } from '$lib';
	import CompleteStepButton from '$lib/CompleteStepButton.svelte';

    let { data }: { data: PageData } = $props();

    const ra = page.params.ra;
    const base = `/risk-analysis/${ra}/step/3-risk-treatment`;

    const treatmentColors: Record<string, string> = {
        avoid: 'bg-danger',
        reduce: 'bg-primary',
        transfer: 'bg-warning text-dark',
        accept: 'bg-success',
    };

    function hasThreatInModule(threatCode: string, moduleCode: string): boolean {
        return data.presenceMap[threatCode]?.includes(moduleCode) ?? false;
    }
</script>

<h2>Ošetrenie rizík</h2>
<CompleteStepButton state="risk_treatment" label="Dokončiť ošetrenie rizík" />
<a href="{base}/org" class="btn btn-outline-secondary">
    Spravuj organizačné opatrenia
    {#if data.orgTreatment}
        <span class="badge {treatmentColors[data.orgTreatment.treatment]} ms-1">
            {enum_to_name(data.orgTreatment.treatment, data.enums.treatment_type)}
        </span>
    {/if}
</a>

<div class="table-responsive">
    <table class="table table-bordered text-center">
        <thead class="table-dark">
            <tr>
                <th></th>
                {#each data.threats as threat}
                    <th class="text-nowrap" style="font-size: 12px;">
                        
                        <a href="{base}/threat/{threat.code}"
                            class="text-light text-decoration-none"
                            title="Ošetrenie hrozby {threat.code}"
                        >
                            {threat.code}Risk treatment
                            <br />
                            <small>{threat.name}</small>
                        </a>
                        {#if data.threatTreatments[threat.code]}
                            <br />
                            <span class="badge {treatmentColors[data.threatTreatments[threat.code]]}">
                                {enum_to_name(data.threatTreatments[threat.code], data.enums.treatment_type)}
                            </span>
                        {:else}
                            <br />
                            <span class="badge bg-light text-muted">—</span>
                        {/if}
                    </th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each data.modules as module}
                <tr>
                    <th class="text-nowrap">
                        
                        <a  href="{base}/module/{module.code}"
                            class="text-decoration-none"
                            title="Opatrenia pre modul {module.code}"
                        >
                            {module.code}
                        </a>
                        {#if data.moduleTreatments[module.code]}
                            <br />
                            <span class="badge {treatmentColors[data.moduleTreatments[module.code]]}">
                                {enum_to_name(data.moduleTreatments[module.code], data.enums.treatment_type)}
                            </span>
                        {:else}
                            <br />
                            <span class="badge bg-light text-muted">—</span>
                        {/if}
                    </th>
                    {#each data.threats as threat}
                        <td>
                            {#if hasThreatInModule(threat.code, module.code)}
                                
                                <a    href="{base}/module-threat/{module.code}/{threat.code}"
                                    class="text-decoration-none"
                                    title="Ošetrenie {threat.code} v {module.code}"
                                >
                                    {#if data.cellTreatments[`${module.code}:${threat.code}`]}
                                        <span class="badge {treatmentColors[data.cellTreatments[`${module.code}:${threat.code}`]]}">
                                            {enum_to_name(data.cellTreatments[`${module.code}:${threat.code}`], data.enums.treatment_type)}
                                        </span>
                                    {:else}
                                        <span class="badge bg-light text-muted">—</span>
                                    {/if}
                                </a>
                            {:else}
                                <span class="text-muted">·</span>
                            {/if}
                        </td>
                    {/each}
                </tr>
            {:else}
                <tr>
                    <td colspan={1 + data.threats.length} class="text-muted">
                        Žiadne moduly
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>