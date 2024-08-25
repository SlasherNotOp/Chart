import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Multiple = ({ data }) => {
  const barChartRef = useRef();
  const scatterPlotRef = useRef();

  useEffect(() => {
    // Bar Chart: Intensity by Country
    const svgBar = d3.select(barChartRef.current)
      .attr('width', 800)
      .attr('height', 400);

    svgBar.selectAll('*').remove();

    const xScaleBar = d3.scaleBand()
      .domain(data.map(d => d.country))
      .range([0, 800])
      .padding(0.1);

    const yScaleBar = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.intensity)])
      .range([400, 0]);

    svgBar.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScaleBar(d.country))
      .attr('y', d => yScaleBar(d.intensity))
      .attr('width', xScaleBar.bandwidth())
      .attr('height', d => 400 - yScaleBar(d.intensity))
      .attr('fill', 'steelblue');

    svgBar.append('g')
      .attr('transform', 'translate(0,400)')
      .call(d3.axisBottom(xScaleBar));

    svgBar.append('g')
      .call(d3.axisLeft(yScaleBar));

    // Scatter Plot: Likelihood vs Relevance
    const svgScatter = d3.select(scatterPlotRef.current)
      .attr('width', 800)
      .attr('height', 400);

    svgScatter.selectAll('*').remove();

    const xScaleScatter = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.likelihood)])
      .range([0, 800]);

    const yScaleScatter = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.relevance)])
      .range([400, 0]);

    svgScatter.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => xScaleScatter(d.likelihood))
      .attr('cy', d => yScaleScatter(d.relevance))
      .attr('r', 5)
      .attr('fill', 'orange');

    svgScatter.append('g')
      .attr('transform', 'translate(0,400)')
      .call(d3.axisBottom(xScaleScatter));

    svgScatter.append('g')
      .call(d3.axisLeft(yScaleScatter));
  }, [data]);

  return (
    <div>
      <h3>Intensity by Country (Bar Chart)</h3>
      <svg ref={barChartRef}></svg>
      <h3>Likelihood vs Relevance (Scatter Plot)</h3>
      <svg ref={scatterPlotRef}></svg>
    </div>
  );
};

export default Multiple;
