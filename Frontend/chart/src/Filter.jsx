import React, { useState } from 'react';

const Filter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    endYear: '',
    topic: '',
    sector: '',
    region: '',
    pest: '',
    source: '',
    swot: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className="filter-container p-4 border rounded shadow-sm mb-4">
      <div className="filter-item mb-4">
        <label htmlFor="endYear" className="block font-bold mb-2">End Year</label>
        <input
          type="text"
          id="endYear"
          name="endYear"
          value={filters.endYear}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="filter-item mb-4">
        <label htmlFor="topic" className="block font-bold mb-2">Topic</label>
        <input
          type="text"
          id="topic"
          name="topic"
          value={filters.topic}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="filter-item mb-4">
        <label htmlFor="sector" className="block font-bold mb-2">Sector</label>
        <input
          type="text"
          id="sector"
          name="sector"
          value={filters.sector}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="filter-item mb-4">
        <label htmlFor="region" className="block font-bold mb-2">Region</label>
        <input
          type="text"
          id="region"
          name="region"
          value={filters.region}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="filter-item mb-4">
        <label htmlFor="pest" className="block font-bold mb-2">PEST</label>
        <input
          type="text"
          id="pest"
          name="pest"
          value={filters.pest}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="filter-item mb-4">
        <label htmlFor="source" className="block font-bold mb-2">Source</label>
        <input
          type="text"
          id="source"
          name="source"
          value={filters.source}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="filter-item mb-4">
        <label htmlFor="swot" className="block font-bold mb-2">SWOT</label>
        <input
          type="text"
          id="swot"
          name="swot"
          value={filters.swot}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
    </div>
  );
};

export default Filter;
