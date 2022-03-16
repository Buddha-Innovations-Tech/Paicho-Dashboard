import { Row, Col,Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import React,{useEffect, useState} from "react";

import HomeBarGraph from "../../components/HomeBarGraph";
import HomePieChart from "../../components/HomePieChart";
import HomeOrder from "../../components/HomeOrder";
import {ImCross} from "react-icons/im"
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../actions/userActions";

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

  const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {loading,users:{users:userList}} = useSelector(state => state.getUsers)
  const [users, setUsers] = useState([])

  useEffect(()=> {
    dispatch(getUsers())
   
    console.log('loading');
  },[])

  if(loading){
return <h1>Loading.....</h1>
  }

  return (
    <>
    {userList && userList.length>0 ?userList.map(user =><h1>{user.name}</h1>):<p>No users found...</p>}
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
                  <HomeOrder order="To be delivered " number="4,50,000" />
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
              <HomeBarGraph title="Revenue" topic="Last 7 days" />
            </div>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={8}>
            <div className="latestorderwrapper">
              <div className="d-flex justify-content-between align-items-center">
                <p className="latestorderwrapper__latestorder">Latest Order</p>
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
                        <td>
                          <span
                            style={{
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
                              padding: "5px 10px",
                              textAlign: "center",
                            }}
                          >
                            {data.status}
                          </span>
                        </td>
                        <td style={{ paddingTop: "0" }}>
                          <button onClick={handleShow}>View Details</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Col>
          <Modal show={show} onHide={handleClose}>
                        <Modal.Body>
                          <div className="ordermodalbg">
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="ordermodalbg__title">Details</p>
                              <ImCross
                                className="carouselCard__category--icons--crossicon"
                                onClick={handleClose}
                              />
                            </div>
                            <div className="userdetails">
                              <p className="topic">User Details</p>
                              <div
                                className="d-flex justify-content-between align-items-center"
                                style={{
                                  borderBottom: "0.6px solid #E0E0E0",
                                  paddingBottom: "11px",
                                }}
                              >
                                <p className="username">Sagar Gc</p>
                                <div>
                                  <select>
                                    <option selected>To be delivered</option>
                                    <option> To be delivered </option>
                                    <option>In Progress</option>
                                    <option>Completed</option>
                                    <option>Cancelled</option>
                                  </select>
                                </div>
                              </div>
                              <table>
                                <tr>
                                  <td className="maindata">Billing Name:</td>
                                  <td className="descdata">Self</td>
                                </tr>
                                <tr>
                                  <td className="maindata">Email:</td>
                                  <td className="descdata">
                                    sagarchhetri981@gmail.com
                                  </td>
                                </tr>
                                <tr>
                                  <td className="maindata">Phone Number:</td>
                                  <td className="descdata">9815165795</td>
                                </tr>
                                <tr>
                                  <td className="maindata">Address:</td>
                                  <td className="descdata">
                                    Butwal 10 Golpark
                                  </td>
                                </tr>
                                <tr>
                                  <td className="maindata">Date:</td>
                                  <td className="descdata">02/05/2022</td>
                                </tr>
                              </table>
                            </div>
                            <div className="userdetails">
                              <p className="topic">Order Details</p>
                              <div className="orderwrapper__background--headingrow modalheading">
                                <Row>
                                  <Col md={4}>Product Name</Col>
                                  <Col md={4}>Quantity</Col>
                                  <Col md={4}>Price</Col>
                                </Row>
                              </div>
                              <Row className="productlistwrapper__productlistwrapper--listitem modal-data">
                                <Col md={4}>Mix Achar</Col>
                                <Col md={4}>5</Col>
                                <Col md={4}>Rs.240</Col>
                              </Row>
                              <Row className="productlistwrapper__productlistwrapper--listitem modal-data">
                                <Col md={4}>Lemon Pickle</Col>
                                <Col md={4}>2</Col>
                                <Col md={4}>Rs.120</Col>
                              </Row>
                              <Row className="productlistwrapper__productlistwrapper--listitem modal-data">
                                <Col md={4}>Honey</Col>
                                <Col md={4}>4</Col>
                                <Col md={4}>Rs.500</Col>
                              </Row>
                              <Row className="productlistwrapper__productlistwrapper--listitem modal-total">
                                <Col md={4}>Total</Col>
                                <Col md={4}></Col>
                                <Col md={4}>Rs.1000</Col>
                              </Row>
                            </div>
                          </div>
                        </Modal.Body>
                      </Modal>
          <Col md={4}>
            <div className="revenuewrapper">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="revenuewrapper__earning">Earning</p>
                  <span className="revenuewrapper__revenue">Total Revenue</span>
                </div>
                <p className="revenuewrapper__total">Rs 40,20,000</p>
              </div>
              <div className="mt-3">
                <HomePieChart percentage="80%" />
                <p className="revenuewrapper__piechartconclusion mt-2">
                  Sell is 70% more than last Month
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Home;
