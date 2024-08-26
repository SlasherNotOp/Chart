import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const YearIntensityChart = () => {
  const chartRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/year-vs-intensity');
        
        const data = response.data.map(d => ({
          year: d.year,
          intensity: d.intensity,
        }));

        renderChart(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching chart data:', err);
        setError('Failed to fetch chart data');
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  const renderChart = (data) => {
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(data.map(d => d.year))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.intensity)])
      .nice()
      .range([height, 0]);

    svg.append('g')
      .selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.year))
      .attr('y', d => y(d.intensity))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.intensity))
      .attr('fill', 'steelblue');

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y));

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom)
      .attr('text-anchor', 'middle')
      .text('Year');

    svg.append('text')
      .attr('x', -height / 2)
      .attr('y', -margin.left + 10)
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .text('Intensity');
  };

  if (loading) return <div>Loading chart...</div>;
  if (error) return <div>{error}</div>;

  return (
    <svg ref={chartRef}></svg>
  );
};

export default YearIntensityChart;
