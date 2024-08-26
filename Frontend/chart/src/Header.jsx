import React from 'react';

const Header = ({handleTitle}) => {
  return (
    <>
    <div className='w-full h-12 mt-24 flex items-center justify-center'>

    <ul className='flex gap-20 '>
      <li className='shadow-lg p-5 rounded cursor-pointer' onClick={()=>handleTitle("Intensity and Year")}>Intensity and Year</li>
      <li className='shadow-lg p-5 rounded cursor-pointer' onClick={handleTitle}>Likelihood and Year</li>
      <li className='shadow-lg p-5 rounded cursor-pointer'>Relevance and Year</li>
      <li className='shadow-lg p-5 rounded cursor-pointer'>Year and Country</li>
      <li className='shadow-lg p-5 rounded cursor-pointer'>Year and Region</li>
      <li className='shadow-lg p-5 rounded cursor-pointer'>Year and Topic</li>

    </ul>

    </div>

    </>
  );
};

export default Header;
