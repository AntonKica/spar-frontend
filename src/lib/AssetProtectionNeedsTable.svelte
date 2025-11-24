<!-- src/lib/components/ProtectionCell.svelte -->
<script lang="ts">
	import ProtectionNeedCell from '$lib/ProtectionNeedCell.svelte';
    export let asset: any;
    export let protection_needs_enum: [any];
</script>

<table class="table caption-top">
<caption><b>Potreba ochrany</b></caption>
    <thead>
        <tr>
            <th class="text-center" style="width: 33%;">C</th>
            <th class="text-center" style="width: 33%;">I</th>
            <th class="text-center" style="width: 33%;">A</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <ProtectionNeedCell protection_needs={asset.confidentiality_protection_needs} protection_needs_enum={protection_needs_enum}/>
            <ProtectionNeedCell protection_needs={asset.integrity_protection_needs} protection_needs_enum={protection_needs_enum}/>
            <ProtectionNeedCell protection_needs={asset.availability_protection_needs} protection_needs_enum={protection_needs_enum}/>
        </tr>
    </tbody>
</table>