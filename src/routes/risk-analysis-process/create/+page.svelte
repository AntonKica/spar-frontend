<script lang="ts">
	import type { PageProps } from './$types';
    import { goto } from '$app/navigation';

	let { data }: PageProps = $props();

    const get_objects_under_review = () => {
         return data.asset_list.filter(asset => asset.add_under_review).map(asset => asset.code)       
    }

    async function post() {
        const objects_under_review = get_objects_under_review()
        if (objects_under_review.length <= 0) {
            alert("Zoznam aktív na kontrolu je prázdny. Pridajte aspoň jedno aktívum, aby ste mohli začať proces analýzy rizík.");
            return;
        }
        
        console.log(objects_under_review);
        const res = await fetch('/svc/risk-analysis-process/create', {
			method: 'POST',
            headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(
                {
                    target_objects_under_review: objects_under_review
        })
		})
		
		const json = await res.json()
        if (json.status != "ok") {
            console.alert("Chyba pri vytvarani" + json.message)
            return;
        }

        const code = json.code;

        goto(`/risk-analysis-process/${code}/view`) 
        //const res = await()
    }
</script>

<h1> Vytváranie procesu analýzy rizík</h1>

Zační nový proces analýzy rizík: <button type="button" on:click={post}>X</button>

<h2>výber aktív na kontrolu</h2>
<table>
    <thead>
        <tr>
            <th>kód aktíva</th>
            <th>názov aktíva</th>
            <th>pridať na kontrolu ?</th>
        </tr>
    </thead>
    <tbody>
{#each data.asset_list as asset }
        <tr>
        <td>{asset.code}</td>
        <td>{asset.name}</td>
        <td><input type="checkbox" bind:checked={asset.add_under_review}></td>
        </tr>
{/each}
    </tbody>
</table>