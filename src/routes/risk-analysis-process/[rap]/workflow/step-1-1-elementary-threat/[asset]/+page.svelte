<script lang="ts">
	import type { PageProps } from './$types';
	let { data = $bindable() }: PageProps = $props();

    function relevance_to_class(threat: any): string {
        if(threat.relevance === 0) {
            return "direct";
        } else if (threat.relevance === 1) {
            return "indirect";
        } else {
            return "irrelevant";
        }
    }
    
   let elementary_threat_list = $state(data.elementary_threat_list);
    

</script>
<style>
    .irrelevant {
        background-color: white;
    }
    .indirect {
        background-color: yellowgreen;
    }
    .direct {
        background-color: lightcoral;
    }
</style>
<h1>Určenie relevantných hrozieb</h1>

V tomto kroku identifikujete relevantné hrozby pre každý cieľový objekt na posúdenie.
<input type="button" value="PRESSE ME" onclick={() => elementary_threat_list.filter(e => e.checked)}>

<table>
    <thead>
        <tr>
            <th>názov hrozby</th>
            <th>relevantnosť</th>
            <th>komentár</th>
            <th>preskúmaný</th>
        </tr>
    </thead>
    <tbody>
{#each elementary_threat_list as threat, index}
        <tr>
        <td>{threat.elementary_threat_name}</td>
        <td class={relevance_to_class(threat)}>{threat.relevance}</td>
        <td><input type="text" value={threat.comment}>{threat.comment}</td>
        <td><input type="checkbox" bind:checked={threat.reviewed}> </td>
        </tr>
{/each}
    </tbody>
</table>