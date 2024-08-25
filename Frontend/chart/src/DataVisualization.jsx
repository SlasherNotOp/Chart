import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const DataVisualization = ({ data}) => {

  

  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr('width', 800)
      .attr('height', 400);

    // Clear previous renders
    svg.selectAll('*').remove();

    // Example: Creating a simple bar chart for Intensity

    

    const xScale = d3.scaleBand()
    .domain(data?.map(d => d.country))  // Set the domain based on the countries in the dataset
    .range([0, 800])  // Map domain values to pixel values
    .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.intensity)])
      .range([400, 0]);

    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.country))
      .attr('y', d => yScale(d.intensity))
      .attr('width', xScale.bandwidth())
      .attr('height', d => 400 - yScale(d.intensity))
      .attr('fill', 'steelblue');

    // Adding Axes
    svg.append('g')
      .attr('transform', 'translate(0,400)')
      .call(d3.axisBottom(xScale));

    svg.append('g')
      .call(d3.axisLeft(yScale));
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default DataVisualization;
