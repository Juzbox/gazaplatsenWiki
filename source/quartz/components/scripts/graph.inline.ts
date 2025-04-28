const tagColors = {
  tech: "#ff7f0e",
  philosophy: "#1f77b4",
  personal: "#2ca02c",
  note: "#d62728",
};

function getColorForTags(tags: string[] | undefined): string {
  if (!tags || tags.length === 0) return "#cccccc"; // Default color
  for (const tag of tags) {
    if (tagColors[tag]) {
      return tagColors[tag];
    }
  }
  return "#bbbbbb"; // fallback if none match
}

// Assuming neighbourhood contains the page URLs or IDs:
const nodes = [...neighbourhood].map((url) => {
  const page = data.get(url);
  const tags = page?.tags ?? [];
  const text = url.startsWith("tags/") ? "#" + url.substring(5) : (page?.title ?? url);
  return {
    id: url,
    text,
    tags,
    color: getColorForTags(tags), // Assign color based on tags
  }
});

const links = ...;  // Assuming you already have link creation logic

// Set up the graph layout with D3
const svg = d3.select("#graph-container")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Create nodes
svg.selectAll("circle")
  .data(nodes)
  .enter()
  .append("circle")
  .attr("r", 5)  // Adjust radius
  .attr("fill", (d) => d.color)  // Apply color from node data
  .call(d3.drag()  // Add drag behavior, if necessary
    .on("start", dragstart)
    .on("drag", dragged)
    .on("end", dragend)
  );

// Create links between nodes
svg.selectAll("line")
  .data(links)
  .enter()
  .append("line")
  .attr("stroke", "#999")
  .attr("stroke-width", 1);

// Simulation and force layout (optional)
const simulation = d3.forceSimulation(nodes)
  .force("link", d3.forceLink(links).id((d: any) => d.id))
  .force("charge", d3.forceManyBody())
  .force("center", d3.forceCenter(width / 2, height / 2));

simulation.on("tick", () => {
  svg.selectAll("circle")
    .attr("cx", (d: any) => d.x)
    .attr("cy", (d: any) => d.y);

  svg.selectAll("line")
    .attr("x1", (d: any) => d.source.x)
    .attr("y1", (d: any) => d.source.y)
    .attr("x2", (d: any) => d.target.x)
    .attr("y2", (d: any) => d.target.y);
});
