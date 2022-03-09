import React from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   BarChart,
//   XAxis,
//   YAxis,
//   Bar,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
// var step = 30;
// var max = 150;
// var start = 0;
// export const options = {
//   responsive: true,
//         scaleSteps: Math.ceil((max - start) / step),
//         scaleStepWidth: step,
//         scaleStartValue: start,
// };
const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
export const data = {
  
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: "3000", max: "15000" })),
      backgroundColor: '#005AAB',
    },
   
  ],
};

// const data = [
//   {
//     name: "Sun",
//     pv: 2400,
//   },
//   {
//     name: "Mon",
//     pv: 1398,
//   },
//   {
//     name: "Tue",
//     pv: 9800,
//   },
//   {
//     name: "Wed",
//     pv: 3908,
//   },
//   {
//     name: "Thur",
//     pv: 4800,
//   },
//   {
//     name: "Fri",
//     pv: 3800,
//   },
//   {
//     name: "Sat",
//     pv: 4300,
//   },
// ];

const HomeBarGraph = () => {
  return (
    <>
    <div className="d-flex justify-content-between align-items-center bargraphwrapper">
      <p className="bargraphwrapper__revenue">Revenue</p>
      <span className="bargraphwrapper__lastsevendays">Last 7 days</span>
    </div>
      {/* <div style={{ backgroundColor: "#fff", padding: "23px", borderRadius: "4px" }}> */}
 <Bar data={data} />
        {/* <ResponsiveContainer width="100%" height="100%">
          <BarChart width={500} height={500} data={data}>
            <CartesianGrid horizontal="true" vertical="" />
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="pv" fill="#005AAB" />
          </BarChart>
        </ResponsiveContainer> */}
      {/* </div> */}
    </>
  );
};

export default HomeBarGraph;
