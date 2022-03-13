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
const labels = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() =>
        faker.datatype.number({ min: "3000", max: "15000" })
      ),
      backgroundColor: "#005AAB",
    },
  ],
};

const HomeBarGraph = ({ title, topic }) => {
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
