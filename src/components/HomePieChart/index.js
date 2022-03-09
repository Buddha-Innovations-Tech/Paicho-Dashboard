import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
const data = {
    labels: ['Current Month','Previous Month'],
    datasets: [
      {
        label: '# of Votes',
        data: [70,30],
        backgroundColor: [
          '#005AAB',
          '#ECECEC',
          
        ],
      },
    ],
  };
const HomePieChart = () => {
  return (
    <>
       <Pie data={data} />
    </>
  )
}

export default HomePieChart