import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Pie } from 'react-chartjs-2';
// const percentage = 80;
// ChartJS.register(ArcElement, Tooltip, Legend);
// const data = {
//     labels: ['Current Month','Previous Month'],
//     datasets: [
//       {
//         label: '# of Votes',
//         data: [70,30],
//         backgroundColor: [
//           '#005AAB',
//           '#ECECEC',

//         ],
//       },
//     ],
//   };
const HomePieChart = ({ income }) => {
  const percentage = income.Earning;
  return (
    <>
      {/* <CircularProgressbar value={percentage} text={`${percentage}%`} /> */}
      {income && (
        <div label="Square linecaps">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}`}
            styles={buildStyles({
              strokeLinecap: "butt",
              textColor: "#495058",
              pathColor: "#005AAB",
              trailColor: "#ECECEC",
            })}
          />
        </div>
      )}
      {/* <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        strokeWidth={5}
      /> */}

      {/* <Pie data={data} /> */}
    </>
  );
};

export default HomePieChart;
