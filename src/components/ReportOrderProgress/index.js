import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const ReportOrderProgress = ({ income }) => {
  const percentage = income.TotalOrders;
  return (
    <>
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
    </>
  );
};

export default ReportOrderProgress;
