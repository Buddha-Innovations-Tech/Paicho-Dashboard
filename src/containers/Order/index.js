import React, { useState, useEffect } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BiSearch } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import Paginate from "../../components/PaginationComp";
import {
  getOrderDetails,
  listOrders,
  updateOrder,
} from "../../actions/orderAction";
import Loader from "../../components/Loader";
import axios from "axios";
import moment from "moment";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import { Helmet } from "react-helmet";

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
  const [searched, setSearched] = useState(null);
  const [searchedFrom, setSearchedFrom] = useState(null);
  const [searchedTo, setSearchedTo] = useState(null);
  const [display, setDisplay] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFilterDate(e.target.value);
  };
  const { pageNumber } = useParams();
  // const history = useNavigate();

  var discountInBill = 0;

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

  const handleDate = (e) => {
    setSearched(e.target.value);
  };
  useEffect(() => {
    if (searched !== null) {
      setDisplay(
        orders?.orders?.filter((i) => {
          return (
            moment(new Date(i.createdAt)).format("L") ===
            moment(new Date(searched)).format("L")
          );
        })
      );
    }
  }, [searched]);
  useEffect(() => {
    if (searchedFrom !== null && searchedTo !== null) {
      setDisplay(
        orders?.orders?.filter((i) => {
          return (
            moment(new Date(i.createdAt)).format("L") >=
              moment(new Date(searchedFrom)).format("L") &&
            moment(new Date(i.createdAt)).format("L") <=
              moment(new Date(searchedTo)).format("L")
          );
        })
      );
    }
  }, [searchedFrom, searchedTo]);
  const clearDate = () => {
    setDisplay(orders.orders);
    setSearched("");
    setSearchedFrom("");
    setSearchedTo("");

  };
  // useEffect(()=>{
  //   if(searched==="" || searchedFrom==="" || searchedTo===""){
  //     setDisplay(orders.orders);

  //   }
  // })

  return (
    <>

    <Helmet>
      <title>Paicho-Order</title>
    </Helmet>
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
                  <input type="date" value={searched} onChange={handleDate} />
                </div>
              )}

              {dates && (
                <>
                  <div className="d-flex orderwrapper__background--datecalender ms-3 me-3 inputreletive">
                    <div className="reportwrapper__background--right-title inputabsolute">
                      From
                    </div>
                    <input
                      type="date"
                      placeholder="03/23/2020"
                      value={searchedFrom}
                      onChange={(e) => setSearchedFrom(e.target.value)}
                    />
                  </div>
                  <div className="d-flex orderwrapper__background--datecalender ms-3 me-3 inputreletive">
                    <div className="reportwrapper__background--right-title inputabsolute">
                      To
                    </div>
                    <input
                      type="date"
                      placeholder="03/23/2020"
                      value={searchedTo}
                      onChange={(e) => setSearchedTo(e.target.value)}
                    />
                  </div>
                </>
              )}
              <button
                className="me-3 pe-3 ps-3"
                style={{ border: "none", borderRadius: "3px" }}
                onClick={clearDate}
              >
                Clear
              </button>
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
            {searched === null &&
            searchedFrom === null &&
            searchedTo === null ? (
              <>
                {filterTerm === "Status"
                  ? orders &&
                    orders.orders &&
                    orders?.orders
                      ?.filter((order) =>
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
                                {curElm.user
                                  ? `${curElm.user?.firstname} ${curElm.user?.lastname}`
                                  : ""}
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
                              <p>
                                {curElm.totalPrice ? curElm.totalPrice : "no"}
                              </p>
                            </Col>
                            <Col md={1}>
                              <p>
                                {curElm.paymentInfo &&
                                curElm.paymentInfo.paymentmethod
                                  ? curElm.paymentInfo.paymentmethod
                                  : "no"}
                              </p>
                            </Col>

                            <Col md={2}>
                              <p
                                style={{
                                  color:
                                    curElm.orderStatus === "Delivered"
                                      ? "#063865"
                                      : curElm.orderStatus === "Cancelled"
                                      ? "#920000"
                                      : curElm.orderStatus === "Processing"
                                      ? "#495058"
                                      : "#FFA500",
                                  background:
                                    curElm.orderStatus === "Processing"
                                      ? "#C4DCF2"
                                      : curElm.orderStatus === "Cancelled"
                                      ? "#FCDCD2"
                                      : curElm.orderStatus === "Delivered"
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
                                <Moment format="YYYY-MM-DD">
                                  {curElm.createdAt
                                    ? moment(new Date(curElm.createdAt)).format(
                                        "L"
                                      )
                                    : ""}
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
                                {i.user
                                  ? `${i.user?.firstname} ${i.user?.lastname}`
                                  : ""}
                                {/* {i.shippingInfo && i.shippingInfo.fullname
                                  ? i.shippingInfo.fullname
                                  : ""} */}
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
                                {i.paymentInfo && i.paymentInfo.paymentmethod
                                  ? i.paymentInfo.paymentmethod
                                  : ""}
                              </p>
                            </Col>

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
              </>
            ) : (
              <>
                {filterTerm === "Status"
                  ? display &&
                    display &&
                    display
                      ?.filter((order) =>
                        order.user?.firstname.toLowerCase().includes(searchinput)
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
                                {curElm.user
                                  ? `${curElm.user?.firstname} ${curElm.user?.lastname}`
                                  : ""}
                                {/* {curElm.shippingInfo &&
                                curElm.shippingInfo.fullname
                                  ? curElm.shippingInfo.fullname
                                  : "no"} */}
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
                              <p>
                                {curElm.totalPrice ? curElm.totalPrice : "no"}
                              </p>
                            </Col>
                            <Col md={1}>
                              <p>
                                {curElm.paymentInfo && curElm.paymentInfo.method
                                  ? curElm.paymentInfo.method
                                  : "no"}
                              </p>
                            </Col>

                            <Col md={2}>
                              <p
                                style={{
                                  color:
                                    curElm.orderStatus === "Delivered"
                                      ? "#063865"
                                      : curElm.orderStatus === "Cancelled"
                                      ? "#920000"
                                      : curElm.orderStatus === "Processing"
                                      ? "#495058"
                                      : "#FFA500",
                                  background:
                                    curElm.orderStatus === "Processing"
                                      ? "#C4DCF2"
                                      : curElm.orderStatus === "Cancelled"
                                      ? "#FCDCD2"
                                      : curElm.orderStatus === "Delivered"
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
                                <Moment format="YYYY-MM-DD">
                                  {curElm.createdAt
                                    ? moment(new Date(curElm.createdAt)).format(
                                        "L"
                                      )
                                    : ""}
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
                          </Row>
                        );
                      })
                  : display &&
                    display
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
                                {/* {i.shippingInfo && i.shippingInfo.fullname
                                  ? i.shippingInfo.fullname
                                  : ""} */}
                                {i.user
                                  ? `${i.user?.firstname} ${i.user?.lastname}`
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
                                {i.paymentInfo && i.paymentInfo.paymentmethod
                                  ? i.paymentInfo.paymentmethod
                                  : ""}
                              </p>
                            </Col>

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
              </>
            )}

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
                        {`${order?.order.user?.firstname} ${order?.order.user?.lastname}`}
                      </p>
                      <div>
                        <select
                          onChange={(e) => setModalSelected(e.target.value)}
                        >
                          <option selected>{order?.order.orderStatus}</option>
                          <option value="To be Delivered">
                            {" "}
                            To be delivered{" "}
                          </option>
                          <option value="Processing">In Progress</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                    <table>
                      <tr>
                        <td className="maindata">Billing Name:</td>
                        <td className="descdata">
                          {" "}
                          {`${order?.order.user?.firstname} ${order?.order.user?.lastname}`===order?.order?.shippingInfo?.fullname
                            ? "Self"
                            : order?.order?.shippingInfo?.fullname}{" "}
                        </td>
                      </tr>
                      <tr>
                        <td className="maindata">Email:</td>
                        <td className="descdata">
                          {" "}
                          {order?.order?.shippingInfo.email}
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
                    {order?.order?.orderItems &&
                      order?.order?.orderItems?.map((curElm) => {
                        return (
                          <Row className="productlistwrapper__productlistwrapper--listitem modal-data">
                            <Col md={4}>{curElm.name}</Col>
                            <Col md={4}>{curElm.qty}</Col>
                            <Col md={4}>{curElm.price}</Col>
                          </Row>
                        );
                      })}

                    <Row className="productlistwrapper__productlistwrapper--listitem modal-total">
                      <Col md={4}>Discount</Col>
                      <Col md={4}></Col>
                      <Col md={4}>
                        {order?.order?.orderItems.map((data) => {
                            discountInBill +=
                              (data.discount / 100) * data.price * data.qty
                          
                        })}
                        {discountInBill}
                      </Col>
                    </Row>
                    <Row className="productlistwrapper__productlistwrapper--listitem modal-total">
                      <Col md={4}>Shipping Price</Col>
                      <Col md={4}></Col>
                      <Col md={4}>{order?.order?.shippingprice}</Col>
                    </Row>
                    <Row className="productlistwrapper__productlistwrapper--listitem modal-total">
                      <Col md={4}>Total</Col>
                      <Col md={4}></Col>
                      <Col md={4}>{order?.order?.totalPrice}</Col>
                    </Row>
                  </div>
                  <div className="categorywrapper__addcategorywrapper--buttons">
                    <Link to="" className="btn-discard" onClick={handleClose}>
                      Cancel
                    </Link>

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
                history={navigate}
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


