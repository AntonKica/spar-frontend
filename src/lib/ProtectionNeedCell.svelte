<!-- src/lib/components/ProtectionCell.svelte -->
<script lang="ts">
	import { enum_to_name } from '$lib';
    export let protection_needs: any;
    export let protection_needs_enum: [any];
    
    
        
    const to_level_class = (val: number) => {
        if(val === 0) {
            return "text-bg-success";
        } else if(val === 1) {
            return "text-bg-warning";            
        } else {
            return "text-bg-danger";            
        }
    }
</script>

<td class={to_level_class(protection_needs)}>
    {enum_to_name(protection_needs, protection_needs_enum)}
</td>