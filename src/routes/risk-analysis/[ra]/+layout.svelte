<script lang="ts">
    import type { LayoutData } from './$types';
    import { page } from '$app/state';

    let { data, children }: { data: LayoutData; children: any } = $props();
</script>

<nav class="navbar navbar-dark bg-dark mb-4">
    <div class="container-fluid">
        <div class="d-flex align-items-center gap-2">
            <a class="navbar-brand mb-0" href="/risk-analysis/{data.ra.code}/step">
                Risk analysis: {data.ra.code}
            </a>
            {#if page.url.pathname.includes('/step/1-threat-identification')}
                <span class="text-secondary">&gt;</span>
                <a
                    class="nav-link d-inline p-0 text-light"
                    href="/risk-analysis/{data.ra.code}/step/1-threat-identification"
                >
                    Threat identification
                </a>
                {#if page.params.module}
                    <span class="text-secondary">&gt;</span>
                    <span class="nav-link d-inline p-0 text-light">
                        {page.params.module}
                    </span>
                {/if}
                {#if page.url.pathname.includes('/step/1-threat-identification/summary')}
                    <span class="text-secondary">&gt;</span>
                    <a
                        class="nav-link d-inline p-0 text-light"
                        href="/risk-analysis/{data.ra.code}/step/1-threat-identification/summary"
                    >
                        Summary
                    </a>
                {/if}

            {/if}
            {#if page.url.pathname.includes('/step/2-risk-classification')}
                <span class="text-secondary">&gt;</span>
                <a
                    class="nav-link d-inline p-0 text-light"
                    href="/risk-analysis/{data.ra.code}/step/2-risk-classification"
                >
                    Risk classification
                </a>
                {#if page.params.module && page.params.threat}
                    <span class="text-secondary">&gt;</span>
                    <span class="nav-link d-inline p-0 text-light">
                        {page.params.module}+{page.params.threat}
                    </span>
                {/if}
            {/if}
            {#if page.url.pathname.includes('/step/3-risk-treatment')}
                <span class="text-secondary">&gt;</span>
                <a
                    class:active={page.url.pathname.includes('/step/3-risk-treatment')}
                    href="/risk-analysis/{data.ra.code}/step/3-risk-treatment"
                >
                    Risk treatment
                </a>
                {#if page.url.pathname.includes('/step/3-risk-treatment/org')}
                    <span class="text-secondary">&gt;</span>
                    <a
                        class:active={page.url.pathname.includes('/step/3-risk-treatment/org')}
                        href="/risk-analysis/{data.ra.code}/step/3-risk-treatment/org"
                    >
                        Organisation wide security measures
                    </a>
                {/if}
                {#if page.params.module && page.params.threat}
                    <span class="text-secondary">&gt;</span>
                    <span class="nav-link d-inline p-0 text-light">
                        {page.params.module} x {page.params.threat}
                    </span>
                {:else if page.params.module}
                    <span class="text-secondary">&gt;</span>
                    <span class="nav-link d-inline p-0 text-light">
                        {page.params.module}
                    </span>
                {:else if page.params.threat}
                    <span class="text-secondary">&gt;</span>
                    <span class="nav-link d-inline p-0 text-light">
                        {page.params.threat}
                    </span>
                {/if}
            {/if}
        </div>
    </div>
</nav>

{@render children()}