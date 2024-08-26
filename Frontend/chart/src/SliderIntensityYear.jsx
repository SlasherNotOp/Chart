import React, { useState } from 'react';

const SliderIntensityYear = ({ year, changeValueFunction }) => {
  const [value, setValue] = useState(year?.[year.length - 1]);
  console.log(value)
  const minYear = year?.[0];
  const maxYear = year?.[year.length - 1];
  

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);

    const filteredYears = splitArrayByValue(year, newValue);
    changeValueFunction(filteredYears);
  };

  function splitArrayByValue(arr, value) {
    let targetIndex = -1;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] <= value) {
        targetIndex = i;
      } else {
        break;
      }
    }

    return targetIndex !== -1 ? arr.slice(0, targetIndex + 1) : [];
  }

  return (
    <div className="flex flex-col items-center mt-4">
      <label htmlFor="slider" className="text-gray-700 font-semibold mb-2">
        Value: {value}
      </label>
      <input
        type="range"
        id="slider"
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        min={minYear}
        max={maxYear}
        step={1}
        value={value}
        onChange={e=>handleChange(e)}
      />
    </div>
  );
};

export default SliderIntensityYear;
