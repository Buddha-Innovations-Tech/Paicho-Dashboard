import React from "react";
import { Row, Col } from "react-bootstrap";
import HomeOrder from "../../components/HomeOrder";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import { Link } from "react-router-dom";
import HomeBarGraph from "../../components/HomeBarGraph";
import HomePieChart from "../../components/HomePieChart";

const latestOrderData = [
  {
    sn: 1,
    name: "Sagar Gharti",
    phone: "9847456124",
    status: "completed",
  },
  {
    sn: 2,
    name: "Sagar Kc",
    phone: "9847056224",
    status: "cancelled",
  },
  {
    sn: 3,
    name: "Sagar Thapa",
    phone: "9847478624",
    status: "To be delivered",
  },
  {
    sn: 4,
    name: "Sagar Karki",
    phone: "9847412121",
    status: "In Progress",
  },
  {
    sn: 5,
    name: "Sagar Thapa",
    phone: "9847478624",
    status: "To be delivered",
  },
];

const Home = () => {
  return (
    <>
      <Row className="gx-0">
        <Col md={3}>
          <SideBar />
        </Col>
        <Col md={9}>
          <NavBar />
          <div className="homedashboardwrapper">
            <p className="homedashboardwrapper__heading">Dashboard</p>
            <span className="homedashboardwrapper__subheading">
              information of our business
            </span>
            <Row className="mt-3">
              <Col md={6}>
                <Row className="gx-4 gy-3">
                  <Col md={6}>
                    <div className="tobedelivered">
                      <HomeOrder order="To be delivered " number="45,0000" />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="inprogress">
                      <HomeOrder order="In Progress" number="45" />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="cancelledorder">
                      <HomeOrder order="Canceled Orders " number="45" />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="completedorder">
                      <HomeOrder order="Completed Orders " number="45" />
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <div className="homedashboardwrapper__bargraph">
                  <HomeBarGraph />
                </div>
              </Col>
            </Row>

            <Row className="mt-4">
              <Col md={8}>
                <div className="latestorderwrapper">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="latestorderwrapper__latestorder">
                      Latest Order
                    </p>
                    <span className="latestorderwrapper__viewall">
                      <Link to="">View All</Link>
                    </span>
                  </div>
                  <table className="table latestorderwrapper__table">
                    <thead style={{ background: "#F4F5F9" }}>
                      <tr>
                        <th>SN</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Status</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {latestOrderData.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>{data.sn}</td>
                            <td>{data.name}</td>
                            <td>{data.phone}</td>
                            <td
                             
                            >
                              <span  style={{
                                color:
                                  data.status === "completed"
                                    ? "#063865"
                                    : data.status === "cancelled"
                                    ? "#920000"
                                    : data.status === "To be delivered"
                                    ? "#FFA500"
                                    : "#495058",
                                background:
                                  data.status === "completed"
                                    ? "#C4DCF2"
                                    : data.status === "cancelled"
                                    ? "#FCDCD2"
                                    : data.status === "To be delivered"
                                    ? "#FFEDCC"
                                    : "#DDEEC5",
                                borderRadius: "28px",
                                padding:"5px 10px",
                                textAlign: "center",
                              }}>{data.status}</span>
                              
                            </td>
                            <td style={{ paddingTop: "0" }}>
                              <button>View Details</button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Col>
              <Col md={4}>
                <div className="revenuewrapper">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="revenuewrapper__earning">Earning</p>
                      <span className="revenuewrapper__revenue">Total Revenue</span>
                    </div>
                    <p className="revenuewrapper__total">Rs 40,20,000</p>
                  </div>
                  <HomePieChart/>
                  <p className="revenuewrapper__piechartconclusion">Sell is 70% more than last Month</p>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Home;
