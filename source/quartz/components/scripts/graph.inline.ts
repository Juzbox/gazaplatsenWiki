// Assuming that 'neighbourhood' and 'data' are properly defined in your scope:
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

// Assuming 'neighbourhood' contains page URLs or IDs (you need to pass this data in the script):
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

// Example: You should define your links here, based on the actual relationships between nodes
// For example, if you have data like this, ensure it's structured as {source, target}
const links = [];  // Example: [{source: "node1", target: "node2"}, ...]

const width = 800;  // Define your width
const height = 600; // Define your height

// D3 setup
const svg = d3.select("#graph-container")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Create links between nodes (edges)
svg.selectAll("line")
  .data(links)
  .enter()
  .append("line")
  .attr("stroke", "#999")
  .attr("stroke-width", 1);

// Create nodes (circles)
svg.selectAll("circle")
  .data(nodes)
  .enter()
  .append("circle")
  .attr("r", 5)  // Adjust radius
  .attr("fill", (d) => d.color)  // Apply color from node data
  .call(d3.drag()  // Add drag behavior
    .on("start", dragstart)
    .on("drag", dragged)
    .on("end", dragend)
  );

// Define drag behavior functions (if you want to enable dragging):
function dragstart(event: any) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  event.subject.fx = event.subject.x;
  event.subject.fy = event.subject.y;
}

function dragged(event: any) {
  event.subject.fx = event.x;
  event.subject.fy = event.y;
}

function dragend(event: any) {
  if (!event.active) simulation.alphaTarget(0);
  event.subject.fx = null;
  event.subject.fy = null;
}

// Force simulation and layout
const simulation = d3.forceSimulation(nodes)
  .force("link", d3.forceLink(links).id((d: any) => d.id))
  .force("charge", d3.forceManyBody())
  .force("center", d3.forceCenter(width / 2, height / 2));

// Update the positions of the nodes and links during the simulation
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
