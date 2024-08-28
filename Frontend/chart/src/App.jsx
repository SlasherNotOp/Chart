import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ReqData from './ReqData'
import Chart from './LinePlot'
import LinePlot from './LinePlot'
import * as d3 from "d3";
import DataVisualization from './DataVisualization'
import DataFlow from './DataFlow'
import SalesChart from './SalesChart'
import IntensityChart from './IntensityChart'
import Header from './Header'
import LikehoodChart from './LikehoodChart'
import UpdatedChart from './UpdatedChart'
import YearIntensityChart from './YearIntensityChart'
import TopicRelevance from './TopicRelevance'
import RegionLikelihood from './RegionLikelihood'
import Filter from './Filter'
import CountryData from './CountryData'


function App() {

  const[titles,setTitles]=useState();
 
function handleTitle (text){
  console.log(text)

}



  return (
    <>
     {/* <DataFlow/> */}
     {/* <SalesChart/> */}
     <main className='bg-[#f8f7fa]'>
     
     <div className='h-full w-full  mx-auto'>


     <Header handleTitle={handleTitle}/>
     </div>

    <div className='m-10 h-full shadow-md hover:shadow-lg rounded'>
     <CountryData/>
     </div>

<div className='m-10 flex h-full justify-around'>


    <div className='w-5/12 h-full rounded-md hover:shadow-lg'>
       <UpdatedChart/>
     </div>
     <div className='w-5/12 h-full rounded-md hover:shadow-lg'>
       <RegionLikelihood/>
     </div>
</div>



<div className='m-10 h-full shadow-md hover:shadow-lg rounded hover:rounded-lg'>

     <TopicRelevance/>
     </div>
    





     
    
     </main>
       
    </>
  )
}

export default App
