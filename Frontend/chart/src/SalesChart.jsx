import React, { useRef, useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import './SalesChart.css'; // Import the CSS file

Chart.register(...registerables);

const SalesChart = () => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [chartType, setChartType] = useState('bar');

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy the previous chart instance if it exists
    if (chartInstance) {
      chartInstance.destroy();
    }

    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    };

    const config = {
      type: chartType,
      data: data,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Monthly Sales Data',
          },
        },
      },
    };

    // Create a new chart instance
    const newChartInstance = new Chart(ctx, config);
    setChartInstance(newChartInstance);

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      if (newChartInstance) {
        newChartInstance.destroy();
      }
    };
  }, [chartType]);

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  return (
    <div className="container">
      <div className="chart-container">
        <canvas ref={chartRef} id="myChart"></canvas>
      </div>
      <div>
        <select id="chartTypeSelect" onChange={handleChartTypeChange}>
          <option value="bar">Bar</option>
          <option value="line">Line</option>
          <option value="scatter">Scatter</option>
          <option value="bubble">Bubble</option>
          <option value="doughnut">Doughnut</option>
          <option value="polarArea">PolarArea</option>
          <option value="radar">Radar</option>
        </select>
      </div>
    </div>
  );
};

export default SalesChart;
