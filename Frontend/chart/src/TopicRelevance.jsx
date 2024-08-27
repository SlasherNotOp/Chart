import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Chart, registerables, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

Chart.register(...registerables, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const TopicRelevance = () => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [chartType, setChartType] = useState('bar');
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/topics-vs-relevance');
        const labels = response.data.map(item => item._id); // Topic
        const data = response.data.map(item => item.averageRelevance); // Average Relevance

        setChartData({
          labels,
          datasets: [
            {
              label: 'Average Relevance',
              data,
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
              borderWidth: 1,
            },
          ],
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching chart data:', err);
        setError('Failed to fetch chart data');
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  useEffect(() => {
    if (!loading && !error && chartRef.current) {
      if (chartInstance) {
        chartInstance.destroy();
      }

      const newChartInstance = new Chart(chartRef.current, {
        type: chartType,
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Topics vs. Relevance',
              font: { size: 18 },
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            },
            legend: {
              display: true,
              position: 'top',
            },
          },
          // scales: {
          //   x: {
          //     title: {
          //       display: true,
          //       text: 'Topic',
          //       font: { size: 16 },
          //     },
          //     grid: {
          //       display: false,
          //     },
          //   },
          //   y: {
          //     title: {
          //       display: true,
          //       text: 'Average Relevance',
          //       font: { size: 16 },
          //     },
          //     beginAtZero: true,
          //     grid: {
          //       drawBorder: false,
          //     },
          //   },
          // },
        },
      });

      setChartInstance(newChartInstance);
    }
  }, [chartData, chartType, loading, error]);

  const handleChartTypeChange = (e) => {
    setChartType(e.target.value);
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading chart...</div>;
  }
  
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="w-full h-[500px] relative p-4">
      <canvas ref={chartRef} className="w-full h-full" />
      <div className="my-4 flex flex-col items-center">
        <label htmlFor="chartType" className="mb-2 font-bold text-gray-700">Select Chart Type:</label>
        <select
          id="chartType"
          value={chartType}
          onChange={handleChartTypeChange}
          className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="bar">Bar</option>
          <option value="line">Line</option>
          <option value="radar">Radar</option>
          <option value="pie">Pie</option>
          <option value="doughnut">Doughnut</option>
          <option value="polarArea">Polar Area</option>
        </select>
      </div>
    </div>
  );
};

export default TopicRelevance;
