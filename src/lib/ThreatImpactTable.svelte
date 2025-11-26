<script lang="ts">
    export let threat: any;
    const to_threat_measure_class = (val: boolean) => {
        return val ? "text-bg-danger" : "";
    }
</script>

<table class="table">
    <caption>ohrozuje</caption>
    <thead>
        <tr>
            <th class="text-center" style="width: 33%;">C</th>
            <th class="text-center" style="width: 33%;">I</th>
            <th class="text-center" style="width: 33%;">A</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class={to_threat_measure_class(threat.confidentiality_impaired)}></td>
            <td class={to_threat_measure_class(threat.integrity_impaired)}></td>
            <td class={to_threat_measure_class(threat.availability_impaired)}></td>
        </tr>
    </tbody>
</table>