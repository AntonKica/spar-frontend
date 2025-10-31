<script lang="ts">
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
<h1>Určenie relevantných hrozieb</h1>


<!-- ASSETS AND THEIR STATUS -->
<div class="box">
<a href={UI_RISK_ANALYSIS_CREATE()}>Začni novú analýzu rizík</a>
</div>