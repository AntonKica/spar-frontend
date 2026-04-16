<script>
 import { onMount } from "svelte";
  import { select } from "d3-selection";
  import {
    forceSimulation,
    forceManyBody,
    forceLink,
    forceCenter
  } from "d3-force";

  export let raw_nodes = [];
  export let raw_links = [];
  export let width = 600;
  export let height = 400;

  let container;

  onMount(() => {
      const nodes = raw_nodes.map(d => ({
      id: d.code,
      name: d.name,
      code: d.code
    }));
    const links = raw_links.map(([src, dst]) => ({
        source: src,
        target: dst
      }));
    

    const svg = select(container)
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("width", "100%")
      .style("height", "100%")
      .style("overflow", "visible");

    const link = svg.append("g")
      .attr("stroke", "#aaa")
      .attr("stroke-width", 1.5)
      .selectAll("line")
      .data(links)
      .enter()
      .append("line");

    const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 8)
      .attr("fill", "#69b3a2");
  });
/*
    nodes.append("foreignObject")
      .attr("width", 150)
      .attr("height", 40)
      .attr("x", d => d.children ? -160 : 10)
      .attr("y", -12)
      .append("xhtml:div")
      .style("font-size", "12px")
      .style("line-height", "1.2")
      .html(d => `<div><b>${d.data.code_name.code}</b><br><small>${d.data.code_name.name}</small></div>`);
  });
*/
</script>

<div bind:this={container}></div>

<style>
  svg {
    overflow: visible;
  }
</style>
