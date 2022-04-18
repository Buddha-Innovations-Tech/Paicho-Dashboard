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
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const HomeBarGraph = ({ title, topic, bargraphEarning }) => {
  const list = Object.values(bargraphEarning);
  const data = {
    labels,
    datasets: [
      {
        // label: "Dataset 1",
        data: list.map((i) => i),
        backgroundColor: "#005AAB",
      },
    ],
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
