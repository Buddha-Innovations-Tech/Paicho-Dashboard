import { Col, Row } from "react-bootstrap";

import HomePieChart from "../HomePieChart";
import ReportCard from "../ReportCard";
import MonthlyBarGraph from "../MonthlyBarGraph";

const MonthlyReport = () => {
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
                Monthly Report
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
                  <option>monthly</option>
                </select>
              </div>
            </div>
          </div> */}

          <div className="reportwrapper__monthly">
            <Row>
              <Col md={5}>
                <div className="reportwrapper__monthly--piechart">
                  <div className="reportwrapper__monthly--piechart-title">
                    Product Order
                  </div>

                  <div className="reportwrapper__monthly--piechart-chart d-flex justify-content-between">
                    <div className="reportwrapper__monthly--piechart-chart-chart1">
                      <HomePieChart percentage="40,200 " />
                    </div>
                    <div className="reportwrapper__monthly--piechart-chart-content">
                      <p className="reportwrapper__monthly--piechart-chart-content-topic blue">
                        40,000
                      </p>
                      <p className="reportwrapper__monthly--piechart-chart-content-order">
                        Order completed
                      </p>

                      <p className="reportwrapper__monthly--piechart-chart-content-topic red">
                        200
                      </p>
                      <p className="reportwrapper__monthly--piechart-chart-content-order">
                        Order cancellation
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={7}>
                <div
                  className="reportwrapper__monthly--reportcard"
                  style={{ marginTop: "81px" }}
                >
                  {/* <HomeBarGraph title="Revenue graph" topic="Rs 1,00,000" /> */}
                  <ReportCard date="Falgun" />
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <div className="reportwrapper__monthly--bargraph">
                  <MonthlyBarGraph
                    title="Revenue graph"
                    topic="Rs 25,00,00,000"
                  />
                </div>
              </Col>
            </Row>

            <Row className="mt-30">
              <Col md={6}>
                <ReportCard date="Baishakh" />
              </Col>
              <Col md={6}>
                <ReportCard date="Jeth" />
              </Col>
            </Row>

            <Row className="mt-30">
              <Col md={6}>
                <ReportCard date="Asar" />
              </Col>
              <Col md={6}>
                <ReportCard date="Sharwan" />
              </Col>
            </Row>
            <Row className="mt-30">
              <Col md={6}>
                <ReportCard date="Bhadra" />
              </Col>
              <Col md={6}>
                <ReportCard date="Ashoj" />
              </Col>
            </Row>
            <Row className="mt-30">
              <Col md={6}>
                <ReportCard date="Karthik" />
              </Col>
              <Col md={6}>
                <ReportCard date="Mangsir" />
              </Col>
            </Row>
            <Row className="mt-30">
              <Col md={6}>
                <ReportCard date="Poush" />
              </Col>
              <Col md={6}>
                <ReportCard date="Magh" />
              </Col>
            </Row>
            <Row className="mt-30">
              <Col md={6}>
                <ReportCard date="Falgun" />
              </Col>
              <Col md={6}>
                <ReportCard date="Chaitra" />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default MonthlyReport;
