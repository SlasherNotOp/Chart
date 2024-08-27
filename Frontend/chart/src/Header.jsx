import React from 'react';

const Header = ({handleTitle}) => {
  return (
    <>
    <div className='w-full h-12 mt-5  flex justify-center items-center '>

    <div className='w-11/12 rounded shadow-md h-16 flex items-center justify-between'>
    <ul className='pl-5 cursor-pointer'>
      <li>Logo</li>
    </ul>
    <ul className='flex gap-10 pr-5 cursor-pointer'>
      <li>Home</li>
      <li>about</li>
      
    </ul>

    </div>

   
    </div>

    </>
  );
};

export default Header;
