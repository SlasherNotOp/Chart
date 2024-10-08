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

  const [endYears, setEndYears] = useState([]);
  const [endYear, setEndYear] = useState('');

  const [sectors, setSectors] = useState([]);
  const [sector, setSector] = useState('');

  const [regions, setRegions] = useState([]);
  const [region, setRegion] = useState('');

  const [pestles, setPestles] = useState([]);
  const [pestle, setPestle] = useState('');

  const [sources, setSources] = useState([]);
  const [source, setSource] = useState('');

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/topics-vs-relevance', {
          params: { endYear, sector, region, pestle, source }
        });
        
        const responseEndYear = await axios.get('http://localhost:3000/endYears');
        const responseSector = await axios.get('http://localhost:3000/sector');
        const responseRegion = await axios.get('http://localhost:3000/region');
        const responsePestle = await axios.get('http://localhost:3000/pestle');
        const responseSource = await axios.get('http://localhost:3000/source');

        setEndYears(responseEndYear.data);
        setSectors(responseSector.data);
        setRegions(responseRegion.data);
        setPestles(responsePestle.data);
        setSources(responseSource.data);

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
  }, [endYear, sector, region, pestle, source]);

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
        },
      });

      setChartInstance(newChartInstance);
    }
  }, [chartData, chartType, loading, error]);

  const handleOption = (e, fun) => {
    fun(e.target.value);
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
      <div className='h-44 flex justify-evenly items-center w-full'>
        <div className='flex flex-col justify-center items-center'>
          <span>End Year</span>
          <select 
            id="endYear"
            value={endYear}
            onChange={(e) => handleOption(e, setEndYear)}
            className='endYear m-2 p-2 border w-40 border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'>
            <option value="">All</option>
            {endYears.map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className='flex flex-col justify-center items-center'>
          <span>Sector</span> 
          <select 
            id="sector"
            value={sector}
            onChange={(e) => handleOption(e, setSector)}
            className='endYear m-2 p-2 border w-40 border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'>
            <option value="">All</option>
            {sectors.map((sector, index) => (
              <option key={index} value={sector}>{sector}</option>
            ))}
          </select>
        </div>

        <div className='flex flex-col justify-center items-center'>
          <span>Region</span> 
          <select 
            id="region"
            value={region}
            onChange={(e) => handleOption(e, setRegion)}
            className='endYear m-2 p-2 border w-40 border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'>
            <option value="">All</option>
            {regions.map((region, index) => (
              <option key={index} value={region}>{region}</option>
            ))}
          </select>
        </div>

        <div className='flex flex-col justify-center items-center'>
          <span>Pestle</span> 
          <select 
            id="pestle"
            value={pestle}
            onChange={(e) => handleOption(e, setPestle)}
            className='endYear m-2 p-2 border w-40 border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'>
            <option value="">All</option>
            {pestles.map((pestle, index) => (
              <option key={index} value={pestle}>{pestle}</option>
            ))}
          </select>
        </div>

        <div className='flex flex-col justify-center items-center'>
          <span>Source</span> 
          <select 
            id="source"
            value={source}
            onChange={(e) => handleOption(e, setSource)}
            className='endYear m-2 p-2 border w-40 border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'>
            <option value="">All</option>
            {sources.map((source, index) => (
              <option key={index} value={source}>{source}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TopicRelevance;
