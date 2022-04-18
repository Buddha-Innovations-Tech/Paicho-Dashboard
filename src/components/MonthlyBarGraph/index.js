import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const labels = [
  // filteritem.TotalRevenue,
  "Janaury",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const datatata = [
  {
    asd: 14500,
  },
  {
    asd: 14500,
  },
  {
    asd: 14500,
  },
  {
    asd: 14500,
  },
  {
    asd: 14500,
  },
  {
    asd: 14500,
  },
  {
    asd: 14500,
  },
  {
    asd: 14500,
  },
  {
    asd: 14500,
  },
  {
    asd: 14500,
  },
  {
    asd: 14500,
  },
  {
    asd: 1450,
  },
];
// let newdata = [];
// datatata.map((i, index) => {
//   newdata.push({
//     id: index + 1,
//     label: "",
//     data: i.asd,
//   });
// });

const HomeBarGraph = ({ title, topic, bargraphEarning, filteritem }) => {
  const list = Object.values(bargraphEarning);
  const data = {
    labels,
    // datasets: newdata
    datasets: [
      {
        // label: "Dataset 1",
        data: list.map((i) => i),
        backgroundColor: "#005AAB",
      },
    ],
    //  [
    //   {
    //     label: "Dataset 1",
    //     data: labels.map(() =>
    //       faker.datatype.number({ min: "150000", max: "60000" })
    //     ),
    //     backgroundColor: "#005AAB",
    //   },
    // ],
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center bargraphwrapper">
        <p className="bargraphwrapper__revenue">{title}</p>
        <span className="bargraphwrapper__lastsevendays">{topic}</span>
      </div>

      <Bar data={data} />
    </>
  );
};

export default HomeBarGraph;
