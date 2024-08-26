import React, { useState } from 'react';
import './Slider.css'; // Import the CSS file

const LikehoodSlider = ({ year, setYear,changeValueFunction}) => {
  const [value, setValue] = useState(year?.[year.length-1]);

  const handleChange = (event) => {
    const newValue = event.target.value;

    setValue(newValue);
    

    changeValueFunction(splitArrayByValue(year,value));

     



  };


  function splitArrayByValue(arr, value) {
    // Find the largest element less than or equal to the given value
    let targetIndex = -1;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] <= value) {
        targetIndex = i;
      } else {
        break;
      }
    }
  
    // Return the subarray from the start to the target index (inclusive)
    if (targetIndex !== -1) {
      return arr.slice(0, targetIndex + 1);
    } else {
      return []; // If no valid element found, return an empty array
    }
  }
  
  // Example usage:
//   const years = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2025, 2028, 2030, 2035, 2040, 2050];
//   const result = splitArrayByValue(years, 2023);
//   console.log(result); // Output: [2016, 2017, 2018, 2019, 2020, 2021, 2022]
  


  return (
    <div className="slider-container">
      <label htmlFor="slider" className="slider-label">
        Value: {value}
      </label>
      <input
        type="range"
        id="slider"
        className="slider"
        min={year?.[0]}
        max={year?.[year.length-1]+1}
        step={1}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default LikehoodSlider;
