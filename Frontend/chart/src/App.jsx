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


function App() {
  const [count, setCount] = useState(0)

  // const [data, setData] = useState(() => d3.ticks(-2, 2, 200).map(Math.sin));

  // function onMouseMove(event) {
  //   const [x, y] = d3.pointer(event);
  //   setData(data.slice(-200).concat(Math.atan2(x, y)));
  // }




  return (
    <>
     {/* <DataFlow/> */}
     {/* <SalesChart/> */}
     <IntensityChart/>
   
       
       
    </>
  )
}

export default App
