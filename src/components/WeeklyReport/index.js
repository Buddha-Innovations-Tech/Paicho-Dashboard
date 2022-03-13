import { Col, Row } from "react-bootstrap";
import HomeBarGraph from "../HomeBarGraph";
import HomePieChart from "../HomePieChart";
import ReportCard from "../../components/ReportCard";

const WeeklyReport = () => {
  return (
    <>
      <div className="reportwrapper bg__report">
        {/* <div className="d-flex justify-content-between align-items-center">
          <p className="reportwrapper__title">Report</p>
          <button className="reportwrapper__button">
            Export
            <FaFileExport className="reportwrapper__button--icon" />
          </button>
        </div> */}

        <div className="reportwrapper__background">
          {/* <div className="d-flex justify-content-between align-items-center">
            <div className="reportwrapper__background--left">
              <h1 className="reportwrapper__background--content--heading">
                Weekly Report
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
                <select className="orderwrapper__background--selectstatus">
                  <option selected>Daily</option>
                  <option>Daily </option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Yearly</option>
                </select>
              </div>
            </div>
          </div> */}

          <div className="reportwrapper__weekly">
            <Row>
              <Col md={5}>
                <div className="reportwrapper__weekly--piechart">
                  <div className="reportwrapper__weekly--piechart-title">
                    Product Order
                  </div>

                  <div className="reportwrapper__weekly--piechart-chart d-flex justify-content-between">
                    <div className="reportwrapper__weekly--piechart-chart-chart1">
                      <HomePieChart percentage="40,200 " />
                    </div>
                    <div className="reportwrapper__weekly--piechart-chart-content">
                      <p className="reportwrapper__weekly--piechart-chart-content-topic blue">
                        40,000
                      </p>
                      <p className="reportwrapper__weekly--piechart-chart-content-order">
                        Order completed
                      </p>

                      <p className="reportwrapper__weekly--piechart-chart-content-topic red">
                        200
                      </p>
                      <p className="reportwrapper__weekly--piechart-chart-content-order">
                        Order cancellation
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={7}>
                <div className="reportwrapper__weekly--bargraph">
                  <HomeBarGraph title="Revenue graph" topic="Rs 1,00,000" />
                </div>
              </Col>
            </Row>

            <Row className="mt-30">
              <Col md={6}>
                <ReportCard date="Sunday" />
              </Col>
              <Col md={6}>
                <ReportCard date="Monday" />
              </Col>
            </Row>

            <Row className="mt-30">
              <Col md={6}>
                <ReportCard date="Tuesday" />
              </Col>
              <Col md={6}>
                <ReportCard date="Wednesday" />
              </Col>
            </Row>
            <Row className="mt-30">
              <Col md={6}>
                <ReportCard date="Thrusday" />
              </Col>
              <Col md={6}>
                <ReportCard date="Friay" />
              </Col>
            </Row>
            <Row className="mt-30">
              <Col md={6}>
                <ReportCard date="Saturday" />
              </Col>
              <Col md={6}>{/* <ReportCard date="Monday" /> */}</Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeeklyReport;
