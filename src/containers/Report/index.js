import { FaFileExport } from "react-icons/fa";
import { useEffect, useState } from "react";

import MonthlyReport from "../../components/MonthlyReport";
import WeeklyReport from "../../components/WeeklyReport";
import YearlyReport from "../../components/YearlyReport";
import DailyReport from "../../components/DailyReport";

const Report = () => {
  const [filteritem, setFilterItem] = useState("Daily Report");
  const [daily, setDaily] = useState(true);
  const [weekly, setWeekly] = useState(false);
  const [monthly, setMonthly] = useState(false);
  const [yearly, setYearly] = useState(false);

  useEffect(() => {
    filteritem === "Daily Report" ? setDaily(true) : setDaily(false);
    filteritem === "Weekly Report" ? setWeekly(true) : setWeekly(false);
    filteritem === "Monthly Report" ? setMonthly(true) : setMonthly(false);
    filteritem === "Yearly Report" ? setYearly(true) : setYearly(false);
  }, [filteritem]);

  const handleChange = (e) => {
    setFilterItem(e.target.value);
  };
  return (
    <>
      <div className="reportwrapper">
        <div className="d-flex justify-content-between align-items-center">
          <p className="reportwrapper__title">Report</p>
          <button className="reportwrapper__button">
            Export
            <FaFileExport className="reportwrapper__button--icon" />
          </button>
        </div>

        <div className="reportwrapper__background">
          <div className="d-flex justify-content-between align-items-center">
            <div className="reportwrapper__background--left">
              <h1 className="reportwrapper__background--content--heading">
                {filteritem}
              </h1>
            </div>
            <div className="reportwrapper__background--right d-flex">
              <div className="d-flex orderwrapper__background--datecalender ms-3 me-3">
                <div className="reportwrapper__background--right-title">
                  From
                </div>
                <input type="date" placeholder="03/23/2020" />
              </div>
              <div className="d-flex orderwrapper__background--datecalender ms-3 me-3">
                <div className="reportwrapper__background--right-title to">
                  To
                </div>
                <input type="date" placeholder="03/23/2020" />
              </div>

              <div>
                <select
                  className="orderwrapper__background--selectstatus"
                  onChange={handleChange}
                >
                  <option value="Daily Report">Daily</option>
                  <option value="Daily Report">Daily </option>
                  <option value="Weekly Report">Weekly</option>
                  <option value="Monthly Report">Monthly</option>
                  <option value="Yearly Report">Yearly</option>
                </select>
              </div>
            </div>
          </div>
          {daily && <DailyReport />}
          {weekly && <WeeklyReport />}
          {monthly && <MonthlyReport />}
          {yearly && <YearlyReport />}
        </div>
      </div>
    </>
  );
};

export default Report;
