import React, { useEffect, useState } from "react";
import { Row, Col, Modal } from "react-bootstrap";

import PaginationComp from "../../components/PaginationComp";
import { BiSearch } from "react-icons/bi";
import { ImCross } from "react-icons/im";

const orderList = [
  {
    id: 1,
    username: "Sindhu aryal",
    Phone: 9847135126,
    total: "Rs.250",
    payment: "Esewa",
    status: "In Progress",
    date: "02/01/2020",
  },
  {
    id: 2,
    username: "Sindhu",
    Phone: 9847135126,
    total: "Rs.500",
    payment: "Fone Pay",
    status: "Completed",
    date: "02/01/2021",
  },
  {
    id: 3,
    username: "Sagar",
    Phone: 9847135126,
    total: "Rs.500",
    payment: "Mobile Banking",
    status: "In Progress",
    date: "02/01/2022",
  },
  {
    id: 4,
    username: "Laxmi",
    Phone: 9847135188,
    total: "Rs.1000",
    payment: "Cash On Delivery",
    status: "Cancelled",
    date: "02/01/2021",
  },
  {
    id: 5,
    username: "Sindhu aryal",
    Phone: 9847135126,
    total: "Rs.250",
    payment: "Esewa",
    status: "In Progress",
    date: "02/01/2020",
  },
  {
    id: 6,
    username: "Sindhu",
    Phone: 9847135126,
    total: "Rs.500",
    payment: "Fone Pay",
    status: "Completed",
    date: "02/01/2021",
  },
  {
    id: 7,
    username: "Sagar",
    Phone: 9847135126,
    total: "Rs.500",
    payment: "Mobile Banking",
    status: "In Progress",
    date: "02/01/2022",
  },
  {
    id: 8,
    username: "Laxmi",
    Phone: 9847135188,
    total: "Rs.1000",
    payment: "Cash On Delivery",
    status: "To be delivered",
    date: "02/01/2021",
  },
];

const Order = () => {
  const [filterdate, setFilterDate] = useState("Day");
  const [date, setDate] = useState(true);
  const [dates, setDates] = useState(false);
  const [filterTerm, setFilterTerm] = useState("Status");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (e) => {
    setFilterDate(e.target.value);
  };
  useEffect(() => {
    filterdate === "Day" ? setDate(true) : setDate(false);
    filterdate === "Dates" ? setDates(true) : setDates(false);
  }, [filterdate]);
  return (
    <>
      <div className="orderwrapper">
        <p className="orderwrapper__title">Order</p>
        <div className="orderwrapper__background">
          <div className="d-flex justify-content-between align-items-center orderwrapper__background--orderheading ">
            <div className="categorywrapper__addcategorywrapper--searchinput">
              <BiSearch className="searchicon" />
              <input type="text" placeholder="Search category" />
            </div>

            <div className="d-flex">
              <div>
                <select
                  className="orderwrapper__background--selectstatus"
                  onChange={handleChange}
                >
                  <option value="Day">Day</option>
                  <option value="Dates">Dates</option>
                </select>
              </div>
              {date && (
                <div className="d-flex orderwrapper__background--datecalender ms-3 me-3">
                  {/* <AiOutlineCalendar className="calendericon" /> */}
                  <input type="date" placeholder="03/23/2020" />
                </div>
              )}
              {dates && (
                <>
                  <div className="d-flex orderwrapper__background--datecalender ms-3 me-3 inputreletive">
                    <div className="reportwrapper__background--right-title inputabsolute">
                      From
                    </div>
                    <input type="date" placeholder="03/23/2020" />
                  </div>
                  <div className="d-flex orderwrapper__background--datecalender ms-3 me-3 inputreletive">
                    <div className="reportwrapper__background--right-title inputabsolute">
                      To
                    </div>
                    <input type="date" placeholder="03/23/2020" />
                  </div>
                </>
              )}

              <div>
                <select
                  className="orderwrapper__background--selectstatus"
                  onChange={(e) => setFilterTerm(e.target.value)}
                >
                  <option selected>Status</option>
                  <option> To be delivered </option>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </div>
            </div>
          </div>
          <div className="orderwrapper__background--headingrow">
            <Row>
              <Col md={1}>SN</Col>
              <Col md={1}>User Name</Col>
              <Col md={2}>Phone Number</Col>
              <Col md={1}>Total</Col>
              <Col md={2}>Payment Method</Col>
              <Col md={2}>Status</Col>
              <Col md={1}>Date</Col>
              <Col md={2}>Details</Col>
            </Row>
          </div>
          <div>
            {filterTerm === "Status"
              ? orderList.map((curElm, index) => {
                  return (
                    <Row
                      className="productlistwrapper__productlistwrapper--listitem"
                      key={index}
                    >
                      <Col md={1}>
                        <p>{curElm.id}</p>
                      </Col>
                      <Col md={1}>
                        <p>{curElm.username}</p>
                      </Col>
                      <Col md={2}>
                        <p>{curElm.Phone}</p>
                      </Col>
                      <Col md={1}>
                        <p>{curElm.total}</p>
                      </Col>
                      <Col md={2}>
                        <p>{curElm.payment}</p>
                      </Col>

                      <Col md={2}>
                        <p
                          style={{
                            color:
                              curElm.status === "Completed"
                                ? "#063865"
                                : curElm.status === "Cancelled"
                                ? "#920000"
                                : curElm.status === "In Progress"
                                ? "#495058"
                                : "#FFA500",
                            background:
                              curElm.status === "Completed"
                                ? "#C4DCF2"
                                : curElm.status === "Cancelled"
                                ? "#FCDCD2"
                                : curElm.status === "In Progress"
                                ? "#DDEEC5"
                                : "#FFEDCC",
                            borderRadius: "28px",
                            padding: "5px 10px",
                            textAlign: "center",
                          }}
                        >
                          {curElm.status}
                        </p>
                      </Col>
                      <Col md={1}>
                        <p>{curElm.date}</p>
                      </Col>

                      <Col md={2}>
                        <button className="editbtn" onClick={handleShow}>
                          View Details
                        </button>
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
                    </Row>
                  );
                })
              : orderList
                  .filter((i) => i.status === filterTerm)
                  .map((i) => (
                    <Row className="productlistwrapper__productlistwrapper--listitem">
                      <Col md={1}>
                        <p>{i.id}</p>
                      </Col>
                      <Col md={1}>
                        <p>{i.username}</p>
                      </Col>
                      <Col md={2}>
                        <p>{i.Phone}</p>
                      </Col>
                      <Col md={1}>
                        <p>{i.total}</p>
                      </Col>
                      <Col md={2}>
                        <p>{i.payment}</p>
                      </Col>

                      <Col md={2}>
                        <p
                          style={{
                            color:
                              i.status === "Completed"
                                ? "#063865"
                                : i.status === "Cancelled"
                                ? "#920000"
                                : i.status === "In Progress"
                                ? "#495058"
                                : "#FFA500",
                            background:
                              i.status === "Completed"
                                ? "#C4DCF2"
                                : i.status === "Cancelled"
                                ? "#FCDCD2"
                                : i.status === "In Progress"
                                ? "#DDEEC5"
                                : "#FFEDCC",
                            borderRadius: "28px",
                            padding: "5px 10px",
                            textAlign: "center",
                          }}
                        >
                          {i.status}
                        </p>
                      </Col>
                      <Col md={1}>
                        <p>{i.date}</p>
                      </Col>

                      <Col md={2}>
                        <button className="editbtn">View Details</button>
                      </Col>
                    </Row>
                  ))}
          </div>
        </div>
        <div className="mt-5">
          <PaginationComp />
        </div>
      </div>
    </>
  );
};

export default Order;
