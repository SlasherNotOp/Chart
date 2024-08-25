import React, { useEffect, useState } from 'react'
import * as d3 from 'd3';
import axios from 'axios'

const ReqData = () => {

    const [data,setData]= useState();

    useEffect(()=>{
      axios.get("http://localhost:3000/records")
      .then((res)=>{
        console.log(res.data)
        setData(res.data)
      }).catch((err)=>{
        console.log(err)

      })    

    },[])


    


  return (
    <div>

    {
      useEffect(() => {
    if (data?.length > 0) {
        const svg = d3.select('#chart')
            .append('svg')
            .attr('width', 600)
            .attr('height', 400);

        const xScale = d3.scaleBand()
            .domain(data.map(d => d.region))
            .range([0, 600])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.intensity)])
            .range([400, 0]);

        svg.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => xScale(d.region))
            .attr('y', d => yScale(d.intensity))
            .attr('width', xScale.bandwidth())
            .attr('height', d => 400 - yScale(d.intensity))
            .attr('fill', 'steelblue');
    }
}, [data])

    }

    <svg id="chart"></svg>
      
    </div>
  )
}

export default ReqData
