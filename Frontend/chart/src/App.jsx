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


function App() {

  const[titles,setTitles]=useState();
 
function handleTitle (text){
  console.log(text)

}



  return (
    <>
     {/* <DataFlow/> */}
     {/* <SalesChart/> */}
     
     <div className='h-screen  mx-auto'>


     {/* <Header handleTitle={handleTitle}/> */}

     
     <UpdatedChart/>
    
     {/* <TopicRelevance/> */}

     {/* <RegionLikelihood/> */}





     </div>
    
       
       
    </>
  )
}

export default App
