'use client'

import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Animated = ({accounts}:TotlaBalanceBoxProps) => {
  const dataset={
    datasets:[
    {
        label:'Banks',
        data:[1250,2500,3700],
        backgroundColor: ['#0747b6','#2265d8','2f91fa']
    }
    ],
    labels:['Bank 1','Bank 2','Bank 3']
  }
    return (
        <Doughnut 
        data={dataset}
        options={{
            cutout:'60%',
            plugins: {
                legend: {
                    display: false,
                }
                }
            }}
         />
  )
}

export default Animated
