import { Col, Row } from "react-bootstrap";
import { FaFileExport } from "react-icons/fa";

import HomePieChart from "../HomePieChart";
import ReportCard from "../../components/ReportCard";
import YearlyBarGraph from "../../components/YearlyBarGraph";

const YearlyReport = () => {
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
                Yearly Report
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

          <div className="reportwrapper__yearly">
            <Row>
              <Col md={5}>
                <div className="reportwrapper__yearly--piechart">
                  <div className="reportwrapper__yearly--piechart-title">
                    Product Order
                  </div>

                  <div className="reportwrapper__yearly--piechart-chart d-flex justify-content-between">
                    <div className="reportwrapper__yearly--piechart-chart-chart1">
                      <HomePieChart percentage="40,200 " />
                    </div>
                    <div className="reportwrapper__yearly--piechart-chart-content">
                      <p className="reportwrapper__yearly--piechart-chart-content-topic blue">
                        40,000
                      </p>
                      <p className="reportwrapper__yearly--piechart-chart-content-order">
                        Order completed
                      </p>

                      <p className="reportwrapper__yearly--piechart-chart-content-topic red">
                        200
                      </p>
                      <p className="reportwrapper__yearly--piechart-chart-content-order">
                        Order cancellation
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={7}>
                <div className="reportwrapper__yearly--bargraph">
                  {/* <HomeBarGraph title="Revenue graph" topic="Rs 1,00,000" /> */}
                  <YearlyBarGraph title="Revenue graph" topic="Rs 1,00,000" />
                </div>
              </Col>
            </Row>

            <Row className="mt-30">
              <Col md={6}>
                <ReportCard date="2073" />
              </Col>
              <Col md={6}>
                <ReportCard date="2074" />
              </Col>
            </Row>

            <Row className="mt-30">
              <Col md={6}>
                <ReportCard date="2075" />
              </Col>
              <Col md={6}>
                <ReportCard date="2076" />
              </Col>
            </Row>
            <Row className="mt-30">
              <Col md={6}>
                <ReportCard date="2077" />
              </Col>
              <Col md={6}>
                <ReportCard date="2078" />
              </Col>
            </Row>
            <Row className="mt-30">
              <Col md={6}>
                <ReportCard date="2079" />
              </Col>
              <Col md={6}>{/* <ReportCard date="Monday" /> */}</Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default YearlyReport;
