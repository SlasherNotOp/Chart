import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr('width', 800)
      .attr('height', 400)
      .append('g')
      .attr('transform', 'translate(400,200)'); // Center the pie chart

    // Clear previous renders
    svg.selectAll('*').remove();

    // Create a color scale
    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.country))
      .range(d3.schemeCategory10);

    // Create a pie generator
    const pie = d3.pie()
      .value(d => d.intensity); // Use intensity as the value

    // Create an arc generator
    const arc = d3.arc()
      .innerRadius(0) // Full pie chart (no hole in the center)
      .outerRadius(150); // Size of the pie chart

    // Bind data to the pie chart and create paths
    svg.selectAll('path')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.country))
      .attr('stroke', 'white')
      .attr('stroke-width', 2);

    // Add labels
    svg.selectAll('text')
      .data(pie(data))
      .enter()
      .append('text')
      .text(d => d.data.country)
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .style('text-anchor', 'middle')
      .style('font-size', 12);
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default PieChart;
