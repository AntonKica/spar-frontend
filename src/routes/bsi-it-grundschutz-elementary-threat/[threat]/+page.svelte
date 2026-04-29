<script lang="ts">
    import { enum_to_name } from '$lib';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<h1>{data.threat.code} — {data.threat.name}</h1>

<table class="table mb-4">
    <tbody>
        <tr>
            <th>Kód</th>
            <td>{data.threat.code}</td>
        </tr>
        <tr>
            <th>Názov</th>
            <td>{data.threat.name}</td>
        </tr>
        <tr>
            <th>Kategória</th>
            <td>{enum_to_name(data.threat.category, data.enums.threat_category)}</td>
        </tr>
        <tr>
            <th>Popis</th>
            <td>{data.threat.description}</td>
        </tr>
        <tr>
            <th>Dôvernosť</th>
            <td>{data.threat.confidentiality_impaired ? 'Áno' : 'Nie'}</td>
        </tr>
        <tr>
            <th>Integrita</th>
            <td>{data.threat.integrity_impaired ? 'Áno' : 'Nie'}</td>
        </tr>
        <tr>
            <th>Dostupnosť</th>
            <td>{data.threat.availability_impaired ? 'Áno' : 'Nie'}</td>
        </tr>
    </tbody>
</table>