import React, { useState, useEffect } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BiSearch } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import Moment from "react-moment";

import Paginate from "../../components/PaginationComp";
import {
  getOrderDetails,
  listOrders,
  updateOrder,
} from "../../actions/orderAction";
import Loader from "../../components/Loader";

const Order = () => {
  const [searchinput, setSearchInput] = useState("");
  const { userInfo } = useSelector((state) => state.userLogin);

  const [filterdate, setFilterDate] = useState("Day");
  const [date, setDate] = useState(true);
  const [dates, setDates] = useState(false);
  const [filterTerm, setFilterTerm] = useState("Status");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [orderStatus, setModalSelected] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFilterDate(e.target.value);
  };
  const { pageNumber } = useParams();
  const history = useNavigate();

  const {
    orders,
    pages,
    page,
    loading: paginationLoading,
  } = useSelector((state) => state.orderList);
  const { order } = useSelector((state) => state.orderDetails);
  const { success: orderUpdateSuccess } = useSelector(
    (state) => state.orderUpdate
  );

  const [viewId, setViewId] = useState(0);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);

  const handleView = (id) => {
    dispatch(getOrderDetails(id));
  };

  const EditStatus = () => {
    dispatch(
      updateOrder(
        {
          orderStatus,
        },
        order?.order._id
      )
    );
    handleClose();
  };

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listOrders());
  }, [orderUpdateSuccess]);

  useEffect(() => {
    dispatch(listOrders(pageNumber));
  }, [pageNumber]);

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
              <input
                type="text"
                placeholder="Search"
                value={searchinput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
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
                  <option value="To be Delivered"> To be delivered </option>
                  <option value="Processing">In Progress</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
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
              <Col md={1}>Payment Method</Col>
              <Col md={2}>Status</Col>
              <Col md={2}>Date</Col>
              <Col md={2}>Details</Col>
            </Row>
          </div>
          <div>
            {/* <p>{orders && JSON.stringify(orders.orders)} </p> */}
            {filterTerm === "Status"
              ? orders &&
<<<<<<< HEAD
                orders.orders
                  .filter((order) =>
=======
                orders.orders &&
                orders?.orders
                  ?.filter((order) =>
>>>>>>> 73d954f4c218744c44d6233def177381d3205c8b
                    order.shippingInfo.fullname
                      .toLowerCase()
                      .includes(searchinput)
                  )
                  .map((curElm, index) => {
                    return (
                      <Row
                        className="productlistwrapper__productlistwrapper--listitem"
                        key={index}
                      >
                        <Col md={1}>
                          <p>{index + 1}</p>
                        </Col>
                        <Col md={1}>
                          <p>
                            {curElm.shippingInfo && curElm.shippingInfo.fullname
                              ? curElm.shippingInfo.fullname
<<<<<<< HEAD
                              : "no"}
=======
                              : ""}
>>>>>>> 73d954f4c218744c44d6233def177381d3205c8b
                          </p>
                        </Col>
                        <Col md={2}>
                          <p>
                            {curElm.shippingInfo &&
                            curElm.shippingInfo.phonenumber
                              ? curElm.shippingInfo.phonenumber
                              : "no"}
                          </p>
                        </Col>
                        <Col md={1}>
                          <p>{curElm.totalPrice ? curElm.totalPrice : "no"}</p>
                        </Col>
                        <Col md={1}>
                          <p>
<<<<<<< HEAD
                            {" "}
                            {curElm.paymentInfo && curElm.paymentInfo.method
                              ? curElm.paymentInfo.method
                              : ""}
=======
                            {curElm.paymentInfo && curElm.paymentInfo.method
                              ? curElm.paymentInfo.method
                              : "no"}
>>>>>>> 73d954f4c218744c44d6233def177381d3205c8b
                          </p>
                        </Col>

                        <Col md={2}>
                          <p
                            style={{
                              color:
                                curElm.orderStatus === "Completed"
                                  ? "#063865"
                                  : curElm.orderStatus === "Cancelled"
                                  ? "#920000"
                                  : curElm.orderStatus === "In Progress"
                                  ? "#495058"
                                  : "#FFA500",
                              background:
                                curElm.orderStatus === "Completed"
                                  ? "#C4DCF2"
                                  : curElm.orderStatus === "Cancelled"
                                  ? "#FCDCD2"
                                  : curElm.orderStatus === "In Progress"
                                  ? "#DDEEC5"
                                  : "#FFEDCC",
                              borderRadius: "28px",
                              padding: "5px 10px",
                              textAlign: "center",
                            }}
                          >
                            {curElm.orderStatus ? curElm.orderStatus : "no"}
                          </p>
                        </Col>
                        <Col md={2}>
                          <p>
                            <Moment format="DD/MM/YYYY">
                              {curElm.createdAt ? curElm.createdAt : ""}
                            </Moment>
                          </p>
                        </Col>

                        <Col md={2}>
                          <button
                            className="editbtn"
                            onClick={() => {
                              setViewId(curElm._id);
                              handleView(curElm._id);
                              handleShow();
                            }}
                          >
                            View Details
                          </button>
                        </Col>
<<<<<<< HEAD
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
                                    {order?.order?.shippingInfo.user}
                                  </p>
                                  <div>
                                    <select
                                      onChange={(e) =>
                                        setModalSelected(e.target.value)
                                      }
                                    >
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
                                    <td className="descdata">
                                      <Moment format="DD/MM/YYYY">
                                        {order?.order?.createdAt}
                                      </Moment>
                                    </td>
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
                                  <Col md={4}></Col>
                                  <Col md={4}></Col>
                                  <Col md={4}></Col>
                                </Row>
=======
                      </Row>
                    );
                  })
              : orders &&
                orders.orders
                  .filter((i) => i.orderStatus === filterTerm)
                  .map((i, index) => {
                    return (
                      <Row
                        className="productlistwrapper__productlistwrapper--listitem"
                        key={index}
                      >
                        <Col md={1}>
                          <p>{index + 1}</p>
                        </Col>
                        <Col md={1}>
                          <p>
                            {i.shippingInfo && i.shippingInfo.fullname
                              ? i.shippingInfo.fullname
                              : ""}
                          </p>
                        </Col>
                        <Col md={2}>
                          <p>
                            {i.shippingInfo && i.shippingInfo.phonenumber
                              ? i.shippingInfo.phonenumber
                              : "no"}
                          </p>
                        </Col>
                        <Col md={1}>
                          <p>{i.totalPrice ? i.totalPrice : "no"}</p>
                        </Col>
                        <Col md={1}>
                          <p>
                            {i.paymentInfo && i.paymentInfo.method
                              ? i.paymentInfo.method
                              : "no"}
                          </p>
                        </Col>
>>>>>>> 73d954f4c218744c44d6233def177381d3205c8b

                        <Col md={2}>
                          <p
                            style={{
                              color:
                                i.orderStatus === "Completed"
                                  ? "#063865"
                                  : i.orderStatus === "Cancelled"
                                  ? "#920000"
                                  : i.orderStatus === "In Progress"
                                  ? "#495058"
                                  : "#FFA500",
                              background:
                                i.orderStatus === "Completed"
                                  ? "#C4DCF2"
                                  : i.orderStatus === "Cancelled"
                                  ? "#FCDCD2"
                                  : i.orderStatus === "In Progress"
                                  ? "#DDEEC5"
                                  : "#FFEDCC",
                              borderRadius: "28px",
                              padding: "5px 10px",
                              textAlign: "center",
                            }}
                          >
                            {i.orderStatus ? i.orderStatus : "no"}
                          </p>
                        </Col>
                        <Col md={2}>
                          <p>
                            <Moment format="DD/MM/YYYY">
                              {i.createdAt ? i.createdAt : ""}
                            </Moment>
                          </p>
                        </Col>

                        <Col md={2}>
                          <button
                            className="editbtn"
                            onClick={() => {
                              setViewId(i._id);
                              handleView(i._id);
                              handleShow();
                            }}
                          >
                            View Details
                          </button>
                        </Col>
                      </Row>
                    );
                  })}
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
                        {order?.order?.shippingInfo.fullname}
                      </p>
                      <div>
                        <select
                          onChange={(e) => setModalSelected(e.target.value)}
                        >
                          <option selected>To be delivered</option>
                          <option value="To be Delivered">
                            {" "}
                            To be delivered{" "}
                          </option>
                          <option value="Processing">In Progress</option>
                          <option value="Delivered">Completed</option>
                          <option value="Cancelled">Cancelled</option>
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
                        <td className="descdata">
                          <Moment format="DD/MM/YYYY">
                            {order?.order?.createdAt}
                          </Moment>
                        </td>
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
                      <Col md={4}>
                        {/* {console.log(order?.order?.orderItems)} */}
                      </Col>
                      <Col md={4}></Col>
                      <Col md={4}></Col>
                    </Row>

                    <Row className="productlistwrapper__productlistwrapper--listitem modal-total">
                      <Col md={4}>Shipping Price</Col>
                      <Col md={4}></Col>
                      <Col md={4}>{order?.order?.shippingPrice}</Col>
                    </Row>
                    <Row className="productlistwrapper__productlistwrapper--listitem modal-total">
                      <Col md={4}>Total</Col>
                      <Col md={4}></Col>
                      <Col md={4}>{order?.order?.totalPrice}</Col>
                    </Row>
                  </div>
                  <div className="categorywrapper__addcategorywrapper--buttons">
                    <button className="btn-discard" onClick={handleClose}>
                      Cancel
                    </button>

                    <button className="btn-addcategory" onClick={EditStatus}>
                      Save
                    </button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
        {!paginationLoading ? (
          <>
            <div className="mt-5">
              <Paginate
                pages={pages}
                page={page}
                list="order"
                history={history}
              />
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default Order;

// orderList
//                   .filter((i) => i.status === filterTerm)
//                   .map((i) => (
//                     <Row className="productlistwrapper__productlistwrapper--listitem">
//                       <Col md={1}>
//                         <p>{i.id}</p>
//                       </Col>
//                       <Col md={1}>
//                         <p>{i.username}</p>
//                       </Col>
//                       <Col md={2}>
//                         <p>{i.Phone}</p>
//                       </Col>
//                       <Col md={1}>
//                         <p>{i.total}</p>
//                       </Col>
//                       <Col md={1}>
//                         <p>{i.payment}</p>
//                       </Col>

//                       <Col md={2}>
//                         <p
//                           style={{
//                             color:
//                               i.status === "Completed"
//                                 ? "#063865"
//                                 : i.status === "Cancelled"
//                                 ? "#920000"
//                                 : i.status === "In Progress"
//                                 ? "#495058"
//                                 : "#FFA500",
//                             background:
//                               i.status === "Completed"
//                                 ? "#C4DCF2"
//                                 : i.status === "Cancelled"
//                                 ? "#FCDCD2"
//                                 : i.status === "In Progress"
//                                 ? "#DDEEC5"
//                                 : "#FFEDCC",
//                             borderRadius: "28px",
//                             padding: "5px 10px",
//                             textAlign: "center",
//                           }}
//                         >
//                           {i.status}
//                         </p>
//                       </Col>
//                       <Col md={2}>
//                         <p>{i.date}</p>
//                       </Col>

//                       <Col md={2}>
//                         <button className="editbtn">View Details</button>
//                       </Col>
//                     </Row>
//                   ))}
