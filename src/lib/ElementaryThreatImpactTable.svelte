<script lang="ts">
    export let elemntary_threat: any;
    const to_threat_measure_class = (val: boolean) => {
        return val ? "text-bg-danger" : "";
    }
</script>

<table class="table">
    <caption>ohrozuje</caption>
    <thead>
        <tr>
            <th>C</th>
            <th>I</th>
            <th>A</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class={to_threat_measure_class(elemntary_threat.confidentiality_impaired)}></td>
            <td class={to_threat_measure_class(elemntary_threat.integrity_impaired)}></td>
            <td class={to_threat_measure_class(elemntary_threat.availability_impaired)}></td>
        </tr>
    </tbody>
</table>