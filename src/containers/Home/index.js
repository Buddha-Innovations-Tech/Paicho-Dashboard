import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ImCross } from "react-icons/im";

import HomeBarGraph from "../../components/HomeBarGraph";
import HomePieChart from "../../components/HomePieChart";
import HomeOrder from "../../components/HomeOrder";
import { getOrderDetails, listOrders } from "../../actions/orderAction";

// const latestOrderData = [
//   {
//     sn: 1,
//     name: "Sagar Gharti",
//     phone: "9847456124",
//     status: "completed",
//   },
//   {
//     sn: 2,
//     name: "Sagar Kc",
//     phone: "9847056224",
//     status: "cancelled",
//   },
//   {
//     sn: 3,
//     name: "Sagar Thapa",
//     phone: "9847478624",
//     status: "To be delivered",
//   },
//   {
//     sn: 4,
//     name: "Sagar Karki",
//     phone: "9847412121",
//     status: "In Progress",
//   },
//   {
//     sn: 5,
//     name: "Sagar Thapa",
//     phone: "9847478624",
//     status: "To be delivered",
//   },
// ];

const Home = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  // console.log(userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.orderList);
  const { order } = useSelector((state) => state.orderDetails);
  const [viewId, setViewId] = useState(0);
  const handleView = (id) => {
    dispatch(getOrderDetails(id));
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);
  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
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
                  {orders?.orders?.map((curElm, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {" "}
                          {curElm.shippingInfo && curElm.shippingInfo.user
                            ? curElm.shippingInfo.user
                            : "no"}
                        </td>
                        <td>
                          {" "}
                          {curElm.shippingInfo &&
                          curElm.shippingInfo.phonenumber
                            ? curElm.shippingInfo.phonenumber
                            : "no"}
                        </td>
                        <td>
                          <span
                            style={{
                              color:
                                curElm.status === "completed"
                                  ? "#063865"
                                  : curElm.status === "cancelled"
                                  ? "#920000"
                                  : curElm.status === "To be delivered"
                                  ? "#FFA500"
                                  : "#495058",
                              background:
                                curElm.status === "completed"
                                  ? "#C4DCF2"
                                  : curElm.status === "cancelled"
                                  ? "#FCDCD2"
                                  : curElm.status === "To be delivered"
                                  ? "#FFEDCC"
                                  : "#DDEEC5",
                              borderRadius: "28px",
                              padding: "5px 10px",
                              textAlign: "center",
                            }}
                          >
                            {curElm.orderStatus ? curElm.orderStatus : "no"}
                          </span>
                        </td>
                        <td style={{ paddingTop: "0" }}>
                          <button
                            className="editbtn"
                            onClick={() => {
                              setViewId(curElm._id);
                              handleView(curElm._id);
                              // console.log(curElm._id, "hy");
                              handleShow();
                            }}
                          >
                            View Details
                          </button>
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
                    <p className="username">
                      {/* {orders?.orders?.shippingInfo.user
                                      ? orders?.orders?.shippingInfo.user
                                      : "nop"} */}
                      {order?.order?.shippingInfo.user}
                    </p>
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
                      <td className="descdata">sagarchhetri981@gmail.com</td>
                    </tr>
                    <tr>
                      <td className="maindata">Phone Number:</td>
                      <td className="descdata">
                        {order?.order?.shippingInfo.phonenumber}
                      </td>
                    </tr>
                    <tr>
                      <td className="maindata">Address:</td>
                      <td className="descdata">
                        {order?.order?.shippingInfo.address}
                      </td>
                    </tr>
                    <tr>
                      <td className="maindata">Date:</td>
                      <td className="descdata">{order?.order?.createdAt}</td>
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
                <div className="categorywrapper__addcategorywrapper--buttons">
                  <button className="btn-discard" onClick={handleClose}>
                    Cancel
                  </button>

                  <button className="btn-addcategory" onClick={handleClose}>
                    Save
                  </button>
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
