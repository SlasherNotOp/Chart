import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import './IntensityChart.css'; // Import the CSS file if needed

Chart.register(...registerables);

const IntensityChart = () => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [chartType, setChartType] = useState('bar'); // State for chart type
  const [year, setYear] = useState([]);
  const [intensity, setIntensity] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [yearResponse, intensityResponse] = await Promise.all([
          axios.get('http://localhost:3000/get-start-year'),
          axios.get('http://localhost:3000/get-intensity')
        ]);

        setYear(yearResponse.data);
        setIntensity(intensityResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const newData = {
    labels: year,
    datasets: [{
      label: 'Intensity',
      data: intensity,
      backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
            'rgba(255, 99, 71, 0.2)',
            'rgba(255, 140, 0, 0.2)',
            'rgba(60, 179, 113, 0.2)',
            'rgba(0, 191, 255, 0.2)',
            'rgba(255, 105, 180, 0.2)',
            'rgba(238, 130, 238, 0.2)',
            'rgba(255, 20, 147, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(255, 205, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(201, 203, 207, 1)',
  'rgba(255, 99, 71, 1)',
  'rgba(255, 140, 0, 1)',
  'rgba(60, 179, 113, 1)',
  'rgba(0, 191, 255, 1)',
  'rgba(255, 105, 180, 1)',
  'rgba(238, 130, 238, 1)',
  'rgba(255, 20, 147, 1)'
      ],
      borderWidth: 1
    }]
  };

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (chartInstance) {
        chartInstance.destroy();
      }

      const newChartInstance = new Chart(ctx, {
        type: chartType,
        data: newData,
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Intensity by Year',
            },
            legend: {
              display: true,
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Year'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Intensity'
              }
            }
          }
        }
      });

      setChartInstance(newChartInstance);

      // Cleanup on component unmount
      return () => {
        if (newChartInstance) {
          newChartInstance.destroy();
        }
      };
    }
  }, [chartType, year, intensity]);

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  return (
    <div className="container">
      <div className="chart-container">
        <canvas ref={chartRef} id="myChart"></canvas>
      </div>
      <div>
        <select id="chartTypeSelect" value={chartType} onChange={handleChartTypeChange}>
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

export default IntensityChart;
