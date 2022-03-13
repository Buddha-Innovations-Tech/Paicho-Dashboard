import { Row, Col } from "react-bootstrap";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import { FaFileExport } from "react-icons/fa";
import ReportCard from "../../components/ReportCard";
import WeeklyReport from "../../components/WeeklyReport";
import YearlyReport from "../../components/YearlyReport";
import MonthlyReport from "../../components/MonthlyReport";
import { useEffect, useState } from "react";

const Report = () => {
  const [filteritem, setFilterItem] = useState("Daily Report");
  const [daily, setDaily] = useState(true);
  const [weekly, setWeekly] = useState(false);
  const [monthly, setMonthly] = useState(false);
  const [yearly, setYearly] = useState(false);

  useEffect(() => {
    filteritem === "Weekly Report" ? setWeekly(true) : setWeekly(false);
    filteritem === "Monthly Report" ? setMonthly(true) : setMonthly(false);
    filteritem === "Yearly Report" ? setYearly(true) : setYearly(false);
  }, [filteritem]);

  const handleChange = (e) => {
    setFilterItem(e.target.value);
  };
  return (
    <>
      <Row className="gx-0">
        <Col md={3}>
          <SideBar />
        </Col>
        <Col md={9}>
          <NavBar />
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

              {weekly && <WeeklyReport />}
              {monthly && <MonthlyReport />}
              {yearly && <YearlyReport />}
              <div className="reportwrapper__background--reports">
                <Row className="mb-29">
                  <Col md={6}>
                    <ReportCard date="Today" />
                  </Col>
                  <Col md={6}>
                    <ReportCard date="Yesterday" />
                  </Col>
                </Row>
                <Row className="mb-29">
                  <Col md={6}>
                    <ReportCard date="03/02/2078" />
                  </Col>
                  <Col md={6}>
                    <ReportCard date="04/02/2078" />
                  </Col>
                </Row>
                <Row className="mb-29">
                  <Col md={6}>
                    <ReportCard date="05/02/2078" />
                  </Col>
                  <Col md={6}>
                    <ReportCard date="07/02/2078" />
                  </Col>
                </Row>
                <Row className="mb-29">
                  <Col md={6}>
                    <ReportCard date="08/02/1996" />
                  </Col>
                  <Col md={6}>
                    <ReportCard date="09/02/1996" />
                  </Col>
                </Row>
                <Row className="mb-145">
                  <Col md={6}>
                    <ReportCard date="10/02/1996" />
                  </Col>
                  <Col md={6}>
                    <ReportCard date="11/02/1996" />
                  </Col>
                </Row>
              </div>
            </div>
          </div>

          {/* <hr />
          {/* weekly report */}
          {/* <WeeklyReport /> */}

          {/* <hr />
          <YearlyReport /> */}

          {/* <hr />
          <MonthlyReport />  */}
        </Col>
      </Row>
    </>
  );
};

export default Report;
