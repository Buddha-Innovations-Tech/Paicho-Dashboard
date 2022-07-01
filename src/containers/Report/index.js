import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFileExport } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import JanuaryReport from "../../components/JanuaryReport";
import MonthlyBarGraph from "../../components/MonthlyBarGraph";

import { listReports } from "../../actions/orderAction";
import {
  earningDashboard,
  incomeDashboard,
} from "../../actions/dashboardAction";

const Report = () => {
  const [earningdash, setEarningDash] = useState([]);
  const { reports } = useSelector((state) => state.reportList);
  const { userInfo } = useSelector((state) => state.userLogin);
  const dashboardEarningBarGraph = useSelector(
    (state) => state.dashboardEarningBarGraph
  );
  const { dashboard } = dashboardEarningBarGraph;

  const { income, loading: incomeLoading } = useSelector(
    (state) => state.dashboardIncome
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(listReports(1));
  }, []);
  useEffect(() => {
    if (!incomeLoading) {
      setEarningDash(income);
    }
  }, [incomeLoading]);
  useEffect(() => {
    dispatch(earningDashboard(1));
  }, []);
  useEffect(() => {
    dispatch(incomeDashboard(1));
  }, []);

  const [filteritem, setFilterItem] = useState("");
  const [bargraphEarning, setBargraphEarning] = useState("");

  const handleChange = (e) => {
    dispatch(listReports(e.target.value));
    // setFilterItem(rep[0]);
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
          <Row className="mb-5">
            <Col md={12}>
              <div className="reportwrapper__monthly--bargraph">
                {dashboard && (
                  <MonthlyBarGraph
                    title="Revenue graph"
                    // topic="Rs 25,00,00,000"
                    // filteritem={dashboard}
                    bargraphEarning={dashboard}
                  />
                )}
              </div>
            </Col>
          </Row>
          <div className="d-flex justify-content-between align-items-center">
            <div className="reportwrapper__background--left">
              <h1 className="reportwrapper__background--content--heading">
                {/* {filteritem._id} */} Monthly Report
              </h1>
            </div>
            <div className="reportwrapper__background--right d-flex">
              {/* <div className="d-flex orderwrapper__background--datecalender ms-3 me-3">
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
              </div> */}

              <div>
                <select
                  className="orderwrapper__background--selectstatus"
                  onChange={handleChange}
                >
                  <option value="1">January </option>
                  <option value="2">February </option>
                  <option value="3">March </option>
                  <option value="4">April </option>
                  <option value="5">May </option>
                  <option value="6">June </option>
                  <option value="7">July </option>
                  <option value="8">August </option>
                  <option value="9">September </option>
                  <option value="10">October </option>
                  <option value="11">November </option>
                  <option value="12">December </option>
                </select>
              </div>
            </div>
          </div>
          {reports && (
            <JanuaryReport filteritem={reports} income={earningdash} />
          )}
        </div>
      </div>
    </>
  );
};

export default Report;
