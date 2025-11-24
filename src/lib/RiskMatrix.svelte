<script lang="ts">
	import { color_by_risk, enum_to_name, RISK_CLASSIFICATION_MATRIX } from '$lib';
    

    export let threat_probability_enum: [any];
    export let threat_impact_enum: [any];
    export let threat_risk_enum: [any];
    
</script>

<div class="row">
    <div class="col-auto">
        <table class="table caption-top">
            <caption class="h4">matica rizík</caption>
            <thead>
                <tr>
                    <th style="width: 20%;"></th>
                    {#each threat_probability_enum}
                    <th style="width: 20%;"></th>
                    {/each}
                </tr>
            </thead>
            <tbody>
            <tr>
                <td><b>potenciálny dopad</b></td>
            </tr>
            {#each threat_impact_enum as impact}
            <tr>
                <td>{impact.name}</td>
                {#each threat_probability_enum as probability}
                <td class="border border-2" style="background-color: {color_by_risk({risk: RISK_CLASSIFICATION_MATRIX({probability: probability.code, impact: impact.code})})}">
                    {enum_to_name(RISK_CLASSIFICATION_MATRIX({probability: probability.code, impact: impact.code}), threat_risk_enum)}
                </td>
                {/each}
            </tr>
            {/each}
            <tr>
                <td></td>
                {#each threat_probability_enum as probability}
                <td>{probability.name}</td>
                {/each}
                <td><b>pravdepodobnosť výskytu</b></td>
            </tr>
            </tbody>
        </table>
    </div>
</div>