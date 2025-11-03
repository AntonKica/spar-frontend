<script lang="ts">
	import { UI_RISK_ANALYSIS_PROCESS_WORKFLOW } from "$lib";
	import { UI_RISK_ANALYSIS_CREATE } from "$lib/routes";

</script>
<style>
    .box {
        background-color: lightgray;
        border: 2px solid black;
        margin: 20px;
        padding: 20px;
        width: 10em;
        height: 10em;
    }
</style>
<h1>Proces analýzy rizík</h1>

<small><a href="/">Vráť sa o krok vyššie.</a> </small>
<br> <br>
<div class="box">
<a href={UI_RISK_ANALYSIS_CREATE()}>Začni novú analýzu rizík</a>
</div>
<div class="box">
<a href={UI_RISK_ANALYSIS_PROCESS_WORKFLOW.list()}>Zoznam analýz rizík</a>
</div>