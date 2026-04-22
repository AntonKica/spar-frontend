<script lang="ts">
    import type { PageData } from './$types';
    import { page } from '$app/state';

    let { data }: { data: PageData } = $props();

    const ra = page.params.ra;
    const base = `/risk-analysis/${ra}/step/3-risk-treatment`;

    function hasThreatInModule(threatCode: string, moduleCode: string): boolean {
        return data.presenceMap[threatCode]?.includes(moduleCode) ?? false;
    }
</script>

<h2>Ošetrenie rizík</h2>
<a href="{base}/org" class="btn btn-outline-secondary">
    Vytvor organizačné opatrenia
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
                            {threat.code}
                            <br />
                            <small>{threat.name}</small>
                        </a>
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
                            <br />
                            <small>{module.name}</small>
                        </a>
                    </th>
                    {#each data.threats as threat}
                        <td>
                            {#if hasThreatInModule(threat.code, module.code)}
                                
                                <a  href="{base}/{module.code}/{threat.code}"
                                    class="text-decoration-none"
                                    title="Ošetrenie {threat.code} v {module.code}"
                                >
                                    —
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