import { Col, Row } from "react-bootstrap";
import React, { useState } from "react";
import HomePieChart from "../HomePieChart";
import ReportCard from "../ReportCard";
import ReportOrderProgress from "../ReportOrderProgress";

const JanuaryReport = ({ filteritem, income }) => {
  return (
    <>
      <div className="reportwrapper bg__report">
        <div className="reportwrapper__background">
          <div className="reportwrapper__monthly">
            <Row>
              <Col md={5}>
                <div className="reportwrapper__monthly--piechart">
                  <div className="reportwrapper__monthly--piechart-title">
                    Product Order
                  </div>

                  <div className="reportwrapper__monthly--piechart-chart d-flex justify-content-between">
                    <div className="reportwrapper__monthly--piechart-chart-chart1">
                      {/* <HomePieChart percentage="40,200 " income={income} /> */}
                      <ReportOrderProgress income={filteritem} />
                    </div>
                    <div className="reportwrapper__monthly--piechart-chart-content">
                      <p className="reportwrapper__monthly--piechart-chart-content-topic blue">
                        {filteritem.Ordercompleted}
                      </p>
                      <p className="reportwrapper__monthly--piechart-chart-content-order">
                        Order completed
                      </p>
                      <div className="reportwrapper__monthly--piechart-chart-content">
                        <p className="reportwrapper__monthly--piechart-chart-content-topic blue">
                          {filteritem.Cancelled}
                        </p>
                        <p className="reportwrapper__monthly--piechart-chart-content-order">
                          Order Cancelled
                        </p>
                      </div>
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
                  <div className="reportcard">
                    <div className="reportcard__wrapper">
                      <span className="reportcard__wrapper--heading">
                        {filteritem._id}
                        {/* {month} */}
                      </span>
                      <div className="reportcard__content">
                        <div className="reportcard__content--single d-flex justify-content-between align-items-center">
                          <div className="reportcard__content--left">
                            Total Order:
                          </div>
                          <div className="reportcard__content--right">
                            {filteritem.TotalOrders}
                          </div>
                        </div>
                        <div className="reportcard__content--single d-flex justify-content-between align-items-center">
                          <div className="reportcard__content--left">
                            Completed Order:
                          </div>
                          <div className="reportcard__content--right">
                            {filteritem.Ordercompleted}
                          </div>
                        </div>
                        <div className="reportcard__content--single d-flex justify-content-between align-items-center">
                          <div className="reportcard__content--left">
                            Cancelled Order:
                          </div>
                          <div className="reportcard__content--right">
                            {filteritem.Cancelled}
                          </div>
                        </div>

                        <div className="reportcard__content--single d-flex justify-content-between align-items-center">
                          <div className="reportcard__content--left">
                            Total Revenue:
                          </div>
                          <div className="reportcard__content--right">
                            {filteritem.TotalRevenue}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <ReportCard date="January" /> */}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default JanuaryReport;
